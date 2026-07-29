# Skipped & deferred — the living list

Anything raised but not fully handled lands here the moment we skip it: what it
is, why it matters, and exactly what unblocks it. Items move to the log at the
bottom when done (with date). Levels: 🔴 time-sensitive / blocking · 🟠
important, not yet blocking · 🟡 watch / later.

## 🔴 Time-sensitive

- [ ] **⚠️ AUG 1 DEADLINE — Justin's summit revision brief, 47 changes.** He
  delivered a formal 16-page brief Jul 29 (written Jul 25, *"PREPARED FOR
  DERRICK"*) with a stated **LIVE DATE of August 1** — three days out, and
  previously unknown to us. Reason: *"the summit page is receiving partner
  newsletter traffic in early August"*, plus a **paid-retargeting decision gate
  on Aug 7** that gets made blind without conversion data by Aug 1. Full plan:
  **`docs/plans/summit-aug-1/`** — Phase 1 (research) complete, Phases 2–5 are
  his own four tiers. 14 copy blocks are final and drop-in; **copy is law, paste
  verbatim.** *(Raised Jul 29.)*

- [ ] **🔴 TIER 1 — internal scaffolding is publicly visible right now.**
  Verified live on ventriq.io Jul 29: the footer renders our own internal legal
  instruction — **"EIN — add when issued; no deductibility language until
  determination letter"** (`components/footer.tsx:60`) — plus `ANNOUNCE-DATE`
  ×2, the `[SPEAKERS]` redline chip beside all 8 session titles, 15
  `speaker 01–15` placeholder tiles, and a **"thirty-plus" speaker claim that
  overstates the real roster by ~13** (Justin's own number is seventeen-plus).
  Details + exact locators in `docs/plans/summit-aug-1/02-phase-2-tier-1.md`.
  *(Raised Jul 29.)*

- [ ] **The membership is being renamed "The Foundry" — likely announced from
  the stage on Night 1 (Aug 10).** Justin's `the-foundry-one-pager.pdf` is
  stamped FINAL: **Ventriq → Forge The Future Summit → The Foundry → Founder
  After Hours (a monthly event *inside* it) → Mastermind (name TBD)**. So
  "Founders After Hours" stops being the membership and becomes one event —
  and loses its "s". Tiers become **DIGITAL CORE $45** (up from $39) and
  **POWER HOUR $99**, plus a five-rank progression system (ORE → EMBER → BLADE
  → TEMPERED → DAMASCUS) that is the leaderboard from the Jul 23 call.
  **Consequences:** `lib/brand.ts` is now a *requirement*, not a nice-to-have —
  the brief wants the section behind a deploy-free toggle so the name can flip
  mid-summit; and `/founders-after-hours` → `/the-foundry` needs deciding
  **before** Aug 10, since a post-launch 301 resets indexing. ⚠️ Do **not**
  adopt the one-pager's palette or Poppins — its own footnote defers to the
  Ventriq accents. Full analysis: `docs/plans/summit-aug-1/01-phase-1-research.md`
  §6. *(Raised Jul 29.)*

- [ ] **⚠️ SUMMIT DATE CONFLICT — Justin's new agenda disagrees with Luma, and
  36 people have already registered against Luma.** Do NOT change the site
  until he confirms which is right.

  | Night | Luma (live, 36 registrants) + our site | Justin's agenda TSV (Jul 29) |
  |---|---|---|
  | 7 · The Endgame | **Wed Aug 19** | **Thu Aug 20** |
  | 8 · The End of the Beginning | **Thu Aug 20** | **Fri Aug 21** |

  Nights 1–6 match exactly (Aug 10/11/12/13/17/18); titles and subtitles match
  our shipped `lib/agenda.ts` word for word. Only the last two moved — and the
  new shape drops Wed Aug 19 entirely, making week 2 **Mon · Tue · Thu · Fri**.
  That breaks the "Monday through Thursday" claim we repeat in 6 places and
  pushes the end date to Aug 21, which appears as "Aug 10–20" in **24 places**
  (metadata, hero eyebrow, ticker ×2, announcement bar ×2, proof band, OG
  generator, JSON-LD, 9 copy-deck lines).

  ✅ **RESOLVED SAME DAY — the site and Luma are right; his agenda TSV is the
  outlier.** Justin's own webpage brief (`Forge-The-Future-Summit-Webpage-
  Brief.pdf`, dated Jul 25, prepared for Derrick, "every copy replacement is
  final") carries an explicit §09 schedule table listing **Aug 19 · The
  Endgame** and **Aug 20 · The End of the Beginning** — matching Luma and our
  shipped `lib/agenda.ts`. Three sources agree (Luma live · the brief · our
  Jul 23 findings doc, which already recorded *"ends Aug 20, not 21"*); only
  the TSV says Aug 20/21. **No site change needed.**

  ⚠️ **Residual risk is now on Justin's side, not ours:** if he runs the event
  off that agenda file he has the finale on the wrong nights. Worth a
  one-liner to him — see TODO-JUSTIN. *(Found + resolved Jul 29.)*

- [ ] **Site says "nonprofit"; Ventriq is a for-profit today** — Justin on the
  Jul 23 call: the nonprofit arm doesn't get built until **Q4**, and *"I
  technically can't put a non-profit for founders right here right now because
  I don't want that to be misleading."* Agreed replacement: **"mission-driven."**
  20+ live instances across pages, JSON-LD, footer legal line and copy decks —
  grep-verified inventory in `docs/meetings/07-23-2026-meeting-3-outcomes.md`
  §4.1. **Do not blanket-replace**: "nonprofit builders"/"nonprofits doing the
  real work" describe the *audience* and stay. *(Raised Jul 23, surfaced Jul 28.)*
- [ ] **Consolidated asset email to Justin — Derrick promised it Jul 24, never
  sent** (transcript 1:27:34: *"I'll put together an email… tomorrow"*). It is
  the unblock for everything below. `TODO-JUSTIN.md` is effectively the content;
  `client-email-voice` is the tool. *(Raised Jul 23, overdue Jul 28.)*
- [ ] **Summit assets 5 days overdue from Justin** — he committed at 1:25:32 to
  send speaker headshots, bios, night assignments and updated Summit copy *"in
  the next 24, 48 hours"* (due Jul 24–25). `/summit` is his stated #1 page and
  his Instagram-bio target; **Aug 10 is 13 days out**. Blocks the agenda face
  cards and the speaker flip cards. *(Raised Jul 23, overdue Jul 28.)*
- [ ] **Kit vs Resend — three email lists are diverging as of today.** Justin's
  live newsletter runs on **Kit** and he's already sending from it; our shipped
  Digest form writes to Supabase + a **Resend** audience; Luma holds the
  registrants. On the call Kit was pinned to "last" — recommend overriding that
  and **dual-writing to Kit's v4 API on confirmation, before Aug 10** (~1 hr).
  Reconciling opt-in state and tags by hand after the summit tripled the list is
  the expensive version. *(Raised Jul 23, escalated Jul 28.)*
- [ ] **Google Workspace trial billing** — the Ventriq Workspace was created
  Jul 10 on a 14-day trial → **billed ~Jul 24; now 4 days past**. Card on file or
  the ventriq.io mailboxes stop. Confirmed as a live risk on the Jul 23 call
  (4:58). Google for Nonprofits is now **not** a near-term path — Ventriq is a
  for-profit until Q4. *(Raised Jul 10, meeting 2 stress test.)*
- [ ] **ventriq.com — the plan needs redoing, not abandoning.** Registration
  lapsed **Jul 25** (no auto-renew). We told Justin it would "become available
  at midnight" — that's wrong: gTLDs go through a ~30–45 day registrar grace
  period → 30-day redemption → 5-day pending-delete, so the real drop is
  **~mid-September**. Next step: `whois ventriq.com`, read `Domain Status`, and
  place backorders at **DropCatch + SnapNames** (~$25 each, charged only on
  catch). Also correct the record with Justin so he isn't refreshing GoDaddy.
  Also: **ventriq.org is still unregistered** (~$12). *(Raised Jul 10; re-raised
  Jul 23; timeline corrected Jul 28.)*
- [ ] **Cloudflare dashboard toggles** (each blocks a roadmap item):
  - AI Crawl Control → **Allow** OAI-SearchBot, ChatGPT-User, PerplexityBot,
    Perplexity-User, Claude-SearchBot, Claude-User, GPTBot, ClaudeBot — new
    zones WAF-block them by default; robots.txt alone does nothing.
  - Caching → Configuration → **Crawler Hints ON** (free IndexNow).
  - Images → Transformations → **enable for ventriq.io** (blocks `next/image`
    when Phase 2 pages land).
- [ ] **Search Console + Bing** — GSC domain property (verifies instantly via
  the preserved `google-site-verification` TXT) → submit sitemap → Request
  Indexing for `/` and `/summit`; then Bing WMT one-click import. Every day
  unindexed is a day lost on the Aug 10 clock.
- [ ] **GoDaddy placeholder emails** — the "Launching Soon" page collected
  emails before the nameserver flip. Check the GoDaddy Website Builder
  dashboard (Justin's account, creds in 1Password) and export any captures
  into the real list before builder access lapses. *(Raised Jul 23.)*

## 🟠 Important, not yet blocking

- [ ] **Meeting-3 build backlog (Jul 23 design review) — 22 decisions, D1–D22.**
  Full plan in `docs/meetings/07-23-2026-meeting-3-outcomes.md`; **the working
  build order is `docs/design/build-queue.md` + `build-blockers.md` (Jul 29) —
  pick up from there**; the visual half's intent, constraints and stress test:
  `docs/design/07-23-2026-design-change-brief.md` (geometric video heroes, the
  missing Aug 10 countdown, speaker flip cards, agenda face cards, the
  testimonials carousel and the convergence-mark problem it creates, the navy
  pain-point band, membership card symmetry, the colour pass). §5 sequences it
  in the order Derrick agreed on the call (copy we already have → assets from
  Justin → video/motion → mobile last). **Phase A is entirely unblocked** and is
  mostly live inaccuracies: delete the "about a minute, free" note that shipped
  from Derrick's own scratchpad · add the missing "Who is this for?" heading on
  `/summit` · CTA → "Save your free **virtual** seat" (Justin: *"if you're still
  hearing it, it's not enough"*) · rewrite the "Will I be pitched?" FAQ, which
  currently promises *"nobody's selling you a course"* when the real policy is a
  soft pitch every night · strip pricing from `/summit` and the home cards ·
  rename the FAH pillars to Office hours / Live sessions / Founders After Hours
  (copy dictated verbatim, paste-ready) · FAH run-of-show → **6:00 / 6:15 / 7:15
  / 8:15** · **$99** · equal-width cards with a midnight premium card · drop the
  10KSB comparison from `/mastermind` · **kill `/about`** (10-step blast radius,
  §4.7) · **add Contact to the nav** (Derrick flagged it on the call and it's
  still missing). *(Raised Jul 23, planned Jul 28.)*
- [ ] **Program calendar corrections — three live-copy errors + three chips
  retired.** Justin's `2026 Ventriq Program Calendar` (Jul 29) is the first
  full picture of the year. Its *summit* rows are stale — ignore them (they say
  "Ventriq Launch Summit", 7–8 PM, Mon/Tue/Thu/Fri) — but everything from
  Aug 24 on is authoritative. **Wrong on the live site:** (a) Mastermind is
  **Saturdays 8:30–10:30 AM**, not *"weekly, Monday evenings, 60–90 minutes,
  live on Zoom"* (`app/mastermind/page.tsx:145`); (b) **HRPB starts Sep 14**,
  not Sep 28, biweekly Mondays 6:15–7:00 PM, 6 sessions
  (`app/founders-after-hours/page.tsx:191` chip); (c) **"90 days" is really
  10 weeks** — Sep 26 → Dec 5 is exactly 70 days. **Retires `[COHORT-DATES]`**
  (cohort 2 = Sep 26 → Dec 5). ⚠️ All three need Justin's confirmation before
  editing — O15–O17 in `docs/plans/summit-aug-1/01-phase-1-research.md` §11.
  *(Raised Jul 29.)*
- [ ] **Upcoming Events section (D6) is unblocked** — the calendar's Audience
  column gives exactly the public + FAH filter Justin promised: **16 dated
  rows** (HRPB ×6, Founder After Hours ×5, FAH webinar ×4, plus a **public
  Mastermind Graduation Dec 5**). Enough to make the year look inhabited, which
  was the design intent. Build against `lib/events.ts` per the recommendation
  in the design brief §3.5 — not hardcoded JSX. *(Unblocked Jul 29.)*
- [ ] **GA4 admin config (Phase 5's dashboard half, ~10 min):** Enhanced
  Measurement ON with history events, form-interactions OFF; retention
  2→14 months; mark key events luma_register_click / generate_lead /
  sign_up; custom channel group (^ig- / ^speaker- / ^hbcu- / linkedin /
  email); internal-traffic filter for your + Justin's IPs. *(Raised Jul 24.)*
- [ ] **GA4 behaviour tracking — Derrick promised more than the admin config
  above.** On the Jul 23 call (1:18:11) he told Justin we'd show *"how many
  people are filling out forms and then abandoning it"* and *"they came, they
  did this, they did this, in this order, and then they left."* That's
  form-abandonment plus path/funnel analysis, and it isn't built. Note the
  apparent contradiction with "form-interactions OFF" resolves cleanly: GA4's
  automatic form events are noisy, so build **custom `form_start` /
  `form_abandon` / `cta_click` events** through the existing `lib/analytics.ts`
  `track()`, then Path + Funnel explorations. Justin asked specifically about
  reporting *"for the website owner"* — a **Looker Studio dashboard** he can
  open himself is the honest answer. *(Raised Jul 23, surfaced Jul 28.)*
- [ ] **Branded marketing email templates** — promised on the call (1:21:00,
  with the Love Candy example): brand colours, Space Grotesk, images, CTA
  buttons. `lib/emails.ts` covers transactional only. ⚠️ **Blocked on Justin's
  mailing address** (CAN-SPAM footer requirement), which moves that item up his
  list. *(Raised Jul 23.)*
- [ ] **Skool group setup — CTAs are LIVE against an unconfigured group.**
  Justin sent https://www.skool.com/iamjs-collective-9599/about Jul 29; fetch
  verified it as **free, named "IAMJS Collective," 1 member**. Flagged the
  mismatch (site sells $39/$99); **Derrick's call: wire it live anyway** to
  seed early members — all five FAH join CTAs (hero, both membership cards,
  digital-home, final CTA) now point at Skool. Still open,
  and now *more* time-sensitive, not less: (a) Justin sets the $39/$99 tiers —
  until then every joiner is a free member to convert later; (b) Justin locks
  the group name — ⚠️ **a Skool rename changes the group URL and the live site
  now links it, so any rename needs a same-day coordinated site update**; ties
  into the "The Forge" question, decide once; (c) when configured: retire the
  "SKOOL CHECKOUT — pending group setup" chip and swap the "SCREENSHOT: the
  Skool space" placeholder for a real capture. *(Raised Jul 29; wired live
  Jul 29.)*
- [ ] **Hoist the membership name into `lib/brand.ts`.** Justin said the names
  are placeholders — "Founders After Hours" may become the *event inside* a
  membership possibly called **"The Forge"** (52:30). One constant makes the
  rename a one-line change instead of a 60-site grep. ⚠️ Also flag the timing to
  him: renaming after Aug 10 costs the SEO we're about to build, since
  `/founders-after-hours` → `/the-forge` needs a 301. *(Raised Jul 23.)*
- [ ] **Hand Justin the UTM-tagged Summit URL for his Instagram bio** — he said
  the bio link goes straight to `/summit` (1:12:19), and `docs/utm-registry.md`
  already defines the `^ig-` channel grouping. Small, and it makes the GA4
  channel work pay off immediately. *(Raised Jul 23.)*
- [ ] **Correct the hosting record + settle the $10/mo question.** Derrick told
  Justin the site is on **AWS at ~$750/mo** (1:14:04) — it's Cloudflare Workers,
  really ~$5/mo Workers Paid plus Supabase/Resend/domain. He also floated a $10
  Stripe hosting fee that got joked past and **never answered**. Two things:
  correct the record casually (Justin is budget-conscious and needs the real
  number for his P&L), and decide who carries the service costs. *(Raised Jul 23.)*
- [ ] **Ask Justin for his Granola notes** — he offered them twice, unprompted
  (21:51 and 1:27:57). His own AI notes capture what he committed to in his own
  words, where the Fathom transcript garbled it. Near-zero cost. *(Raised Jul 23.)*
- [ ] **Verify the "Thirty-plus speakers" claim.** Live twice on `/summit`
  (`:230`, `:144`), but Justin said Jul 23 he has *"about 14 or 15 secured"* and
  needs *"another seven."* Either 30+ counts panelists he isn't counting, or the
  site overstates. Settle before Aug 10. *(Raised Jul 23, surfaced Jul 28.)*
- [ ] **Propose the attendee share-card generator.** Justin described letting
  registrants *"put their headshot on"* a graphic and share it — *"that's how
  people don't miss events"* (47:34). Near-free extension of the Phase-5 OG-card
  script we already have. *(Raised Jul 23.)*

- [ ] **Sentry project + DSN** — account/project creation is dashboard-side;
  once a DSN exists, `@sentry/cloudflare` wiring is a small PR (our compat
  date already qualifies). Until then: Workers Logs only.

- [ ] **Email spam placement (first sends)** — the first notification landed
  in spam. Fixed the biggest trigger (was from==to on jshaw@; notifications
  now send from site@ventriq.io). Remaining hygiene: mark that first email
  "Not spam" in Gmail (trains the filter), and expect placement to improve
  as the new domain builds reputation. Re-check after a few real messages.
- [ ] **Env hygiene** — `.env.local` was seeded from another project's
  template (silence-between-us): Turnstile keys were that project's
  (fixed), and `.env.example` still lists its Stripe/shadcnblocks/Stitch
  vars. Prune both files to Ventriq-only vars. *(Raised Jul 24.)*
- [ ] Mirror NEXT_PUBLIC_TURNSTILE_SITE_KEY into Workers Builds "Build
  variables and secrets" so git-triggered builds inline it. **Jul 29 evidence:
  pushes currently don't produce deployments at all** — `2d898d0` pushed,
  no new deployment after 10+ min (`wrangler deployments list` still shows
  Jul 25 as latest); shipped it via manual `pnpm run deploy` instead. So
  either Workers Builds isn't actually building on push, or its builds fail
  silently — check the dashboard build log when doing the mirror. Until both
  are fixed, **manual deploy is the only real path to prod.**
- [ ] **`iamjs.io` email auth is unverified — and it's the domain he actually
  broadcasts from.** His Jul 23 Kit broadcast went out from **`jshaw@iamjs.io`**,
  not `jshaw@ventriq.io`. Our Jul 23 SPF/DKIM/DMARC work authenticated
  **ventriq.io only**, so it does nothing for his real sending domain. Check
  iamjs.io's SPF/DKIM/DMARC before the next send — a summit push landing in
  spam 12 days out would be expensive. *(Found Jul 29 in the .eml.)*
- [ ] **Email footer address is ConvertKit's, not Ventriq's** — his broadcasts
  currently carry *"600 1st Ave, Ste 330 PMB 92768, Seattle, WA 98104-2246"*,
  which is Kit's corporate default. Legal, but it tells a Baltimore audience
  the mail is from Seattle. Same gap as the outstanding "mailing address for
  email footers" ask on Justin's list — now with evidence of what's filling it.
  *(Found Jul 29.)*
- [ ] **DMARC report address** — the imported `_dmarc` record sends aggregate
  reports (`rua=`) to a third-party mailbox from the GoDaddy era
  ("onsec…"). Decide who should actually receive DMARC reports and update.
- [ ] **Justin's Luma fixes** (10 minutes, sent as asks Jul 23): native
  virtual location (fixes schema + managed join link) · ventriq.io/summit
  link in the description · claim `luma.com/ventriq` · align "How did you
  hear" options to `docs/utm-registry.md` · re-export the 4 typo'd speaker
  cards · claim LinkedIn `/company/ventriq`.
- [ ] **Founder Digest field in the footer** — canonical footer includes the
  newsletter field; shipped without it (a dead form is worse than none).
  Lands with the Phase 3 newsletter server action. *(Deferred Jul 23.)*
- [ ] **Privacy page + footer link** — legal-page set (privacy naming GA4 +
  Resend + Supabase) not yet written; footer ships Contact + Instagram only
  until then. *(Deferred Jul 23.)*
- [ ] **Calendar-util tests → formalize** — a 10-case boundary suite ran in
  the Jul 23 stress test (all pass, incl. the opening-day fix) but lives
  outside the repo; port it to a committed Playwright/vitest spec as the
  Phase 2 gate.
- [x] ~~QA harness activation~~ *(done Jul 23 — deps installed, banners removed, 40/40 vitest green)*
- [ ] **Production Lighthouse baseline + budget calibration** — the local
  lhci run can't judge performance (dev box runs workerd + Chrome together;
  numbers swing 2×). After the Jul 24 deploy, get a PageSpeed Insights
  baseline for `/`, `/summit`, `/founders-after-hours` (mobile), then
  recalibrate `lighthouserc.json`: the 250KB script budget is arithmetically
  impossible while gtag.js alone is 163KB + our ~215KB, and TBT ≤200ms
  competes with third parties. Either budget for "our JS only" or raise
  ceilings to what prod actually measures — otherwise qa.yml reds every PR
  on arrival. Also: bf-cache scores 0 because force-dynamic pages send
  `no-store` (the A2 date-state architecture, deliberate) — revisit with
  route-level ISR + R2 cache post-launch if back/forward UX ever matters.
  *(Raised Jul 24.)*

## 🟡 Watch / later

- [ ] **Membership platform (the "four year project")** — requirements captured
  Jul 23 (1:01:11): auth, role tiers (**super admin / coordinator / teacher /
  student**, plus guest speakers and one more Justin will name), rooms, and a
  **leaderboard** tying together the Mastermind scoreboard and the FAH tally.
  Staged rollout: leaderboard-only first. ⚠️ **Square the record first** —
  Derrick told Justin an auth + membership system with hashed passwords and data
  structures *"is built into this website right now already."* Verified Jul 28:
  the only migration is `20260723180000_forms.sql` with three form tables. No
  auth, roles, or leaderboard exist. The defensible version — Supabase was chosen
  so this is later a schema-and-config job, `@supabase/ssr` is already a
  dependency, Auth handles hashing as a platform service — is a real head start,
  but it's a head start, not a built system. Close the gap before Justin asks to
  switch the leaderboard on.
- [ ] **`ConvergenceDiagram` loses its homepage slot** if the testimonials
  carousel (D4) ships as agreed. It's the brand's signature architect's-line
  gesture and survives only on `/mastermind:37`. Decide deliberately: relocate it
  into the new pain-point band, fold it into the footer, or accept the loss.
  *(Raised Jul 28 from the Jul 23 review.)*
- [ ] **Mastermind "click to buy"** — Justin mused *"I may just make the
  Mastermind, like, click to buy"* (1:05:20). It would gut the selectivity the
  entire page rests on (committee, 10 seats, graduation bar, honest-rejection
  line). Don't build on a "may"; recommend the hybrid — apply → accepted →
  Stripe link. *(Raised Jul 23.)*
- [ ] **Flip-card a11y spec (D12)** — greenfield, so build it right: `<button>`
  not `<div>`, `aria-expanded`, back face hidden from AT until flipped,
  `prefers-reduced-motion` → cross-fade not 3D rotate, and a **sheet on mobile
  rather than a flip** (tap-to-flip is a known usability trap). We're at 100/100
  a11y and `e2e/a11y.spec.ts` will catch a regression. *(Raised Jul 23.)*
- [ ] **Zoom vs StreamYard undecided** (50:11) — "Zoom" is hardcoded in 6 places
  plus the Event JSON-LD and the pending Luma virtual-location fix. Interim:
  genericize to "live online" (costs nothing, needs no decision). For Justin:
  **Zoom Webinars/Events does branded registration, banners and backgrounds**, so
  he doesn't have to trade away the networking he says he wants; StreamYard's
  real edge is one-way multistreaming, which would kill the room. Recommend Zoom
  + branded template, StreamYard restreaming alongside if he wants reach.
- [ ] **CCBC surgical-instrument sterilization cert** — $35/hr, no degree,
  Baltimore County pairs you with a hospital (18:40). Not a site item; logged as
  **Founder Digest / social content** — Justin said he'd share it with his people
  and it's squarely his audience.
- [ ] **MIC video testimonial shoot** — Justin needs it for EDA grant reporting,
  on-site videographer, needs Derrick's availability against the videographer's
  slots (1:24:35). Not a website item, but a real calendar commitment. ⭐ Ask
  whether the footage can double as a Ventriq testimonial — Derrick already
  volunteered one.
- [ ] **Design round-trip: AA-driven divergences from the v2 design refs**
  (all shipped Jul 24, flag at the next claude.ai/design sync): numerals on
  cream grounds are ink, not gold (gold maxes at 2.03:1 on cream — the gold
  top-rules stay); announcement-bar + in-text links carry persistent
  underlines; hero + sponsor secondary links are cream-underlined, not
  orange (#C15A2C is 3.9:1 on midnight, fails body-size AA); accent-deep
  darkened #af5026 → #a84d24; summit manifesto's dim resting state
  brightened to 0.6 gold (2.09 → 3.39:1).
- [ ] **`pnpm preview` leaves orphans when killed** — opennextjs spawns
  `wrangler dev` internally; killing the visible process leaves the wrangler
  tree alive, respawning workerd. Accumulated orphans caused wrangler's
  "Network connection lost" crashes under parallel e2e (Jul 24, 3×). Stop it
  with `pkill -f "wrangler.js dev"; pkill -f "workerd serve"` — or add a
  preview-stop script if this keeps biting.
- [ ] **Headless Chromium never ticks the CSS animation clock** (no frame
  production → `document.timeline` stays 0), so entrance animations hold
  opacity:0 forever and axe silently skips hero text. e2e now finishes
  document-timeline animations before scanning (`settleAnimations`,
  e2e/a11y.spec.ts); any future screenshot tooling must do the same or
  heroes capture empty.
- [ ] **lib/calendar.ts seams (QA-agent findings, Jul 23):** (a) on session
  nights 8 PM–midnight the announcement bar still says "is live — tonight"
  while the agenda row already shows replay — day-granularity is deliberate,
  but consider a post-8PM string variant before Aug 10; (b) `etDateString`'s
  fixed -04:00 breaks for any NEW caller after Nov 1 2026 (EST) — safe today
  only via early returns; (c) navCta's Sept 30 mastermind-close is a
  placeholder — the test suite pins it so the real [APP-DEADLINE] forces an
  update; (d) LINEUP_ANNOUNCED flip = source edit + redeploy (fine, planned).

- [ ] **Cloudflare AI-crawler defaults change again Sept 15, 2026**
  (allow-search / block-training becomes the default) — re-audit AI Crawl
  Control then.
- [ ] **CSP `'unsafe-inline'` → nonces** when the webapp/auth phase lands
  (nonce CSP forces all-dynamic rendering; wrong trade for the marketing
  site).
- [ ] **`pay.ventriq.io` CNAME deleted Jul 23** (pointed at GoDaddy
  commerce paylinks, came with the builder). If Justin ever actually used
  GoDaddy paylinks, re-add it — no evidence he did.
- [ ] **CI Node floor ≥22** — supabase-js dropped Node 20 support Jun 30,
  2026; any GitHub Actions we add must use Node 22+ images (workerd runtime
  unaffected).
- [ ] **Luma Plus ($59/mo) decision point** — only if webhook-driven syncing
  (registrations → Supabase/Resend) or GA4-on-Luma becomes worth it;
  everything else is covered free.
- [ ] **Justin's programming-plan Google Doc** — shared to derrick@ Drive
  Jul 10; still the source for cohort weeks + HRPB dates when those sections
  build.

## ✅ Done (moved from above)

- [x] *Jul 24* — **First e2e + Lighthouse sweep executed — a11y sweep green.**
  49/49 Playwright tests pass (7 routes × desktop/mobile/reduced-motion,
  axe WCAG 2.2 AA + smoke + mobile-nav state); ~110 contrast/landmark/
  heading/link violations found on the first-ever run, all fixed same day;
  Lighthouse accessibility = 1.0 on all nine runs. Perf half → new 🟠
  baseline item above. Harness fixes that made it runnable: networkidle →
  load+h1 readiness (Turnstile never idles), axe legacy mode (closed shadow
  root iframe hangs the frame walk), 120s scan budget, settleAnimations.

- [x] *Jul 24* — **Both form pipelines human-verified end to end**: contact
  ("Got it." + notification email) and Digest double-opt-in (confirm email
  → /confirm → contact landed in the Resend "Founder Digest" audience).
  Phase 3 closed.

- [x] *Jul 23* — **Email authentication COMPLETE**: SPF fixed + 2048-bit DKIM
  record added via DNS API + Start-authentication clicked in Google Admin —
  jshaw@ventriq.io now passes SPF/DKIM/DMARC end to end.
- [x] *Jul 23* — **Apex SPF fixed**: added `include:_spf.google.com` via DNS
  API (was GoDaddy-forwarding-only under `p=quarantine`).
- [x] *Jul 23* — **Workers Builds connected** (Derrick, dashboard).
- [x] *Jul 23* — **Workers Paid plan enabled** (Derrick).
- [x] *Jul 23* — **GoDaddy placeholder DNS records deleted** (5), mail records
  preserved (11), custom domains attached, www→apex redirect live.
