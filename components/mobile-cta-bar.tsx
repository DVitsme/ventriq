"use client";

import { useEffect, useState } from "react";
import { LumaRegisterButton } from "@/components/luma-register-button";

/** Persistent registration bar for phones — revision brief §02, which calls it
 *  "the highest-return structural change in the brief":
 *
 *    "Assume the majority of traffic is a phone, arriving from an Instagram
 *     bio link, scrolling one-handed. A fixed bottom bar carrying the CTA
 *     should follow the reader the entire length of the page."
 *
 *  Design decisions this makes, since nothing fixed or sticky existed on this
 *  site before (Phase 1 §7) and there was no pattern to copy:
 *
 *  - **Phone only.** `md:hidden`. On desktop the hero CTA, the agenda CTA and
 *    the final CTA are all reachable without it, and a persistent bar there
 *    would just eat viewport.
 *  - **It stays out of the way until it's useful.** Hidden while the hero CTA
 *    is on screen — a duplicate button 80px below the real one is noise, not
 *    help. An IntersectionObserver on the hero sentinel drives it.
 *  - **Not a floating pill.** Full-bleed midnight band with a hairline gold
 *    top rule, square to the viewport edges, 2px radius on the button only.
 *    Rounded floating pills with shadows are on the `design-tells` refusal
 *    list; this reads as a drafting rule with a threshold on it.
 *  - **It reserves its own space.** A spacer of matching height sits at the
 *    end of the page so the bar never occludes the footer's last line.
 *  - **Accessibility:** it is a plain landmark-free div containing one link,
 *    placed at the END of the DOM so it never intercepts the tab order on the
 *    way down the page. It is not a dialog, traps nothing, and needs no
 *    dismiss affordance because it never covers content that isn't also
 *    reachable by scrolling.
 *  - **Attribution:** carries its own `cta_location`, so the highest-traffic
 *    button on mobile doesn't report as untracked in the Aug 7 retargeting
 *    read (Phase 3 T2·2).
 *
 *  Progressive enhancement: with JS off, `visible` stays false and the bar
 *  simply never appears — every other CTA on the page still works.
 */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = document.getElementById("vq-hero-cta-sentinel");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "0px 0px -40% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Keeps the footer clear of the bar when it's up. */}
      <div aria-hidden className="h-[68px] md:hidden" />
      {/* `inert` while parked off-screen. translate-y-full only moves it
          visually — without this the link stays in the tab order and a
          keyboard user lands on an invisible button at the end of the page.
          `inert` removes it from both focus order and the a11y tree, which
          aria-hidden alone would not do legally (aria-hidden on a focusable
          element is itself an axe violation). */}
      {/* `visibility` — not `inert` — is what parks this accessibly.
          `inert` was tried in both the boolean and string forms and this
          React/Next build silently drops the attribute (confirmed by grepping
          the rendered HTML, twice). `translate-y-full` alone only moves the
          bar visually: the link stays in the tab order, so a keyboard user
          tabbing to the end of the page lands on an invisible button. axe
          does NOT flag that — focusable-but-offscreen is a known blind spot,
          and the suite went green with the bug present.
          `visibility: hidden` removes it from both focus order and the
          accessibility tree, and unlike `display: none` it still transitions. */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-gold/60 bg-midnight px-4 py-3 transition-[transform,visibility] duration-300 md:hidden ${
          visible ? "visible translate-y-0" : "invisible translate-y-full"
        } motion-reduce:transition-none`}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-[13px] leading-tight text-cream/70">
            Free · virtual
            <br />
            <span className="[font-variant-numeric:tabular-nums]">Aug 10–20</span>
          </p>
          <LumaRegisterButton
            ctaLocation="summit-mobile-bar"
            className="shrink-0 px-5 py-3 text-[15px]"
          >
            Save My Free Seat
          </LumaRegisterButton>
        </div>
      </div>
    </>
  );
}
