# Phase 5 research — eight-agent sweep, Jul 29 2026

**What this is:** distilled findings from eight parallel research agents,
commissioned before building Phase 5 (`05-phase-5-tier-4.md`) + the speaker
flip. Agents 1–5 = craft research (flip, speaker sections, entrance systems,
sticky chrome + countdown, ambient hero motion). Agents 6–8 = risk verification
(production perf baseline, Skool/Luma/Kit platform truths, event rich-results +
launch readiness). Full agent outputs are not preserved — this file IS the
record; sources are kept inline.

**Status: filling in as agents report.** Sections marked ⏳ are still running.

---

## §1 · The flip — what Justin meant (settled before research)

On the **summit speaker cards**: click → the card itself turns over — front is
the speaker, back is the bio — replacing Derrick's original pop-up plan from
the 9:40 walkthrough. Justin: *"the flip would go crazy."* Pinned to the
speaker surface by Fathom's action item (*"add speaker cards; build flip
modals"*) and the mobile check opening with *"Speaker, click."* Attribution
detangled and recorded in the design brief §12.3 (updated Jul 29). The stakes:
this is the section Justin called *"by far one of my favorite parts"* — the
cards are for the speakers as much as the audience.

---

## §2 · Entrance animation system — VERDICT: keep CSS+IO ✅ (agent 3, landed)

**Keep the CSS + IntersectionObserver system exactly as designed.** Three
load-bearing reasons, all sourced:

1. **Scroll-driven animations are the wrong domain for entrances.**
   `animation-timeline: view()` is *scrubbed* (progress-domain): entrances
   reverse when scrolling up, and time-based staggers (`--vqd`) don't exist —
   they'd have to be re-expressed as scroll-space offsets. Our one-shot
   editorial entrances are time-domain. Wrong tool.
2. **Support gap:** SDA is Chrome 115+ / Safari 26.0+ (threaded in 26.4) but
   **Firefox not until ~156 (~fall 2026), Firefox Android indefinite** —
   ~83.7% coverage vs IO's 100%. (caniuse; WebKit blog 17333/17862; Bugzilla
   1817303. Beware SEO blogs claiming "Safari 18/FF 132" — that's View
   Transitions, conflated.)
3. **Our e2e gate breaks under SDA.** `settleAnimations()` finishes
   document-timeline animations; scroll-linked animations have no finite time
   endpoint — headless scans would capture arbitrary mid-scrub states. IO+class
   is deterministic in headless.

**One optional SDA adoption, post-launch:** the `ScrollLit` word-lighting is
exactly a scrubbed effect and today costs main-thread JS per scroll frame.
Rebuilt as `@supports (animation-timeline: view())`-gated CSS it becomes
zero-JS (Motion's perf tier list: SDA+compositor = S-tier, manual scroll
reading = D-tier). Caveat: `color` isn't Safari-threaded-eligible — the full-
compositor version animates opacity of an overlaid cream text layer. Firefox
keeps the JS path until 156. **Not a launch item.**

**View Transitions API:** Baseline since Oct 2025, but overkill for a flip
(one 3D transform + class toggle vs snapshot-and-morph machinery that freezes
interactivity). Earns its place only if a speaker-grid *filter/reorder* ever
ships (`match-element` = free FLIP). Skip for now.

**Library calculus 2026: skipping `motion` is still right.** Its own author's
tier list concedes plain CSS compositor animations hit the same S-tier;
libraries earn bytes for springs/gestures/FLIP — none used by one-shot
entrances. Both post-decision platform changes (VT Baseline, SDA two-engine)
push *further* toward platform CSS.

### The speaker-grid entrance recipe (concrete numbers, sourced)

