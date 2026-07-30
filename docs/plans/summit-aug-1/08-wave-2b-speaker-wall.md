# Wave 2b — the Summit hero: "The Speaker Wall" (pinned plates)

**Mandate (Derrick, Jul 30):** summit hero joins the Master Sheet SYSTEM but
swaps subject — not geometry: the SPEAKERS, with load-in → ambient idle →
mouse-hover response. Restrictions waived again; 7 research agents
(strategy · interaction · composition · repo · a11y/perf · art direction ·
GSAP lab with tested numbers).

## Concept

Eight duotone speaker plates pinned to the drafting sheet beside the
conversion copy — *the operators' room, Blue Note register*. Hero answers
WHO in one glance (the "one face per night" logic); the flip roster below
keeps WHY (bios/sessions — different subset, different verb, no
duplication). Names hidden until hover EXCEPT the featured plate (the
contact sheet's circled select): Darren Willoughby at 1.35×, caption at
rest, **dashed gold leader that solidifies as his portrait develops** —
dashed=planned/solid=built, applied to people. The signature.

**The 8:** Willoughby S-02 (featured, host) · Shaw S-06 (host) · Harcum
S-09 (host) · Tyler S-12 (host) · Bethea S-04 · Bradley S-05 · Peele S-14 ·
Robertson S-03. Margo Burr EXCLUDED pending the Burr/Burley confirm;
Wagner/Taylor excluded (no titles). Host metas use verbatim `role` strings
(no invented dates). Caption grammar: name 18px SG600 sentence case cream ·
credential 13px gold · role line small-caps.

## Laws (research-derived, binding)

- Art direction: rotation 0° always · no plate overlap · two sizes only
  (1× + featured 1.35×) · corner registration ticks + cream/13 hairline,
  never full ticked borders · gold-toned develop, NEVER full color
  (veil .25→.10, gold color-blend layer 0→.16, brightness one-shot) ·
  captions below plate · plates layer above hero linework.
- Strategy: gazes composed inward (mirror flag per plate where needed) ·
  names hover-only (featured excepted) · ZERO auto-rotation · one filled
  CTA (no new links — subnav already covers #speakers).
- A11y (per spec): entire wall in ONE aria-hidden wrapper, alt="" all,
  ZERO focusables inside — plates are inert decoration · chips real text
  ≥4.5:1, visibility-parked (axe skips), within plate footprint (1.4.13
  exception) · idle drift ≤12px @ ≥6s, hover lift ≤8px, NO depth-layered
  parallax drift, no scale · LCP containment BY AREA per breakpoint
  (featured 228×285 < H1 rect; mobile strip 96×120 << H1) · eager, no
  fetchpriority=high, width/height reserved · 2.2.2 via the chip (shared
  `vq-motion` key — pausing one hero pauses both).
- GSAP lab numbers (tested): proximity smoothstep R=260 push=12 toward
  cursor, lag 0.35–0.62s by plate width, write-gated CSS-var warmth ·
  freeze-never-zero on focus + d>1.4R janitor · idle lissajous coprime
  8.9–19.3s, ±3–5px, rot ±0.4° wrapper-only top-4 only,
  will-change:transform mandatory · load-in random stagger each 0.07
  (0.62s power2.out y14→0) + TRANSIENT filter develop w/ clearProps ·
  hover frame = SVG rect pathLength dashoffset draw 0.4s · NO steady-state
  CSS filters — duotone BAKED into hero thumbs (public/speakers/hero/,
  384×480 q72 grayscale+contrast, 155KB/16, ~105KB for 8 vs 250KB fence).
- PRM show (opacity/color only): entrance opacity+develop random stagger,
  idle = one-plate gold-glow breathe (4.6s cycle, shuffled, 5.2–7.5s
  gaps), hover = frame FADES + develop + neighbor dim, no lift/nudge.
  Watchdogs 8s/6s. Phases: wall mounts section-level, phase-agnostic
  (live/between/post keep it; copy machine untouched).

## Contract

- `components/hero/speaker-wall.tsx` (server): aria-hidden field, 8 plates
  (drift-wrapper > card > photo[img+veil+warm+frame+S-NN] + caption),
  featured leader SVG, scaffold hairline + "sht 02" stamp. Desktop:
  md:absolute via --swx/--swy vars, right 52% field, copy exclusion zone
  absolute. Mobile: flex row overflow-x strip below copy (no rotation,
  captions via tap-develop).
- `components/hero/wall-driver.tsx` (client): gates/chip (same classes,
  same `vq-motion` key, `.ms-paused` class contract), matchMedia twins per
  the numbers above, pointer field + per-plate focus, click/tap develop
  toggle for touch, IO+visibility, watchdogs, alive-flags.
- `app/summit/page.tsx`: Rays() retired → SpeakerWall + WallDriver;
  copy/phases/sentinel/countdown/meta untouched.
- Specs: `e2e/speaker-wall.spec.ts` (desktop chip+hover-state, PRM
  completeness, mobile strip) + **speaker-flip.spec.ts firstPhotoCard
  scoped to `#speakers`** (hero plates would steal `.first()`).
- Fences: images 8×~13KB ≈ 105KB ✓ under 250KB; script = GSAP chunk shared
  with home ✓ under 440KB. No fence changes expected — verify at gate.
