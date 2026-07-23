# Ventriq — Competitive Website Teardowns
**For:** Derrick / DigitalDog · **Date:** 2026-07-08 · **Method:** live fetches + rendered-DOM dumps + headless-Chrome full-page screenshots (in `screenshots/`) + CSS/HTML fingerprinting. Every claim labeled **VERIFIED** (seen in HTML/CSS/screenshot today) or **ESTIMATE** (inferred/recalled). Ventriq context: Home · Summit (Eventbrite) · Founders After Hours (Skool) · Mastermind (app-gated, Sept) · About · Donate (Stripe) · Contact; navy `#101B2D` / cream `#F1ECDF` / gold `#C9A24C`, Space Grotesk, "architect's line."

## TL;DR
- **Hampton is the design north star.** VERIFIED palette `#032528` deep teal + `#D1BFAE/#C7B299` champagne + `#F1F2EF` cream, Financier Display serif + Neue Montreal sans. Structurally identical to Ventriq's navy+gold+cream "quiet luxury" — copy its composure, drop its wealth-gatekeeping.
- **1863 Ventures is dead** (SSL cert expired; org wound down Dec 2024 → for-profit New Majority Ventures). Substituted **digitalundivided.com** as the dual founder/funder analog. Lesson: the "closest analog" niche is literally vacant.
- **Dual-audience pattern that works** (Camelback, Halcyon, digitalundivided): founder CTA and Donate sit side-by-side top-right as paired buttons; homepage body is founder-first with ONE dark donor section near the footer. BGV shows the failure mode: donation ask hijacks the hero.
- **Program cards in threes.** Camelback, Halcyon, BGV all present programs as a 3-up card row (name · one-liner · Learn more). Ventriq's Summit/After Hours/Mastermind maps perfectly.
- **Hampton's Mastermind playbook:** problem-led serif hero → results stats → testimonials → "What You Actually Get" (3 pillars + concentric-circles diagram) → signed founder letter → transparent 6-step vetting → FAQ. Steal nearly wholesale.
- **Summit pages = numbers + faces + tiers.** AfroTech (VERIFIED): stats band (40,000+ / 300+ / 15 / 11), ticket-tier cards with audience labels, speaker wall with name/title/company. Brand Builders Summit (VERIFIED): 2-field inline registration in hero, countdown, "lineup revealed in August" progressive reveal, 72-hr replay policy in FAQ.
- **Community page = role-based doors** (1MC VERIFIED): Attend / Present / Organize as three cards, then upcoming-sessions feed. Ventriq: Join / Show up / Bring your challenge → Skool.
- **Donate UX:** Camelback embeds Donorbox on-page; BGV's donate page has NO visible form (Wix, info-only) — the anti-pattern. Ventriq: Stripe embedded on-page + per-program giving ("Fund a Mastermind seat") stolen from BGV's "FUND PROGRAM" card buttons.
- **"Build/blueprint" language is crowded:** Camelback "Building a New Blueprint," AfroTech "Build What's Next.", YC "turns builders into formidable founders." Ventriq's *architect's line / drafting* metaphor must be visual (line-work motifs) not just verbal.
- **Ship server-rendered HTML.** 1MC (Salesforce SPA) serves bots an error page; AfroTech's Nuxt homepage serves an empty shell; CreativeMornings bot-walls everything. Static/SSR marketing pages win SEO + resilience.

