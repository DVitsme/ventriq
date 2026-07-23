# Handoff: Ventriq Website (full design system + 6 pages + global components)

## Overview

This bundle documents the complete design phase for **Ventriq** (pronounced ven-TREEK) — a new Baltimore-rooted nonprofit that equips founders with **capital, programming, and council**. It covers the visual identity system, the homepage, the Summit event page, the Founders After Hours community page, About, Donate, Contact, and the global component set (announcement bar, footer, form states, 404).

Brand concept everything derives from: **venture + corridor** — two lines converging to a vanishing point, reading as a V, a corridor, and a threshold ("a room worth getting into"). Identity in one line: **"an architect's line, not an accelerator's rocket."**

## About the design files

Everything in `design-refs/` is a **design reference created in HTML** — prototypes showing intended look, copy placement, and behavior. They are NOT production code. The task is to **recreate these designs in the target codebase's environment** (the build notes in `copy-source/` assume Next.js — schema-dts JSON-LD, Resend/react-email, Stripe embedded, Turnstile, Eventbrite handoff — but use whatever the project has established; if nothing exists yet, Next.js + React is the intended stack).

Each `.dc.html` file opens directly in a browser (keep `support.js` beside them). Each contains **multiple labeled frames on one canvas**: desktop 1440, mobile 390, and state variants. Frames carry small gold ID badges (`1a`, `1b`, `1c`…) and `data-screen-label` attributes naming the page/section.

## Fidelity

**High-fidelity.** Colors, type sizes, spacing, copy, and interaction states are final design intent. Recreate pixel-faithfully. Two exceptions:
1. **Photography** — every image is a treated placeholder block (navy-graded gradient + grain + a `[PHOTO: …]` label). Real photography replaces these with the same grade applied (see Design tokens → Photography).
2. **Bracketed chips** — copy like `[TIME ET]`, `[ANNOUNCE-DATE]`, `[EIN — …]` is rendered as dashed "redline" annotation chips. These are unresolved content/legal placeholders, deliberately visible. Keep them bracketed until the copy source resolves them. Never invent values.

## Design tokens (locked — do not invent alternatives)

Colors (no others exist; no gradients except the gold atmospheric light):
- **Midnight `#101B2D`** — dominant ground; the brand is wrapped in navy
- **Cream `#F1ECDF`** — light reading field (leads only on About/Contact)
- **Ink `#0B0F16`** — text on cream; also the announcement-bar/nav-adjacent near-black
- **Gold `#C9A24C`** — THE signature: hairline rules, corridor/tally lines, key numerals, focus rings, `::selection`, solid primary buttons. Display/graphic use; fails contrast for body text. Budget: ≤5 appearances per viewport (a multi-line drawing counts as one system)
- **Burnt orange `#C15A2C`** — interactive accent: text links on midnight, error borders. On cream, links darken to **`#AF5026`** for AA (derived shade, part of the system)
- Gold hover shade: `#BB9440` (derived). Gold atmospheric light: `radial-gradient(... rgba(201,162,76,0.10), transparent 70%)`

Typography — **Space Grotesk only** (Google Fonts, 400/500/600):
- Display: 500–600 weight, extreme scale vs body (≥3×). H1s: 60–76px desktop / 34–42px mobile, line-height 1.04–1.1, letter-spacing −0.015em
- Body: 400, 15.5–20px, line-height 1.55–1.7
- Eyebrows: `font-variant: small-caps` applied to lowercase source text, letter-spacing 0.14–0.16em, gold on midnight (`#C9A24C`), ink 65% on cream, always paired with a 32–44px × 1px gold rule
- Numerals: `font-variant-numeric: tabular-nums` everywhere numbers appear ("drafting numerals")
- **Sentence case everywhere** — headings, buttons, labels. Never Inter. No italics.

Spacing / geometry:
- Border radius: **2px everywhere** (badges, cards, buttons, fields, photos)
- Shadows: **none** (the only box-shadows are focus rings: `0 0 0 1px #C9A24C`)
- Borders: 1px. On cream: `rgba(11,15,22,0.18)` cards / `0.12` internal rules / `0.2` first rule of a ruled list. On midnight: `rgba(241,236,223,0.13–0.16)` cards / `0.15` rules / `0.1` chrome hairlines
- Desktop frame 1440, gutter 80px; mobile 390, gutter 20px
- Threshold cards: 2px gold top rule + content; varied widths/staggered tops, never three identical
- Redline chips (unresolved placeholders): 1px dashed border 35% fg, 2px radius, 10–11px text

