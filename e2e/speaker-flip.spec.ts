import { expect, test } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";

/** The speaker flip's interaction contract, per input mode. Exists because
 *  the Jul 29 pure-CSS hover shipped a bug NO existing gate could see: hover
 *  under prefers-reduced-motion rendered a blank card (Chromium backface
 *  cull) or mirrored text (Firefox) — axe doesn't hover, and the a11y suite
 *  never combined :hover with the PRM project. These tests pin the unified
 *  JS state machine: hover (mouse only) and the chip drive ONE `data-flipped`
 *  attribute; PRM swaps rotation for a crossfade with transform:none all the
 *  way down; Esc dismisses without moving the pointer (WCAG 1.4.13). */

/** Jump document-timeline animations/transitions to their end state —
 *  headless produces no frames unless asked, so delayed-visibility
 *  choreography (0s 500ms) would otherwise never fire. Same trick as
 *  a11y.spec.ts settleAnimations. */
async function settle(page: Page) {
  await page.evaluate(() => {
    for (const a of document.getAnimations()) {
      try {
        if (a.timeline instanceof DocumentTimeline) a.finish();
      } catch {
        /* infinite animation (ticker) — leave it running */
      }
    }
  });
}

async function firstPhotoCard(page: Page): Promise<Locator> {
  await page.goto("/summit");
  const card = page
    .locator("article", { has: page.locator("img.vq-duotone") })
    .first();
  await card.scrollIntoViewIfNeeded();
  await settle(page);
  return card;
}

async function flipState(card: Locator) {
  return card.evaluate((el) => {
    const read = (q: string) => {
      const s = getComputedStyle(el.querySelector(q) as HTMLElement);
      return { visibility: s.visibility, opacity: s.opacity, transform: s.transform };
    };
    const faces = el.querySelector(".vq-faces") as HTMLElement;
    const chip = el.querySelector("button") as HTMLButtonElement;
    return {
      dataFlipped: faces.hasAttribute("data-flipped"),
      facesTransform: getComputedStyle(faces).transform,
      front: read(".vq-face-front"),
      back: read(".vq-face-back"),
      chipExpanded: chip.getAttribute("aria-expanded"),
      chipLabel: chip.textContent ?? "",
    };
  });
}

test("mouse hover flips to the bio — one state machine, truthful chip", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "mouse-hover path");
  const card = await firstPhotoCard(page);

  await card.hover();
  await settle(page);
  let s = await flipState(card);
  expect(s.dataFlipped).toBe(true); // hover feeds React state, not :hover CSS
  expect(s.chipExpanded).toBe("true");
  expect(s.chipLabel).toContain("back");
  expect(s.back.visibility).toBe("visible");
  expect(s.front.visibility).toBe("hidden");
  expect(s.facesTransform).toContain("matrix3d"); // rotation ran (motion on)

  await page.mouse.move(5, 5); // leave
  await settle(page);
  s = await flipState(card);
  expect(s.dataFlipped).toBe(false);
  expect(s.chipLabel).toContain("bio");
  expect(s.front.visibility).toBe("visible");
  expect(s.back.visibility).toBe("hidden");
});

test("PRM hover crossfades — never blank, never mirrored — and Esc dismisses", async ({ page }) => {
  test.skip(test.info().project.name !== "reduced-motion", "PRM path");
  const card = await firstPhotoCard(page);

  await card.hover();
  await settle(page);
  let s = await flipState(card);
  expect(s.dataFlipped).toBe(true);
  expect(s.back.visibility).toBe("visible");
  expect(s.back.opacity).toBe("1");
  expect(s.front.visibility).toBe("hidden");
  // THE Jul 29 regression: any rotation here = blank card (Chromium cull)
  // or mirror-reversed bio (Firefox). PRM must be transform-free end to end.
  expect(s.facesTransform).toBe("none");
  expect(s.back.transform).toBe("none");

  await page.keyboard.press("Escape"); // pointer still over the card
  await settle(page);
  s = await flipState(card);
  expect(s.dataFlipped).toBe(false);
  expect(s.front.visibility).toBe("visible");
  expect(s.back.visibility).toBe("hidden");
});

test("touch: tapping the face never flips; the chip does", async ({ page }) => {
  test.skip(test.info().project.name !== "mobile", "touch path");
  const card = await firstPhotoCard(page);

  await card.locator(".vq-faces").tap();
  await settle(page);
  let s = await flipState(card);
  expect(s.dataFlipped).toBe(false); // pointerenter(touch) must be ignored
  expect(s.front.visibility).toBe("visible");

  const chip = card.locator("button");
  await chip.tap();
  await settle(page);
  s = await flipState(card);
  expect(s.dataFlipped).toBe(true);
  expect(s.chipExpanded).toBe("true");
  expect(s.back.visibility).toBe("visible");

  await chip.tap();
  await settle(page);
  s = await flipState(card);
  expect(s.dataFlipped).toBe(false);
  expect(s.front.visibility).toBe("visible");
});
