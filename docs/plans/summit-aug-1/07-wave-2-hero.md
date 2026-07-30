# Wave 2 — "The Master Sheet" hero (the site's wow)

**Mandate (Derrick, Jul 30):** the hero is the site's biggest wow — grandeur,
universally impressive, >5s before looping, full redesign allowed,
performance budgets waived for the hero ("I do not care about past rules or
constraints"). Export-for-social requirement dropped. Research: 9 agents
(award patterns · line-art grandeur · CSS ceiling · JS libs · WebGL ·
choreography · a11y · repo intel · event energy), synthesized Jul 30.

**O24 (Derrick, Jul 30): hero constraint waiver, applied minimally.** The
build needs NO video and NO WebGL, so `media:size = 0` stands untouched. The
only fence change: home `script:size` 380KB → **430KB** (GSAP core+DrawSVG
~37KB gz + driver) and `total:size` 600KB → 650KB. AGENTS.md amended. The
voltage map (home 2–3/10) is consciously amended: this hero IS home's one
festival gesture.

## The concept

One enormous technical drawing, cropped off every edge, drafting "the way
in" while you watch. The approved corridor rays become a full perspective
scene: a **monumental drafted threshold** (the ConvergenceDiagram's doorway
motif, scaled up) standing at the vanishing point; a **survey grid** receding
to it (vastness); **isolines + camouflaged survey glyphs** in the upper field
at 3–8% opacity that only light finds — the H1 argued in motion ("The
resources are out there. They're just camouflaged."). Dashed construction
lines **solidify** (dashed = planned, solid = built). Dimension labels cycle
the honest stats (8 NIGHTS · 21 SPEAKERS · 90 MIN · $0). A **live T-minus
readout** in the title block ticks real seconds — clock-driven motion never
loops (GitHub-globe strategy). Rare **forge-strike** beats: a junction
hammered — concentric dashed shockwave + 4–8 dash-fragment sparks cooling
burnt-orange → gold → cream. Heat is data, not weather.

**Research laws baked in:** grandeur = few lines + huge cropped subject +
slow constant-velocity draws (machine-inevitable, Westworld/Foundation
register) · one establishing move ≤4.5s, ambient ≥90% · coprime ambient
periods (11/17/23/37/53s) + randomized 8–16s moment windows + clock core =
no perceivable loop · motion contrast (mostly-still scene, one traveling
light) · orange <5% of frame, glow = layered strokes never bloom · no
bounce easing, no glassmorphism, no particle soup, no gradient blobs.
Atmosphere uses the design system's sanctioned carve-out: "atmospheric gold
light on midnight (radial, subtle, masked)" — implemented as
`plus-lighter` radial layers animated by TRANSFORM only (compositor; the
gold-on-midnight secret from the CSS research).

## Beat sheet (master)

- 0.00–0.15 gold point ignites at the vanishing point
- 0.15–1.4 corridor hairlines draw outward, constant velocity; ruler ticks
  stamp behind (60ms stagger)
- 1.4–2.8 the threshold drafts: jambs → lintel → threshold line, dashed;
  perspective grid draws to the vp
- 2.8–3.6 SOLIDIFY: dashed construction → solid gold (the plan becomes
  real); dimension ticks + callouts stamp; title block types in
- 3.6–4.4 one 800ms light sweep travels the corridor into the vp; scene
  settles to ambient. (Copy column runs its existing vq-in rises in
  parallel — text never gated on the scene.)
- AMBIENT: pen-light glint on the rays (two-copy dash trick, 17s) · grid
  drift 53s · isoline morph 37s (opacity crossfade between two states) ·
  vp atmosphere breathing 11s (transform scale on plus-lighter layer) ·
  T-minus seconds tick (real clock) · minute-boundary meta brighten 300ms
- MOMENTS (randomized 8–16s windows, never same beat): one construction
  line re-drafts (900ms) · dimension label cycles next fact · 40% sweep
  every ~31s (cycle ≥2s — 2.3.1-safe)
- STRIKE every ~50s and on CTA hover (throttled ≥20s): junction shockwave
  (3 concentric dashed circles draw out) + 4–8 spark fragments on tangent
  paths, 900ms decay, stroke cools orange→gold→cream over 1.5s
- POINTER (fine pointers): 3-plane parallax on HTML wrappers (±6/±12/∓3px,
  GSAP quickTo springs ~100/20) · surveyor's lens: 220px masked radial
  that lifts the camouflage layer to ~35% inside it, 600ms decay memory ·
  CTA magnetic ≤8px · click = small spark burst
- MOBILE: detail layer hidden (path count halved), no lens, tap = spark,
  entrance kept in full
- LOOP SEAM: none — periodic layers phase-offset on coprime periods; core
  is clock-true

## A11y spec (from the compliance research — non-waivable)

- Pause chip IN the hero: real `<button>`, instrument-styled (small-caps
  "motion" + state), `aria-pressed`, ≥3:1 on midnight, visible without
  hover, early in hero tab order. Action = `gsap.globalTimeline.paused()`
  + CSS class freeze for the pure-CSS layers. Pause-and-resume from point.
- Persist in `localStorage` (`vq-motion`), reflect as
  `data-vq-motion="off"` on `<html>` pre-hydration via inline snippet? NO —
  no inline scripts (CSP); read in driver on mount, apply before first
  ambient tick (entrance may run once; acceptable — persistence is SHOULD).
- PRM (amended Jul 30, Derrick: "make it work on reduced motion machines"):
  a FULL PARALLEL SHOW in the vestibular-safe classes only — opacity +
  color. Exposure entrance (rays → field → dashed plan → crossfade into
  the built → details), in-place ray warmth on offset ≥3.5s cycles (never
  ordered neighbors — phi motion), glyph develops in RANDOM stagger,
  sweeps become in-place light swells, strikes become whole-gate
  orange→gold color cools, facts still cycle (opacity floored at 0.7 — axe
  scans forever under the reduce project and mid-fade text below AA is a
  real flake), lens still reveals. No translation/rotation/parallax/draw-
  travel/spark-flight anywhere in the branch. Chip pauses it all; live
  matchMedia reaction; 6s watchdog.
- 2.3.1: every luminance cycle ≥2s; sweeps never flash; sparks are tiny
  area, sub-1s single events, not repeating at 3+/s.
- Delta-time only (GSAP ticker). Pause on `visibilitychange` hidden + IO
  when hero <15% visible. Canvas: none. All decorative text that fails AA
  = CSS `content: attr(data-*)` (axe walks aria-hidden text — house rule).
- Light layers masked away from the copy column: a `mask-image` cutout
  keeps every frame's text contrast AA (axe audits mid-flight — infinite
  animations run through the scan).
- No-JS: the server-rendered scene IS the finished sheet (base state =
  drawn, per the inverted-gating law); driver only adds life.
- Print: hide atmosphere/driver layers.

## Component contract

- `components/hero/master-sheet.tsx` — server component. The full SVG
  scene, parametric (rays/grid/isolines via map()). Class API for the
  driver: `.ms-ray`, `.ms-ray-hot` (glint copy), `.ms-grid`, `.ms-iso`,
  `.ms-struct` (threshold paths), `.ms-dashed` (construction),
  `.ms-callout`, `.ms-glyph` (camouflage, content:attr), `.ms-tick`,
  `.ms-plane-[abc]` (parallax wrappers, HTML divs), `.ms-atmo-[12]`
  (plus-lighter layers), `.ms-lens`, `#ms-title-block`, `#ms-tminus`.
  Base state: FULLY DRAWN (no-JS/PRM complete).
- `components/hero/hero-driver.tsx` — "use client". GSAP core + DrawSVG.
  On mount under no-preference: set entrance .from() states before paint
  (useGSAP layout timing), run master timeline, ambient children with
  `.time(n)` phase seeds, moment scheduler (gsap.delayedCall chains w/
  random windows), pointer quickTo handlers, strike routine, clock tick,
  IO + visibility pause, pause-chip state + localStorage. Renders only the
  chip + lens div.
- `app/page.tsx` — hero section becomes: atmosphere layers + 3 parallax
  plane wrappers hosting `<MasterSheet/>` + existing copy column
  (untouched law) + `<HeroDriver/>`. CorridorRays retired (geometry
  absorbed). `isolation: isolate` on the section (plus-lighter contract;
  also — blend layers as SIBLINGS of any 3D/transform rigs, never inside).
- Summit hero: NOT in this pass. The field is componentized so the summit
  can adopt post-verification (G1 "one system" satisfied by extraction,
  applied incrementally).

## Gates & verification

- tsc, lint, full e2e on 8787 (46/8 baseline + new `hero-motion.spec.ts`:
  chip toggles pause + aria-pressed, PRM = no transform motion + breathing
  only, localStorage persists, h1 count 1, no-JS scene completeness via
  request-blocked context) — axe suite must stay 100 with the scene
  running mid-flight.
- Local Lighthouse: record home script/total/LCP/TBT/CLS actuals; set O24
  fences to measured + headroom, never blind.
- Deploy → fetch-once verify → Playwright PRODUCTION capture: stills at
  entrance beats + 60s ambient WEBM (record_video) for Derrick, plus
  hover/lens/strike/pause-chip evidence, PRM state, mobile 390px.

## Research provenance (agent reports, Jul 30)

Award patterns: layered field+input+type is the SOTY formula; avoid glow/
particle/ASCII clichés. Line grandeur: Westworld/Foundation register;
dashed→solid semantics; two-copy glint; 8/20/100% depth planes. CSS
ceiling: plus-lighter + transform = compositor light; stroke ceiling
~200–500 concurrent, stagger keeps hot set ~50; userSpaceOnUse for
axis-aligned gradient strokes; SVG filters only tiny regions; camera moves
on HTML wrappers. Library: GSAP 3.15 free (DrawSVG incl.), ~37KB, global
pause one-liner, useGSAP layout-timing, SSR-safe here. WebGL: not needed —
its four exclusives (mass particles, HDR bloom, trails, endless noise) are
not in this concept. Choreography: entrance ≤4.5s; coprime periods;
randomized windows; 3–4 parallax layers max; skip gyro. A11y: pause chip
per Apple pattern; PRM = designed alternative; ≥2s luminance cycles.
Event energy: honest stat wall as dimensions; countdown as drumbeat;
lifecycle states (post-summit act = future pass). Repo: gradients
sanctioned via "atmospheric gold light" carve-out; glow/bounce/blob
refusals stand; copy law strings; axe walks aria-hidden text.