Emil Kowalski's published numbers (skill file + "Great Animations"): stagger
30–80ms, entrances ≤500ms for large surfaces, start `scale(0.95–0.97)` +
opacity 0, `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, never ease-in. Rauno:
≤200ms for *interactions*; `will-change` only while animating.

```css
.vq-card { opacity: 1; }                    /* visible by default — gate holds */
[data-inview] .vq-card {
  animation: vq-card-in 420ms cubic-bezier(0.23, 1, 0.32, 1) both;
  animation-delay: var(--vqd, 0ms);
}
@keyframes vq-card-in { from { opacity: 0; transform: translateY(14px) scale(0.98); } }
```

- **420ms** duration · **60ms** stagger step · **cap the stagger index at 6**
  (`min(i,6) × 60ms`) so a 29-card future grid settles in <800ms
- **Diagonal wave** (`(row+col) × 50ms`) reads more authored than linear index
  if the grid is the page's hero moment
- Rise **12–16px** max; drop the `scale` if photo cards shimmer
- **Reduced motion:** 160ms opacity-only or nothing — parity free since
  content is visible by default

### Template tells to keep refusing (2025–26 discourse, sourced)

1. Uniform fade-up on every section (NN/g measured user impatience; "the
   sameness is the math" — Becker)
2. Scrolljacking (NN/g: majority disorientation, worst on mobile)
3. Blur-in text reveals (Framer-template signature + Safari perf tax)
4. Parallax gradient blobs / radial glow (the named AI-slop fingerprint)
5. Syrup staggers — 150ms+ steps, 600ms+ entrances, ease-in-out on entrances

Ventriq's existing vocabulary (line draws, wipes, hairline rules) is on the
authored side of every one of these. One a11y note for any future text-split
effect: keep the accessible name intact (aria-hidden spans + visually-hidden
full string).

### INP/CLS discipline for the new work

- Transform/opacity (+ clip-path) only; animating CSS *variables* is
  paint-territory — static `--vqd` reads are fine
- ⚠️ **Never entrance-animate the LCP element from opacity 0 — LCP isn't
  recorded until it paints visibly.** Our hero H1s run `vq-in` from opacity 0.
  **Cross-check against agent 6's LCP-element findings** — if PSI names the
  hero H1 as LCP, our own entrance is taxing LCP and the fix (exempt the H1,
  animate everything around it) is cheap.
- `content-visibility: auto` + `contain-intrinsic-size: auto 800px` on
  below-fold sections is a direct INP win; plays fine with IO
- IO tuning: `threshold: 0.15`, `rootMargin: '0px 0px -10% 0px'`, one-shot
  unobserve, class-toggle-only callback

---

## §3 · Flip-card craft ✅ (agent 1, landed) — the build spec

**Verdict: buildable today, CSS-only, on the current five text cards.** The
craft evidence (Stripe Press's 3D books, Vercel's conference ticket) says 3D
rotation reads premium **when the object plausibly has a back** — and a
drafting sheet with notes on the reverse is native to the blueprint identity.
The pattern's mass-market association is widget kitsch (Webflow/HubSpot "team
flip cards"); the escape is restraint: **single axis, no bounce, ~500ms, a
hairline chip as the trigger.** Notable: Figma Config *doesn't* flip — it links
to URL-addressable bios; we accept the deep-link loss because our bios are
2–3-line proof points, not SEO content, and the flip is the client's explicit
choice.

### Anatomy (the portable contract)

- Per-card `.scene` with **`perspective: 1000px` on each card** (a shared grid
  ancestor makes off-center cards flip skewed toward one vanishing point)
- `.faces` wrapper: `transform-style: preserve-3d`, `transition: transform
  500ms` — the ONLY animated property
- Two faces stacked via **`grid-area: 1/1`** (never absolute positioning — the
  card must size to the *taller* face; Smashing/Halliday), both
  `backface-visibility: hidden`, front **explicitly `rotateY(0deg)`**
  (Firefox bug 1201471), back pre-rotated `rotateY(180deg)`
- **The 2px radius lives on the faces, not the wrapper** — see gotcha 1
- One persistent **`<button>` OUTSIDE `.faces`** (gold hairline chip, bottom
  edge, ≥44px target, labeled **"Bio" → "Back"**) — focus never unmounts
  mid-flip. Never the whole card as button (an `<h3>` inside a button stops
  being a heading — Roselli; and backs will grow links once bios mature)
- Mid-flip: bump the card's `z-index` (perspective projects corners outside
  the box over neighbors), remove on `transitionend`
- Interruption is free — CSS transitions retarget natively on re-click

### The three gotchas (each otherwise a lost day, all sourced)

1. **Grouping properties silently flatten `preserve-3d` in ALL engines** —
   `overflow` ≠ visible, `opacity < 1`, `filter`, `clip-path`, `mask`,
   `mix-blend-mode`, `contain: paint`, `content-visibility` on the 3D wrapper
   kill the flip (MDN transform-style grouping list; Ana Tudor). Most "Safari
   broke my flip" reports are this. ⚠️ **Cross-ref §2:** the
   `content-visibility: auto` INP win must stay OFF the speaker section's 3D
   subtree.
2. **`backface-visibility` is visual-only** — the rotated-away face stays in
   the accessibility tree AND tab order in every engine. Hide it for real:
   **`display: none` on `transitionend`** (both faces visible only during the
   rotation window). Without this, screen readers read both sides and keyboard
   users tab into the void. (Vispero/Edwards 2025; Scott O'Hara.)
3. **The blur/flicker cluster:** no `scale` anywhere in the flip (scale
   triggers rasterization blur — Chrome sample; WebKit 119259); land on exact
   0°/180° at integer pixel geometry; `will-change` just-in-time
   (pointerenter/focusin) and removed on `transitionend`; if iOS flickers at
   flip start, add `backface-visibility: hidden` to the faces' *child* blocks
   too (pixeldock); **iOS is the QA-first target** (compositing regressions
   still being triaged in iOS 26 betas). Bonus: cream-on-midnight already gets
   grayscale AA, so the "thin gray transformed text" tell mostly can't happen
   here.

### ARIA wiring (decision + flagged fork)

**Use disclosure semantics:** real `<button>`, `aria-expanded="false|true"`,
`aria-controls` to the back-face id (optional, sparse AT support), visible
label swaps Bio↔Back. **No `aria-pressed`** (APG settled: never combined,
w3c/aria-practices #897). **No `aria-live`** (state beats one-shot
announcements — Soueidan). Away face `display: none` at rest.

⚠️ **Flagged fork:** James Edwards (Vispero, Sep 2025 — the most current
authoritative flip-card treatment) *rejects* `aria-expanded` for flips as
semantically wrong, shipping dynamic `aria-label` + `aria-describedby` state
spans + a focus-bounce instead. We go disclosure anyway: Ventriq's interaction
genuinely IS "show the bio" (not an abstract flashcard), `aria-expanded`
announcement support is universal, and it's trivially axe-clean. **If
screen-reader QA surfaces confusion, Edwards' article is the tested fallback
pattern.**

### Touch, keyboard, reduced-motion

- **Touch: the chip is the affordance** — tap the labeled button, not the card
  (no scroll-tap accidents; NN/g: hidden content needs visible cues — flip
  backs are a named card-pattern failure without one). Desktop may extend the
  hit area over the front face with a `::after`, gated `(hover: hover)`.
- **Bios must fit the back face without internal scroll** (NN/g hidden-fold
  warning) — the 2–3-sentence proof-line register we already have. Longer
  content earns a link on the back, never a scrollbar.
- **Fallback if real-phone QA fails once headshots land:** expand-in-place
  below the card (NN/g mobile accordions) — same button, same ARIA, different
  animation.
- **Keyboard:** one tab stop per card (the chip); Enter/Space; focus stays on
  the chip across the flip; focus ring never suppressed.
- **Reduced motion:** rotation gated behind
  `@media (prefers-reduced-motion: no-preference)`; in `reduce`, instant swap
  or ≤150ms opacity crossfade **on the faces, never the 3D wrapper** (opacity
  on the wrapper is gotcha 1). No-JS: bio renders statically — flip is
  enhancement, per the inverted-gating law.
- **INP:** the click handler is a synchronous class/attribute toggle, nothing
  else — the 500ms rotation is free (INP measures to next frame, not
  animation end).

## §4 · Speaker sections on event sites ✅ (agent 2, landed) — the design direction

All claims fetch-verified against live 2025–26 editions (agent killed two
false leads: Fortune's grayscale is footer icons, Epic Web's desaturate is
sponsor logos — good epistemics, kept the field honest).

### What the field does (steal/refuse, verified)

| Site | The move | Verdict |
|---|---|---|
| **Laracon US** (19 speakers) | **Type-as-ground plates:** giant set-solid name behind a cutout photo, uppercase mono metadata, `rounded-[1px]`, hairline grids built with `gap-px` | **The screenshot-worthy benchmark.** The speaker's *name* is the monument — works with or without a great photo. Refuse only the cutout dependency (they control PNG quality; our 29 mixed headshots can't) |
| **Webflow Conf** (54) | **Roster ledger:** no photo grid at all — mono "All speakers" label, `<details>` rows, oversized names, one display-font glyph flourish | **Count-proof** — 5 rows or 54 both read as a complete document. Refuse the gradient mask |
| **Config/Figma** (100+) | **All-mono photography** as the unifier; hierarchy by *label*, not tile size | The duotone logic, in our palette. Refuse the carousel |
| **Web Summit** | Headline: *"Meet our **first** 2026 speakers"* — 25 cards for a 70,000-person event | **Wave-naming as confidence, not apology** |
| **SmashingConf** | 12 named + exactly **one** "Mystery Speaker" tease card | The singular tease. 1 ≠ 15 — our silhouette deletion is confirmed correct by the whole field |
| **Vercel Ship** (6 shown, 3mo out) | Small confirmed tier at full dignity + "Past speakers" proof tier, zero TBA tiles | The mid-wave posture |
| **Slush** | "200+ Speakers" lives in the **stats row**, not inside the grid | Our "17+" already does this (stat strip) ✅ |
| **Fortune Brainstorm Tech** | A stock Cvent widget | The reference **refuse**: "high-end business summit" defaults to template — a drafting-identity grid instantly out-designs Fortune |

**Nobody credible ships silhouette grids.** And circle crops are the single
most template-coded treatment (Web Summit + Smashing + Next.js Conf all use
them) — rectangles with a framing device read editorial.

### The recommendation, three states

**Now (5 speakers, text-first):** agent 2 says **roster ledger** — full-width
gold-hairline rows, a drafting index as the counter (**"01 / 17+"** per row),
name large, proof line as the row's drawing title. Five ledger rows read as a
complete document; five uniform tiles read as six-minus-one.
⚠️ **Synthesis tension with the flip (§3):** rows don't flip; plates do. But
agent 2's own modulo-sink math closes at five — **2 featured plates + one
closed 3-column row** — and its own no-photo solution (giant
initials/surname as type-ground, à la Laracon) makes photoless plates
first-class. So the plate system is viable *today*, flip chip included, and
photos later drop into existing frames. **Decide in §10: ledger-now-plates-
later vs plates-from-day-one.** Leaning plates — the flip is the client's
marquee ask and waves stay seamless.

**At ~17 (photos in waves):** 2 wide featured plates + 3-col compact grid
(2+15 = every row closed; recompute the featured count server-side as the
roster grows — **RSC advantage: the server knows the count, no `:has()`
quantity-query tricks needed**). Plate = rectangular portrait, 2px-radius
frame, **gold corner ticks** (registration marks — already our vocabulary),
name, title, proof line, **sheet number (S-01, S-02…)**. Portraits unified by
**midnight/cream duotone** — `grayscale(1)` + `mix-blend-mode: color` overlay,
two CSS variables to retune — Config's mono logic in our palette, survives all
29 mixed headshots. **Photoless speakers get the same frame with their
initials set giant** — photo and no-photo cards are siblings, so waves never
look like gaps.

**The waves as a brand device — the revision block.** Architectural drawings
track change with revision tables; render the roster updates as one:
*"17+ confirmed · Rev 04 — four names added · next revision Friday"* above the
grid, and new names carry a small gold **"ADDED REV 04"** tick their first
week. This is "More announced weekly." made drafting-native, a return-visit
hook, and arriving speakers feel featured on day one. At most **one** tease
slot ever, styled as a redline plate.

### Motion posture (verified against the field)

**Restrained on scroll, generous on hover.** None of the verified pages run
heavy whole-grid stagger; Laracon's only card motion is a 200ms hover flood.
For us: hairlines draw first (existing system), rows/plates rise 8–12px at
~60ms per row, total sequence <600ms (agrees with §2's recipe), reduced-motion
instant. **Hover is the alive moment:** duotone lifts toward true color, gold
hairline ignites — 200ms, one moment, not five.

## §5 · Sticky chrome + countdown ✅ (agent 4, landed) — two specs, one deviation

### Sub-nav: desktop yes, mobile NO — a research-backed deviation from the brief

⚠️ **The brief asks for a "slim persistent sub-nav" to reduce mobile bounce.
The evidence says a third mobile chrome layer is indefensible; the *goal*
(bounce reduction) is served another way.** The math: on a 667px viewport,
the existing bottom CTA bar + a 48px top sub-nav ≈ **4.5:1 content-to-chrome —
three times worse than the example NN/g praises (13:1)**. Every strong
precedent refuses the stack: Airbnb runs desktop anchor tabs vs mobile bottom
bar — *never both*; Apple's local nav collapses to name+CTA on phones; GitHub
Universe and **Luma's own event pages** ship no sub-nav at all. And NN/g's
2023 finding: on small screens **accordions beat in-page links** — our FAQ
already is one.

**Desktop/tablet (`md:`+): build it.**
- `position: sticky; top: 0` bar between hero and stats, ~48px — the
  announcement bar is in normal flow and the header isn't sticky, so once
  scrolled this is the ONLY top chrome. Full-bleed midnight, gold hairline
  bottom rule, small-caps labels — the top-edge sibling of the bottom bar.
- `Schedule · Speakers · FAQ` + `Register` as the primary item (4 ≤ Smashing's
  5-item ceiling).
- Scroll-spy: IO **detection-band recipe** — `rootMargin: "-20% 0px -75% 0px"`,
  `threshold: 0` (one section in the band at a time = no flicker), last-wins
  fallback so the highlight never drops between sections; update active state
  immediately on click.
- Semantics: `<nav aria-label="Page sections">`, **`aria-current="location"`**
  on the active link, active state = gold rule marker + weight (never color
  alone), `scroll-margin-top: calc(48px + 24px)` on targets, smooth scroll
  gated behind `prefers-reduced-motion: no-preference`.
- ❌ **Do not use CSS `:target-current`** — Chrome-140-only AND Chrome doesn't
  set `aria-current`, which Soueidan (Aug 2025) calls "an instant WCAG 1.3.1
  violation" for pure-CSS scrollspy. IO + JS today.
- Plain same-page anchors — fully functional with JS off; only the spy is JS.

**Mobile: an in-flow "sheet index" instead** — a drafting-style contents block
directly under the hero ("SCHEDULE / SPEAKERS / FAQ" as anchor rows styled
like a title-block index). Zero persistent cost; NN/g says users value the
overview and anchors save the scrolls. `Register` stays owned by the bottom
bar. *(Fallback if the client insists on persistence: merge ONE `Schedule`
link into the existing bottom bar — never a third layer.)*

**Regardless of the above, two fixes to the EXISTING mobile bar:**
1. Add `env(safe-area-inset-bottom)` padding (`viewport-fit=cover`) — it ships
   without one today.
2. Respect the **~40px accidental-toolbar zone** at the screen's bottom edge
   (taps there summon the browser toolbar instead of registering — Designary).

### Countdown: the drafting-register spec (repairs the T4·4 orphan)

**Visual — a single line of type, no tiles** (refusal list; precedents: Yeezy
Supply, taylorswift.com, and launch telemetry's `T−00:12:34` — a countdown as
*annotation*, which is exactly our register):

```
DOORS OPEN IN   12ᴰ 09ᴴ 42ᴹ     ← pre (minute granularity)
DOORS OPEN IN   09ᴴ 41ᴹ 22ˢ     ← final 24h only (seconds earn their place)
```

Space Grotesk 500 cream digits, `font-variant-numeric: tabular-nums` —
**Space Grotesk ships `tnum`**, so no width judder — unit letters as ~0.6em
small-caps gold suffixes like dimension annotations, zero-padded fixed digit
counts so the line never reflows. States: `pre` → the line · `live` → "DOORS
ARE OPEN — TONIGHT 6:30–8:00 PM ET" + Luma CTA · `between` → "NEXT SESSION
AUG 12 · 6:30 PM ET" · `post` → static past-tense. Never negative time, never
frozen 00:00:00.

`[OURS]` **Integration note the agent couldn't know:** the hero already runs a
state machine off `lib/calendar.ts` (`eventPhase`: pre/announced/live-night/
between/post, 40/40 vitest). The countdown must consume `eventPhase(now)` —
**do not build a parallel date-state system.** Its `pre` line lives in the
State-A/B hero; `live`/`between`/`post` already have hero treatments.

**Technical:** target epoch constant passed from the server
(`2026-08-10T18:30:00-04:00`); server renders the static `<time>` date line as
real content (= the no-JS fallback AND the pre-hydration render, so no
mismatch, no `suppressHydrationWarning` — Comeau two-pass); client swaps in
the ticking line after mount. Tick = **self-adjusting `setTimeout` to the next
minute boundary** (second boundary in final 24h), display always derived from
`target − Date.now()` (never accumulate — setInterval drifts + background
throttling), instant recompute on `visibilitychange`. No rAF (refresh-coupled,
pauses in background).

**A11y — the quiet pattern:** wrapper `role="timer"` (implicit
`aria-live="off"` — silent by design) + `aria-label="Doors open August 10 at
6:30 PM Eastern"` + `aria-atomic="true"`; static `<time datetime>` always in
the DOM; the ONLY announcement is a one-shot polite region update at the
pre→live flip. **Never put ticking digits in a live region.** Minute
granularity keeps WCAG 2.2.2 churn trivial (manual SC — axe can't see it
either way; the human bar is what matters).

