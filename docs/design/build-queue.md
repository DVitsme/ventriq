# Build queue — design changes, ranked easiest → hardest

> ⚠️ **SUPERSEDED FOR `/summit` UNTIL AUG 1 (added Jul 29).** Justin delivered a
> formal revision brief with a **hard Aug 1 live date** — 47 changes, 14 of them
> final drop-in copy. Work **`docs/plans/summit-aug-1/`** first; it takes
> precedence over this file for anything touching the summit page. Several
> ranks below are re-scoped by it (the "about a minute, free" deletion becomes a
> *replacement*; the "Who is this for?" heading now arrives with three new
> audience tiers under it). Return here after Aug 1 for everything the brief
> doesn't cover — the speaker flip cards and agenda face thumbnails come from
> the Jul 23 call and are untouched by the brief.
>
> Also from Jul 29: **rank 22 (`lib/brand.ts` membership constant) is promoted
> to a requirement** — the membership is being renamed **The Foundry**, likely
> announced from the stage on Night 1, and the brief wants a deploy-free
> toggle. That only works if the name lives in one place. See
> `docs/plans/summit-aug-1/01-phase-1-research.md` §6.

**State as of: July 29, 2026** (post-commit `2d898d0`).
**What this is:** the working build order for the July 23 design-review changes.
Every item here is buildable **today** — nothing below waits on Justin, an
unanswered question, or another item, unless its row says so. The full intent
and constraints per item live in
[`07-23-2026-design-change-brief.md`](./07-23-2026-design-change-brief.md)
(the §refs below); the complete meeting record is
[`../meetings/07-23-2026-meeting-3-outcomes.md`](../meetings/07-23-2026-meeting-3-outcomes.md).
Blocked items live in [`build-blockers.md`](./build-blockers.md) — they enter
this file only when their blocker clears.

**Rules for using this file:**
1. **Before building anything:** load the `ventriq-design` skill and re-read
   the brief's **§10 constraints** (Space Grotesk only · 7 colours · 2px radius
   · no shadows · gold 2.03:1 on cream = never text · accent #C15A2C 3.9:1 on
   midnight = fails body AA · content visible by default · reduced-motion
   honored · 100/100 a11y is enforced by e2e · no AI-default patterns).
2. Work **top-down** unless the user directs otherwise.
3. When an item ships: check it off, add the date and one line on what was
   actually done (and the commit).
