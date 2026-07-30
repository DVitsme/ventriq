# Pattern · choreographed stat count-ups (NumberFlow)

**Shipped:** Jul 30, 2026 — `components/summit-stats.tsx` on /summit,
worker `367c2e1e`. **The ask (Derrick):** count-ups on
"8 nights · 21+ operators · 90 minutes a night · $0" where the viewer can
SEE the early steps ("1 → 2 → 3 nights"), the stats finish in a fixed
order — nights, then operators, then minutes — and **$0 never animates**.

## Design shape

A stat strip is a chord, not four solos: ONE IntersectionObserver on the
strip arms every stat at a shared t0, because the *finish order* is the
choreography. Three mechanisms, chosen per stat:

- **Readable stepping** (nights, 8): drive `value` +1 on a precomputed
  ACCELERATING schedule — `[0, 340, 640, 890, 1090, 1250, 1380, 1480]ms`.
  First gaps ≥300ms because numeral recognition blurs under ~250ms; the
  ask was literally "see it going 1 to 2 to 3", so the beginning is slow
  and the landing accelerates. Rolls per step: `spinTiming
  {duration: 260, easing: 'ease-out'}`. Stepping the value manually is
  the maintainer-endorsed pattern (barvian, number-flow #33).
- **Eased stepping** (operators, 21): +1 steps with intervals shrinking
  200→55ms (sum ≈2.3s) — reads as gathering speed; the new tens digit
  spins in from 0 natively.
- **Odometer spin** (minutes, 90): ONE value set with
  `plugins={[continuous]}` and `spinTiming {duration: 3000}` — continuous
  forces unchanged lower digits into full wheel revolutions (true
  odometer). NEVER step ~90 values one by one ("looks really bad" — #33).
  `format={{minimumIntegerDigits: 2}}` stops the width jump.
- **The unmoved mover** ($0): `animated={false}` on the same renderer.
  Journey worth remembering: plain text was the principled first choice
  (incapable of animating or failing to paint) but sat ~8px high beside
  the flows — NumberFlow's internal mask padding changes the box, and two
  rounds of line-height surgery didn't close it. Same renderer +
  animation hard-off = baseline parity BY CONSTRUCTION. When a static
  item lives inside an animated family, render it with the family's
  renderer and switch the animation off — don't fight metrics.

Locks: `trend={1}` everywhere (re-renders can never roll backward;
`continuous` requires nonzero trend). No `NumberFlowGroup` (it syncs
layout snapshots, not timings — extra measure passes and it would fight
deliberate stagger). Timers are setTimeout chains (countdown pattern's
engine): rAF-stall-immune, cleared on unmount, values always land.

## Inverted gating + PRM

State initializes to the FINAL values. NumberFlow's SSR emits a plain
fallback `<span>` with the real number in light DOM — crawlers, no-JS,
and fetch-then-grep all see "8"/"21"/"90" — and the client resets to 0
only inside the armed effect (hydration-safe by design:
`dangerouslySetInnerHTML: ''` + suppressHydrationWarning, React never
diffs it). `prefers-reduced-motion` NEVER ARMS THE DRIVER — NumberFlow
would snap each step anyway, but a stepped driver still *delays* the
final value; reduced motion gets the facts instantly. That's the rule:
under PRM, kill the *driver*, not just the animation.

## Verification laws learned (the expensive part)

1. **NumberFlow's aria lives in ElementInternals — nothing outside can
   read it.** `el.ariaLabel` is null; even Playwright's
   `toHaveAccessibleName` came back empty on this box. If a test needs
   the value, MIRROR IT INTO LIGHT DOM yourself: `data-n={value}` on the
   wrapping element, synchronous with React state. (Countdown pattern's
   law again: anything that must be provable lives in light DOM.)
2. **IO arming is frame-dependent** — a stalled headless context may
   never deliver the IntersectionObserver callback, so the strip stays at
   its SSR finals. That is a legitimate world (inverted gating's base
   state), so the spec accepts BOTH: if the mid-flight sample shows
   finals already, skip the order assertions; if it shows mid-count
   values, verify the order. Never write a spec that requires the
   animation to have run.
3. Choreography is assertable through the stepped drivers only — the
   odometer stat's VALUE lands at arm time (its 3s spin is visual), so
   finish-order proofs ride the stepped stats; the spin's visual end is
   verified by headed capture (xvfb-run), not by spec.

## Dependency note

`continuous` imports from `number-flow/plugins`, which is NOT reachable
transitively under pnpm — `pnpm add number-flow@<exact version matching
@number-flow/react's dep>` so it dedupes to the same instance.

## Production evidence (Jul 30)

Headed sample log, values per 450ms after arming:
`8,21,90 → 2,2,90 → 4,5,90 → 8,8,90 → 8,10,90 → 8,15,90 → 8,20,90 →
8,21,90` — nights lands ~1.5s, operators ~3.1s wall-observed, minutes'
wheel spins to ~3.1s, $0 constant. First sample = pre-arm SSR finals
(the base state, visible for one frame before reset — below the fold,
invisible in practice).

## Reuse checklist

1. One IO, shared t0; finish ORDER is the design.
2. Pick per-stat mechanism: readable steps (≤10 values, gaps ≥300ms
   early) · eased steps (teens–low hundreds) · continuous odometer
   (large ranges) · animated={false} (the stat that must not move).
3. trend locked; no NumberFlowGroup; setTimeout drivers; clear on
   unmount.
4. SSR finals + reset-in-effect; PRM never arms.
5. data-n mirrors for testability; specs tolerate the never-armed world.