**Ethics note that fits the house law:** the only controlled study (Tuncer
2023, n=202) found countdowns *increased frustration and lowered trust*; fake
timers are FTC-documented dark patterns. Ours is defensible purely as
**information about a real fixed date for a free event** — no urgency
adjectives near the timer. Which is what the copy already does.

## §6 · Ambient geometric hero motion ✅ (agent 5, landed) — don't ship video; animate what we have

### The ranked verdict

1. **#1 — Animate the existing inline SVGs with compositor-first CSS.** ~0 KB
   shipped, no new runtime, LCP-inert, builds directly on `vq-draw`/`--vqd`/IO.
   **1–2 days including cross-device QA** — note this against the Jul 23 call's
   "20–30 minutes out the door" scoping; the delta is the 2.2.2 pause
   affordance (below) + choreography + QA, not the animation itself.
2. **#2 — (Later, optional) a tiny bespoke shader** (paper-shaders class,
   zero-dep, <5 KB, idle-mounted behind the SVG) — **gated on the perf baseline
   being green (§7)**. Never three.js (~155 KB), never Rive (0.4 MB JS +
   0.85–1.9 MB wasm — measured; it's what Linear/Stripe/Arup actually use, and
   it exists to solve raster problems we don't have).
3. **#3 — Canvas 2D** only if lines must continuously re-solve geometry;
   permanent main-thread paint that CSS avoids.
4. **#4 — Video: REFUSE for the hero surface — but deliver "video" to Justin
   as an exported .mp4 capture of the finished motion for social/LinkedIn.**
   The ask gets honored as an *artifact*, not a delivery mechanism.

### Why video dies (the physics, sourced)

- **Codec physics destroy this exact art direction:** dark scenes band under
  8-bit quantization and encoders sacrifice thin lines first — 0.75px gold
  hairlines at 28% opacity on #101B2D is the worst case. Clean 1080p30 needs
  ~10–15 Mbps → a 10s loop = **12–19 MB**; at "web hero" bitrates it fits
  3–6 MB but shimmers precisely where we live.
- **It changes the LCP element class.** Today the heroes contribute **zero
  LCP candidates — inline SVG line art is not a candidate** (web.dev); LCP on
  all three pages is the H1 text, painting instantly. Since Chrome 116 a
  video's first frame/poster IS a candidate — a hero video moves LCP from
  "instant text" to "network-bound media" (DebugBear measured a 10.5s-LCP
  video hero; Chrome can't even preload video files, only posters).
- **iOS Low Power Mode suspends autoplay entirely** — the mandated fallback
  still *is the SVG we already render for free*. The video buys nothing its
  own failure mode doesn't already deliver.
- Market check (fetch-verified): every ambient-hero pattern in production —
  Rive (Linear/Stripe/Arup/Endex), mp4 loops (Anduril/Oxman), full WebGL
  (Igloo) — solves raster/filmed/3D problems Ventriq doesn't have. **A vector
  line system animated by the compositor is the one pattern that fits
  hairline-on-midnight + Lighthouse ≥95.**

⚠️ **Cross-ref §2's LCP flag:** Chromium *excludes opacity-0 elements from LCP
candidacy* — so our H1s entering via `vq-in` (opacity 0 → 1) may be delaying
the recorded LCP paint. Exempting the H1 from the opacity entrance is the
likely cheap win; confirm against §7's PSI data.

### ⚠️ THE COMPLIANCE CATCH — WCAG 2.2.2 is Level A and has no decorative exemption

**Auto-starting motion lasting >5s alongside content requires a user
pause/stop/hide mechanism — and the Understanding doc does NOT accept
`prefers-reduced-motion` as that mechanism.** Today's one-shot draw settles
inside 5s = compliant. **"Keeps moving forever" requires shipping a pause
affordance**: a hairline "still ▸/drafting ⏸" toggle in the hero corner,
setting `animation-play-state: paused`, persisted. Budget it into the design
— don't bolt it on. (axe cannot test this SC; it's a manual gate. Nobody in
any prior doc — the call, the brief, our design brief — knew this.)

### The choreography (what keeps it from reading as a loading spinner)

- **Layers on different prime-ish periods** (12s / 18s / 30s) so the composite
  never visibly repeats; **long idle windows** between events
- **Drafting vocabulary, not uniform drift:** a ray re-draws (~2s of
  `dashoffset` paint inside an otherwise-idle 20–24s timeline — amortized to
  ~10%), a tick lands, the crosshair breathes — never continuous dash motion
  (that IS the spinner read)
- **Continuous motion = transform/opacity on `<g>` groups only** — Chromium
  now GPU-accelerates these *on SVG elements*, off the main thread
- Vestibular limits (Apple/WebKit guidance): breathe scale ≤2–4%, slow; **no
  parallax between ray layers**; low peripheral energy (rays sit at 0.28
  opacity upper-right); PRM = today's composed still
- Shipped-work ambient durations for calibration: 6s–400s cycles (Smashing
  2025 series). Ventriq targets: crosshair breath ~14s, shimmer layers
  18–30s, one re-draw event per ~20s+
- Pause when the hero scrolls out (`animation-play-state` via the existing IO
  pattern); decorative layers stay `aria-hidden` (already true)

### Implementation shape (concrete)

Group each hero's lines into 2–4 `<g>` layers (rays-far / rays-near /
crosshair / ticks; tallies already are groups). Add `vq-breathe` (crosshair:
scale 1→1.03 + opacity 0.75→1, ~14s alternate), `vq-settle` (wrapper drift
≤0.5%, ~30s), per-ray `vq-shimmer` (staggered via existing `--vqd`, 18–30s),
`vq-redraw` (one ray, ~2s per ~22s cycle). All inside the existing
`no-preference` block. ~60–120 lines of CSS + minor TSX grouping + the pause
toggle. **Verify after: LCP element unchanged (H1 text), no TBT delta, DevTools
paint-flashing quiet during idle cycles.**