4. When a blocker clears in `build-blockers.md`: insert the freed item here at
   its effort-appropriate rank (the blockers file names each item's entry zone).
5. Line numbers are **≈ and rot** — the grep anchor beside each is the real
   locator. FAH page numbers already shifted +7 on Jul 29 (`SKOOL_URL` block).

---

## Already landed since the tables were drawn (don't re-derive)

- **Skool handoff is LIVE** (Jul 29, commit `2d898d0`): all **five** FAH join
  CTAs point at https://www.skool.com/iamjs-collective-9599/about — hero,
  both membership cards, digital-home, final CTA. Wired at Derrick's explicit
  direction with the group still **free / "IAMJS Collective" / 1 member**
  (concern flagged and recorded). The `SKOOL CHECKOUT — pending group setup`
  chip stays until Justin prices + names the group — that residual is in
  [`build-blockers.md`](./build-blockers.md). ⚠️ A Skool rename changes the
  group URL **which the live site now links** — same-day coordination required.
- Platform-TBC chips retired same commit; "the community runs on Skool" is now
  real copy.

---

## The queue

### 1 · "Who is this for?" heading on /summit — §4.6 · minutes
- [ ] **Where:** `app/summit/page.tsx` ≈316 — the `{/* Who it's for */}` section;
  three audience rows start at the `["Small business owners"` array.
- **Done when:** a section-scale `<h2>` ("Who is this for?") sits above the
  rows, matching the page's other h2s (`text-3xl font-medium md:text-[40px]`).
  Justin said **large** — not a small-caps label.
- **Gotchas:** none. Free a11y win — closes the heading-outline gap the section
  currently has.

### 2 · Contact into the nav — §8 · minutes
- [ ] **Where:** `components/nav.tsx` ≈10–13 — the links array (`{ href: "/summit"…`).
  Currently Summit · FAH · Mastermind · About; no Contact.
- **Done when:** Contact appears in desktop nav + mobile menu. Derrick flagged
  it himself on the call ("I need to put it on the nav bar. Slipping.").
- **Gotchas:** decide order vs. the About removal (blocked item, §7) — if About
  dies first, Contact takes its slot; don't wait for it.

### 3 · FAH run-of-show → real times — §5.4 · minutes
- [ ] **Where:** `app/founders-after-hours/page.tsx` ≈107–113 — grep
  `The hour, mapped` and `TIMES — confirm run-of-show`.
- **Done when:** rows read **6:00 the brief · 6:15 the hour · 7:15 the tally ·
  8:15 the room** (Justin's words, 58:30) and the `[TIMES]` redline chip is
  deleted.
- **Gotchas:** ship his four times verbatim. The 7:15→8:15 tally hour looks odd
  (was 15 min) — that's question **Q7** in the blockers file, ask, don't fix.

### 4 · ScrollLit sign-off — §4.3 / Q9 · minutes
- [ ] **Where:** `components/motion.tsx` (ScrollLit, ≈:80) as used at
  `app/summit/page.tsx` ≈199 (the manifesto).
- **Done when:** Derrick has looked at the lighting treatment against the
  "typewriter" ask and said keep/change. Recommendation on file: **keep** —
  lighting is the architectural metaphor, typewriter is a writing one.
- **Gotchas:** this is a review, not a build. If "change," it becomes a new
  ranked item.

### 5 · Summit CTA → "Save your free virtual seat" — §4.1b-lite · minutes
- [ ] **Where:** `app/summit/page.tsx` ≈129 (hero `LumaRegisterButton`) and
  ≈398 (final CTA); `app/page.tsx` ≈206 (home summit card `cta` label).
- **Done when:** all three say "Save your free **virtual** seat." Keep *free* —
  it's load-bearing after the pay-what-you-want reversal.
- **Gotchas:** this is the cheap half only. The real fix (giving "virtual" a
  different visual *rank*) is item 11; the H1 rewrite is **pinned on Justin (Q2)**.
- **Do in the same pass:** delete the "about a minute, free" microcopy span at
  ≈130 (grep `Registration runs on Luma`) — it was Derrick's own scratch note
  that shipped (outcomes D8); Justin read it aloud three times in confusion.

### 6 · FAH pillar renames — §5.3 · <1 hr
- [ ] **Where:** `app/founders-after-hours/page.tsx` ≈89–91 — the three card
  tuples under `{/* Three doors in`.
- **Done when:** cards read (copy dictated verbatim, 54:00–58:28):
  | Was | Now | Description |
  |---|---|---|
  | Join the room. | **Office hours** | "an hour to get your questions answered on specific subjects such as marketing, sales, operations, funding." |
  | Show up. | **Live sessions** | live training sessions — work "saved to our digital library" into the description |
  | Bring your challenge. | **Founders After Hours** | "our in-person production experience to help people drive results." |
- **Gotchas:** the heading "Three doors in" (≈86) probably changes too — that's
  **Q5**, Derrick's call. ⚠️ Note the digital-home section already has a
  small-caps "what's inside" eyebrow (≈219) — if Q5 lands on "What's inside,"
  rename that eyebrow or pick another heading. The stagger
  (`md:mt-[30px]`/`[56px]`) may now be semantically wrong — cards went from
  verbs (a journey) to nouns (a contents list); flag, don't silently change.

### 7 · Membership cards: symmetry + midnight premium — §5.5 · ~1 hr
- [ ] **Where:** `app/founders-after-hours/page.tsx` ≈163 (grid
  `md:grid-cols-[1.15fr_1fr]`), ≈175 (in-person card, `md:mt-[34px]`), ≈176
  (`$[89–99]` + `PRICE — confirm` chip).
- **Done when:** equal-width cards (`grid-cols-2`); in-person card on a
  **midnight ground** ("make it rich"); price reads **$99** and the `[PRICE]`
  chip is gone ($99 confirmed 1:26:49); stagger dropped **on this pair only**
  (recommendation under **Q6** — confirm with Derrick in passing).
- **Gotchas:** a midnight *card* inside a cream section is a new pattern —
  make it read intentional (gold top-rule carries over). **Accent orange fails
  AA on midnight at body size** — the card's "Join…" link must go
  cream-underlined, not accent. Links currently point at `SKOOL_URL` — keep.
  Re-run the a11y spec after.

### 8 · Register CTA after the Summit agenda — §4.9 · ~1 hr
- [ ] **Where:** `app/summit/page.tsx` — end of "Two weeks, mapped" (section
  closes ≈313), before "Who it's for."
- **Done when:** a register CTA sits at the decision point Justin named
  ("I want to go to this, this, and this. And all right, I'm ready. Click.").
- **Gotchas:** G4 variation rule — lighter weight than the hero's gold button
  (inline link / rule-and-arrow register), so the page doesn't become eight
  identical gold buttons. Use `LumaRegisterButton` variant or a text CTA with
  `ctaLocation="summit-agenda"` for analytics consistency.

### 9 · Mastermind mobile "bunched up" bug — §6.3 · 1–2 hrs
- [ ] **Where:** `app/mastermind/page.tsx` — Justin didn't say which part.
  Suspects: the midnight format spec sheet (≈136–166) and the four-step
  application grid (≈192+).
- **Done when:** a mobile screenshot pass (webapp-testing skill /
  `pnpm preview` — ⚠️ kill orphans after: `pkill -f "wrangler.js dev"; pkill -f
  "workerd serve"`, see TODO.md) identifies the crowding, and it's fixed at
  mobile widths without touching desktop.
- **Gotchas:** the only *reported* visual defect from the call — sanctioned
  exception to the mobile-last pact. Headless Chromium never ticks the CSS
  animation clock (entrance anims hold opacity:0) — screenshot tooling must
  settle animations first (see `e2e/a11y.spec.ts` `settleAnimations`).

### 10 · The Aug 10 countdown — §4.1a · ~half day
- [ ] **Where:** `app/summit/page.tsx` ≈132 — the orphaned small-caps
  **"doors open in"** label with a static date string under it.
- **Done when:** a live countdown to **Aug 10, 6:30 PM ET** sits under that
  label, in the drafting register: tabular numerals, hairline rule, small-caps
  units. Defined terminal states: during Aug 10–20 (event running) and after
  Aug 20 (page's post state already exists — hero is a state machine off
  `lib/calendar.ts`).
- **Gotchas:** **No boxed digit-tiles** (§10.10 — the generic pattern the brand
  refuses). Placement ambiguity flagged in brief §12.3 — hero vs. stats band;
  recommendation is hero (the orphaned label); **confirm with Derrick, one
  word**. Reduced-motion: no flipping/ticking animation, a static "X days"
  reads fine. Hydration: page is `force-dynamic` with `now = new Date()` —
  server-rendered value must not mismatch the client tick (render server value,
  tick client-side after mount).

### 11 · "Virtual" hierarchy treatment — §4.1b · ~half day
- [ ] **Where:** `/summit` hero region — the word is already in the eyebrow
  (≈116), trust row, ticker (≈174), final CTA (≈400) and still isn't landing.
- **Done when:** "virtual" occupies a different visual *rank* — a mark, a rule,
  a location line rendered as a place ("live online · from anywhere") — that a
  scanning eye catches. Justin's bar: *"If you're still hearing it, it's not
  enough."*
- **Gotchas:** don't just add a sixth body-text mention. H1 stays untouched
  (**Q2**, pinned). No geo-narrowing (registrants are multi-state + intl, C4).

### 12 · Agenda colour pass — §4.5b · ~half day
- [ ] **Where:** `app/summit/page.tsx` ≈259–313 — "Two weeks, mapped."
- **Done when:** the flattest section on the priority page has "a little bit
  more color to give it a little bit more pop" (Derrick, on this exact block) —
  candidates: gold week labels, accent-deep night numbers, gold fills on the
  tonight-row, a midnight inset — while every text pairing stays AA.
- **Gotchas:** gold is 2.03:1 on cream — **rules and fills only, never text**;
  numerals on cream stay ink (§10.6). The three row states (upcoming / tonight
  / replay) must all survive the treatment. Re-run the a11y spec — this item is
  the likeliest on the whole list to break 100/100.

### 13 · "Why this exists" → Ventriq-centric — §3.4 · ~half day
- [ ] **Where:** `app/page.tsx` ≈254–281 (S5).
- **Done when:** third-person Ventriq origin copy (draft it ourselves —
  `ventriq-voice` + `human-copy` skills — for Justin's approval, don't wait on
  him); the "— Justin Shaw, Founder" signature + gold rule gone; "Read
  Justin's story →" link (≈271) gone (dies with About anyway).
- **Gotchas:** the design problem is institutional voice that stays warm — let
  the drawn line carry what the face did. The `PhotoGrade` portrait beside it
  is orphaned → **Q8** (room/Baltimore image, or the slot goes). Landing this
  before Q8 is answered is fine — leave the grade in place, labeled for a
  non-portrait image.

### 14 · Pain-point band on midnight — §3.1 · ~1 day
- [ ] **Where:** `app/page.tsx` — new section between S2 proof band (ends ≈192)
  and S3 "Three ways in" (≈194).
- **Done when:** a midnight band delivers the recognition beat in bullets —
  never managed cash flow · never managed a sales funnel · never built a
  marketing system · never operated a whole business · only ever one area of
  expertise (copy drafted in outcomes doc §3.3; Geico-brief, 60-second rule).
  The three cards below now read as the *answer* to it.
- **Gotchas:** strongest candidate home for the **ConvergenceDiagram** that
  §3.3's carousel displaces (**Q3** — decide before or during, not after: the
  diagram is used in exactly ONE place and dies with its section otherwise).
  Inserting midnight here changes the page's band cadence → **Q4** (§3.7 table)
  must be decided alongside. AA on midnight: body text cream, links
  cream-underlined, accent only at large sizes.

### 15 · Attendee share-card template — §4.10 · ~half–1 day
- [ ] **Where:** new — extends the Phase-5 OG generator (commit `8945413`,
  outputs in `public/og/`).
- **Done when:** an "I'll be there — Forge The Future, Aug 10–20" card exists
  in square + story ratios with a headshot slot, readable at thumbnail size in
  a crowded IG grid. How registrants get theirs (manual composite vs. a tool)
  is a later product call — the *template* is the deliverable.
- **Gotchas:** this is the brand off-site — full §10 discipline (no shadows,
  2px radius, the line motif, Space Grotesk). Justin's plan: email registrants
  to send headshots ("that's how people don't miss events").

### 16 · Site-wide CTA cadence + colour pass — G4 + G2 · ~1 day
- [ ] **Where:** all pages — hero + final CTAs keep full gold weight; mid-page
  decision points get lighter treatments (inline link, rule-and-arrow).
  Colour: Mastermind spec sheet, section rules, FAH premium card echoes.
- **Done when:** every section can convert without scrolling back, without the
  page becoming a column of identical gold buttons; gold/accent carry more
  weight in fills, rules, and large type.
- **Gotchas:** judgment-heavy; the most likely *pass* to break 100/100. Colour
  never lands in body text. Re-run full a11y after.

### 17 · Branded email template design — G6 · 1+ day
- [ ] **Where:** new surface — `lib/emails.ts` is transactional-only today.
- **Done when:** a marketing-grade template exists that is visibly the same
  object as the site: Space Grotesk, the 7 colours, 2px radius, the line motif
  as static artwork, no shadows, no template look.
- **Gotchas:** email clients are hostile — the motif must survive as static
  images/tables; motion doesn't come along. **Design is unblocked; sending is
  not** — CAN-SPAM footer needs Justin's mailing address (blockers file).
  Reference register: the Love Candy email Derrick showed on the call.

### 18 · Hero geometric fields ×3 — G1 · multi-day
- [ ] **Where:** `app/page.tsx` `CorridorRays` (≈:55, used ≈135) ·
  `app/summit/page.tsx` `Rays` (≈159) · `app/founders-after-hours/page.tsx`
  `TallyMarks` (≈:25, shifted +7).
- **Done when:** all three heroes carry one recognizable, continuously-moving
  geometric system — "a drafting table where the lines are still being drawn";
  slow enough to ignore while reading; moving between pages feels like
  continuity, not repetition. Format is open (generated field / canvas /
  extended CSS-SVG / video file) — "geometric" is the operative word, not
  "video."
- **Gotchas:** the four hard limits, verbatim from the brief: never people,
  never stock; motion may never brighten into the type's contrast band (AA at
  all times); these are the LCP surfaces on the three most important pages — a
  hero that costs the LCP is a failed hero; must resolve to a still composed
  frame under reduced-motion and read fine if it never loads. Derrick scoped it
  "20–30 minutes out the door / easiest piece to fix" → cheap per attempt:
  **try 2–3 directions**, don't marry the first. Sign-off interacts with the
  perf-budget calibration (blockers file, sequencing group).

### 19 · Q&A block geometric video — §4.8 · after 18
- [ ] **Where:** `/summit` FAQ region (≈374–389).
- **Done when:** a moving element sits beside the accordion — "premium" is the
  brief; ambient geometry inheriting 18's system is a legitimate answer if no
  real footage exists (content question is **Q10**, Justin's).
- **Gotchas:** low on the page — must lazy-load, must not become a second LCP
  candidate.

---

## If you only have an afternoon

Items **1–9** ≈ one working day combined, need nobody's input, and clear two
redline chips off live pages (`[TIMES]`, `[PRICE]`) plus the accidental
"about a minute, free" scratch note. Start at 1, go down. Then deploy —
that's a visible client-facing win on the exact pages Justin reviews.
