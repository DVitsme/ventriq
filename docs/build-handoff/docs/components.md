# Component inventory

Build these once, restyle shadcn underneath where useful. Exact px in the design-refs; system rules here.

**Chrome:** `AnnouncementBar` (3 states, dismissible, mobile-tightened string) · `SiteNav` (time-aware single button, active link gold) · `SiteFooter` (canonical, Digest form inside) · `Wordmark` / `Monogram` (SVGs in `assets/`; wordmark = cream glyphs + gold tick on midnight; monogram cream/gold duo).

**Drafting system (the signature — all SVG, 1px gold):**
- `CorridorLines` — construction rays converging to a crosshaired vanishing point (2.2px dot + four 6px dashes), per-ray opacity 0.35–0.7, dimension ticks (4.5px perpendicular) at fractional stops; draw-in via `pathLength=1; stroke-dasharray:1; stroke-dashoffset:1→0`. Per-page ray sets differ — copy coordinates from the refs' logic (search `rays:` in each .dc.html).
- `DimensionRule` — section rule with start tick, mid ticks, solid triangle end-marker, then 35%-opacity continuation. Asymmetric lengths only; never full-width uniform rules.
- `TallyStrokes` (FAH only) — groups of five 2px round-cap strokes, ±2px jitter, ±2° group rotation, diagonal strike on complete groups, one group intentionally at 3.
- `ConvergenceDiagram` (Home S4), `PillarDiagram` (Mastermind S3), `DoorwayGlyph` (Summit step 3), `DeadEndLine` (404).

**Content:** `Eyebrow` (rule + small-caps) · `ThresholdCard` (2px gold top rule + drafting numeral + varied widths/staggered tops — never three identical) · `RedlineChip` · `DraftingMeta` (tabular meta row) · `PullQuote` (tick-rule + 500-weight quote + attribution) · `RuledList` (border-top rows, 0.2 first / 0.12 rest) · `FAQItem` (native `details`, gold + rotates 45°, 0.25s) · `PhotoGrade` · `SectionAtmosphere` (radial gold light + 0.07 grain).

**Event:** `Ticker` (46s linear marquee, aria-hidden duplicate, motion-safe) · `Countdown` (client island, T-DD.HH.MM) · `CountUpScene` (numerals 0→target, 1.1s cubic ease-out, scroll-triggered once) · `Manifesto` (per-word dim-gold→cream on scroll progress) · `SpeakerWall` + `SpeakerTilePending` (corner registration marks + bust outline + `speaker NN`) + `SpeakerCardRevealed` (PhotoGrade, name, title/company, night chip) · `AgendaWeek` + `AgendaRow` (upcoming/tonight/replay) · `OffBlock` (dashed `AUG 14–16`).

**FAH:** `RunOfShow` (rule draws 0.6s → text fades +0.35s, rows 350ms apart, scroll-gated) · `TallyCounter` (zero state / `[N]` count-up) · `MembershipTiers` (Digital wider + In person staggered) · `ChapterCards` (solid Baltimore / dashed Your-city).

**Mastermind:** `SpecSheet` (midnight card, small-caps labels + tick, tabular values, investment Variant A/B) · `ApplicationSteps` (4 gold numerals, staggered tops, dated chips).

**Forms:** `Field` (default/focus gold ring/error orange ring + in-voice message/success row with drawn gold check) · `TopicSelect` (Pick one placeholder + gold chevron data-URI) · `DigestForm` · `ContactForm` · `TurnstileNote`.

Buttons: `primary` solid gold/ink 600 (hover #BB9440, focus ring cream on midnight, ink on cream) · `secondary` 1px gold-outline (hover 12% gold fill) · `quiet` text link + `→` (accent orange by ground). Labels only from the 00-global inventory.