**For the record — the correct PRM video pattern** (if video ever resurfaces
elsewhere): `<source media="(prefers-reduced-motion: no-preference)">` works
again (Safari always; Chrome/Firefox since 120, Dec 2023); poster shows for
everyone; evaluated at load only — pair with a `matchMedia` listener.

## §7 · Production perf baseline + budget ✅ (agent 6, landed) — the numbers exist now

**Method honesty:** keyless PSI API is **dead globally** (Google set the shared
anonymous project's daily quota to literally `0` — no retry can ever work;
unblock = mint a free API key, 5 min). Fallback: Lighthouse 12.6.1 from the dev
box **against production ventriq.io** — real edge, real gtag. **Byte counts,
request inventories, LCP element identity, CLS and structural findings are
exact; timing absolutes are inflated 1.5–4× by host load** (12 raw run JSONs in
scratchpad/psi/). PSI-grade estimates: mobile LCP ≈ 2.3–2.9s, score ≈
0.65–0.85. **CrUX: none until late August at earliest — the Aug 7 decision
runs on lab data.**

### The baseline (medians, mobile)

| | `/` | `/summit` | `/founders-after-hours` |
|---|---|---|---|
| Script total | **345KB** | **345KB** | **417KB** |
| — ours | 168KB | 169KB | **240KB** ⚠️ |
| — gtag | 164KB | 164KB | 164KB |
| — CF Insights (stowaway) | 11KB | 11KB | 11KB |
| — Turnstile | **0 — never loads** ✅ | 0 | 0 |
| Images/media | **0 requests** | 0 | 0 |
| CLS | **0.00 — all 12 runs** | 0.00 | 0.00 |
| Redirects | none | none | none |

