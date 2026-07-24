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

- [ ] **Sentry project + DSN** — account/project creation is dashboard-side;
  once a DSN exists, `@sentry/cloudflare` wiring is a small PR (our compat
  date already qualifies). Until then: Workers Logs only.
- [ ] **Digest signup human test** — contact form PASSED Jul 24 ("Got it."
  + email received). Still untested end-to-end: footer Digest signup →
  confirm email → /confirm → "You're on the list".
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
- [x] ~~QA harness activation~~ *(done Jul 23 — deps installed, banners removed, 40/40 vitest green; first `pnpm e2e` run still pending: needs a local preview run + will surface real a11y findings)*
- [ ] **First e2e + lhci run** — `pnpm add -D vitest
  @playwright/test @axe-core/playwright @lhci/cli` + add scripts test/e2e,
  then wire qa.yml (written Jul 23, agent). First run will surface real
  violations to fix.
  - Activation must also delete the `// @ts-nocheck` banner at the top of
    `vitest.config.ts`, `playwright.config.ts`, `tests/calendar.test.ts`, and
    `e2e/*.spec.ts` — it's there so `next build`'s typecheck (tsconfig
    includes `**/*.ts`) stays green while the QA deps are absent.

## 🟡 Watch / later

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

- [x] *Jul 23* — **Email authentication COMPLETE**: SPF fixed + 2048-bit DKIM
  record added via DNS API + Start-authentication clicked in Google Admin —
  jshaw@ventriq.io now passes SPF/DKIM/DMARC end to end.
- [x] *Jul 23* — **Apex SPF fixed**: added `include:_spf.google.com` via DNS
  API (was GoDaddy-forwarding-only under `p=quarantine`).
- [x] *Jul 23* — **Workers Builds connected** (Derrick, dashboard).
- [x] *Jul 23* — **Workers Paid plan enabled** (Derrick).
- [x] *Jul 23* — **GoDaddy placeholder DNS records deleted** (5), mail records
  preserved (11), custom domains attached, www→apex redirect live.
