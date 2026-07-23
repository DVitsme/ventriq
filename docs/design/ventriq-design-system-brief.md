# Ventriq Design System Brief

*Upload this file once and keep it in project knowledge — it is the standing authority for every design phase. Where a phase prompt and this brief conflict, the phase prompt wins.*

## The brand in five lines

**Ventriq** (pronounced ven-TREEK) is a new nonprofit equipping founders — small business owners, startups, and nonprofits, with a focus on underrepresented builders — with capital, programming, and council. Baltimore-rooted. The concept everything derives from: **venture + corridor** — two lines converging to a vanishing point: a V, a corridor, a threshold ("a room worth getting into"). The identity is **"an architect's line, not an accelerator's rocket."** Design decisions must trace back to this world: drafting, thresholds, structures being built, doors opening.

## Tokens (locked)

| Token | Hex | Job |
|---|---|---|
| Midnight | `#101B2D` | Dominant ground — the brand is wrapped in navy |
| Cream | `#F1ECDF` | Light reading field (never the dominant identity) |
| Ink | `#0B0F16` | Text on cream |
| Gold | `#C9A24C` | The signature: hairline rules, corridor lines, key numerals, focus states, `::selection`. Rare = expensive. Display/graphic only — fails contrast for body text |
| Burnt orange | `#C15A2C` | Interactive accent only (buttons, links), sparingly |

No other colors. No gradients except atmospheric gold light on midnight (radial, subtle, masked).

## Typography

**Space Grotesk** only. SemiBold/Medium display vs Regular body at **extreme scale** (≥3× display:body, ≥1.25× adjacent levels). Tracked small-caps eyebrows in gold, each with a hairline rule. Tabular "drafting" numerals for dates, counts, stats. Sharp radii site-wide (2–4px). **Sentence case everywhere** — headings, buttons, labels. Never: Inter or any default sans; serif-italic accent words; ALL-CAPS body sections.

## The signature element

A **drafted gold hairline system with drafting semantics**: 1px lines carrying dimension ticks and section markers, converging toward vanishing points — construction lines on an architect's drawing. Asymmetric, directional. If a layout reads "newspaper broadsheet," it is wrong; it should read "drafting table." This motif is the site's one repeated visual signature — everything else stays quiet.

## Layout laws

- Asymmetric, left-aligned heroes (≈5/7 splits). Never: centered hero + pill badge + two centered buttons.
- Section rhythm varies deliberately; midnight and cream sections alternate like drawing sheets.
- Cards exist once per page at most, as **thresholds** (gold top rule + meaningful drafting number), varied in width/height — never three identical icon-top cards.
- One dark donor section per page maximum, near the footer. Donors never touch a hero.
- Numbered markers only where sequence is real (agenda days, application steps).

## Motion laws

One orchestrated signature move per page: **corridor lines draw in** (with ticks), content staggers 30–80ms behind them. Everything else: <300ms, ease-out (`cubic-bezier(0.23,1,0.32,1)`), transform/opacity only, exits faster than entrances, nothing bounces, hover effects don't scale images. Countdown = monospace metadata in the hero meta row, never a billboard. Reduced motion: everything degrades to fades.

## Voltage map

| Surface | Voltage | Register |
|---|---|---|
| Home, About, Donate, Contact | 2–3 / 10 | Composed, editorial — "Hampton's composure, opened up" |
| Summit page | 4–5 / 10 | "A gala invitation with a festival heartbeat" — grandeur from type, light, drawn lines at scale |
| Founders After Hours | 4 / 10 | Warmest page; the tally-draw is its one festival gesture |

**One festival gesture per page** (Summit: the gold ticker; FAH: the tally-draw) — never stacked.

## Photography

Real founders, working — warm, **navy-tinted grade** + subtle grain so all sources read as one set. Black-culture-rooted warmth; achievement and effort, never stock-posed "team laughing at laptop." No AI-styled illustration, no 3D blobs, no emoji anywhere in UI.

## The refusal catalog (these mark a design as AI-generated — never ship them)

1. Centered hero: badge + H1 + subhead + two buttons
2. Three identical feature cards, icon on top
3. Colored 3–4px left-border strips on cards/quotes
4. Purple→indigo gradients; gradient text; colored glows
5. Glassmorphism / backdrop-blur cards
6. Emoji as icons; giant icon containers
7. Uniform radius + uniform padding everywhere (the default-shadcn fingerprint)
8. Stat-banner rows and 01/02/03 strips as filler
9. ALL-CAPS eyebrows on every section with crushed tracking
10. Low-contrast grey-on-dark body text
11. Bounce/elastic easing; animate-everything entrances; hover-scale images
12. Stock/AI imagery; mixed illustration styles
13. Card-in-card nesting
14. Title Case Headings; bold-keyword confetti
15. The three "tasteful AI defaults": cream+serif+terracotta page · near-black+acid-green · generic hairline broadsheet
16. Wasted title tags ("Home | …"); mushy CTA labels ("Learn More," "Submit," "Get Started")

## Microcopy rules (when a label or state must be written)

The copy files are final — never rewrite them; keep `[BRACKETED]` placeholders exactly. When a small label is genuinely missing: buttons say what happens ("Save your seat," never "Learn More"); errors are direct and warm ("That email doesn't look right — one more look?"); sentence case; plain verbs. **v1.1 (Jul 10): "donate"/"donation" are banned words site-wide for now; no "free" claims on the Summit (pay-what-you-want) or Founders After Hours (paid membership from $39/mo).** Banned words: delve, seamless, elevate, empower, unlock, leverage, robust, vibrant, cutting-edge, world-class, journey (except where the copy files already use it). At most one em-dash construction and one "not just X, but Y" per page — the copy files already spend those budgets.

## The self-check before presenting any design

1. Would this appear for *any* similar nonprofit/startup brief? If yes, revise the matching parts — say what changed.
2. Point at the signature element and say what it means in Ventriq's world (corridor, threshold, drafting).
3. Count gold per viewport: more than ~5 appearances means it has stopped being expensive.
4. Quality floor, silently: responsive to 390px, visible focus states, AA body contrast, reduced-motion respected.
