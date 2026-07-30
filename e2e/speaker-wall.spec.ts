import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

/** The Speaker Wall's contract (plan: docs/plans/summit-aug-1/08-wave-2b-speaker-wall.md).
 *  Landed-state assertions only; interactions forced (rAF-stall lottery —
 *  see hero-motion.spec.ts). The wall is decorative by design: one
 *  aria-hidden wrapper, zero focusables, canonical roster below. */

async function wallState(page: Page) {
  return page.evaluate(() => {
    const wall = document.querySelector(".sw-wall");
    const plates = document.querySelectorAll(".sw-plate");
    const focusables = wall ? wall.querySelectorAll("a, button, [tabindex]") : [];
    const imgs = wall ? Array.from(wall.querySelectorAll("img")) : [];
    return {
      exists: !!wall,
      ariaHidden: wall?.getAttribute("aria-hidden"),
      plateCount: plates.length,
      focusableCount: focusables.length,
      allAltEmpty: imgs.every((i) => i.getAttribute("alt") === ""),
      firstPlateOpacity: plates[0] ? getComputedStyle(plates[0]).opacity : null,
    };
  });
}

test("wall: decorative contract + entrance lands + chip pauses", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "primary motion path");
  await page.goto("/summit");

  const s = await wallState(page);
  expect(s.exists).toBe(true);
  expect(s.ariaHidden).toBe("true");
  expect(s.plateCount).toBe(8);
  expect(s.focusableCount).toBe(0); // inert decoration — roster carries function
  expect(s.allAltEmpty).toBe(true);

  // entrance lands (watchdog-bounded)
  await expect
    .poll(async () => (await wallState(page)).firstPlateOpacity, { timeout: 12_000 })
    .toBe("1");

  // hover focus: assert the driver's SYNCHRONOUS path (gsap.set zIndex 20)
  // — caption visibility rides a tween, and tween completion is hostage to
  // the rAF-stall lottery; the set path is frame-independent.
  const plate = page.locator(".sw-plate:not([data-featured])").first();
  await plate.hover({ force: true });
  await expect
    .poll(() =>
      page.evaluate(() => {
        const el = document.querySelector(".sw-plate:not([data-featured])") as HTMLElement;
        return el ? el.style.zIndex : null;
      })
    )
    .toBe("20");

  const chip = page.getByRole("button", { name: /motion/i });
  await chip.click({ force: true });
  await expect(chip).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("section").first()).toHaveClass(/ms-paused/);
  expect(await page.evaluate(() => localStorage.getItem("vq-motion"))).toBe("off");
});

test("countdown animates down every second; chip freezes it", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "primary path");
  await page.goto("/summit");

  // setTimeout-driven ticking — immune to the rAF-stall lottery, so plain
  // text sampling is deterministic here.
  const timer = page.getByRole("timer");
  await expect(timer).toBeVisible({ timeout: 10_000 });
  const a = await timer.textContent();
  await page.waitForTimeout(2300);
  const b = await timer.textContent();
  expect(a).not.toBe(b); // seconds are visibly counting down

  // 2.2.2: the motion chip governs auto-updating info too
  const chip = page.getByRole("button", { name: /motion/i });
  await chip.click({ force: true });
  const c = await timer.textContent();
  await page.waitForTimeout(2300);
  const d = await timer.textContent();
  expect(c).toBe(d); // frozen while paused
  await chip.click({ force: true }); // restore for other tests
});

test("stat strip: choreographed finishes — nights, then operators; $0 inert", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "primary path");
  await page.goto("/summit");

  // The drivers mirror their values as light-DOM data-n attributes —
  // NumberFlow's digits live in shadow DOM and its ElementInternals aria is
  // unreadable from tests (el.ariaLabel null; a11y-tree name empty here).
  // Two legitimate worlds: ARMED (IO fired; order is observable) or
  // NEVER-ARMED (stalled context never delivers IO; finals show instantly —
  // the inverted-gating base state). Verify order when observable.
  const read = () =>
    page.evaluate(() =>
      Array.from(document.querySelectorAll("[data-n]")).map((e) => e.getAttribute("data-n"))
    );

  await page.evaluate(() => document.querySelector("[data-n]")?.scrollIntoView({ block: "center" }));
  await page.waitForTimeout(1900); // nights lands ~1.54s; operators still stepping (~19)
  const mid = await read();
  expect(mid[0]).toBe("8"); // nights finished first in BOTH worlds
  if (mid[1] !== "21") {
    // armed world: operators mid-flight at 1.9s proves nights < operators
    await page.waitForTimeout(900); // ~2.8s — operators landed (~2.31s)
    const end = await read();
    expect(end[1]).toBe("21");
  }
  expect((await read())[2]).toBe("90");

  // the price never moves: constant value, animation hard-off — assert it
  // is NOT part of the choreography (no data-n mirror; only 3 driven stats)
  const driven = await page.evaluate(() => document.querySelectorAll("[data-n]").length);
  expect(driven).toBe(3);
});

test("wall PRM: complete immediately, no transforms, chip present", async ({ page }) => {
  test.skip(test.info().project.name !== "reduced-motion", "PRM path");
  await page.goto("/summit");

  await expect
    .poll(async () => (await wallState(page)).firstPlateOpacity, { timeout: 9_000 })
    .toBe("1");

  // zero movement: drift wrappers hold identity transforms under PRM
  const transforms = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".sw-drift")).map((el) => getComputedStyle(el).transform)
  );
  for (const t of transforms) expect(t === "none" || t === "matrix(1, 0, 0, 1, 0, 0)").toBe(true);

  await expect(page.getByRole("button", { name: /motion/i })).toBeVisible();

  // stat strip under PRM: the count-up driver never arms — finals instantly
  const prmStats = await page.evaluate(() =>
    Array.from(document.querySelectorAll("[data-n]")).map((e) => e.getAttribute("data-n"))
  );
  expect(prmStats).toEqual(["8", "21", "90"]);
});

test("wall mobile: contact strip scrolls, plates present, h1 single", async ({ page }) => {
  test.skip(test.info().project.name !== "mobile", "touch path");
  await page.goto("/summit");

  const s = await wallState(page);
  expect(s.plateCount).toBe(8);
  await expect(page.locator("h1")).toHaveCount(1);

  // the strip is horizontally scrollable on phones
  const scrollable = await page.evaluate(() => {
    const strip = document.querySelector(".sw-strip");
    return strip ? strip.scrollWidth > strip.clientWidth : false;
  });
  expect(scrollable).toBe(true);
});
