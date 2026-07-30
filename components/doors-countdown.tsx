"use client";

import { useEffect, useState } from "react";

/** The countdown the Jul 23 call asked for ("I want this to count down") —
 *  repairing the orphaned "doors open in" label that shipped with a static
 *  date under it. Spec + sources: docs/plans/summit-aug-1/06-phase-5-research.md §5.
 *
 *  Drafting register, not Eventbrite: a single line of tabular-numeral type
 *  (Space Grotesk ships `tnum`), unit letters as small gold small-caps
 *  suffixes — a countdown as annotation, like a dimension string. No digit
 *  tiles (refusal list), no per-digit animation.
 *
 *  Hydration-safe by design: the server (and no-JS) render is the complete
 *  static sentence "doors open aug 10 · 6:30 pm et" — real content, identical
 *  pre-hydration, so no mismatch and no suppressHydrationWarning. The ticking
 *  line mounts after hydration (Comeau two-pass).
 *
 *  Tick discipline: display is always derived from target − Date.now() (never
 *  accumulated — setInterval drifts and background tabs throttle), scheduled
 *  by a self-adjusting setTimeout to the next minute boundary (second
 *  boundary inside the final 24h), resynced instantly on visibilitychange.
 *
 *  A11y — the quiet pattern: role="timer" has implicit aria-live="off", so
 *  screen readers never hear ticks; aria-label carries the fact; a static
 *  <time> is always in the DOM. WCAG 2.2.2 churn stays trivial at minute
 *  granularity. Informational only — real date, free event, no urgency
 *  adjectives (house no-fake-scarcity law).
 *
 *  The wider pre/live/between/post state machine belongs to lib/calendar's
 *  eventPhase(), which owns the hero. This component only lives inside the
 *  pre-event hero; if a visitor sits across the 6:30 PM boundary it swaps to
 *  a "doors are open" line until the next server render catches up. */

// Aug 10 2026, 6:30 PM ET — matches the Event JSON-LD startDate exactly.
const TARGET_MS = Date.parse("2026-08-10T18:30:00-04:00");
const DAY_MS = 86_400_000;

function remaining(now: number) {
  const diff = Math.max(0, TARGET_MS - now);
  return {
    diff,
    d: Math.floor(diff / DAY_MS),
    h: Math.floor((diff % DAY_MS) / 3_600_000),
    m: Math.floor((diff % 3_600_000) / 60_000),
    s: Math.floor((diff % 60_000) / 1000),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function DoorsCountdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const t = Date.now();
      setNow(t);
      const { diff } = remaining(t);
      if (diff <= 0) return; // terminal — line swaps below, no more ticks
      // Wake exactly at the next boundary: seconds inside the final 24h,
      // minutes before that. +20ms guard against early timer fire.
      const unit = diff <= DAY_MS ? 1000 : 60_000;
      timer = setTimeout(tick, (diff % unit) + 20);
    };
    // First tick is deferred a frame — the mount swap is not synchronous
    // inside the effect body (react-hooks/set-state-in-effect).
    timer = setTimeout(tick, 0);
    const resync = () => document.visibilityState === "visible" && tick();
    document.addEventListener("visibilitychange", resync);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", resync);
    };
  }, []);

  // Server + no-JS + pre-hydration: the complete static sentence.
  if (now === null) {
    return (
      <p className="mt-8 text-sm tracking-[0.1em] text-cream/60 [font-variant:small-caps]">
        doors open <time dateTime="2026-08-10T18:30:00-04:00">aug 10 · 6:30 pm et</time>
      </p>
    );
  }

  const { diff, d, h, m, s } = remaining(now);

  if (diff <= 0) {
    // Sat across the boundary — the hero's server state machine takes over on
    // the next request; announce the flip once, politely.
    return (
      <p aria-live="polite" className="mt-8 text-sm tracking-[0.1em] text-gold [font-variant:small-caps]">
        doors are open — tonight · 6:30–8:00 pm et
      </p>
    );
  }

  const finalDay = diff <= DAY_MS;
  return (
    <div className="mt-8">
      <p className="text-sm tracking-[0.1em] text-cream/60 [font-variant:small-caps]">doors open in</p>
      <p
        role="timer"
        aria-atomic="true"
        aria-label="Doors open August 10 at 6:30 PM Eastern"
        className="mt-1 text-xl tracking-[0.12em] text-cream/90 [font-variant-numeric:tabular-nums] md:text-2xl"
      >
        {!finalDay && <Unit v={pad(d)} u="d" />}
        <Unit v={pad(h)} u="h" />
        <Unit v={pad(m)} u="m" />
        {finalDay && <Unit v={pad(s)} u="s" />}
      </p>
      <span className="sr-only">
        <time dateTime="2026-08-10T18:30:00-04:00">August 10, 2026, 6:30 PM Eastern Time</time>
      </span>
    </div>
  );
}

function Unit({ v, u }: { v: string; u: string }) {
  return (
    <span className="mr-3 last:mr-0">
      {v}
      <span aria-hidden className="ml-0.5 align-[0.35em] text-[0.55em] tracking-[0.18em] text-gold [font-variant:small-caps]">
        {u}
      </span>
      <span className="sr-only">{{ d: " days ", h: " hours ", m: " minutes ", s: " seconds " }[u]}</span>
    </span>
  );
}
