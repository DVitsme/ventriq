import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";

/** Full WCAG 2.2 AA sweep of every route, plus one stateful scan with the
 *  mobile nav open. Any violations dump to the console (id / impact / first
 *  target) before the assertion so CI logs are actionable, not just red. */

const ROUTES = [
  "/",
  "/summit",
  "/founders-after-hours",
  "/mastermind",
  "/about",
  "/contact",
  "/definitely-404", // not-found.tsx must render real, accessible copy too
];

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"];

/** Headless Chromium produces no frames unless something asks for them, so
 *  the CSS animation clock stays frozen at 0 — entrance animations (hero
 *  .vq-in) hold their opacity:0 first frame forever, and axe silently skips
 *  the invisible text. Jump document-timeline animations to their end state
 *  (the page's designed resting state) so the scan audits what humans see.
 *  Scroll-driven animations are left alone (the manifesto's dim resting
 *  state should be audited as-is) and infinite ones (ticker) throw on
 *  finish(), hence the try/catch. */
async function settleAnimations(page: Page) {
  await page.evaluate(() => {
    for (const a of document.getAnimations()) {
      try {
        if (a.timeline instanceof DocumentTimeline) a.finish();
      } catch {
        /* infinite animation — leave it running */
      }
    }
  });
}

async function expectNoViolations(page: Page, label: string) {
  const results = await new AxeBuilder({ page })
    .withTags(WCAG_TAGS)
    // Violations are all the assertion reads; skipping pass/incomplete
    // serialization roughly halves analyze time on these SVG-heavy pages.
    .options({ resultTypes: ["violations"] })
    // The footer Digest form mounts Turnstile on every page, inside a CLOSED
    // shadow root. The default driver walks Playwright's frame tree (which
    // sees through closed shadow DOM) and frame.evaluate hangs forever inside
    // the anti-bot challenge iframe. No CSS exclude can reach it. Legacy mode
    // injects axe in-page instead, where closed-shadow/cross-origin frames
    // are unreachable and skipped — everything that is ours still gets
    // scanned.
    .setLegacyMode(true)
    .analyze();
  if (results.violations.length > 0) {
    console.log(
      `\n[axe] ${label} — ${results.violations.length} violation(s):`,
    );
    for (const v of results.violations) {
      console.log(
        `  · ${v.id} (${v.impact}) — ${v.nodes.length} node(s), first target: ${v.nodes[0]?.target?.join(" ")}`,
      );
    }
  }
  expect(results.violations).toEqual([]);
}

for (const route of ROUTES) {
  test(`axe clean: ${route}`, async ({ page }) => {
    // A 4-tag WCAG sweep over these pages runs 15–30s; the 30s default
    // test budget is too tight once goto is included.
    test.setTimeout(120_000);
    // Not networkidle: Turnstile keeps a blob: request pending forever, so
    // the network never idles. Load + a visible h1 is the real readiness.
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    await settleAnimations(page);
    if (route === "/definitely-404") {
      // The 404 must be the designed corridor page, not a framework default.
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: /corridor doesn.t go anywhere/i,
        }),
      ).toBeVisible();
    }
    await expectNoViolations(page, route);
  });
}

test("axe clean: / with the mobile nav open", async ({ page }) => {
  test.skip(
    test.info().project.name !== "mobile",
    "the menu button only exists below the lg breakpoint",
  );
  test.setTimeout(120_000);
  await page.goto("/");
  await settleAnimations(page);
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
  await expectNoViolations(page, "/ (mobile nav open)");
});
