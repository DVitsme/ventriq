// (`pnpm add -D vitest @playwright/test @axe-core/playwright @lhci/cli`).
// It keeps `next build`'s typecheck green while the harness is dormant.
import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

/** Cheap invariants for every route: correct status, exactly one h1, a real
 *  title (never the create-next-app scaffold). Plus the two behaviors the
 *  campaign depends on: the announcement bar and the /go attribution 302. */

const ROUTES = [
  "/",
  "/summit",
  "/founders-after-hours",
  "/mastermind",
  "/about",
  "/contact",
];

async function expectRealTitle(page: Page) {
  const title = await page.title();
  expect(title.length).toBeGreaterThan(0);
  expect(title.startsWith("Create Next")).toBe(false);
}

for (const route of ROUTES) {
  test(`renders: ${route}`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expectRealTitle(page);
  });
}

test("404 route serves status 404 with the corridor page", async ({ page }) => {
  const response = await page.goto("/definitely-404");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveCount(1);
  await expectRealTitle(page);
});

test("announcement bar is visible on /", async ({ page }) => {
  await page.goto("/");
  // One of the bar's three copy states (pre / during / post) must be on
  // screen — phase-proof so this doesn't rot on Aug 10 or Aug 21.
  await expect(
    page
      .getByText(/Save your seat|Forge The Future is live|Missed the summit/)
      .first(),
  ).toBeVisible();
});

test("/go/summit?s=test → 302 to Luma with the source stamped", async ({
  request,
}) => {
  const response = await request.get("/go/summit?s=test", {
    maxRedirects: 0,
  });
  expect(response.status()).toBe(302);
  const location = response.headers()["location"] ?? "";
  expect(location).toContain("luma.com/lp9z8iav");
  expect(location).toContain("utm_source=test");
});
