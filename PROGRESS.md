# Ventriq — work log

A running, plain-language record of everything done on this engagement. Newest
first. Written so it can be pasted straight into a client update for Justin.

## July 23, 2026

**The site is live.** https://ventriq.io now serves a real (starter) version of
the site — homepage + summit page with the event details, registration link,
and everything search engines need to start finding it. The full designed site
replaces it on the same links around Aug 1.

- **Hosting set up** on Cloudflare (fast, global, scales automatically) with
  automatic deploys: every code update we approve goes live on push.
- **Connected ventriq.io to the new site** — moved the domain's DNS to
  Cloudflare, cleaned out leftover GoDaddy records, and attached the domain
  (www redirects to the main address).
- **Protected email deliverability** — found that mail from jshaw@ventriq.io
  was at risk of landing in spam (missing authentication). Fixed the SPF
  record; one 2-minute step remains on Justin's side (DKIM — instructions
  provided) to finish it.
- **Email sending set up** — Resend (our email service) connected with
  ventriq.io verified as the sending domain; confirmation and newsletter
  emails will come from jshaw@ventriq.io.
- **Database set up** — Supabase connected (will store newsletter signups,
  contact messages, and chapter interest once the forms launch).
- **Visitor analytics set up** — Google Analytics installed, plus custom
  short links (ventriq.io/go/…) so we can tell exactly which channel —
  Instagram, LinkedIn, a speaker, an HBCU — drives each registration. Justin
  gets a simple share sheet; no messy tracking links to type.
- **Deep-dive on the launched event** — analyzed the live Luma listing, all 19
  speaker graphics (built the speaker roster, flagged 4 cards with typos to
  re-export), and researched the "Forge The Future" name landscape online.
- **Updated every page's copy** to match the launched event: new name, free
  registration, Mon–Thu schedule (Aug 10–20, 6:30–8:00 PM ET), the real
  session titles, and Justin's tagline "Forged together. Built to last."
- **Design finalized** — the design workspace was brought fully current and
  produced a complete build package (every page, every state, exact
  measurements) that the site is now being built from.
- **Full build roadmap written** — 8 phases from now through launch (Aug 1)
  and the event itself (Aug 10–20), informed by 8 deep research reports
  (hosting, registration, forms, email, animation, search visibility,
  accessibility, analytics).
- **Project workspace organized** — all research, copy, brand assets, and
  designs in one tidy repository on GitHub; project tracking files added so
  nothing slips.
- **Site foundation code** — the "clock" that makes the site update itself
  around the event (before / nightly during / after), security headers, and
  the tracking links above.

## July 10, 2026

- **Working session with Justin (meeting 2):** bought ventriq.io live on the
  call; set up the account stack together — GoDaddy, Supabase (database),
  Resend (email), a new Google Workspace for Ventriq, Luma (event
  registration), Stripe — with credentials shared securely via password vault.
- **Processed every decision from the call into the plan:** hold all
  "donate" language until the nonprofit filings clear; community membership
  becomes paid ($39/mo digital; in-person tier TBC); events run on Luma; the
  community goes public on the site.
- **Rewrote the site copy (v1.1)** to match those decisions — every page.
- **Ran the full design phase** — all 8 pages designed (home, summit,
  community, mastermind, about, donate-parked, contact, plus the global
  system: navigation, footer, forms, 404) and quality-checked against the
  brand system, with the Mastermind page added same-day.
- **Stress-tested everything** and flagged the time-sensitive items: the
  entity paperwork question (LLC vs corporation affects nonprofit status),
  ventriq.com's expiration window, email-platform fees, Google Workspace
  trial billing.
- **Prepared the meeting itself**: ~95 prioritized questions backed by a
  morning-of research sweep (which caught, among other things, that the
  domains hadn't been purchased yet).

## July 9, 2026

- **Wrote the complete website copy deck** — every page, in Justin's voice,
  built from his own recorded language; placeholders clearly marked for the
  facts only he can supply.
- **Researched high-end event pages** (Stripe, Vercel, Black Ambition, etc.)
  and designed the animation/motion plan for the summit page.
- **Built the design prompt package** and brand-quality guardrails so nothing
  about the site looks templated or AI-generated.
- **Installed a quality toolkit** (15 specialized review systems) covering
  design originality, human-sounding copy, Next.js best practices, and SEO.

## July 8, 2026

- **Kickoff call analyzed** and turned into a full discovery library: who
  Justin is, what Ventriq is, the mission, the programs, the timeline.
- **Deep research on Justin's public presence** — five researchers across
  YouTube, Instagram, press, and podcasts — distilled into a voice & tone
  guide the entire site is written from.
- **Captured the brand identity** from Justin's design chats and rebuilt the
  full working kit: logos (9 files), colors, typography, usage rules.
- **Competitive deep-dive** — six reports covering the mastermind market
  (pricing landscape), virtual summits, founder communities, and the
  positioning open lane Ventriq can own.
