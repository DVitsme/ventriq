# Build spec — Ventriq marketing site (Next.js 16)

## 1 · Tokens (Tailwind v4 `@theme`)

```css
@theme {
  --color-midnight: #101B2D;  /* dominant ground */
  --color-cream:   #F1ECDF;   /* reading field */
  --color-ink:     #0B0F16;   /* text on cream; announcement-bar ground */
  --color-gold:    #C9A24C;   /* signature: rules, lines, numerals, focus, primary buttons */
  --color-gold-hover: #BB9440;
  --color-accent:  #C15A2C;   /* links on midnight; error borders */
  --color-accent-deep: #AF5026; /* links on cream (AA) */
}
```
No other colors. Only gradient allowed: gold atmospheric light `radial-gradient(… rgba(201,162,76,0.10), transparent 70%)` + the photo grade (§7). Opacity steps used throughout: cream text on midnight 0.85/0.82/0.75/0.6/0.55; ink text on cream 0.88/0.78/0.75/0.7/0.6/0.55; borders: cream 0.3/0.16/0.15/0.13/0.1 · ink 0.35/0.3/0.25/0.2/0.18/0.15/0.12.

**Type:** Space Grotesk via `next/font/google`, weights 400/500/600, `display: swap`, no other family. Display 500–600 at ≥3× body. Eyebrows: lowercase source + `font-variant: small-caps`, tracking 0.14–0.16em, always paired with a gold hairline (44px×1px desktop / 32px mobile). All numerals `font-variant-numeric: tabular-nums`. **Sentence case everywhere.** Radius 2px. Shadows: none (focus rings only: `0 0 0 1px #C9A24C`, or 2px outline cream-on-gold / ink-on-gold buttons). `::selection` gold/midnight.

## 2 · Layout

Desktop design width 1440, gutter 80px; mobile 390, gutter 20px. Content max-widths as in refs (heroes ~940–960px, reading measure 880px, cards grid 1060–1240px). Between breakpoints: fluid container, same gutters ≥1024 (48–80px scale), stack at <768 following the 390 frames. Asymmetric left-aligned heroes (~5/7); never center-stack hero content.

## 3 · Global chrome (every page)

**Announcement bar** (`AnnouncementBar`, ink ground, one line, dismissible × — persist dismissal in localStorage per state):
- Pre (now → Aug 9): `Forge The Future · free · virtual · Aug 10–20 — Save your seat →` (→ Luma)
- During, session days Mon–Thu Aug 10–20: `Forge The Future is live — tonight: [NIGHT-TITLE], 6:30 PM ET →` + 6px gold square dot
- Post (Aug 21 →): `Missed the summit? Every replay lives in Founders After Hours →`
- Mobile (≤430px): tighten pre-string to `Forge The Future · Aug 10–20 — Save your seat →` — must stay one line
- Documented default (change freely): Fri–Sun inside the range shows the pre-string (hero handles the "Go build." state)

**Nav** (78px desktop / 60px mobile, hairline bottom `cream/0.1`): wordmark left (`assets/ventriq-wordmark-color.svg`, cream fill + gold tick, 30px h desktop / 24px mobile) · links `The Summit · Founders After Hours · The Mastermind · About` (15px, cream 0.85, active = gold) · ONE button right, time-aware: `Register for the Summit` (→ Luma) until Aug 20 → `Apply for the Mastermind` (Aug 21 – cohort close) → `Join Founders After Hours`. Mobile: hamburger (three lines, third shortened — see refs).

**Footer** (canonical, identical on every page — Global System frame 1b/1c): midnight; grid `1.3fr 0.7fr 0.9fr 1.3fr`; monogram + mission line · Pages (About, Contact) · Programs (The Summit, Founders After Hours, The Mastermind) · Contact col with `[EMAIL] · Baltimore, MD` + **Founder Digest** field (heading, one-liner, email input + `Send it to me`, "No spam. Unsubscribe anytime.") · gold hairline · legal line `© 2026 Ventriq. A nonprofit organization.` + EIN redline chip · small links Privacy · Contact · Press kit · **Instagram → https://instagram.com/ventriqofficial**.

## 4 · Routes & per-page maps

Frames: every section below has a `data-screen-label` match in the design-ref. Section order is law.