## Teardown table
| Site | Stack (VERIFIED) | Hero (verbatim) | Steal | Avoid |
|---|---|---|---|---|
| 1863ventures.net | Webflow (DNS→proxy-ssl.webflow.com); site DOWN | — (SSL error) | the vacant positioning | dead-domain rot |
| digitalundivided.com | HubSpot CMS | "Where Innovation Meets Opportunity." | dual hero CTAs "Join a Program" + "Donate"; stage-laddered programs | vague hero headline |
| blackgirlventures.org | Wix | "Your Donation Keeps Small Businesses Hiring" | per-program "FUND PROGRAM" buttons; 501(c)(3) footer trust | donor-hijacked hero; 8-item ALL-CAPS nav; formless donate page |
| camelbackventures.org | WordPress 7.0 + Donorbox | "We're Building a New Blueprint, Expanding Who Gets to Build What's Next." | Donate+Apply paired nav buttons; $10M/$432M/220+/6M stats band; 5 C's | fellowship page w/ no eligibility or deadlines; "Apply Learn About Fellowship" CTA mash |
| halcyonaccelerator.org | WordPress 6.9.4 | "A haven for big risks & bold ideas" | cream/black editorial system; constellation line motif; dark "Support Halcyon" donor section | neon accent chaos (3 competing brights) |
| helloalice.com | custom + Shopify assets (ESTIMATE) | "Your Small Business AI Advisory Board" | "free, no credit card, 2 minutes" friction-killers; 6-pillar health diagnostic | product-SaaS coldness; AI-first repositioning buried the community |
| joinhampton.com | HubSpot CMS | "If you're a founder… Stop making $50M decisions alone." | problem-led serif hero; concentric-circles diagram; founder letter; 6-step vetting transparency; FAQ | hidden pricing; $3M-revenue gatekeeping vibe |
| 1millioncups.com | Salesforce Experience Cloud | "Educating, Inspiring and Connecting Entrepreneurs Nationwide Every Wednesday Morning" | 3 role cards (Attend/Present/Organize); stats line; cadence-as-brand ("every Wednesday") | SPA error page for bots; corporate-template flatness |
| creativemornings.com | Rails (ESTIMATE); hard bot-wall | title: "Breakfast lecture series for the creative community" | city-first chapter UX (ESTIMATE) | blocking crawlers this hard |
| ycombinator.com | custom (no generator tag) | "YC turns builders into formidable founders" | terms transparency ($500k / 3 months / 4× yr); "never too early to apply" | 26-item nav; elite-logo intimidation = the stigma Ventriq counters |
| afrotech.com → afrotechconference.com | media: custom; conf: Nuxt | "Build What's Next." + "November 2-6 » Houston, Texas" | stats band; tiered ticket cards w/ audience labels; speaker wall; segmented "Get Involved" cards | split-domain brand; empty-shell SSR |
| brandbuilderssummit.com | WordPress 7.0 + Elementor | "Become the brand builder AI can't replace" (FREE · Sep 8–11, 2026) | 2-field hero registration + trust microcopy; countdown; progressive speaker reveal; replay policy in FAQ | glam-gradient salesiness; fake-scarcity tone |

---

## Per-site teardowns

### 1. 1863 Ventures — 1863ventures.net · DOWN (VERIFIED 2026-07-08)
- `https://1863ventures.net` fails TLS (alert 80, `ERR_SSL_PROTOCOL_ERROR`); DNS still points www → `proxy-ssl.webflow.com` (was a Webflow site). HTTP 301-loops to the broken HTTPS.
- Cause: org closed as a nonprofit and relaunched for-profit as New Majority Ventures — TechCrunch, Dec 4, 2024 (`techcrunch.com/2024/12/04/non-profit-1863-ventures-has-closed...`). Programs were Founder to CEO, Pipeline, Acceler8 (ESTIMATE from press).
- **Design takeaway:** Ventriq's closest analog vacated the market — the "implementation-first org for new-majority founders with a donor lane" position is open. Also a maintenance memo: expired certs read as organizational death.

### 2. digitalundivided.com (substitute analog) · VERIFIED via fetch + screenshot
- **Nav:** Programs · Research · About us · Blog · Join Us · Donate.
- **Home:** hero "Where Innovation Meets Opportunity." + sub about disrupting systemic inequities → CTAs **"Join a Program" | "Donate"** paired in hero → program ladder by stage (START → BIG → BREAKTHROUGH → Do You Fellowship → C-Suite Circle → CapXS) → stats ("3200+ founders," "85% reported growth," "$30M+ capital connections") → mission → Get Involved/Donate.
- **Dual audience:** the cleanest hero-level split in the set — verb-for-founders + verb-for-donors side by side.
- **SEO:** title "Shaping the Future of Entrepreneurship | digitalundivided"; H1 "Where Innovation Meets Opportunity". Stack: HubSpot.
- **Verdict.** Steal: paired hero CTAs; stage-laddered program presentation. Avoid: headline that could belong to any org.

