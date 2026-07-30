"use client";

import { useEffect, useState } from "react";
import { LumaRegisterButton } from "@/components/luma-register-button";

/** The brief's "slim persistent sub-nav" (§16) — DESKTOP ONLY, by evidence.
 *  A third mobile chrome layer would put the page at ~4.5:1 content-to-chrome
 *  where NN/g's praised example is 13:1, and every strong precedent (Airbnb,
 *  Apple, GitHub Universe, Luma itself) refuses the stack. Mobile gets the
 *  in-flow SheetIndex below instead — same bounce-reduction goal, zero
 *  persistent cost. Spec + sources: research doc §5.
 *
 *  Scroll-spy: the IO detection-band recipe — a narrow horizontal band
 *  (rootMargin -20% top / -75% bottom, threshold 0) so exactly one section
 *  matches at a time; last-known-active is kept when the band is between
 *  sections so the highlight never drops out. Active state = aria-current
 *  "location" + gold + rule marker (never color alone). NOT CSS
 *  `:target-current` — Chrome-only and it doesn't set aria-current (Soueidan:
 *  instant WCAG 1.3.1 risk). Anchor targets carry scroll-mt so headings never
 *  land under the bar. Plain same-page anchors — works with JS off; only the
 *  spy is enhancement. */

const SECTIONS = [
  { id: "speakers", label: "Speakers" },
  { id: "schedule", label: "Schedule" },
  { id: "faq", label: "FAQ" },
] as const;

export function SummitSubnav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
        // no else: keep the last active section while between bands
      },
      { rootMargin: "-20% 0px -75% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="sticky top-0 z-30 hidden border-b border-gold/60 bg-midnight md:block">
      <nav
        aria-label="Page sections"
        className="mx-auto flex max-w-[1440px] items-center gap-8 px-5 py-2.5 md:px-20"
      >
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={active === s.id ? "location" : undefined}
            onClick={() => setActive(s.id)}
            className={`relative py-1 text-sm tracking-[0.14em] [font-variant:small-caps] ${
              active === s.id
                ? "font-semibold text-gold after:absolute after:inset-x-0 after:-bottom-[11px] after:h-[2px] after:bg-gold"
                : "text-cream/80 hover:text-cream"
            }`}
          >
            {s.label}
          </a>
        ))}
        <span className="ml-auto">
          <LumaRegisterButton ctaLocation="summit-subnav" className="!px-4 !py-2 text-sm">
            Save My Free Seat
          </LumaRegisterButton>
        </span>
      </nav>
    </div>
  );
}

/** Mobile replacement for the sticky bar: a drafting title-block index in
 *  normal flow directly under the hero. Users get the overview + the anchor
 *  jumps (the part NN/g says actually helps) without a third chrome layer.
 *  Register stays owned by the bottom CTA bar. */
export function SheetIndex() {
  return (
    <nav aria-label="On this page" className="border-b border-cream/10 bg-midnight md:hidden">
      <div className="px-5 py-4">
        <p className="text-xs tracking-[0.18em] text-cream/60 [font-variant:small-caps]">
          on this sheet
        </p>
        <ul className="mt-1">
          {SECTIONS.map((s, i) => (
            <li key={s.id} className={i > 0 ? "border-t border-cream/10" : ""}>
              <a href={`#${s.id}`} className="flex items-baseline gap-3 py-2.5">
                <span className="text-xs tracking-[0.14em] text-gold [font-variant-numeric:tabular-nums]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] text-cream/90">{s.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
