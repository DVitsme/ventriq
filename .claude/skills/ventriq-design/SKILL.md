---
name: ventriq-design
description: Use when designing or building ANY visual surface for Ventriq — pages, components, themes, OG images, email templates, claude.ai/design prompts. Loads the brand's design direction (architect's-line system, palette ratios, type strategy, motion signature, photography treatment) and how Ventriq deliberately diverges from the 2026 AI-default looks.
---

# Ventriq Design Direction

Work WITH: `frontend-design` (process), `design-tells` (refusal catalog), `ventriq-stack` (code wiring). This file is the brand application. Evidence base: `docs/brand/README.md` (the decided identity), `docs/competition/website-teardowns.md` §synthesis (IA, blueprints, 11 anti-patterns, design map).

## The concept everything derives from

**Ventriq = venture + corridor.** Two lines converging to a vanishing point — a V, a corridor, a threshold ("a room worth getting into"). "An architect's line, not an accelerator's rocket." Every visual decision should trace back to this: drafting, thresholds, structures being built, doors opening.

## Positioning: "Hampton's composure, opened up"

Nearest neighbor (verified palette: evergreen + champagne + cream, serif × grotesk) is joinhampton.com — match its discipline, reject its velvet rope: warmer photography, cultural rootedness, stated criteria. Diverge hard from: BGV's donor-hijacked Wix energy, 1MC's enterprise-template flatness, Brand Builders' funnel gloss, YC's utilitarian intimidation.

## Palette (ratios are the design)

- **Midnight `#101B2D` is the dominant ground** — Ventriq is wrapped in navy. **Never build cream-dominant + serif + warm accent** — that's AI-default look (a); our cream `#F1ECDF` is the *light field* used for reading sections, not the identity.
- **Gold `#C9A24C` is recognition, not decoration** — the corridor line, the q's tail, key numerals, focus ring, `::selection`. If gold appears more than a few times per viewport it has stopped being expensive.
- **Ink `#0B0F16`** for text on cream. **Accent `#C15A2C`** (orange, UNRATIFIED — single token, one-line swap to teal `#22B0A0`) for interactive elements only.
- ⚠️ Contrast law: gold on midnight ≈ 5.6:1 (fine for display/lines); gold on cream fails AA for body — display/graphic use only.

## The signature element (spend all boldness here)

**The drafted gold hairline system**: 1px gold construction lines with *drafting semantics* — dimension ticks, section markers, lines that converge toward vanishing points, rules that "draw in" on load. This is NOT the generic broadsheet look (AI-default (c): hairlines + zero radius + newspaper columns). The difference is derivation: our lines behave like an architect's drawing of the corridor mark — asymmetric, directional, converging — never uniform column rules. If a layout reads "newspaper," it's wrong; it should read "drafting table."

## Typography

- **Space Grotesk stays** (it's in the logo; brand equity) — but the *site* must dodge the burned "Space Grotesk + Instrument Serif + italic-accent-word" 2025 cliché: no single-word serif-italic garnish; use SG at extreme weight/size contrast (SemiBold display vs 400 body, ≥3× jumps), tracked small-caps eyebrows as a designed motif (gold, with a rule), `font-variant-numeric: tabular-nums` for drafting numerals.
- If pairing a serif for editorial warmth: **Fraunces, Newsreader, or Crimson Pro** — never Instrument Serif, never Inter anywhere.

## Motion signature (one move)

Corridor lines **draw in** (scaleX from an origin point) + content staggers 30–80ms behind them, on page load and major section entries. Everything else: <300ms, ease-out `cubic-bezier(0.23,1,0.32,1)`, transform/opacity only, reduced-motion keeps fades. Countdown and NumberFlow tallies animate; nothing bounces, ever.

## Imagery

Real photography, ONE treatment: **navy-tinted grade** (+ subtle grain) so all sources read as a set. Warm, real founders — Black-culture-rooted, working, not stock-posed. No AI blobs, no mixed illustration styles, no emoji in UI. Bespoke micro-icons only if drawn from the corridor geometry (single stroke, shared vanishing-point logic); otherwise a curated, restyled Lucide subset.

## Layout rules

- Left-aligned, asymmetric heroes (5/7 splits); the 3-program "doors" section is the one card moment — vary it (it's three *thresholds*, not three icon-cards).
- Section rhythm varies deliberately; midnight and cream sections alternate like drawing sheets; ONE dark donor section near the footer (Halcyon pattern) — donors never hijack the hero (BGV anti-pattern).
- Structural numbering only where sequence is real (Summit days, application steps) — set as drafting numerals with rules.
- Logos: wordmark primary, monogram ≥16px contexts, black/white first (brand law); current SVGs in `docs/brand/logos/` are reconstructions — swap when Justin's originals arrive.

## Event pages (Summit, Founders After Hours) — the bigger boldness budget

Event pages are the brand *performed*: voltage **4–5 of 10** — "a gala invitation with a festival heartbeat" (evidence: `docs/competition/event-pages/`). Rules: **one festival gesture per page** (Summit = gold ticker mantra "FORGED TOGETHER · BUILT TO LAST" (v1.2 — his ratified tagline); FAH = tally-draw); **countdown as drafting metadata** (monospace, hero meta row — never a billboard); the **corridor-draw scroll scene is our differentiator** (no benchmark does converging line-work — it's an open lane); the Summit hero/agenda run a **state machine** (pre → announced → live-tonight → between → replay; copy per state in `docs/copy/08-event-motion-copy.md`); grandeur from type/light/rules at scale (Stripe Sessions 2026 = structural analog; Black Ambition = register analog); motion per `docs/competition/event-pages/motion-implementation-menu.md` (LazyMotion ≈21 kB, grain + gold light are zero-JS, reduced-motion = fades everywhere). Static-first and always-current — event-lane sites rot after their dates; ours flipping to replay mode is itself the premium signal.

## Ship check (page-level)

1. Does every distinctive choice trace to corridor/threshold/drafting or Justin's world (Baltimore, tailoring precision, faith-warmth)? Decoration that traces to nothing gets cut.
2. Run `design-tells` self-check + the teardown's 11 anti-patterns.
3. Screenshot at 390px and 1440px; check the quality floor (focus states, reduced motion, AA contrast) silently.
4. Would Hampton's designer nod, and would Justin's mother feel welcomed? Both must be yes.
