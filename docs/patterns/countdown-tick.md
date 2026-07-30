# Pattern · the countdown that provably ticks

**Shipped:** Jul 30, 2026 — `components/doors-countdown.tsx` + `.cd-roll`
in `app/globals.css` + the "countdown animates down" spec in
`e2e/speaker-wall.spec.ts`. Production worker `82fc73c2`.
**The ask (Derrick):** "stress test the countdown — it is not yet
animating down."

## The finding that matters most

"It doesn't animate" had THREE independent causes stacked, and any fix
that addressed only one would have looked like a failure. This is the
pattern's core lesson — **a rendered animation has three separate axes,
and each one lies independently:**

1. **VALUE** — is the number changing? (state/timer logic)
2. **PAINT** — are the pixels being drawn? (rendering pipeline)
3. **VIEWPORT** — is it where anyone can see it? (layout/fold)

Here: the value ticked only once a MINUTE by design (seconds were gated
behind the final 24h — pre-wow restraint); the first fix attempt made the
value tick per-second but PAINT could silently fail (see NumberFlow
below); and the whole block sat at **y=899 in a 900px viewport** — one
pixel above the fold, animating for nobody. Verify all three axes,
always: textContent changed + pixels in a screenshot + boundingClientRect
meaningfully inside the viewport.

## The recipe that shipped

**Tick engine** (framework-agnostic):
- Display is ALWAYS derived from `target − Date.now()` — never
  accumulated (setInterval drifts; background tabs throttle).
- Re-arm with a self-adjusting `setTimeout(tick, (diff % 1000) + 20)` —
  wakes exactly at the next second boundary, +20ms early-fire guard.
- `tick()` calls `clearTimeout(timer)` FIRST. The visibilitychange resync
  calls tick() directly, and without the clear, every tab-return stacked
  a parallel tick chain (found in this stress test — the bug is silent:
  chains converge on boundaries and just burn timers).
- `visibilitychange → visible → tick()` resyncs instantly after
  throttled-tab drift.
- Terminal state: when diff ≤ 0, stop re-arming and swap to a static
  "doors are open" line with `aria-live="polite"` (announce once). The
  page's server state machine takes over on the next request.

**The roll** (the visible "animating down"):
- Each unit value renders as `<span key={value} className="cd-roll">` —
  the key swap remounts the node each change, replaying a CSS entrance.
- `.cd-roll` animates **transform ONLY**: `from { translateY(0.3em) }`,
  200ms ease-out, under `prefers-reduced-motion: no-preference`.
  **NEVER opacity-from-0 on a keyed span that changes at 1Hz** — that is
  a once-per-second blink, and worse: at any given instant a screenshot
  may catch the digits invisible. Digits must be painted at every
  instant. PRM: no animation → instant text swap (information still
  updates; the value ticking is content, not vestibular motion).

**Two-pass hydration** (Comeau, house standard): server + no-JS render is
the complete static sentence ("doors open aug 10 · 6:30 pm et") — real
content, zero mismatch; the ticking block mounts after hydration.

**WCAG 2.2.2 wiring:** per-second updates are "auto-updating
information" — the page's motion chip must govern them. Implementation:
tick() checks `rootRef.current?.closest("section")?.classList
.contains("ms-paused")` and skips `setNow` while paused (timer keeps
re-arming; resume is derived-correct to the second). `role="timer"` has
implicit `aria-live="off"` so SRs never hear ticks; a fixed `aria-label`
carries the fact; a `sr-only <time>` holds the machine-readable date.

## The NumberFlow disqualification (evidence, not vibes)

First attempt used `@number-flow/react` (already in the bundle via
CountUp) for rolling digits. Probes found `<number-flow-react>` rendering
**zero-height, empty light DOM, null aria-label** in frame-starved
contexts — the digits lived in shadow DOM (opening with a `<style>` tag,
so `textContent` sampling reads CSS, not numbers) and could silently not
paint. Verdicts:
- A COUNTDOWN is an instrument; **digits that can silently fail to paint
  are disqualified**, whatever the animation quality.
- Shadow-DOM digits are invisible to `textContent`-based tests — green
  suites can't see the failure class at all.
- NumberFlow remains fine for DECORATIVE numbers (stat count-ups) where a
  paint failure degrades to nothing-happens; see `stat-count-up.md`.

## Probe pathology (how the diagnosis almost went wrong)

- Headless clips of the timer showed "no digits" AFTER the real fixes —
  because the element sat at the viewport's bottom edge and
  `screenshot({ clip })` cannot extend past the viewport. The clip was
  the liar, not the page. **Before diagnosing paint, check the rect.**
- This box's headless Chromium nondeterministically hard-stalls
  BeginFrame scheduling (0 rAF fires in 3s, no errors) — element
  screenshots, actionability waits, and animation states all lie in
  stalled contexts. **The trustworthy probe is `xvfb-run -a` + headed
  Chromium** (real rendering pipeline), or screencast-frame extraction.
- setTimeout-driven behavior is IMMUNE to the rAF stall — which is why
  the countdown spec samples textContent deterministically while the
  motion specs need force/landed-state discipline.

## The spec that pins it

`e2e/speaker-wall.spec.ts` "countdown animates down every second":
sample `getByRole("timer").textContent`, wait 2.3s, sample again, assert
different; then click the motion chip (force), sample twice, assert
IDENTICAL (frozen); unclick. Value-axis only — paint/viewport axes were
verified manually at ship time (headed screenshot + rect check); if this
ever regresses visually, add a headed smoke.

## Reuse checklist

1. Derive from the clock; boundary-schedule; clear-then-rearm; resync on
   visibility.
2. Keyed-span + transform-only entrance for the roll; PRM = instant swap.
3. Server renders complete static content; tick mounts post-hydration.
4. Wire into the page's pause mechanism (2.2.2 covers auto-updating info).
5. Verify VALUE + PAINT + VIEWPORT as three separate claims.
6. Light-DOM text for anything that must provably render.
