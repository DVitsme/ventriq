# Skipped & deferred — the living list

Anything raised but not fully handled lands here the moment we skip it: what it
is, why it matters, and exactly what unblocks it. Items move to the log at the
bottom when done (with date). Levels: 🔴 time-sensitive / blocking · 🟠
important, not yet blocking · 🟡 watch / later.

## 🔴 Time-sensitive

- [ ] **Google Workspace trial billing** — the Ventriq Workspace was created
  Jul 10 on a 14-day trial → **bills ~Jul 24 (now)**. Card on file or the
  ventriq.io mailboxes stop. Google for Nonprofits (free) only after the
  501(c)(3) letter. *(Raised Jul 10, meeting 2 stress test.)*
- [ ] **ventriq.com expires Jul 25** — the squatter's registration lapses in
  ~2 days. A ~$25 backorder (DropCatch/GoDaddy) beats their $2–6K ask if they
  don't renew. Decision + backorder placement is a 10-minute task. Also:
  **ventriq.org is still unregistered** (~$12, natural nonprofit TLD). *(Raised
  Jul 10 stress test; re-raised Jul 23.)*
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

- [ ] **GA4 admin config (Phase 5's dashboard half, ~10 min):** Enhanced
  Measurement ON with history events, form-interactions OFF; retention
  2→14 months; mark key events luma_register_click / generate_lead /
  sign_up; custom channel group (^ig- / ^speaker- / ^hbcu- / linkedin /
  email); internal-traffic filter for your + Justin's IPs. *(Raised Jul 24.)*

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
  variables and secrets" so git-triggered builds inline it.
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
