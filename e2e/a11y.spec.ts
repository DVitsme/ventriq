// (`pnpm add -D vitest @playwright/test @axe-core/playwright @lhci/cli`).
// It keeps `next build`'s typecheck green while the harness is dormant.
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

async function expectNoViolations(page: Page, label: string) {
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
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
    await page.goto(route, { waitUntil: "networkidle" });
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
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
  await expectNoViolations(page, "/ (mobile nav open)");
});
