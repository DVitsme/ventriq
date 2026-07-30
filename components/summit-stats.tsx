"use client";

import { useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";
import { continuous } from "number-flow/plugins";

/** The summit stat strip, choreographed (pattern: docs/patterns/stat-count-up.md).
 *
 *  Derrick, Jul 30: a count-up where the viewer SEES the early steps
 *  ("1 → 2 → 3 nights"), the stats finish in order — nights first,
 *  operators second, minutes third — and "$0" never animates at all.
 *  The price not moving is the joke; everything else works for its number.
 *
 *  Mechanics (research-verified against number-flow@0.6.2 dist + barvian's
 *  own guidance, issue #33):
 *  — nights: value STEPPED +1 on an accelerating schedule (first gaps
 *    ≥300ms — numeral recognition blurs under ~250ms), quick 260ms rolls.
 *    Stepping the value manually is the maintainer-endorsed pattern;
 *    `continuous` does NOT visit in-between numbers.
 *  — operators: stepped +1, cadence easing in (slow → fast), landing 21
 *    at ~2.3s. New tens digit spins in from 0 natively.
 *  — minutes: ONE value set 0→90 with the `continuous` plugin and a 3s
 *    spin — unchanged lower digits do full wheel revolutions (true
 *    odometer); stepping 90 values "looks really bad" (#33).
 *  — $0: a plain span. No shadow DOM, nothing that could animate or fail
 *    to paint (the countdown pattern's lesson applied in reverse).
 *  — trend={1} locked everywhere: a re-render can never roll backward,
 *    and `continuous` requires a nonzero trend.
 *
 *  Inverted gating: state initializes to the FINAL values — NumberFlow's
 *  SSR emits a plain fallback span with the real number (crawlers/no-JS/
 *  fetch-and-grep all see "8", "21", "90"), and the client resets to 0
 *  only inside the armed effect. prefers-reduced-motion never arms the
 *  driver at all (NumberFlow would snap each step, but a stepped driver
 *  would still DELAY the final value — reduced motion gets the facts
 *  instantly). One IO on the strip arms all four together — the finish
 *  ORDER is the choreography, so the start must be shared.
 *
 *  Timers are setTimeout chains (the countdown pattern's engine): immune
 *  to rAF starvation, cleaned on unmount, values always land exactly. */

/** Absolute offsets (ms) for stepped stats: value i+1 lands at offsets[i]. */
const NIGHT_STEPS = [0, 340, 640, 890, 1090, 1250, 1380, 1480]; // 8 → ~1.5s
const OPERATOR_STEPS = (() => {
  // 21 steps easing in: intervals shrink 200→55ms, total ≈ 2.25s
  const out: number[] = [];
  let t = 0;
  for (let i = 0; i < 21; i++) {
    const k = i / 20;
    t += Math.round(200 - 145 * k * k);
    out.push(t);
  }
  return out;
})(); // lands 21 at ~2.3s
const MINUTES_SPIN_MS = 3000;

const spinFast = { duration: 260, easing: "ease-out" } as const;
const spinStep = { duration: 190, easing: "ease-out" } as const;

export function SummitStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [nights, setNights] = useState(8);
  const [operators, setOperators] = useState(21);
  const [minutes, setMinutes] = useState(90);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        // shared t0 — the order of the finishes is the whole show
        setNights(0);
        setOperators(0);
        setMinutes(0);
        timers.push(
          ...NIGHT_STEPS.map((ms, i) => setTimeout(() => setNights(i + 1), 60 + ms)),
          ...OPERATOR_STEPS.map((ms, i) => setTimeout(() => setOperators(i + 1), 60 + ms)),
          setTimeout(() => setMinutes(90), 80) // one set; the 3s spin is the animation
        );
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const numeral =
    "text-6xl font-semibold leading-none text-gold [font-variant-numeric:tabular-nums] md:text-[66px]";

  return (
    <div ref={ref} className="mx-auto flex max-w-[1440px] flex-wrap gap-x-14 gap-y-8 px-5 py-16 md:px-20">
      <div>
        {/* data-n mirrors state into light DOM — NumberFlow renders digits in
            shadow DOM and its internals-aria is unreadable to tests; anything
            that must be provable lives in light DOM (countdown pattern law) */}
        <p className={numeral} data-n={nights}>
          <NumberFlow value={nights} trend={1} spinTiming={spinFast} />
        </p>
        <p className="mt-1 text-sm text-cream/70">nights</p>
      </div>
      <div>
        <p className={numeral} data-n={operators}>
          <NumberFlow value={operators} trend={1} suffix="+" spinTiming={spinStep} />
        </p>
        <p className="mt-1 text-sm text-cream/70">operators</p>
      </div>
      <div>
        <p className={numeral} data-n={minutes}>
          <NumberFlow
            value={minutes}
            trend={1}
            plugins={[continuous]}
            spinTiming={{ duration: MINUTES_SPIN_MS, easing: "cubic-bezier(0.23, 1, 0.32, 1)" }}
            format={{ minimumIntegerDigits: 2 }}
          />
        </p>
        <p className="mt-1 text-sm text-cream/70">minutes a night</p>
      </div>
      <div>
        {/* The one that never moves. Plain text was the first choice
            (incapable of animating or failing) but NumberFlow's internal
            mask padding makes plain text sit ~8px high beside its hosts —
            so $0 uses the SAME renderer with animation hard-off
            (animated={false}): baseline parity by construction, and the
            value is a constant so there is nothing to animate anyway. */}
        <p className={numeral}>
          <NumberFlow value={0} prefix="$" animated={false} trend={1} />
        </p>
        <p className="mt-1 text-sm text-cream/70">to attend</p>
      </div>
    </div>
  );
}