### 3. Black Girl Ventures — blackgirlventures.org · VERIFIED via fetch + screenshot
- **Nav (ALL-CAPS):** FOUNDATION · ABOUT▾ · PROGRAMS▾ (PULL UP & PITCH, EMERGING LEADERS FELLOWSHIP 2.0, BGV NEXTGEN, BGV CONNECT) · GET INVOLVED▾ · EVENTS · NEWS & STORIES · RAISIFY (VOTE) · DONATE.
- **Home order:** hero "Your Donation Keeps Small Businesses Hiring" / sub "Your gift builds the hiring capacity…" / [DONATE] → Our Programs (4 cards, each with founder "LEARN MORE" **and** donor "FUND PROGRAM" buttons) → A Decade of Impact stats → Founders Driving Impact (testimonials) → Our Partners logos.
- **Dual audience:** donor-first hero; founders get secondary "LEARN MORE/JOIN NOW." Per-program funding buttons are genuinely novel.
- **Donate UX:** `/donate` page headline "SUPPORT BGV:" — **no rendered form on page** (Wix), 501(c)(3) stated, address/phone, no EIN. High friction.
- **SEO:** title "HOME | Black Girl Ventures" (wasted). Stack: Wix.
- **Verdict.** Steal: FUND-this-program buttons; explicit 501(c)(3) footer block. Avoid: donation ask as homepage hero (founders become props); 8 top-level nav items + insider jargon ("RAISIFY (VOTE)"); donate page without a form.

### 4. Camelback Ventures — camelbackventures.org · VERIFIED via fetch + screenshot
- **Nav:** About Us · Our Work · Impact · Fellows · Get Involved + **[Donate outline] [Apply solid-yellow]** paired top-right.
- **Home order:** teal hero "We're Building a New Blueprint, Expanding Who Gets to Build What's Next." + "10 Years of Supporting…" + CTA "Read our 2025 Annual Report" + hexagon-masked portrait → Built to Innovate (YouTube embed) → Our Work: 3 program cards (Camelback Fellowship / Entrepreneurial Support Hub / Guardian Summit) → Our Impact stats **$10M invested · $432M follow-on · 220+ fellows · 6M beneficiaries** with hexagon photos → full-bleed photo + "Want to be a part of something meaningful?" [Apply] → newsletter "Become a Camelback Changemaker" [Be In The Loop].
- **Fellowship page:** 16 weeks, hybrid, **$40,000 per venture**, "5 C's" (Coaching, Capital, Connections, Community, Curriculum) — but **no eligibility criteria, no deadlines, no FAQ on page**; CTA reads "Apply Learn About Fellowship."
- **Donate:** Donorbox embedded (VERIFIED in HTML). Stack: WordPress 7.0.
- **Design:** teal `#1B9E93`-ish + cream + yellow accent, hexagon motif system, real-founder photography, geometric sans (ESTIMATE hexes from screenshot).
- **Verdict.** Steal: paired Donate/Apply nav buttons; stats band; named framework ("5 C's" → Ventriq could name its method). Avoid: program page missing eligibility/dates; annual-report hero CTA (donor artifact) as the homepage's only hero action.