**The site's biggest performance asset: it paints from 14–18KB HTML + 10KB CSS
+ one 22KB font, with zero images.** That is why CLS is flawless and text-LCP
lands at FCP+ε — and it is exactly what hero media would destroy.

### LCP elements — the decision-relevant find

- **`/` and `/summit` mobile: the LCP element is the ANNOUNCEMENT BAR** — not
  the hero. Pure text, zero load-delay. But it's **ephemeral** (dismissible +
  time-aware; comes down post-Aug-20) — **design all motion as if the hero H1
  is LCP, because in September it will be.** (Cross-ref §2/§6: the H1's
  opacity-0 entrance question stands for that moment; re-measure at the
  PSI-key re-baseline.)
- **FAH mobile: the hero paragraph IS the LCP** — motion there cohabits with
  the LCP element, and FAH carries **+72KB page JS**: the ChapterForm chunk
  (react-hook-form + zod pulled client-side for a below-fold form whose
  validation already runs server-side). **Lazy-mount it → recovers ~70KB —
  prerequisite before FAH gets motion.**

### lighthouserc.json — confirmed impossible, replacement drafted

250KB script budget vs a 332KB floor (gtag 164 + ours 168) — off by ≥95KB
before we write a line. TBT ≤200ms impossible while gtag runs in-trace. The
agent drafted a **drop-in replacement assert block** (in its full output;
preserved in the task file): per-page script fences (380KB summit+home /
450KB FAH), a 200KB third-party fence with thirds documented at 179KB, CLS
0.1 and a11y=1 kept as earned, catastrophe-level timing gates with median-run
aggregation, the noise audits (`bf-cache`, `uses-long-cache-ttl`, gtag's
`unused-javascript`…) explicitly neutralized — **and `media:size = 0` as a
deliberate tripwire making hero video an explicit reviewed decision, never a
drift.**