Buttons (labels come ONLY from `copy-source/00-global.md` inventory — never "Learn More"/"Submit"):
- **Primary**: solid gold `#C9A24C`, ink text, 600 weight, padding ~15px 24px, hover `#BB9440`, focus ring 2px cream (on midnight) / ink (on cream)
- **Secondary**: 1px gold-outline (`rgba(201,162,76,0.75)`), gold text, hover `rgba(201,162,76,0.12)` fill
- **Text links**: orange (see colors), arrow `→` suffix as affordance

Photography grade (applies to all real images): warm base → navy shadow, e.g. `linear-gradient(165deg, oklch(0.42 0.05 60), oklch(0.3 0.03 255) 62%, #101B2D)` + navy tint overlay `rgba(16,27,45,0.5→0.15)` + fine SVG turbulence grain at ~15–30% opacity. Real founders working; never stock-posed.

## The signature element

A **drafted gold hairline system with drafting semantics**: 1px lines carrying dimension ticks (4.5px perpendicular strokes) and section markers, converging toward vanishing points marked with a crosshair (2.2px dot + four 6px dashes). Asymmetric and directional — rules end in a solid triangle marker, then a short 35%-opacity continuation. If it reads "newspaper column rules," it's wrong; it reads "drafting table." Per-page variants: corridor rays (Home/Summit), tally strokes in fives (FAH), the monogram V-draw (About), the dead-end line (404).

## Screens / files

Every page frame includes global chrome: announcement bar (ink `#0B0F16`, one line, dismissible ×) → nav (78px, wordmark left; links **The Summit · The Mastermind · About**; right: Donate gold-outline + Register for the Summit solid gold) → sections → footer (midnight, gold hairline over legal). **Founders After Hours is currently hidden from nav/footers by client decision ("for now")** — its page is designed and ready; FAH mentions remain in Summit/About/FAQ body copy per the copy files.

