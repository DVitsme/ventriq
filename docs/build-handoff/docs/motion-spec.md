# Motion spec

Global laws: one orchestrated signature move per page; one festival gesture max on event pages (Summit = ticker, FAH = tally-draw — never both); everything else <300ms; easing `cubic-bezier(0.23,1,0.32,1)`; transform/opacity only; exits faster than entrances; nothing bounces; hovers never scale images; countdown is meta-row text.

**Primitives**
- Line draw: SVG `pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"` → animate dashoffset to 0. Durations: corridor rays 1.1s (70ms stagger), H1 underline 0.7s, monogram strokes 1.6s, run-of-show rules 0.6s, 404 line 1.2–1.4s. Ticks/crosshair: 0.4s opacity fades after their line (≈750ms+).
- Entrance stagger: opacity + translateY(10px), 0.55s. Summit hero sequence: eyebrow 0 → H1 beat 1 0.15s → beat 2 0.65s → underline draw 1.15s (+tick 1.8s) → sub lines 1.3/1.5s → CTA group 1.7s → meta 1.9s.
- Scroll gating: render animations `paused`, flip to `running` (or trigger the count-up/rAF) when the section passes ~80–85% of viewport; IntersectionObserver in production; fire once.

**Per page**
- Home: hero corridor draw only.
- Summit: ① hero beats + underline (load) ② ticker — 46s linear infinite translateX(−50%), duplicate aria-hidden ③ scene — rays draw while numerals count 0→8/8/90/2 over 1.1s cubic ease-out; caption beats at +300/850/1400ms ④ manifesto — per-word color `rgba(201,162,76,0.38)` → `#F1ECDF`, lit count = scroll progress × word count, 0.35s per-word transition.
- FAH: tally strokes (95ms per stroke, 480ms per group, strike after the 5th); run-of-show assembly; tally caption beats +200/750/1300ms.
- About: monogram draw (ink 0.1→1.7s, gold 0.8→2.4s, ticks ~2s, crosshair 2.3s, threshold 2.5→3.2s).
- Mastermind/Contact/Donate-parked: hero fades only. 404: line → ticks → wall tick at 1.5–1.7s.

**Interactive:** FAQ marker 45° 0.25s · toggle knob 0.25s · hovers = color/border swaps only.

**Reduced motion (`prefers-reduced-motion: reduce`) — required for every item above:** lines render complete, staggers become instant fades, marquee static, count-ups render final values, manifesto renders fully lit. The design-refs implement all of these — mirror them.