| Route | Ref | Sections (desktop frame 1a; mobile 1b) |
|---|---|---|
| `/` | Ventriq Home | Hero (corridor draw-in, eyebrow `ven-TREEK · a nonprofit for founders`, H1 2 lines 62px, [COUNSEL-REVIEW] chip in sub, gold `Register for the Summit`, quiet `Or step into the community → Founders After Hours`) → proof band (4 facts, gold tick separators, dimension rule w/ arrow + faint continuation) → S3 `Three ways in.` (3 thresholds: numerals **Aug 10 / $39 / Sep**, staggered tops 0/30/56px) → S4 `One structure. Three doors.` (3-line convergence diagram → crosshair → doorway) → S5 founder letter + portrait → S6 three ruled quote columns (staggered) → S7 sponsors-only (`Put a name behind the builders`, gold `Sponsor the Summit` → /contact?topic=sponsorship, quiet `Talk partnerships →` + [EMAIL] chip) → footer (Digest lives here — no standalone newsletter section) |
| `/summit` | Ventriq Summit | Announcement/nav → **hero state machine** (§5) → ticker `forged together · built to last · aug 10–20 · free · eight nights ·` (46s marquee) → corridor-draw scene (count-up **8 · 8 · 90 · 2**, beats `Eight nights. / One door. / Walk through.`) → manifesto (scroll-lit dim-gold→cream, 38px/1.5, 28ch) → How it works (3 numbered steps, doorway glyph on 3) → The 2026 speakers (intro + `Get the speaker announcement →`, **pending wall**: 5-col grid, 15 numbered drafting-frame tiles w/ corner registration marks + bust outline; revealed-card sample: photo/[NAME]/[TITLE, COMPANY]/chip `night 0[n] — aug [dd]`; grid grows rows to 30+, grouped-by-night headers once mapped) → `Two weeks, mapped` (week cols Mon–Thu, real titles, [SPEAKERS] chips, dashed `AUG 14–16` off-block, footer line, row states: tonight = gold top rule + `tonight · join live 6:30 PM ET`; past = `replay in the community →`) → Who it's for (3 ruled rows + closer) → letter → sponsor card (midnight, gold top rule → /contact?topic=sponsorship) → FAQ ×8 (`details`, gold + rotates 45°) → final CTA + small countdown → footer |
| `/founders-after-hours` | Ventriq FAH | Hero (tally strokes draw, eyebrow `a Ventriq community · Baltimore first`, `Join Founders After Hours`, meta `From $39/month · cancel anytime` + [POLICY] chip, quiet chapter link) → Three doors in (role cards) → `The hour, mapped` (run-of-show rules draw 7:00/7:15/8:15/8:30, orange times, photo strip) → Why it works + pull-quote `"The board doesn't lie."` → **Membership** `Two ways to hold a seat.` (Digital **$39**/mo wider card; In person **$[89–99]**/mo + [PRICE] chip, 15–25 cap line; HRPB on-ramp line + [HRPB] chip) → tally counter (zero-on-purpose; post-launch `[N]` variant = frame 1c) → digital home (what's-inside ruled list incl. grants-and-funding feed; handoff sentence + [PLATFORM — Skool TBC] chip; [SCREENSHOT] slot) → chapters (Baltimore card + dashed Your-city card) → FAQ ×6 (cost / why-isn't-it-free first) → final CTA (`From $39/month · replays, office hours, the board`) → footer |
| `/mastermind` | Ventriq Mastermind | Hero (eyebrow `cohort 2 · September–December 2026 · 10 seats`, one CTA + committee line) → This is for you if (4 tick rows + exclusion line) → Ninety days, three pillars (structure-line diagram) → `The format, stated plainly` (midnight spec sheet: length/sessions/cohort/between/graduation/investment — investment row Variant A `$[INVESTMENT]` default; Variant B frame 1c, tweak `investmentVariant`) → What graduates leave with → The application, step by step (4 dated stages) → founder letter + flagged pull-quote → FAQ ×8 → `Declare it. Track it. Build it.` → footer |
| `/about` | Ventriq About | Cream-led. Hero (eyebrow `ven-TREEK · est. Baltimore, 2026`, portrait right, faint static corridor pair) → story at 880px measure (margin drafting labels 2015/2017/the decade since/the pattern/2026; two in-copy pull-quotes) → `Why "Ventriq"?` (monogram V-draw on scroll: ink stroke, gold stroke, ticks, crosshair, threshold line) → mission (midnight card, 3 pillar rows) → Skin in the game (tithe, [TITHE] chip — the only page carrying it) → bio block → council (pre-launch line + 4 dashed silhouette slots) → final CTA → footer |
| `/contact` | Ventriq Contact | Gold rule + `Talk to us.` → form card (Your name / Your email / What's this about? select: **Pick one** placeholder, The Summit, Founders After Hours, The Mastermind, Sponsorship & partnerships, Press, Something else / Your message / `Send it` / "Prefer email? [EMAIL]") → 3 ruled quick routes → footer. Thank-you state (frame 1c): `Got it.` + 2 CTAs. Support `?topic=sponsorship` preselect. |
| `/donate` | — | **Does not exist.** Redirect → `/contact?topic=sponsorship`. Keep out of sitemap. (Design parked in ref; build when filings clear.) |
| 404 | Global System 1e/1f | Corridor line draws past two ticks, dead-ends at a 2.5px wall tick; `This corridor doesn't go anywhere.`; links Home · The Summit · Founders After Hours · [EMAIL] chip |

## 5 · State machines

1. **Summit hero** (frames: 1a=A, 1c=C, 2a=D, 1d=E; full copy in `08-event-motion-copy.md`): A pre-announcement (default) → B lineup announced (sub line 2 swap) → C session night (`tonight · night [n] of 8`, night title as H1, `Join live`, countdown label `Live in` → `LIVE NOW` during) → D Fri–Sun between weeks (`between sessions` / `Go build.` / `Catch the replays` + outline `Save your free seat`) → E post (`Forge The Future · August 2026` / `The room keeps what you missed.` / `Join Founders After Hours`). Hero, agenda rows, announcement bar, and nav CTA flip together off the same calendar util.
2. **Announcement bar** pre/during/post (§3).
3. **Nav primary CTA** (§3).
4. **Speaker cards** pending → revealed (needs [ANNOUNCE-DATE] + mapping + original headshots).
5. **Agenda rows** upcoming → tonight → replay.
6. **FAH tally** zero-on-purpose → `[N]` live count (NumberFlow-style count-up).
7. **Forms** default → focus (gold ring) → error → success (Global System frame 1d shows all four + strings).

## 6 · Forms & integrations

- **Summit registration:** external → `https://luma.com/lp9z8iav` (microcopy under CTA: "Registration runs on Luma — about a minute, free."). No on-site form.
- **Newsletter (footer):** Server Action + zod; Resend audience/Kit. Success: "You're on the list. First Digest lands this week."
- **Contact:** Server Action + zod, shared schema with react-hook-form; Turnstile ("One quick check — no puzzles, promise."); errors in voice: empty "We need this one." · email "That email doesn't look right — one more look?" · short "Give us a sentence or two more to work with." Success: "Got it. A real person reads every one — expect a reply within two business days."
- **FAH join:** `[SKOOL-URL]` placeholder link; tier checkout happens on the platform.
- **Mastermind:** `Start your application` → application route/form is a later phase ([APP-OPEN DATE]); stub to contact until then.
- **Transactional email** (Resend + react-email, .ics attached): subject `You're in — Forge The Future, Aug 10–20`; body verbatim in `00-global.md`.
- **Countdown:** tiny client island; target Aug 10 2026 18:30 ET; renders `T-[D]D.[H]H.[M]M` into the meta row (never a billboard). Labels: `Doors open in` / `Live in` / `LIVE NOW`.

## 7 · Images

`PhotoGrade` wrapper (until real photography): container bg `linear-gradient(165deg, oklch(0.42 0.05 60), oklch(0.3 0.03 255) 62%, #101B2D)` + navy overlay `linear-gradient(0deg, rgba(16,27,45,0.5), rgba(16,27,45,0.15) 55%)` + SVG turbulence grain (baseFrequency 0.85, 2 octaves, ~0.3 alpha for photos / 0.07 for section atmosphere) + bottom-left label. Real images: next/image, same grade as overlay. Speaker headshots: request originals — the IG comps in `assets/reference-artwork/` are croppable to ~250px only and carry an amber glow that must NOT be replicated on the web (navy grade instead).

## 8 · SEO / meta

Per-page title/description/OG verbatim from each copy file's header. **Event JSON-LD on /summit** (schema-dts): name `Forge The Future Virtual Summit`, `OnlineEventAttendanceMode`, `VirtualLocation`, free offer, startDate 2026-08-10T18:30-04:00, endDate 2026-08-20T20:00-04:00 (note: the Luma listing itself misdeclares offline mode — ours must be correct). `sitemap.ts` + `robots.ts`, canonicals, branded per-page OG via `next/og` (page name + one line + corridor mark on midnight). Never "Home | Ventriq".

## 9 · Placeholders registry (`content/placeholders.ts`)

`[EMAIL]` · `[SKOOL-URL]` · `[ANNOUNCE-DATE]` · `[SPEAKERS]` per night · `[NIGHT-TITLE]/[DAY]/[n]` (state machine fills from agenda data) · `[APP-OPEN DATE]` · `[APP-DEADLINE]` · `[DECISION-DATE]` · `[COHORT-DATES]` · `$[INVESTMENT]` + variant A/B · `$[89–99]` FAH in-person price · `[POLICY]` cancel terms · `[PLATFORM — Skool TBC]` · `[HRPB]` link · Baltimore founding-night `[DATE]` · `[FORM/EMAIL]` chapter interest · `[EIN]` + the no-deductibility legal rule · `[TESTIMONIAL PERMISSIONS]` · `[TITHE]` wording · two ⚠️-flagged quotes (About/Mastermind/Donate-parked) · `[COUNSEL-REVIEW]` audience wording · PWYW replacement sentence for Summit team-FAQ (copy deck owes it). Render all via `RedlineChip` (1px dashed 35% fg, 2px radius, 10–11px).

## 10 · Non-negotiables (from ventriq-stack, unchanged)

SSR'd content on every page (no empty shells) · semantic landmarks, one h1/page, visible focus, AA (gold never body text) · `prefers-reduced-motion` honored by every animation (see motion-spec) · next/image, no CLS on font swap · Lighthouse ≥95 · RLS on, anon key only in browser, validated env · restyled shadcn (2px radius, no shadows, brand type scale) · gold ≤5 appearances per viewport (a multi-line drawing = one system) · banned words: donate/donation (site-wide, for now), Learn More/Submit/Get Started/Discover, and the ventriq-voice ban list.