⚠️ **AGENTS.md's "Lighthouse ≥95" needs a formal amendment** — unreachable on
mobile with GA4 in-trace (gtag alone blocks ~400–800ms PSI-grade). Proposed:
"≥95 desktop / ≥80 mobile lab, third parties documented." **Derrick's call —
it's the project contract.**

### The motion-headroom verdict (the number the heroes must fit)

- **JS: ≤30KB transfer for the entire motion layer** (keeps our JS ≤200KB
  against the 380KB fence). CSS-only = 0KB ✅; hand-rolled canvas 2–10KB ✅;
  three.js/Lottie/GSAP-stack ❌.
- **TBT: ≤50ms added — zero long tasks.** gtag owns all the third-party slack
  there is. Init chunked, `requestIdleCallback`, ≤4ms/frame.
- **CLS: 0.00 stays 0.00.** Reserved boxes only.
- **LCP: +0ms — hero video is prohibited on mobile, full stop** (a muted
  video's first frame is an LCP candidate since Chrome 116; 300–500KB of
  first-segment moves mobile LCP into the 4–6s band on the exact pages
  partner traffic lands on). **Agent 5's #1 (compositor CSS on existing SVGs)
  isn't just preferred — it's the only option that fits the budget.**
- Stowaway to adjudicate: `cloudflareinsights.com/beacon.min.js` (11KB,
  auto-injected at zone level, in no repo file) — free RUM which is genuinely
  useful pre-CrUX; keep-or-kill is Derrick's, document either way.
- Existing defect surfaced: `forced-reflow-insight` scores 0 in production —
  something in the current JS forces synchronous layout; find it during the
  motion work.

## §8 · Platform truths: Skool / Luma / Kit ✅ (agent 7, landed) — 8 claims verified, 3 corrections

### Skool

**Two paid tiers in one group — CONFIRMED native** (Oct 2025 pricing update):
"Tiers" = 2–3 paid plans shown at signup; "Freemium" = free plan + 1–2 paid
upgrades pitched *inside* the community. $45 Digital Core + $99 Power Hour
fits either way. **New decision for Justin (→ O20):** Tiers mode shows "$45"
as the public group price with no free entry; Freemium makes signup look free
and the *website* has to do the $45/$99 selling. Changes our join-CTA copy.
Cap: ~3 paid tiers max. (Platform economics: Hobby $9/mo takes 10%+30¢/txn,
Pro $99/mo takes 2.9%+30¢; break-even ≈ $1.2–1.4k MRR.)

**❌ "Renaming changes the group URL" — REFUTED as we stated it.** Name and
URL are **independent controls**. Renaming = Settings → General, free, safe,
anytime. The URL changes only via a deliberate "CLAIM/CHANGE URL" flow —
first change free, **$100 per change after**, help doc says **Pro-plan-only**
(third-party sources disagree; verify in dashboard). **No redirects**: nothing
official documents old-link behavior, and an open feature request begging for
redirects is strong evidence they don't exist — treat every old link
(including `iamjs-collective-9599`) as 404 the moment the URL is claimed.
**Corrected client instruction:** rename freely; it's the URL *claim* that
needs the same-day coordination with us — ideally claimed ONCE, to the final
name, before Skool links get published anywhere wider than our site.

**Levels — CONFIRMED renameable, but there are 9, not 5.** Custom level names
per group; unlocks attach per level; thresholds are Skool's **fixed
like-counts** (L1: 0 → L9: 33,015; 1 like = 1 point), not customizable and
not purchase- or attendance-linked. **Two consequences:** (a) ORE → EMBER →
BLADE → TEMPERED → DAMASCUS needs a **9→5 mapping decision** (e.g.
intermediate grades "ORE II") before Justin configures anything (→ O21);
(b) Skool's native levels can only ever approximate the Foundry's composite
rank (one-pager: engagement + production + FAH attendance) — likes-only. The
real scoreboard remains the phase-2 product build; Skool levels are the
interim gesture.

