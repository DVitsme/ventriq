# Ventriq build roadmap

**Authored Jul 23, 2026** by the project director (Claude, DigitalDog tooling). Authorities: `docs/build-handoff/` = frontend/UI/UX truth (design of record, copy is law) · this roadmap = backend, architecture, sequencing, and polish truth. Informed by 8 research agents (OpenNext production, Luma, forms/email, motion currency, event SEO, a11y/perf QA, analytics, GA4) — key verdicts baked in below; full reports in the session transcripts of Jul 23.

**Clocks:** minimal indexable site **this week** (SEO: every parked-page day is wasted crawl history) · full site live **~Aug 1** · Forge The Future runs **Aug 10–20** · replay mode **Aug 21**.

---

## Architecture decisions (locked — the why, once)

| # | Decision | Why |
|---|---|---|
| A1 | **Classic dynamic SSR + route-level ISR only.** No `cacheComponents`, no `use cache`, no PPR, no fetch-level `next.revalidate`. | All broken/unreliable on opennextjs-cloudflare today (issues #1225/#1130/#1315). Route-level `export const revalidate` works. |
| A2 | **Date-driven states compute per-request** (`Date.now()` against a single calendar util) on dynamic routes. No cron. | Exact flip timing, zero infra. Cron (custom-worker entrypoint) only if a flip ever needs side effects. |
| A3 | **`middleware.ts` (edge), never `proxy.ts`; no `runtime="edge"` exports.** | Adapter rejects proxy.ts; edge runtime unsupported. Supabase session logic (when auth arrives, phase 2+) transplants into middleware despite Supabase docs' "Proxy" framing. |
| A4 | **Workers Paid ($5/mo) + Workers Builds CI.** | 3MiB free bundle cap won't fit the stack; Workers Builds gives prod deploys + PR preview URLs with no token plumbing. Pre-create the R2 cache bucket before first CI deploy (issue #1278) *if/when ISR cache is enabled*. |
| A5 | **Registration = Luma embed checkout button** (brand-styled trigger, Luma overlay) + same element as `<a>` fallback. **No Luma Plus in v1** ($59/mo buys only webhooks/API/GA-on-Luma we don't need yet). | Luma owns ticketing/questions/reminders; UTMs auto-forward; free. |
| A6 | **Forms write via `sb_secret_` key from Server Actions; tables RLS-on deny-all and UNEXPOSED.** Turnstile + Workers rate-limit binding + DB checks, in that order. | Makes Turnstile unbypassable (no anon-key side door). 2026 Supabase default keeps tables un-exposed. |
| A7 | **Newsletter = double-opt-in; digest sends via Resend Broadcasts only.** Supabase = record of truth; Resend segment = derived send list (owns suppression). | New sending domain + consent audit trail; Broadcasts auto-handle RFC 8058 one-click unsubscribe. |
| A8 | **.ics = ONE VEVENT + `RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH;COUNT=8`, UTC, METHOD:PUBLISH**, contentType `text/calendar; charset=utf-8; method=PUBLISH`. | Both weeks start Monday; multi-VEVENT breaks Gmail, RDATE breaks Outlook, REQUEST would double-invite (Luma owns RSVP). |
| A9 | **GA4 (G-T0FTLZC27P) via `@next/third-parties`**, prod-only, `afterInteractive`; **plus `/go/[slug]` server-side redirect routes as the unblockable conversion log** and UTM stamper. No cookie banner (US nonprofit; MODPA is the watch-law). No Partytown, no Measurement Protocol at launch — but forms store `ga_client_id`/`ga_session_id`/UTMs for later backfill. | Client decision (GA4) + best-of-both from the analytics research. |
| A10 | **OG images at build time only.** | Runtime next/og costs ~2MiB of Worker budget; build runs in Node. |
| A11 | **Motion:** IO class-toggling for reveals; CSS-only marquee; `motion@12` LazyMotion (~20kB) for hero stagger/orchestration only; NumberFlow for count-ups; scroll-lit paragraph via `animation-timeline: view()` inside `@supports` with lit-by-default fallback (Firefox); **`<MotionConfig reducedMotion="user">` at root** (it's opt-in!). No View Transitions. | Currency-verified Jul 2026. |
| A12 | **Contrast policy (computed):** orange = large-text/accent only, never body links; gold-on-cream = decorative only, never focus rings/icons; focus rings = gold on midnight, ink on cream. | Measured ratios: orange 3.7–4.4 (fails AA normal), gold-on-cream 2.03 (fails everything). |
| A13 | **CSP static via `next.config.ts` headers with `'unsafe-inline'` script-src for phase 1** (+ googletagmanager, embed.lu.ma; frame-src luma). Nonces when the webapp phase lands. | Nonce CSP forces every page dynamic — wrong trade for a marketing site. |
| A14 | `[EMAIL]` resolves to **jshaw@ventriq.io** (footer, contact, from-address display). Sending from `Ventriq <jshaw@ventriq.io>` — domain verified in Resend. | Client decision Jul 23. |

---

## Phase 0 — Beachhead + platform (Jul 23–25, ~1 day of work)

*Goal: stop wasting crawl days; make the platform deploy-ready. Ships a real page to ventriq.io ahead of the full site.*

- [ ] **Minimal indexable deploy**: `/` (brand one-pager: H1, mission line, Luma link) + `/summit` (event name, dates, nights list, Luma CTA) with real titles/descriptions, Organization+WebSite+Event JSON-LD, `sitemap.ts`, `robots.ts`. Plain-styled with the real tokens — no motion, no chrome. Same URLs the full site takes over.
- [ ] Workers Paid plan; **custom domain**: apex `ventriq.io` (`routes: custom_domain`) + www placeholder DNS + redirect rule → apex. **Export any emails captured by the GoDaddy placeholder form first**, then repoint DNS.
- [ ] **Workers Builds** git integration (name `ventriq` matches wrangler; prod = `opennextjs-cloudflare deploy`, branches = `upload` for PR preview URLs; mirror env into Build variables).
- [ ] Cloudflare dashboard: **enable Images transformations for ventriq.io** · **Crawler Hints ON** (IndexNow) · **AI Crawl Control: explicitly Allow** OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, Claude-SearchBot, Claude-User, GPTBot, ClaudeBot (new zones block by default!).
- [ ] **Google Search Console** domain property (DNS TXT) + submit sitemap + Request Indexing for `/` and `/summit` · **Bing Webmaster Tools** import.
- [ ] Secrets in: `wrangler secret put` RESEND_API_KEY, SUPABASE_SECRET_KEY, TURNSTILE_SECRET_KEY (when created); `.env` stays local-only; `NEXTJS_ENV` note in `.dev.vars`.
- [ ] **Justin asks (send today):** fix Luma location to native virtual (corrects schema + managed join link) · add ventriq.io/summit to the Luma description · claim `luma.com/ventriq` + LinkedIn `/company/ventriq` · re-export the 4 typo'd speaker cards · speaker→night mapping + original headshots + [ANNOUNCE-DATE] · FAH price ($89 or $99?) + cancel policy + Skool confirmation.

**Gate:** `site:ventriq.io` returns the beachhead within days; PR preview URL works; `curl ventriq.io/robots.txt` 200.

## Phase 1 — Foundation (Jul 24–26, ~1.5 days)

*Goal: the system everything else composes from. Design-ref: Style Foundation + Global System frames.*

- [ ] Tailwind v4 `@theme` tokens verbatim from build-spec §1 (7 colors + opacity steps); Space Grotesk via `next/font/google` (variable, 400/500/600, swap); base styles (::selection, focus rings per A12, 2px radius, no shadows).
- [ ] Core primitives: `Eyebrow` (small-caps + gold rule), `DraftingRule` (ticks/arrow/continuation variants), `ThresholdCard`, `RedlineChip`, `PhotoGrade`, `SectionShell` (midnight/cream), buttons (gold primary / outline / text-link per ground).
- [ ] **`lib/calendar.ts`** — the single date util: event phase (pre/announced/live-night/between/post), tonight's night index + title, countdown target. Every state machine (hero, announcement, nav CTA, agenda rows) reads ONLY this. Unit-test the flip boundaries (ET timezone!).
- [ ] Global chrome: `AnnouncementBar` (3 states + localStorage dismissal + mobile short string, one line), `Nav` (time-aware single button), canonical `Footer` (with Digest form shell + Instagram link + EIN chip).
- [ ] `content/placeholders.ts` registry (build-spec §9) with `[EMAIL] = jshaw@ventriq.io` resolved; agenda data module (8 nights, titles/subtitles verbatim).
- [ ] Wiring: `@next/third-parties` GoogleAnalytics (prod-only) + typed `track()` wrapper + preconnect; `/go/[slug]/route.ts` redirect map (`summit`, `ig`, `li`, `hbcu-*`, `speak`, `email`) stamping UTMs → Luma/home; Sentry (`@sentry/cloudflare` free tier); CSP headers (A13); `<MotionConfig reducedMotion="user">`; `docs/utm-registry.md` (the slug sheet for Justin).
- [ ] Luma embed: `LumaRegisterButton` (script via next/script afterInteractive + `initCheckout()` re-bind, brand-styled trigger, `data-luma-utm-source` per placement, `<a>` fallback, fires `luma_register_click{cta_location}`).

**Gate:** chrome renders pixel-true vs Global System frames at 1440/390; calendar util tests green; GA4 debugview shows pageviews + a test event; `/go/summit?s=ig` 302s with stamped UTMs.

## Phase 2 — Pages (Jul 26–30, ~3.5 days, in this order)

*Each page: build vs its design-ref frames → copy verbatim from `copy-source/` → run the 15-point QA checklist (Phase 6 list) before moving on. Static/motionless first; motion layers in Phase 4.*

1. [ ] **`/` Home** (build-spec §4 row 1): hero + proof band + three thresholds (Aug 10/$39/Sep numerals, staggered) + convergence diagram + letter + ruled quotes + sponsors-only S7 + footer.
2. [ ] **`/summit`** — the flagship: hero state machine A–E off `lib/calendar.ts` (server-rendered state, countdown as tiny client island) + ticker + corridor scene (static numerals first) + steps + **scalable speaker wall** (15 pending tiles, grid → 30+, revealed-card component ready) + agenda (Mon–Thu real titles, `[SPEAKERS]` chips, Aug 14–16 off-block, row states from calendar util) + who-it's-for + letter + sponsor card + FAQ (native `details`) + final CTA. **Event JSON-LD correct-where-Luma-is-wrong** (OnlineEventAttendanceMode + VirtualLocation).
3. [ ] **`/founders-after-hours`**: hero (paid meta line + POLICY chip) + doors + run-of-show + membership cards ($39 / $[89–99]) + HRPB on-ramp + tally (zero state) + digital home + chapters + FAQ + CTA.
4. [ ] **`/mastermind`**: per ref incl. spec sheet (investment Variant A default, B behind a flag) + application steps + flagged pull-quote + FAQ.
5. [ ] **`/about`** (cream-led): story w/ margin labels + monogram section (static) + mission card + tithe block ([TITHE] chip — only page) + bio + council slots + CTA.
6. [ ] **`/contact`**: form shell (select w/ "Pick one" placeholder + `?topic=sponsorship` preselect) + quick routes + thank-you state.
7. [ ] **404** (corridor dead-end) + `/donate` → 301 `/contact?topic=sponsorship` (out of sitemap).

**Gate per page:** side-by-side vs design-ref at 1440 + 390; zero copy drift (spot-diff against copy-source); no refusal-catalog violations; landmarks/headings clean.

## Phase 3 — Forms + backend (Jul 29–30, ~1 day, overlaps Phase 2 tail)

- [ ] Supabase migration (CLI, then `db push`): `newsletter_signups` (DOI columns: status/confirm_token/confirmed_at/resend_contact_id) · `contact_messages` · `chapter_interest` — citext, length checks, `ip_hash`, **+ `ga_client_id`, `ga_session_id`, `utm_source/medium/campaign`** on all three; RLS on, zero policies, revoke anon/authenticated; tables NOT exposed to Data API.
- [ ] `wrangler.jsonc`: `ratelimits` binding `{limit:5, period:60}`; `pnpm cf-typegen`.
- [ ] Server Actions (shared zod-4 schemas w/ RHF; `useActionState` + `startTransition` progressive pattern; in-voice error strings from 00-global): verify Turnstile (action-scoped) → rate-limit (hashed CF-Connecting-IP) → parse → insert (secret key) → fire GA4 `sign_up`/`generate_lead` client-side on success state.
- [ ] Turnstile: `@marsidev/react-turnstile`, implicit hidden input, `appearance: interaction-only`, per-form actions, widget reset on failure; test keys in dev.
- [ ] Contact + chapter: also notify Justin via Resend transactional (to jshaw@ventriq.io).

**Gate:** all three forms work in `pnpm preview` (workerd) with JS disabled (progressive) and enabled; spam paths (bad token, 6th submit/min) rejected with in-voice errors; rows land with attribution columns.

## Phase 4 — Email + motion (Jul 30–31, ~1.5 days)

**Email (react-email + Resend, from `Ventriq <jshaw@ventriq.io>`):**
- [ ] Templates: newsletter **confirm** (DOI, `/confirm?token=` route flips status + creates Resend contact) · newsletter **welcome** · contact/chapter notification · **Summit confirmation** (body verbatim 00-global) with the A8 `.ics` attached. *(Note: Summit confirmations are Luma's job in v1 — our template exists for the digest-driven "get the calendar file" link and future owned-registration; ship the .ics as a `/summit/calendar.ics` route too — build-time generated, linked from the summit page meta row.)*
- [ ] Digest scaffolding: Resend Broadcast template w/ `{{{RESEND_UNSUBSCRIBE_URL}}}` + physical address slot (`[ADDRESS — registered agent OK]` chip until Justin supplies), segment wiring from DOI flow.

**Motion (per `docs/build-handoff/docs/motion-spec.md` + A11):**
- [ ] IO reveal hook (class-toggle, once, unobserve) → section reveals + line draws (`pathLength=1`, CSS keyframe, few paths at once).
- [ ] Hero staggers via LazyMotion `m` (domAnimation); ticker CSS-only marquee (aria-hidden dupe, motion-safe); corridor count-up via NumberFlow; scroll-lit manifesto via `@supports (animation-timeline: view())` lit-by-default; FAH tally strokes + run-of-show assembly; About monogram draw; 404 dead-end line.
- [ ] Reduced-motion audit: every effect degrades to visible/instant (CSS media + MotionConfig + NumberFlow default).

**Gate:** emails render in Gmail/Apple/Outlook (Resend test sends); .ics imports as 8 Mon–Thu events in all three calendar apps; motion at 60fps (no >50ms tasks while scrolling); reduced-motion mode = everything readable, nothing moving.

## Phase 5 — SEO/analytics finish (Jul 31, ~0.5 day)

- [ ] `@graph` JSON-LD: Organization (`@id: /#org`, sameAs → IG/Luma host/LinkedIn/iamjs.io) + WebSite (`name: Ventriq`) on `/`; Event on `/summit`; validator clean. (Organization now; NGO type after incorporation; `nonprofitStatus` only after the determination letter.)
- [ ] Build-time OG images per page (Satori at build: page name + one line + corridor mark, midnight ground; flexbox-only, PNG).
- [ ] Titles entity-paired "… — Ventriq"; canonicals; metadata verbatim from copy files.
- [ ] GA4 admin config: Enhanced Measurement (history ON, **form interactions OFF**), retention 14mo, internal-traffic filter, key events (`luma_register_click`, `generate_lead`, `sign_up`), custom channel group (`^ig-`, `^speaker-`, `^hbcu-`, linkedin, email).
- [ ] Align Luma "How did you hear" options to the UTM vocabulary (Justin, 2 min).

## Phase 6 — QA gates (Aug 1 morning, ~0.5 day; continuous before)

- [ ] **Per-page 15-point checklist** (from the a11y research; lives in `docs/build-handoff/docs/acceptance-checklist.md` + these additions): axe clean (wcag2a/2aa/21aa/22aa) desktop+mobile+stateful DOM · keyboard pass · focus visible & not obscured (scroll-padding under sticky nav) · target sizes ≥24px (44 for CTAs) · contrast policy A12 · reduced-motion both modes · semantics · forms a11y · Lighthouse ≥95/100/95/95 · LCP ≤2s (headline, not image) · CLS <0.1 · TBT ≤200ms · budgets (JS ≤250KB, fonts ≤120KB) · 320px/200% zoom reflow · verified in workerd preview.
- [ ] CI: Playwright e2e + `@axe-core/playwright` against `pnpm preview` (:8787), reduced-motion project; `@lhci/cli` with the budget assertions; runs on PRs via GitHub Action (Workers Builds handles deploys; Actions handles gates).
- [ ] **Anti-AI passes:** design-tells catalog sweep + ventriq-voice/human-copy read of every rendered page + copy-fidelity diff vs `copy-source/` (zero paraphrase).
- [ ] `unlighthouse` full-site sweep; fix stragglers.

## Phase 7 — Launch (Aug 1)

- [ ] Full site replaces beachhead (same URLs); smoke prod: forms, /go/ redirects, GA4 realtime, Luma overlay, 404, announcement dismissal.
- [ ] GSC re-Request Indexing; verify OAI-SearchBot/PerplexityBot get 200s in logs (WAF vs robots mismatch check).
- [ ] Cross-link mesh live: IG bio → /summit (via `/go/ig`), Luma description → ventriq.io/summit, iamjs.io → ventriq.io (Justin), LinkedIn page.
- [ ] Hand Justin: the UTM slug sheet + QR (`/go/summit?s=speak`) + "what to watch in GA4" one-pager.

## Phase 8 — Event ops + post (Aug 10 → Sept)

- [ ] **Aug 8:** verify state machine flips in prod for night 1 (calendar util is ET-correct); announcement "during" state; agenda "tonight" row.
- [ ] **During (Aug 10–20):** guest-CSV pivot after week 1 (registrations by utm_source vs GA4 clicks by channel); daily glance at Sentry/Workers Logs.
- [ ] **Aug 21:** post-event flip verified (hero E, announcement post, nav CTA → Apply for the Mastermind); `/summit` becomes the replay-funnel page (fresh content, same URL).
- [ ] **Sept+ backlog, in rough order:** speaker reveals as assets land (wall → revealed) · Mastermind application form ([APP-OPEN DATE]) · HRPB section/link (starts Sept 28) · FAH platform confirm → real join links · Donate page unlock (entity + 1023 + MD filing → restore nav button, /donate route, tithe donor story) · Ventriq Ventures on About (after Justin's write-up) · Ad Grants application (needs determination letter; key events already have history) · consider Luma Plus if webhook sync ever matters · re-check Cloudflare AI-crawler defaults Sept 15.

---

## Justin dependency list (the only things that can slip the plan)

⛔ **Blocks launch polish:** speaker→night mapping + original headshots + [ANNOUNCE-DATE] · FAH in-person price + cancel policy · Skool confirmation ([SKOOL-URL]).
🔶 **Blocks specific sections, ships bracketed otherwise:** mission ratification + [COUNSEL-REVIEW] wording · testimonial permissions · [TITHE] blessing · the two ⚠️ audio-verify quotes · Mastermind $[INVESTMENT] + A/B + dates · physical mailing address for email footers · Baltimore founding-night date.
✅ **Done:** domain, accounts, GA4 ID, jshaw@ventriq.io, event live, 15 speaker cards.
🔧 **His 10-minute Luma fixes:** native virtual location · site link in description · claim luma.com/ventriq · "How did you hear" options · typo re-exports.
