"use client";

import { useEffect, useRef, useState } from "react";

/** The countdown the Jul 23 call asked for ("I want this to count down") —
 *  and, since Jul 30, VISIBLY counting: Derrick's stress-test note ("it is
 *  not yet animating down") retired the original minute-granularity
 *  restraint. Seconds are always on; each changing value slides up into
 *  place (a keyed span + one CSS entrance — .cd-roll in globals). Rolling
 *  is HAND-ROLLED, not NumberFlow: in the Jul 30 stress test the
 *  number-flow-react custom element rendered ZERO-HEIGHT with an empty
 *  light DOM and null aria-label in frame-starved contexts — digits that
 *  can silently not paint are disqualified from a countdown. Light-DOM
 *  text always paints, tests can read it, and PRM gets the instant swap
 *  via the media query on the animation. Still the drafting register:
 *  tabular numerals, gold unit suffixes, no digit tiles.
 *
 *  Hydration-safe by design: the server (and no-JS) render is the complete
 *  static sentence "doors open aug 10 · 6:30 pm et" — real content, identical
 *  pre-hydration, so no mismatch. The ticking line mounts after hydration
 *  (Comeau two-pass).
 *
 *  Tick discipline: display is always derived from target − Date.now() (never
 *  accumulated), re-armed by a self-adjusting setTimeout to the next second
 *  boundary, resynced on visibilitychange. tick() clears any pending timer
 *  first — the old resync path could stack parallel tick chains, one per
 *  tab return (found in the Jul 30 stress test).
 *
 *  WCAG 2.2.2: per-second updates are auto-updating information, so the
 *  hero's motion chip governs this too — while the section carries
 *  .ms-paused, ticks skip (display freezes; resumes derived-correct).
 *  role="timer" keeps implicit aria-live="off" — screen readers never hear
 *  ticks; the aria-label carries the fact. Informational only — real date,
 *  free event, no urgency adjectives (house no-fake-scarcity law). */

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

export function DoorsCountdown() {
  const [now, setNow] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      clearTimeout(timer); // resync must never stack a second chain
      const t = Date.now();
      const paused = rootRef.current?.closest("section")?.classList.contains("ms-paused");
      if (!paused) setNow(t);
      const { diff } = remaining(t);
      if (diff <= 0) return; // terminal — line swaps below, no more ticks
      // Wake exactly at the next second boundary (+20ms early-fire guard).
      timer = setTimeout(tick, (diff % 1000) + 20);
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

  return (
    <div className="mt-8" ref={rootRef}>
      <p className="text-sm tracking-[0.1em] text-cream/60 [font-variant:small-caps]">doors open in</p>
      <p
        role="timer"
        aria-atomic="true"
        aria-label="Doors open August 10 at 6:30 PM Eastern"
        className="mt-1 text-xl tracking-[0.12em] text-cream/90 [font-variant-numeric:tabular-nums] md:text-2xl"
      >
        <Unit v={d} u="d" />
        <Unit v={h} u="h" />
        <Unit v={m} u="m" />
        <Unit v={s} u="s" />
      </p>
      <span className="sr-only">
        <time dateTime="2026-08-10T18:30:00-04:00">August 10, 2026, 6:30 PM Eastern Time</time>
      </span>
    </div>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

function Unit({ v, u }: { v: number; u: string }) {
  return (
    <span className="mr-3 last:mr-0">
      {/* key swaps the node each change → the .cd-roll entrance replays */}
      <span key={v} className="cd-roll inline-block">{pad(v)}</span>
      <span aria-hidden className="ml-0.5 align-[0.35em] text-[0.55em] tracking-[0.18em] text-gold [font-variant:small-caps]">
        {u}
      </span>
      <span className="sr-only">{{ d: " days ", h: " hours ", m: " minutes ", s: " seconds " }[u]}</span>
    </span>
  );
}
