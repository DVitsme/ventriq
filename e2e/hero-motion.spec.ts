import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

/** The Master Sheet hero's contract (plan: docs/plans/summit-aug-1/07-wave-2-hero.md).
 *  Assertions are state-based and watchdog-bounded: the entrance either
 *  finishes naturally or the 8s wall-clock watchdog completes it, so these
 *  pass identically on healthy-rAF and starved-rAF environments — never
 *  assert mid-flight choreography, only landed states. */

/** A struct path is "drawn" when DrawSVG's 0% state (zero-length dash) is
 *  gone — either no dasharray at all (PRM/no-JS base) or a non-zero dash. */
async function structDrawn(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    const el = document.querySelector(".ms-struct path");
    if (!el) return false;
    const d = getComputedStyle(el).strokeDasharray;
    return d === "none" || !/^0(px|\.0+px)?[,\s]/.test(d);
  });
}

test("hero: entrance lands (watchdog-bounded), chip pauses and persists", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "primary motion path");
  await page.goto("/");

  await expect.poll(() => structDrawn(page), { timeout: 12_000 }).toBe(true);

  const chip = page.getByRole("button", { name: /motion/i });
  await expect(chip).toBeVisible();
  await expect(chip).toHaveAttribute("aria-pressed", "false");

  await chip.click({ force: true }); // force: rAF-stall lottery (see mobile test note)
  await expect(chip).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("section").first()).toHaveClass(/ms-paused/);
  expect(await page.evaluate(() => localStorage.getItem("vq-motion"))).toBe("off");

  // persistence: a fresh load restores the paused choice
  await page.reload();
  const chip2 = page.getByRole("button", { name: /motion/i });
  await expect(chip2).toHaveAttribute("aria-pressed", "true", { timeout: 10_000 });
  await expect(page.locator("section").first()).toHaveClass(/ms-paused/);

  // and the sheet is COMPLETE while paused (progress(1) on restore)
  expect(await structDrawn(page)).toBe(true);

  await chip2.click({ force: true });
  await expect(chip2).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator("section").first()).not.toHaveClass(/ms-paused/);
});

test("hero PRM: the show runs in safe classes and lands complete", async ({ page }) => {
  test.skip(test.info().project.name !== "reduced-motion", "PRM path");
  await page.goto("/");

  // dasharray is NEVER manipulated under PRM (no draw-travel) — the sheet
  // is structurally complete from the first frame; PRM life is opacity/color
  expect(await structDrawn(page)).toBe(true);

  // the exposure entrance fades GROUPS; individual lines keep opacity 1
  const gridLineOpacity = await page.evaluate(() => {
    const line = document.querySelector(".ms-grid line");
    return line ? getComputedStyle(line).opacity : null;
  });
  expect(gridLineOpacity).toBe("1");

  // the exposure entrance LANDS (watchdog-bounded at 6s): detail layer at 1
  await expect
    .poll(
      () =>
        page.evaluate(() => {
          const d = document.querySelector(".ms-detail");
          return d ? getComputedStyle(d).opacity : null;
        }),
      { timeout: 9_000 }
    )
    .toBe("1");

  // the 2.2.2 mechanism renders under PRM too
  await expect(page.getByRole("button", { name: /motion/i })).toBeVisible();
});

test("hero mobile: recentered composition, chip tap works", async ({ page }) => {
  test.skip(test.info().project.name !== "mobile", "touch path");
  await page.goto("/");

  // the mobile shift keeps the gate the subject (negative translateX)
  const shift = await page.evaluate(() => {
    const el = document.querySelector(".ms-shift");
    if (!el) return null;
    const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
    return m.e;
  });
  expect(shift).not.toBeNull();
  expect(shift as number).toBeLessThan(-100);

  await expect.poll(() => structDrawn(page), { timeout: 12_000 }).toBe(true);

  // force: mobile-emulated headless contexts nondeterministically stall
  // BeginFrame scheduling (rAF never fires), which hangs the actionability
  // stability gate forever. This test verifies the STATE machine — paint
  // truth is the desktop project's + production probes' job.
  const chip = page.getByRole("button", { name: /motion/i });
  await chip.tap({ force: true });
  await expect(chip).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("section").first()).toHaveClass(/ms-paused/);
});