### `Ventriq Home.dc.html` — voltage 2–3
- 1a desktop / 1b mobile. Hero: midnight, 5/7 left split, corridor rays draw in (the page's ONE motion move), eyebrow `ven-TREEK · a nonprofit for founders`, H1 "The resources are out there. / They're just camouflaged." (62px, two lines), gold primary + orange quiet link.
- S2 proof band: cream, ink tabular facts with 1px gold tick separators, gold dimension line below running past the last item into a triangle marker + faint continuation.
- S3 "Two ways in." — two threshold cards (1.25fr/1fr, second staggered 34px), gold top rules, gold start-date numerals (Aug 10 / Sep), orange action links.
- S4 midnight: "One structure. Two doors." + drawn diagram: two labeled gold lines with mid-line ticks converge through a crosshair into a doorway (two jambs, 60%-opacity lintel, 2px threshold line, exit line + marker).
- S5 letter (cream, portrait right), S6 three ruled quote columns (tick-rule above each, NOT cards), S7 the one dark donor section (gold rule with marker, Donate solid gold + Sponsor outline), S8 Founder Digest single field, footer.

### `Ventriq Summit.dc.html` — voltage 4–5 ("gala invitation with a festival heartbeat")
- 1a desktop (hero **State A**), 1c hero **State C** (live day), 1d hero **State E** (post-event), 1b mobile. The hero is one component; states swap eyebrow/H1/sub/CTA/meta only (see `copy-source/08-event-motion-copy.md` for the full state machine incl. B and D).
- Hero A: H1 in two staged beats "Not just education." / "Implementation." — a 440px gold rule (1.5px) draws beneath beat two + end tick; sub in two staged lines; countdown = **drafting metadata**, never a billboard: label "Doors open in" over small-caps tabular `aug 10–21 · [TIME ET] · zoom · $0 · t-[D]D.[H]H.[M]M`.
- Ticker (the page's ONE festival gesture): slow marquee ~46s linear, small-caps gold 0.22em tracking, `a room worth getting into · aug 10–21 · free · one hour a day ·`, aria-hidden duplicate, single bottom rule with left end-tick, disabled under reduced-motion.
- S2 "shape of it" merged with the corridor-draw scene: rays draw on scroll while numerals count up 8·8·1·2 (+static $0), 66px gold tabular; captions "Eight sessions." → "One door." → "Walk through." land 550ms apart.
- Manifesto: scroll-lit word-by-word, dim gold `rgba(201,162,76,0.38)` → cream, 38px/1.5, max 28ch.
- Steps 1/2/3 (step 3 carries a small doorway glyph), speaker wall PENDING (8 frames: corner registration marks in gold, plotter bust outline `rgba(241,236,223,0.25)`, `speaker 01…08`, "Announced [ANNOUNCE-DATE]") + one REVEALED swap card (photo / name / title / `day 01 — aug 10` gold chip); agenda two-week grid + the three row states (upcoming / gold-ruled TODAY · JOIN LIVE / REPLAY IN THE COMMUNITY →); who-it's-for rules; letter; sponsor threshold card; 8-item FAQ accordion (gold + rotates 45°); final CTA with small countdown. Grain + gold light field on midnight sections.

### `Ventriq Founders After Hours.dc.html` — voltage 4, the belonging page
- 1a desktop / 1c post-launch tally variant / 1b mobile. Hero: tally strokes in groups of five (2px round caps, per-stroke jitter ±2px, group rotation ±2°, diagonal strike on completed groups, one group stopped at 3) draw behind "We'll count it." — the page's one gesture, NO ticker, no corridor rays.
- Role doors (Join the room / Show up / Bring your challenge) — thresholds, no numerals (roles aren't a sequence).
- Run-of-show "The hour, mapped": rows 7:00/7:15/8:15/8:30 (24px tabular, orange `#AF5026`), each row's 1.5px gold rule draws then text fades, staggered 350ms — scroll-triggered via paused CSS animations. Photo strip beside (3 slots).
- "The board doesn't lie." pull-quote; tally counter section: 160px gold `0` + "starts at zero — on purpose" + beats Calls made. / Emails sent. / Wins counted.; 1c shows the `[N]` post-launch swap. Digital-home two-column with Skool screenshot slot; Baltimore card + dashed "Your city" invitation card; FAQ; final CTA.
- **Skool honesty rule**: the sentence "Joining takes about two minutes — you'll create a free Skool account (that's the platform the community runs on) and land inside." sits under EVERY Join free on Skool button.

### `Ventriq About.dc.html` — voltage 2, the one cream-led page
- 1a desktop / 1b mobile. Cream hero with faint static corridor pair behind; story at ~880px measure with margin drafting labels (2015 / 2017 / the decade since / the pattern / 2026 — numerals 24px tabular, small-caps for non-dates, each with a 14px gold tick); two designed quotes from the copy's own lines ("What do you like?" as an in-flow display break; the AFRO quote as the ruled pull-quote).
- S3 signature: the monogram drawn — ink stroke then gold stroke (3px, 1.6s each) converge to a crosshair over an 80px gold threshold line; scroll-triggered. Mission = midnight card (gold top rule, 30px cream statement, three ruled pillar rows). Skin-in-the-game trust block; ruled bio block; council = pre-launch line + 4 dashed silhouette slots; midnight final CTA.

### `Ventriq Donate.dc.html` — voltage 2–3, outcomes not need
- 1a desktop / 1b mobile. Split hero, **form above the fold** (cream card on midnight): presets $25/$50/$100/$250 as selectable mini-thresholds (selected = 3px gold top border + ink border + 10% gold fill), custom field, monthly toggle (38×22px, 2px radius, gold when on) labeled "Make it monthly — builders need Tuesdays, not just galas", drafted impact equivalents behind their `[VERIFY]` chip, submit label live-updates: "Back the builders — $50/month". Receipt line with the pre-501(c)(3) legal chip.
- Per-program threshold cards; tithe trust block; dark `#sponsor` card (anchor id) with Sponsor the Summit → + Talk partnerships →; flagged close quote.

### `Ventriq Contact.dc.html` — the simplest page
- 1a desktop / 1c thank-you state / 1b mobile. Gold rule (no eyebrow text) + "Talk to us."; form card: Your name / Your email / What's this about? (select with drawn gold chevron data-uri) / Your message / **Send it**; "Prefer email? [EMAIL]". Three ruled quick routes (Press & speaking · Chapter organizers · Justin, directly). No map, no office-hours theater. 1c: "Got it." + two CTAs.

### `Ventriq Global System.dc.html`
- 1a announcement bar ×3 states (pre / live with gold dot / post), 1b canonical footer WITH the Founder Digest field (page footers currently omit it — adopt this canonical version in build), 1c mobile footer, 1d form states (default / gold-ring focus / error: `#C15A2C` ring + `#AF5026` message "That email doesn't look right — one more look?" / success row with drawn gold check / Turnstile line "One quick check — no puzzles, promise."), 1e/1f the 404 (line draws past two ticks and dead-ends at a 2.5px wall tick; "This corridor doesn't go anywhere.").

### `Ventriq Style Foundation.dc.html`
Phase-1 specimen sheets (hero study + core components + original 3-door homepage). Historical reference — later pages supersede it where they differ.

## Interactions & motion (laws)

- **One orchestrated signature move per page**; everything else <300ms, ease `cubic-bezier(0.23,1,0.32,1)`, transform/opacity only, nothing bounces, hovers never scale images.
- Line draws: SVG `pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"` animating dashoffset→0. Scroll-triggering is done by rendering the animation `paused` and flipping `animation-play-state` to `running` when the section enters ~80% viewport (rAF + getBoundingClientRect in the prototypes; IntersectionObserver is fine in production).
- Entrance staging: hero children fade/translateY(10px) with 0.15–1.9s delays.
- **Reduced motion: everything degrades to instant/fades** — lines render complete, marquee stops, word-lighting completes. Already implemented via `@media (prefers-reduced-motion: reduce)` in every file.
- Countdown (`T-[D]D.[H]H.[M]M`) is a client island in production; prototypes keep it as a bracketed placeholder.
- FAQ = native `<details>`; gold `+` rotates 45° when open.
- Donate form state: `sel ('25'|'50'|'100'|'250'|'custom')`, `monthly (bool)`, `custom (string)`; custom focus selects custom.

## State machines (build these, don't fork pages)

1. **Summit hero** — states A–E in `copy-source/08-event-motion-copy.md`; hero, agenda rows, announcement bar, and nav primary CTA flip together on the calendar.
2. **Announcement bar** — pre / during / post (Global System 1a).
3. **Nav primary CTA** — Register for the Summit → Apply for the Mastermind (Aug 22–cohort close) → Join Founders After Hours.
4. **Speaker cards** — pending → revealed (Summit 1a shows both).
5. **Agenda rows** — upcoming → today → replay.
6. **FAH tally** — zero-on-purpose → `[N]` live count (FAH 1a vs 1c).
7. **Forms** — default → focus → error (in-voice strings) → success (Global System 1d).

## Copy is law

`copy-source/*.md` is the single source of truth — **final, not to be rewritten**. Bracketed placeholders stay bracketed. Voice rules live in `skill-ventriq-voice.md` + `skill-human-copy.md` (ban list, density budgets, faith calibration, verified-claims rules) — they override everything when new microcopy is unavoidable. Current deviation from copy files by client instruction: **FAH is removed from the homepage and hidden from global nav "for now"** (home headings adjusted: "Two ways in." / "One structure. Two doors."; S4 body: "The Summit opens the door. The Mastermind is the work behind it. …"; S7 drops "a chapter launched in a new city"; proof band's Baltimore fact reads "rooted here, built to travel").

## Assets

- `assets/ventriq-wordmark-color.svg` — ink wordmark + gold tick (recolor fills per ground: cream text on midnight; the gold tick never changes)
- `assets/ventriq-monogram-duo.svg` — ink/gold V monogram (footer + 404 use it at 28–34px)
- Grain + select-chevron are inline data-URI SVGs inside the files (search `feTurbulence` / `M1 1 L6 6`)
- Space Grotesk via Google Fonts

## Open items (blockers carried in the design as redline chips)

[TIME ET] session time · [ANNOUNCE-DATE] lineup date · [APP-OPEN DATE] · [EVENTBRITE-URL] · [SKOOL-URL] · [EMAIL] · [FORM/EMAIL] chapter form · [DATE when set] Baltimore founding night · $[X] Mastermind seat cost + all impact equivalents (VERIFY with Justin) · [EIN + 501(c)(3) language — only after determination letter] · [MISSION ratification + COUNSEL-REVIEW on audience wording] · [TESTIMONIAL PERMISSIONS] · [STATS receipts confirmation] · [TITHE wording] · two ⚠️ quotes needing audio verification · advisor roster TBD · press-kit page post-launch.

See `docs/decisions-log.md` for the full phase-by-phase history and `docs/how-to-request-updates.md` for the conventions your update prompts should follow.
