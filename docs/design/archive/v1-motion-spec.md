# Motion spec — Ventriq

Global laws: one orchestrated signature move per page; everything else <300ms; easing `cubic-bezier(0.23,1,0.32,1)` (ease-out); transform/opacity only; exits faster than entrances; nothing bounces; hovers never scale images; countdowns are meta-row text, never billboards. Every effect has a reduced-motion fallback (lines complete, fades instant, marquee static) — already wired via `@media (prefers-reduced-motion: reduce)` in each file.

## Primitives
- **Line draw**: SVG `pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"`, keyframe `to { stroke-dashoffset: 0 }`. Durations: rays 1.1s, H1 underline 0.7s, monogram strokes 1.6s, run-of-show rules 0.6s, 404 line 1.2–1.4s.
- **Tick/marker fade**: opacity-only 0.4s, delayed until after its line lands.
- **Stagger fade**: opacity + translateY(10px), 0.55s, per-element `animation-delay` (hero sequence: eyebrow 0 → H1 beat 1 0.15s → beat 2 0.65s → rule 1.15s → sub lines 1.3/1.5s → CTA 1.7s → meta 1.9s).
- **Scroll gating**: elements render with `animation-play-state: paused`; a rAF loop (or IntersectionObserver in production) flips a state hole to `running` when the section passes ~80% of viewport. Used for: Summit scene, manifesto, FAH run-of-show + tally beats, About monogram.

## Per-page signature moves
- **Home**: hero corridor rays draw with dimension ticks, crosshair last; content staggers behind. Nothing else moves.
- **Summit** (voltage 4–5, three sanctioned moments + the gesture):
  1. Hero beats + underline draw (load)
  2. Ticker marquee — 46s linear infinite, translateX(−50%), duplicate span aria-hidden (the festival gesture)
  3. Corridor-draw scene — rays draw while numerals count 0→8/8/1/2 over 1.1s cubic ease-out; captions land +300/850/1400ms
  4. Manifesto — per-word color dim gold `rgba(201,162,76,0.38)` → cream, driven by scroll progress (word count × progress), 0.35s per-word transition
- **FAH**: tally strokes draw in groups (strokes 95ms apart, groups 480ms apart, strike after 5th); run-of-show rows assemble (rule 0.6s, text +0.35s, rows 350ms apart); tally caption beats +200/750/1300ms. No ticker.
- **About**: monogram draw — ink stroke 0.1s→1.7s, gold stroke 0.8s→2.4s, ticks ~2s, crosshair 2.3s, threshold line 2.5s→3.2s. Only move on the page.
- **Donate/Contact**: hero fades only.
- **404**: line draws, passes ticks, wall tick snaps in at 1.5–1.7s.

## Interactive transitions
- Toggle knob/track: 0.25s transform+background.
- FAQ marker: 45° rotate, 0.25s.
- Hover: background/border color swaps only, no motion.