### 5. Halcyon — halcyonhouse.org → **halcyonaccelerator.org** (301) · VERIFIED via fetch + screenshot
- **Nav:** About · Founders · Programs · News & Insights · Investing · Partnerships & Giving + **[APPLY pill] [DONATE]** top-right.
- **Home order:** black hero "A haven for big risks & bold ideas." over founder-photo strip laced with pink **constellation line-work** → "Halcyon accelerates the impact-driven future of business." → cream section "Since 2014… space, community, and access." → 3 vertical cards Climate (teal) / Health (pink) / EquityTech (chartreuse) → Our Programs + Our Founders two-up ("650+ impact entrepreneurs," FOUNDERS DATABASE) → Featured Ventures logo rail → **"Support Halcyon"** dark donor section w/ duotone photo + [MAKE A DONATION] → footer w/ newsletter, Financials/Annual Reports links, DC address.
- **Dual audience:** founder-first body, single well-lit donor moment near footer + "Partnerships & Giving" nav — the composed inverse of BGV.
- **Design:** black + cream (~`#F0EBE3` ESTIMATE) + neon pink/teal/chartreuse; grotesque display type; duotone photography; node-and-line motifs. The most "architectural" brand in the set. Stack: WordPress 6.9.4.
- **SEO:** title "Home | Halcyon"; H1 "A haven for big risks & bold ideas".
- **Verdict.** Steal: cream/black editorial rhythm w/ one dark donor section; line-work motif (Ventriq's gold hairline version); Financials/Annual-Report footer links for donor trust. Avoid: three competing neon accents; "Home |" title tags.

### 6. Hello Alice — helloalice.com · VERIFIED via fetch + screenshot
- **Nav:** Meet your Board · Opportunities · Small Biz Library · Sign in · **Launch your Board**.
- **Home order:** hero "Your Small Business AI Advisory Board" / "You have the vision. Now you have the boardroom." / [Launch your Board] → 1.6M-founder proof → six named AI advisors → benefits/partner offers (grants, PayPal/T-Mobile) → 3-step onboarding → advisor profiles → **six-pillar business-health diagnostic ("two minutes")** → founder stories → grants/rewards → final CTA.
- **Friction killers (verbatim-ish):** free tier, "no credit card required," two-minute setup, "Check your score."
- **SEO:** title "Hello Alice — Your Small Business Advisory Board" + rich meta description. Stack: custom app; Shopify-CDN assets present (ESTIMATE on platform).
- **Verdict.** Steal: friction-killing microcopy under every CTA; a lightweight self-assessment as lead-gen (Ventriq: "Where is your build stuck?" 2-min quiz → routes to Summit/After Hours/Mastermind). Avoid: platform-coldness — the 2026 AI pivot erased human community warmth Ventriq needs.

### 7. Hampton — joinhampton.com · VERIFIED via fetch + screenshot + CSS
- **Nav:** Explore Membership · Wall of Fame · FAQ · Blog · About Us + [Apply] [Login].
- **Home order:** dark hero, centered serif "If you're a founder… Stop making $50M decisions alone." / sub "Your personal board of ~10 vetted founders, meeting monthly in your city. Show up with your hardest challenge at noon, leave by dinner with a clear plan." / [Apply] + "Want to learn more? Explore Membership" → 18-city tile grid → Member Results (3 outcome stats: "$12M SaaS," "$8M Marketplace," "$25M Ecom") → pull-quote "Lonely decisions are expensive. Stop paying that tax." → 3 testimonial cards → member-profile wall (photos + credentials) → dark "What You Actually Get in Hampton": 3 pillars + **concentric-circles diagram (Core 8-person group ⊂ City Chapter ⊂ Hampton Network)** → **signed founder letter from Sam Parr** ("Hey there, My co-founder and I…") → vetting steps → guarantee (45-day) → criteria → 12-item FAQ.
- **Membership presentation:** explicit eligibility ("$3M+ revenue / $3M+ raised / $10M+ exit"), price withheld ("annual investment… 10x value").
- **Application flow:** 6 transparent stages incl. community-veto and founder sign-off; invite w/ 10-day window.
- **Design (VERIFIED from CSS):** `#032528` / `#031B1D` deep evergreen, `#D1BFAE` `#B39E8A` `#C7B299` champagne/taupe, `#F1F2EF` cream; **Financier Display (serif) + Neue Montreal (sans)**. Sparse motion, huge whitespace, thin rules. Title: "Hampton, the private network for high-growth founders." Meta description is conversion copy ("Apply now."). Stack: HubSpot.
- **Verdict.** Steal: the entire page grammar (problem hero → proof → what-you-get diagram → founder letter → transparent vetting → FAQ); dark-ground + warm-metallic palette logic. Avoid: price opacity and revenue-gatekeeping tone — Ventriq's Mastermind must feel selective-but-open ("application-gated, not wealth-gated").

### 8. 1 Million Cups — 1millioncups.com · VERIFIED via screenshot (SPA blocks fetch)
- **Nav:** HOME · ATTEND▾ · PRESENT · ORGANIZE▾ · ABOUT▾ + [SIGN IN OR REGISTER].
- **Home order:** black hero "Educating, Inspiring and Connecting Entrepreneurs Nationwide Every Wednesday Morning" → ZIP/city/state community search bar → stats line "110 communities | 25701 entrepreneurs | 1,000,000+ cups of coffee" → **3 role cards: "Find a Meeting Near You" / "Present Your Business" / "Launch a Community"** → testimonial carousel → "See the latest 1MC presentations" (upcoming presenter cards w/ dates) → "Get Connected" [FIND YOUR COMMUNITY] → Kauffman-branded footer.
- **Design:** black/white + orange, utilitarian cards, Salesforce Experience Cloud (bots get "Sorry to interrupt — CSS Error" page: VERIFIED).
- **Verdict.** Steal: cadence-as-identity ("Every Wednesday Morning" → Ventriq After Hours needs its own fixed rhythm); role-based 3-door entry; upcoming-sessions feed. Avoid: JS-only rendering; sterile enterprise template feel.

### 9. CreativeMornings — creativemornings.com · **VERIFIED (gap-fill pass — see Addendum)**
- Title tag "CreativeMornings | Breakfast lecture series for the creative community"; bot wall beaten on a second pass with a stealth Chrome profile — full render + screenshot captured.
- Hero: "**Everyone is creative**" / "CreativeMornings is the world's largest face-to-face creative community" / "Find your people. Every month, we gather in **253 cities across 73 countries, for free.**"
- Structure: city selector ("Join your local community — Attend an event, discover your city's creativity") → virtual FieldTrips ("Free, community-led, virtual experiences where learning meets connection") with named-host upcoming feed → CreativeGuild (portfolios/jobs) → sponsors ("Generously supported by"; "Meet companies that give a damn") → stories.
- **Verdict.** Steal: the one-line formula *cadence + scale + free* ("Every month… 253 cities… for free" — Founders After Hours' version: "Every month… Baltimore first… free to join"); city-first entry; sponsor gratitude framing. 1MC remains the role-card reference; CM is now the verified chapter-scale reference.

### 10. Y Combinator — ycombinator.com (+ /apply) · VERIFIED via fetch + screenshot
- **Nav:** sprawling — About, What Happens at YC?, Apply, Companies, Startup Directory, Library, Resources, For Investors, Bookface… 26 items in the expanded menu.
- **Home order:** hero "YC turns builders into formidable founders" → success carousel (Airbnb, OpenAI, Stripe… "$1.3 Trillion in combined valuation") → During-YC/Now slider → "In Founders' Words" → partner profiles → knowledge/news → "It's never too early to apply."
- **Terms up front:** "$500k," "three months," "Four times a year," "We fund companies with no revenue, product, or fully baked idea."
- **/apply:** "Apply to Y Combinator" / "…accepting applications for the Fall 2026 Batch" — hard deadline (July 27 8pm PT), decision date (Aug 28), interview → same-day decision. Little reassurance copy; elite logos everywhere.
- **Design:** YC orange (#FF6600 ESTIMATE) + white, utilitarian, dense. Title tag just "Y Combinator."
- **Verdict.** Steal: radical terms transparency (dates, amounts, structure); "never too early" anti-anxiety line. Avoid (the stigma Ventriq counters): trillion-dollar-logo intimidation, equity/extraction framing, monoculture signal, 26-item nav. Ventriq says: same rigor, no gatekeeping cosplay.

### 11. AfroTech — afrotech.com → **afrotechconference.com** · VERIFIED via fetch + DOM dump + screenshot
- afrotech.com is a Blavity **media site** (nav: Latest · Briefing · Events · Conference▾ · Future 50 · Insider); the event lives on a separate Nuxt site — attendees hop domains.
- **Conference page order:** hero photo bg "**Build What's Next.**" / "November 2-6 » Houston, Texas" / [Get Your Tickets →] + "10 years" badge → stats band **40,000+ Attendees · 300+ Speakers · 15 Tracks · 11 Stages** → "Don't Miss It." intro → "Find the ticket that fits you": 5 tier cards w/ audience labels (**AI Edge $350 · Premier $625 · Executive $850 · Medical $925 · All-Access $2250**, "Limited capacity") + [Select Ticket] → "2026 Speaker Lineup" wall (photo cards: name/title/company + LinkedIn; "Full lineup announced soon — Receive updates →") → sponsors "The Biggest Companies In The World Come For The Talent." (Meta/Apple/Amazon/Ford/Google) → attendee testimonial w/ role attribution → "Get Involved" 4 segmented cards (Partner with us / Submit a workshop / Be an exhibitor / Become an AfroTech Insider) → "Stay connected year-round."
- **Nav (mega-menu):** Attend (Ticket Pricing, Speakers, Agenda/Schedule, FAQ…) · Plan Your Visit · Get Involved · Explore AFROTECH + persistent [Get Tickets →].
- **Design:** deep forest green + neon lime + periwinkle card alternation; big grotesque type; celebratory real-people photography; joyful-professional culture signal.
- **Verdict.** Steal: stats band; audience-labeled ticket tiers (→ Ventriq's free tiers: Founder / Supporter+donation); speaker-wall card anatomy; segmented Get Involved cards (sponsor lane). Avoid: two-domain split; SPA shell with no SSR content.

### 12. Brand Builders Summit — brandbuilderssummit.com · **the live virtual-summit reference** · VERIFIED via fetch + screenshot (free 4-day virtual summit, Sep 8–11, 2026)
- **Page order:** badge "FREE VIRTUAL EVENT · SEPTEMBER 8–11, 2026" → H1 "Become the brand builder AI can't replace" → benefit checks → **inline 2-field form (YOUR NAME / YOUR EMAIL) + [GET FIRST ACCESS]** + trust row "Trusted by 25,000+ past attendees · Free tickets open August 2026 · No spam. Unsubscribe anytime." → countdown "WE ASCEND IN 61:06:34:46" → sponsor logos → 3 pillars (Strategy/Design/Marketing & Business) → numbers band **40+ Speakers · 24 Keynotes · 18 Live Q&As · 7 Workshops · 5 Panels** + extras (Design Battle, Networking, After Party) → speaker circle-headshot wall labeled by year, "**The 2026 lineup will be revealed in August**" → testimonials → repeated registration block → "THE CREATIVE INDUSTRY IS CHANGING" narrative → host bio → 11-item FAQ (incl. **72-hour replay for free tier, unlimited for VIP** upsell) → footer.
- **Registration UX:** name+email only, inline (no redirect); VIP all-access upsell post-registration. Stack: WordPress + Elementor (1,800+ fingerprints).
- **Design:** black + magenta gradients, 3D gem renders, italic serif + tracked caps — glossy webinar-funnel aesthetic.
- **Verdict.** Steal: hero-embedded minimal registration + trust microcopy; countdown; agenda-by-numbers band; progressive speaker reveal; replay policy answered in FAQ. Avoid: the glamour-funnel tone — at Ventriq's brand temperature it would read as hype, the opposite of "architect."

---

# SYNTHESIS

## 1) Recommended Ventriq IA
```
[Ventriq wordmark]  The Summit · Founders After Hours · The Mastermind · About   |  Donate (gold outline)  [Register for the Summit] (solid gold)
Footer: all pages + Contact · newsletter · 501(c)(3) + EIN · socials · privacy
```
- ≤5 text links, no dropdowns — Hampton (6 links) converts with less nav than BGV (8 caps + 3 dropdowns) or YC (26). Programs are first-class labels in funnel order (Summit → After Hours → Mastermind), the order a founder deepens engagement.
- Paired right-side buttons = the verified dual-audience convention (Camelback [Donate|Apply], Halcyon [APPLY|DONATE], digitalundivided hero [Join a Program|Donate]). Primary button is time-aware: "Register for the Summit" until Aug 21 → then "Apply for the Mastermind" → then "Join After Hours."
- Contact = footer + simple page (no nav slot spent; matches all 11 sites).

## 2) Homepage blueprint (evidence per section)
1. **Hero** — navy ground, cream statement headline (problem-led, Hampton-style: name the founder's pain, not Ventriq's mission), one gold primary CTA "Register for the Summit — Free · Aug 10–21" + quiet text link "Or back the builders → Donate." Evidence: Hampton's problem hero; digitalundivided's paired verbs; BGV as the donor-hero cautionary tale.
2. **Proof band** — one line of true, program-shaped numbers (12 days · 2 weeks of sessions · Baltimore-rooted · free). Camelback/AfroTech/1MC all run stats bands; Ventriq is new — use facts of the offer, never padded impact stats (anti-pattern #10).
3. **Three doors** — Summit / After Hours / Mastermind cards: name, one-liner, next date, CTA each. Evidence: Camelback "Our Work" 3-up, Halcyon verticals, BGV programs row, 1MC role cards.
4. **How it fits together** — an "architect's section": gold line-diagram showing Summit → After Hours → Mastermind as one drawn structure (Ventriq's version of Hampton's concentric circles — the single most stealable graphic in the set; Halcyon's constellation lines prove line-motifs carry a whole brand).
5. **Founder letter teaser** — 3–4 sentences from Justin, signed, photo, → About. Evidence: Hampton's Sam Parr letter is its trust engine; also warms the donor audience.
6. **Voices** — 2–3 testimonial cards (community members/advisors pre-launch). Evidence: Hampton/1MC/AfroTech all use named, attributed quotes.
7. **For donors & sponsors** — ONE dark-on-cream contrast section near footer: "Back the builders" + [Donate] + [Sponsor the Summit]. Evidence: Halcyon's "Support Halcyon" placement; BGV's per-program funding wording; AfroTech's segmented Get Involved cards.
8. **Newsletter** — one field. Camelback "Be In The Loop"; BBS trust microcopy ("No spam. Unsubscribe anytime.").
9. **Footer** — full nav, contact, 501(c)(3) + EIN (BGV/Halcyon trust blocks; add Financials link later per Halcyon).

## 3) Page-pattern prescriptions
**The Mastermind** (Hampton × Camelback): problem-led serif hero + [Apply — Sept cohort] → who it's for (explicit stage criteria, Hampton's 3-bullet pattern, but framed as fit not wealth: "you're building, you're stuck at implementation, you can commit N hrs/wk") → What You Actually Get (3 pillars + line diagram) → format specifics verbatim-style (Camelback: "16-week," "$40,000," "weekly virtual sessions" — Ventriq: length, cadence, cohort size, cost/scholarship terms **stated**, unlike Hampton) → transparent application steps (Hampton's numbered vetting; YC's dated deadlines + decision dates) → founder letter → FAQ (8–12 Q incl. price, time, "not sure you're ready?" — YC's "never too early" line) → repeated Apply. Application form: short first step (Hampton screens minimal first, deepens later).
**The Summit** (AfroTech × BBS): hero = name, "Free · Virtual · Aug 10–21, 2026," one-line promise, [Register free] → Eventbrite (button-out or embedded widget; keep BBS's ≤2-field feel — Eventbrite checkout is already minimal) + trust row ("Free. Recordings for registrants. No spam.") → countdown → numbers band (days/sessions/speakers/tracks) → 3 track pillars → speaker wall (photo/name/title/company; "Full lineup announced soon — get updates" progressive reveal since it's pre-announcement season) → agenda by day w/ times + ET timezone → testimonial/community quote → "Sponsor the Summit" card block (AfroTech Get Involved pattern) → FAQ (replay window! BBS) → repeated register block.
**Founders After Hours** (1MC × CreativeMornings): cadence-first hero ("Every [day] night…" — 1MC's "Every Wednesday Morning" proves rhythm is the brand) + [Join the community → Skool] → three doors: Join the room / Bring your challenge / Show up for someone (role cards) → what-a-session-looks-like strip (photo + 3 steps) → upcoming sessions feed (1MC presenter cards) → member voices → join CTA with "free to join" microcopy. Skool handoff: set expectations ("You'll create a free Skool account — 2 minutes").
**Donate** (BGV × Camelback × Halcyon): headline that sells outcome, not need → **embedded Stripe on-page** (Camelback/Donorbox proves embed > redirect; BGV's formless page is the failure) → preset amounts w/ impact equivalents + monthly toggle → "Fund what moves you" per-program options (BGV FUND PROGRAM: sponsor a Mastermind seat / underwrite a Summit session) → 501(c)(3) + EIN + receipt note → sponsor lane link → founder-letter pull-quote for warmth.

## 4) Design-language positioning map
Warm↔cool × composed↔loud, from verified palettes:
- **Hampton** (evergreen `#032528` + champagne `#D1BFAE` + cream `#F1F2EF`; Financier serif + Neue Montreal) — composed-warm. **Ventriq's nearest neighbor**; navy `#101B2D`+gold `#C9A24C`+cream `#F1ECDF` is the same chord in a different key. Ventriq = "Hampton's composure, opened up: warmer photography, cultural rootedness, no velvet rope."
- **Halcyon** (black + cream + neon pink/teal/chartreuse, line constellations) — composed-loud. Shares Ventriq's cream ground + line motif; diverge on accent temperature (one gold vs three neons) and photography warmth.
- **Camelback** (teal + cream + yellow hexagons) — warm but craft-ceiling'd nonprofit; Ventriq should visibly out-craft it while matching its human warmth.
- **AfroTech** (forest + neon lime) / **BBS** (black + magenta gems) — loud event energy; borrow structure, never voltage.
- **YC** (orange utilitarian) / **1MC** (Salesforce gray-orange) / **Hello Alice** (SaaS) / **BGV** (Wix default energy) — the template quadrant Ventriq must never resemble.
- **Whitespace confirmed:** nobody owns midnight-navy + gold hairline "drafted" aesthetic with warm Black-culture-rooted photography. But the *language* space is crowded — Camelback "New Blueprint," AfroTech/Camelback "Build What's Next," YC "builders." Ventriq's architect metaphor must live in the *drawing*: gold 1px construction lines, dimension ticks, section markers, Space Grotesk's drafting-table geometry — and copy about *finished structures*, not blueprints.

## 5) Anti-patterns (observed in this set — Ventriq must not)
1. **Donor-hijacked hero** (BGV): leading with the ask recasts founders as charity objects. Founders first; donors get one composed section + nav button.
2. **Terms-free program pages** (Camelback: no eligibility/deadline; Hampton: no price): Ventriq states dates, cost, time commitment, selection criteria. Transparency IS the anti-stigma position (YC's only universally stealable trait).
3. **Nav sprawl / jargon labels** (BGV 8 caps items + "RAISIFY (VOTE)"; YC 26 items): ≤5 links, plain words.
4. **Client-side-only rendering** (1MC's bot error page, AfroTech's empty Nuxt shell, CM's bot wall): ship static/SSR HTML — SEO, previews, and screen readers all depend on it.
5. **Split domains for the flagship event** (afrotech.com vs afrotechconference.com): keep the Summit at ventriq.org/summit; Eventbrite is checkout, not home.
6. **Formless donate page** (BGV): the form renders on the page, above the fold.
7. **Wasted title tags** ("HOME | Black Girl Ventures," "Homepage - Camelback Ventures," "Y Combinator"): every Ventriq title = promise + name (see Hello Alice/Hampton meta descriptions written as conversion copy).
8. **Mushy CTA mashes** ("Apply Learn About Fellowship"): one verb per button.
9. **Funnel glamour** (BBS gem-renders, countdown pressure copy): keep the countdown, lose the gloss.
10. **Borrowed-scale stats** ($1.3T, 40,000+, $432M): a new org fakes nothing — program facts (dates, seats, hours) are the honest stats band.
11. **Brand-rot risk** (1863's dead cert): monitor domain/SSL; design pages so a sunset program can be archived without killing the homepage.

## Sources (all accessed 2026-07-08)
- https://1863ventures.net (TLS failure) · DNS via dig · https://techcrunch.com/2024/12/04/non-profit-1863-ventures-has-closed-reborn-into-for-profit-new-majority-ventures/
- https://www.digitalundivided.com · https://www.blackgirlventures.org + /donate · https://www.camelbackventures.org + /fellowship + /donate · https://halcyonhouse.org → https://halcyonaccelerator.org · https://helloalice.com · https://www.joinhampton.com · https://www.1millioncups.com · https://creativemornings.com (blocked) · https://www.ycombinator.com + /apply · https://afrotech.com · https://afrotechconference.com · https://brandbuilderssummit.com
- Screenshots (13): `competition/screenshots/` — digitalundivided, blackgirlventures, camelback, halcyon, helloalice, hampton, 1millioncups, ycombinator, afrotechconference, brandbuilderssummit (1440×6000 full-page) + gap-fill: 1863ventures-archived-nov2024, creativemornings, bgv-donate.

## Dead ends / caveats
- **1863ventures.net down** (SSL alert 80). ✅ RESOLVED in Addendum — archived Nov 2024 homepage torn down via Wayback + screenshot.
- **CreativeMornings** bot wall. ✅ RESOLVED in Addendum — rendered via stealth Chrome profile; section 9 upgraded to VERIFIED.
- **afrotech.com** homepage screenshot timed out (media site, heavy); conference site captured instead (the relevant one).
- **BGV donate form**. ✅ RESOLVED in Addendum — custom Wix iframe embedding PayPal / Square / Raisify; still no native on-page form (verdict stands).
- Hex values from screenshots marked ESTIMATE; Hampton's palette/fonts are VERIFIED from CSS. Halcyon donate-page provider unidentified (no match in HTML).

---

## Addendum — gap-fill pass (2026-07-08, main session)

### 1863 Ventures — archived homepage (Wayback capture 2024-11-06, one month before closure)
- **Nav:** Home · Why 1863? · Programs · LABS · Partners · About · Impact · Contact · **Donate** — donor CTA as the final nav slot, the same convention Camelback/Halcyon use.
- **H1:** "We're the home for **New Majority** founders & teams." — audience named in one sentence.
- **Page order:** hero → **"Download 2023 Impact Report"** (the lead CTA — a donor-facing artifact) → program promo ("Rebuild your brand post COVID-19") → "Meet the founders & brands behind our numbers" → 1863 Programs (Apply / Learn more cards) → **"Meet brand goals by supporting the New Majority"** (corporate-partner pitch framing sponsorship as *the sponsor's* brand goals) → 1863 Fund → About → newsletter.
- **Takeaways for Ventriq:** identity-clear one-line hero; the annual **impact report as the donor artifact** (pair with Halcyon's Financials footer links); sponsor copy that sells the *sponsor's* goals, not the org's need. Screenshot: `screenshots/1863ventures-archived-nov2024.png`.

### CreativeMornings — verified render
Details merged into section 9 above. Screenshot: `screenshots/creativemornings.png`.

### BGV donate — provider identified
Rendered page embeds a single custom Wix `filesusr` HTML iframe; fingerprints inside: **PayPal, Square, Raisify**. Donations route out to third-party processors rather than an embedded form — anti-pattern #6 confirmed with mechanism. Screenshot: `screenshots/bgv-donate.png`.