**Free-alongside-paid — CONFIRMED** (that's Freemium). About pages stay
public regardless.

### Luma

**Referral question — CONFIRMED end to end.** Custom text question → visible
per guest → **CSV: each question is its own column** → API: `registration_
answers[]` per guest. Webhooks fire on registration and answer changes.
**Operational catches:** questions only apply to guests who register *after*
the question exists — **add it before the next promo push**; the 36 already
registered will have no answer; a **dropdown of ambassador names** beats free
text for clean data. *(The held §05b prompt still waits on one real
registration test — the platform supports it; our specific event's config is
what's unverified.)*

**API — CONFIRMED, Plus-gated:** documented v1, `x-luma-api-key`, 200 req/min
— but **requires Luma Plus, $59/mo billed annually, per calendar**. Zero-cost
alternative: the guest CSV carries the same answers. Feeds the existing
"Luma Plus decision point" in TODO.md — for a free event, a manual CSV pull
post-push probably suffices.

**UTM forwarding — CONFIRMED and better-documented than Luma's own docs**
(agent read `checkout-button.js` source): forwards `utm_source`, `utm_id`,
all standard UTMs + 10 click-ID params into the checkout. **But only
`utm_source` persists per-guest** (API field + CSV "Custom source") — all
other UTMs are aggregate-only. So ambassador IDs must ride **`utm_source`**.
And the script reads `window.location.search` **at click time** — ambassador
links must land directly on the page hosting the button.

⚠️ **`[OURS]` — BUG FOUND IN OUR SHIPPED BUTTON by connecting this to our
code.** `data-luma-utm-source` **takes precedence over the page's
`?utm_source`** — and `components/luma-register-button.tsx` hardcodes
`data-luma-utm-source={"site-" + ctaLocation}` on every button. Meaning: an
ambassador arriving on `?utm_source=speaker-jane` gets their per-guest
attribution **clobbered to `site-summit-hero` by our own instrumentation**.
GA4 still sees the real source (it reads the page URL), but Luma's per-guest
record — the ambassador dataset itself — is destroyed. **Fix (small):** in the
button, prefer the page's `utm_source` when present:
`data-luma-utm-source={pageUtmSource ?? "site-" + ctaLocation}`. Do this
BEFORE the ambassador push; it invisibly no-ops for untagged traffic.

### Kit

**v4 dual-write — CONFIRMED sound.** `POST /v4/subscribers` creates-or-updates
(`state` defaults `active`; no confirmation email documented anywhere outside
form contexts; CSV-import precedent: imports are "automatically confirmed…
even if double opt-in enabled") → then `POST /v4/tags/{id}/subscribers` by
email. **Avoid the forms endpoint entirely** so no form opt-in logic can
fire. Auth: `X-Kit-Api-Key`, available on every plan. 120 req/60s — far above
our volume. **One residual ambiguity Kit never states in writing:** that
API-created subscribers get no confirmation email. **Pre-launch chore: one
live test with a real inbox.**

## §9 · Event rich-results + launch readiness ✅ (agent 8, landed) — two fires, one myth retired

### The rich-results myth, retired

**Google removed virtual-event rich results in June 2025** — the current doc
says events "must take place in a physical location"; `VirtualLocation` and
`eventAttendanceMode` were withdrawn (2020 COVID-era additions). **Our markup
can never produce an event snippet, and that is Google's rule, not our
defect.** No penalty, no embarrassment; Rich Results Test reporting "no
eligible items" is expected. **Do NOT add a fake physical Place to chase
eligibility.** Keep and polish the markup anyway — it's what AI
assistants/answer engines parse when partner readers ask "who's speaking."

**The polish diff (exact, unblocked, copy-safe):** add
`"image": ["https://ventriq.io/og/summit.png"]` · add the five speakers as
`performer` Person entries · add `"@type": "Organization"` to `organizer`
(**cross-page `@id` references don't resolve — Google parses per-page**, so
the typed node on the homepage doesn't help `/summit`) · extend `description`
with the already-approved meta-description sentences (no new words needed).
**One Event spanning Aug 10–20 is correct** — Google's split rule triggers on
per-performance *tickets*, and one free registration covers all 8 nights.
Optional for AI consumers: an `eventSchedule` with `byDay` Mon–Thu,
`18:30–20:00`, `America/New_York`, `P1W` — precisely our shape.

### 🔴 FIRE 1 — the redline chips are live on four pages, one nav click from /summit

**`/summit` itself is clean** — zero placeholders, coherent metadata, date
math checks out, Luma's own JSON-LD matches ours exactly, 37 going. **But the
partner wave will click the nav:**

| Page | Live right now | Severity |
|---|---|---|
| **/about** (in the top nav of EVERY page + sitemap) | `[PHOTO: …]` ×2, "STATS — confirm README #5/#7", "MISSION — Justin to ratify · COUNSEL-REVIEW", "TITHE — README #4", "ADVISORS — TBD" — **internal editorial notes, public** | **CRITICAL** — and it's already slated for deletion (D21). Delete before the wave: 301 → /, pull from nav + sitemap |
| **/** (partners click the logo) | "APP-OPEN DATE" chip · "COUNSEL-REVIEW" chip · "TESTIMONIAL PERMISSIONS — README #5" chip · `[PHOTO: …]` | **CRITICAL** |
| **/mastermind** | "APP-DEADLINE" · "DECISION-DATE" · "COHORT-DATES" · "$[INVESTMENT]" ×2 | HIGH — cohort dates now known (Sep 26 → Dec 5, Phase 1 §11.3); investment + deadlines still Justin's |
| **/founders-after-hours** | "$[89–99]/month" · "PRICE — confirm" · "POLICY — confirm" ×2 · "TIMES — confirm" · "SKOOL CHECKOUT — pending" | HIGH — **$99 and the 6:00/6:15/7:15/8:15 run-of-show are DECIDED and sitting unbuilt in the build queue** (ranks 3, 7) |
| /contact | one stray internal note ("/press … post-launch; drop row") | LOW |

**This reprioritizes the queue:** the About deletion and the FAH
decided-but-unbuilt fixes stop being "Jul 23 backlog" and become
**pre-partner-wave items**. The chips render by design — the system worked;
the *values* were never applied.

### 🔴 FIRE 2 — iamjs.io has ZERO email authentication

No SPF, no DKIM, no DMARC on the domain Justin broadcasts from (dig-verified
against two resolvers; ventriq.io by contrast is clean with `p=quarantine`).
Kit signs with its shared domain (unaligned); **even his 1:1 Workspace mail
from @iamjs.io fails SPF today.** Gmail's sender rules (enforced since Feb
2024) mean the next summit blast risks spam-foldering exactly when it matters.
**The four records, in order** (all in Google Cloud DNS, where the zone
lives): (1) Kit Verified Sending Domain — two CNAMEs from Kit's UI
(`ckespa.` SPF-delegation + `cka._domainkey.` DKIM); (2) `TXT iamjs.io` →
`v=spf1 include:_spf.google.com ~all`; (3) Workspace DKIM via Admin console →
`google._domainkey`; (4) after 1–3: `_dmarc` → `v=DMARC1; p=none;
rua=mailto:jshaw@iamjs.io`. Verify with a Gmail seed → "Show original" → all
three PASS with `d=iamjs.io`. Expect 2–3 weeks of open-rate wobble per Kit.

### Indexing + robots (the third urgent-ish thing)

**`site:ventriq.io` returns nothing**, and a brand search today surfaces
**ventriq.com — "for sale"** — plus a defunct .net and an unrelated UK firm.
Six days post-launch that's plausible, but the partner wave will spike brand
searches into a SERP we don't own. GSC is verified (TXT exists): **Request
Indexing on `/` and `/summit` this week** — this escalates the existing 🔴
GSC item from "should" to "before the wave."

robots.txt: Google fully allowed; a Cloudflare-managed block opts out of AI
**training** crawlers (GPTBot, ClaudeBot etc.) with
`Content-Signal: search=yes,ai-train=no` — live-retrieval bots are NOT
blocked, so the existing AI-Crawl-Control TODO stands; confirm the training
opt-out is intentional. Sitemap: `/about` listed (remove on deletion);
hardcoded `lastmod: 2026-07-23` going stale — wire to real dates or drop.

---

## §10 · The build order — synthesized from all eight

> **BUILD RECORD (Jul 29, same day):** Waves 0 + 1 are **BUILT and gated** —
> items 1–4 and 6–9 below all ✅ (utm guard shipped as `useSyncExternalStore`;
> JSON-LD performer/image/organizer live; /about deleted with 301 + nav gains
> Contact; FAH times/$99/pillars/midnight-premium-card applied; homepage
> APP-OPEN chip cut-don't-chipped; lighthouserc replaced; AGENTS.md amended
> per O22; O23 = beacon kept until ~Sept). Wave 1: `lib/brand.ts` ·
> **the flip on all five plates** (2 featured + 3, revision line, initials
> type-ground) · countdown · desktop sub-nav + mobile sheet index +
> safe-area fix. **Gates: tsc clean, lint clean, e2e 43/0, visual pass at
> 1280 + 375.** Two findings during build: axe caught my `cream/40`
> denominator (3.4:1 — fixed to /60 with the borderline /50s bumped too), and
> the smoke spec's bar regex still expected the pre-standardization CTA label
> (updated, including the "Summit is live" state). Remaining: Wave 2 (hero
> motion + pause toggle + FAH chunk diet) and Wave 3 (Foundry toggle).

**Wave 0 — pre-partner-wave fires (this week, before Aug 1 traffic):**
1. **Fix the `utm_source` clobber** in `luma-register-button.tsx` (§8 bug) —
   prefer the page's `utm_source`, two-pass client read. Before ANY ambassador
   link goes out.
2. **JSON-LD polish** (§9 diff): `performer` ×5, `image`, organizer `@type`,
   extended description. 15 minutes, copy-safe.
3. **Kill the chip exposure one click from /summit** (§9 fire 1):
   **delete /about** (D21's ten steps — nav gains Contact, sitemap drops it,
   301 to /) · **apply the decided-but-unbuilt FAH fixes** (run-of-show
   6:00/6:15/7:15/8:15, $99, pillar renames, equal cards + midnight premium —
   queue ranks 3/5/6/7) · homepage `APP-OPEN DATE` chip → brief-style
   **cut-don't-chip** ("open ahead of the September start" — no invented
   value) · mastermind `COHORT-DATES` → Sep 26–Dec 5 **once O17 (two
   cohorts?) answers**. Remaining chips (INVESTMENT, deadlines, testimonials,
   COUNSEL-REVIEW) are Justin's values — escalated on his list.
4. **Apply the replacement `lighthouserc.json` assert block** (§7) so qa.yml
   stops being decorative.
5. Ops in parallel (not code): PSI API key + re-baseline · GSC Request
   Indexing (§9) · iamjs.io records (Justin, on his list) · CF-beacon
   keep/kill (Derrick).

**Wave 1 — the speaker system (Phase 5's heart, all unblocked):**
6. **`lib/brand.ts`** — MEMBERSHIP_NAME + SKOOL_URL hoist (T4·3 prerequisite,
   Aug 10 hard deadline).
7. **Speaker plates + the flip** — plates-from-day-one (2 featured + one
   closed 3-row at five, §4 synthesis), flip per §3 (chip-button,
   `aria-expanded`, `display:none` on transitionend, reduced-motion
   crossfade, **iOS QA first**), entrance per §2 (420ms/60ms capped/ease-out),
   duotone system ready for photos, type-as-ground for photoless speakers,
   **revision block** driven by a data field.
8. **Countdown** per §5 — consumes `eventPhase()`, repairs the orphan label.
9. **Sub-nav** per §5 — desktop sticky bar + mobile sheet index +
   `safe-area-inset-bottom` fix on the existing mobile bar.

**Wave 2 — hero motion (gated by §7's budget, all inside it at 0KB):**
10. Ambient compositor CSS per §6 choreography + **the WCAG 2.2.2 pause
    toggle** + IO offscreen pause. Verify after: LCP element unchanged, no
    TBT delta, paint-flashing quiet.
11. FAH prerequisite: **lazy-mount the 77KB ChapterForm chunk** (§7), then
    FAH joins the motion set.
12. H1 LCP-exemption experiment — after the PSI-key re-baseline, for the
    post-Aug-20 world where the H1 becomes LCP.

**Wave 3 — the Foundry toggle (Aug 10, T4·3):** mechanism now, content on
O10–O12 answers; Tiers-vs-Freemium (O20) changes the join copy; the 9→5 level
mapping (O21) goes to Justin with the Skool setup instructions.

**Deliverable to Justin when Wave 2 lands:** the captured **.mp4 of the
finished hero motion** for his social — the "video" ask, honored (§6).

### New open questions this research created

| # | Question | Owner |
|---|---|---|
| O20 | Skool pricing mode: **Tiers** (public $45 price, no free entry) or **Freemium** (free-looking signup, site does the selling)? Changes our join-CTA copy. | Justin |
| O21 | The 9→5 level mapping for ORE→EMBER→BLADE→TEMPERED→DAMASCUS (Skool has exactly 9 renameable levels, fixed like-thresholds). | Justin (with our proposal) |
| O22 | AGENTS.md "Lighthouse ≥95" amendment → "≥95 desktop / ≥80 mobile lab, third parties documented"? | **Derrick** |
| O23 | Cloudflare Insights beacon (11KB stowaway, free RUM): keep or kill? | **Derrick** |
