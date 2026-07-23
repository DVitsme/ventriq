# Meeting 2 outcomes — Justin × Derrick, July 10, 2026 (11:00–noon)

**Source:** `meetings/07-10-2026-meeting-2.md` (Fathom transcript, 60 min; recording: fathom.video/share/kw5cwrNoFkNgzYqCeM1_GYS3zR2eUSVq). Auto-transcript — ⚠️ verify audio before printing any quote verbatim.
**Status of this doc:** the single reference for what changed. **No project files have been updated from it yet** — the copy deck, design, findings, and questions file all still reflect pre-meeting assumptions until the update pass runs against §6.

---

## 1 · Headline decisions (each one changes something we'd already built)

| # | Decision | Was | Now | Transcript |
|---|---|---|---|---|
| D1 | **ventriq.io PURCHASED — live on the call** (GoDaddy, 1 yr, domain protection, budget-conscious) | unregistered (recon 7/10 AM) | **owned** | 1:38–9:24 |
| D2 | **ventriq.com: pass for now** (brokers want $2–6K — "at another time. Let it pay for itself.") | — | deferred | 2:13 |
| D3 | **"Donate" is a banned word on the site — for now** | Donate page + nav button + donor sections designed | **suppress all "donate" language** until entity + filings land | 7:13–7:25 |
| D4 | **Eventbrite → Luma** ("probably… I've used it, it's really good"; free tier: unlimited events/guests, free SMS, built-in newsletters; has an API) | Eventbrite everywhere (copy, FAQ, confirmation email, reassurance lines) | **Luma** (account created on-call with the new Ventriq email) | 7:25, 43:39–44:41 |
| D5 | **Summit pricing: free → "pay what you want," floor $1** ("you could do a dollar or a million dollars… that's a donation") | "free · $0" baked into hero, ticker, proof band, announcement bar, FAQ, corridor-scene numerals | **PWYW from $1 via Luma** — and the *site* must still avoid the word "donation" (D3); the PWYW framing lives on Luma, off-site | 7:25 |
| D6 | **Founders After Hours: UNHIDDEN — "start talking about it now… so people get familiar with it"** | FAH hidden from nav/footers "for now" (mid-design client decision) | **FAH public** on the site | 21:07–21:53 |
| D7 | **FAH is PAID, not free**: **$39/mo digital** (resources, virtual sessions, community, grants/funding access, mentor office hours) + **~$89–99/mo in-person tier** (monthly on-location implementation night; he said "89 or like 99," "upwards to $100") | "Free to join on Skool," free chapters, "Is it free? Yes." | **two paid tiers** — ⚠️ *whether Skool is still the platform was NOT re-confirmed this call* (kickoff said Skool; $39/mo is Skool-compatible) | 29:33–31:38 |
| D8 | **Speakers: placeholders are fine on the site.** Derrick may source photos/bios from public profiles (LinkedIn etc.) until official assets arrive; Justin swaps what he dislikes ("easy edit") | speaker wall PENDING frames + [ANNOUNCE-DATE] | same design; Derrick may pre-fill from public sources | 16:35–17:44 |
| D9 | **Entity/legal reality-check:** 501(c)(3) intended — **Form 1023 NOT filed**; formation paperwork ("the LLC and everything") **due back ~July 20**; Justin is the **sole stakeholder** for sign-offs; MD fundraising filing not started (part of why D3). ⚠️ **He said "LLC" — if Ventriq was literally filed as an LLC, 501(c)(3) is effectively blocked** (IRS recognizes LLCs as 501(c)(3) only when *all members* are themselves 501(c)(3)/governmental — Notice 2021-56; a founder-owned LLC can't file a 1023). He almost certainly means a **Maryland nonstock corporation** and misspoke — **confirm which form was actually filed** before any 1023 talk. | Q69/Q70 unknowns | confirmed timeline; **nothing donation-adjacent can ship before entity back + filings** | 4:45–7:25 |
| D10 | **New Google Workspace created for Ventriq on-call** (separate from IAMJS workspace — per Derrick's advice: own domain authority/relationship). Google for Nonprofits free tier later, post-501(c)(3) | Workspace "not set up" (recon) | exists | 20:25–21:07, 44:41–51:13 |
| D11 | **Accounts + access:** Justin joined Derrick's password vault (1Password-style); **GoDaddy ✓, Supabase ✓ (pre-existing), Resend ✓ (created + password reset on-call), Workspace ✓, Luma ✓ (new), Stripe connected at 59:39** ("I just connected Stripe") | recon: none findable | all live; creds in the vault | 4:04–16:22, 48:16, 59:39 |
| D12 | **Next milestone: Wednesday July 15** — Derrick emails an update + "something tangible" (the MVP look); call optional, Justin will find time | content-ready target Jul 20 | **first tangible MVP: Jul 15** | 59:16–59:39 |

**Fathom's own action-item summary of the MVP** (16:22 marker): *"Build MVP site: speakers (placeholders), Founder After Hours, no 'donate'; send to Justin."* — matches D3/D6/D8.

## 2 · New facts about the business (not decisions — understanding)

- **Ventriq Ventures exists (future):** the for-profit arm — "Ventriq, the nonprofit, and then **Ventriq Ventures**… two wings of **consulting** and **venture capital**." Graduation path: founders finish Ventriq (nonprofit) → graduate into Ventures (high-touch consulting retainers — he sketched "six-figure consulting support… for optimization" at scale; VC funding down the line). **This reframes the IAMJS↔Ventriq split we'd assumed** (for-profit arm = Ventriq Ventures, not IAMJS). Justin will write this up and email Derrick when he does (56:51–58:59).
- **Annual programming rhythm:** Mastermind **fall** + Mastermind **spring** (so cohort 3 = spring 2027 — answers the FAQ), Summit **summer**, everything else lives inside FAH year-round. FAH events (virtual *and* in-person) are **community-only** — not promoted publicly except as "what you're missing" teasers (22:16–24:59).
- **"How to Run a Profitable Business"** — the one OTHER public-facing program: runs **twice a month** (Sept 28, Oct 12 cited), explicitly the **lead funnel into FAH** (24:59).
- **Justin shared his full programming-plan doc** (rest-of-year schedule, week-by-week cohort breakdown) to derrick@digitaldog.io from Google Drive (25:49–26:17). **Get this doc — it's the source for agenda/dates.** Session-level detail lives in separate files he didn't share yet.
- **Why Ventriq exists (his brain-dump, great About raw material ⚠️ verify audio):** "improve the quality of life for places that need economic development… through **entrepreneurship, investment, and education**." His mission statement written at 21: *"Do what's right with strength and integrity to assist those who want to inspire the masses."* — "I'm here to support **the leader's leader**… if I can pour into those 10 global leaders that can make that global economic impact, they can touch a lot more people than I could… my legacy will last longer if I put it into others" (26:42–29:21).
- **ICP:** now = **service-based businesses + social enterprises/nonprofits** (cohort-1 examples he gave: digital-media/marketing org, insurance broker, youth/men's programming nonprofit, credit-repair company, his wife's org New Momish). **Tech orgs explicitly LATER** — direct MIC conflict while he holds the day job; physical-product businesses not his lane ("I can't speak to inventory"). Long-term: tracks for every type incl. government/policy (35:17–37:01).
- **Ideal age: 20–35** ("hungry… by 35 some track record") — NOT the 40s/50s Derrick guessed. Youth/HBCU energy is deliberate (38:43–40:05).
- **Marketing = "building in stealth":** he cannot promote himself loudly (MIC role, partnership conflicts). Strategy: **leverage the speakers** (their networks promote; replays gated in FAH), heavy digital, **HBCU partnerships as the gateway** (students = no MIC overlap: "at the MIC we don't engage with students"). Not flyers (32:00–34:38).
- **Chapters:** Baltimore first — he's talking to a prospective **Baltimore chapter lead** (person "heavily ingrained in loving what Baltimore does") *the afternoon of this call*. Wish list: DC, Chicago, Atlanta, Detroit, New York, Cali, Texas — demand-driven. **15–25/30 people max** per night, deliberately not 100. Model: he pioneers, then community owns it (29:33–31:38).
- **Next year he won't speak** at his own events — speakers carry year 2; he's building "the best speech anyone has ever heard" for the year after (22:16).
- **Bundle idea (Derrick's, on-call):** ~$7,500 one-time payment for Summit + Mastermind + FAH + future tiers. Justin: *"great idea that I would strongly consider"* — he owes a written proposal (54:22–56:51). Not a site feature yet.
- Personal/context: SureSmile aligners as of yesterday (~1 yr, slight lisp — recording-quality note for quote verification); Erica referral came through Derrick→Justin→client; iamjs.io will be renewed regardless (personal consulting).
- **The original brand-brief prompt/chat: still lost.** Justin searched Claude on-call and couldn't find it; the brief exists as a PDF somewhere; he keeps looking (40:49–48:16). Our reconstructed brand assets remain the working copies.

## 3 · Questions-file scorecard (`meetings/2026-07-10-justin-questions.md`)

**Answered this call:** Q26 domains (.io bought — **.org still unbought, .com deferred**); Q69 MD fundraising filing (not yet → hence D3); Q70 Form 1023 (not filed; entity back ~7/20); platform question (Eventbrite→**Luma**); FAH pricing + chapters + cadence (D7, §2); speakers-public question (D8); Workspace/accounts block (D10/D11); sole-signatory question (D9); ICP/audience questions (§2); mission-in-his-words (§2); IAMJS↔Ventriq structure (partially — via Ventriq Ventures reveal); marketing plan (§2).
**Still open (the big ones):** session **[TIME ET]**; **[ANNOUNCE-DATE]** + the 8 actual speakers; Mastermind **$[INVESTMENT] + Variant A/B**; **[APP-DEADLINE]/[DECISION-DATE]/[COHORT-DATES]** (his schedule doc may answer — get it); **Skool confirmation** (D7 ⚠️); Baltimore founding-night date (pending his chapter-lead talk); speaker releases/recording consent (Q72 — never discussed, still gates the replay funnel); SMS/10DLC (Q74 — arguably mooted: **Luma includes free SMS**, but sender-compliance still worth one look); refund/transfer policies (Q73); testimonial permissions; CNN/Bloomberg claim links; mission-statement ratification *as site copy*; accent orange vs teal (never raised — orange stands); tithe wording (now tangled with Ventriq Ventures structure); privacy policy/legal pages.

## 4 · Action items

**Derrick (me = his tooling):**
1. **MVP site by Wed Jul 15** — Summit + Mastermind + **FAH visible** + speaker placeholders + **zero "donate" language** (park the Donate page; see §6). Email update + tangible preview to Justin.
2. Email Justin the **Luma API docs** (Fathom item, 43:39).
3. Pull Justin's **programming-plan doc** from Drive (shared to derrick@digitaldog.io) → mine it for agenda dates, cohort weeks, HRPB dates.
4. Stripe creds land in the vault (Justin connected Stripe end-of-call) — confirm access.

**Added by the stress test (§7):**
- **Buy ventriq.org** (~$12 — still unregistered, natural nonprofit TLD) and **backorder ventriq.com** (~$25 — it expires **Jul 25**; watch the drop before paying the $2–6K broker).
- **Confirm the entity form** the moment paperwork lands (~7/20): nonstock corporation vs LLC — the 501(c)(3) path depends on it (D9 ⚠️).
- **Workspace billing**: 14-day trial ends **~Jul 24** — card on file or downgrade plan; Google for Nonprofits only after the determination letter.
- **Confirm whose Stripe** account got connected (IAMJS/personal/new) before any Ventriq money flows through it.
- Luma listing setup: **suggested price $10–25 over the $1 floor** (fee math: $1 nets ~$0.62 on the free plan) and the listing says *pay what you want*, never "donation" (§7d).
- **Confirm Skool** is still the community platform (its 2026 multi-tier pricing fits the $39/$89–99 model natively if so).
- **Confirm suit-era depth on About** (the "go ahead and kill that" moment, §7b).

**Justin:**
5. Email Derrick ↔ **Sharif intro** (business acquisition, for Derrick's laundromat plan — Fathom item, 52:55).
6. **Draft the one-time bundle proposal** and email it (Fathom item, 54:43).
7. Send the **Ventriq Ventures write-up** when he pens it (58:42).
8. Keep hunting the **original brand-brief prompt/PDF**.
9. Find Wednesday time for the check-in.
10. (Implied) entity paperwork lands ~7/20 → then 1023 + MD fundraising filing → then "donate" unlocks.

## 5 · Watch-outs (compliance/positioning — carry into every update)

- **PWYW ≠ "donation" on our surfaces.** Justin casually called the $1+ "a donation" — until MD filing + 501(c)(3), the site says *pay what you want* and never solicits; the transaction lives on Luma. Same logic: the **sponsor lane** ("Sponsor the Summit"/"Talk partnerships") is commercial underwriting, not charitable solicitation — probably safe, but it's the grayest thing left on the site → counsel-check it (existing [COUNSEL-REVIEW] chips already flag audience wording).
- **MIC conflict now actively shapes copy:** no public tech-startup targeting, no self-promotion voltage, speaker-first framing. Never attribute MIC anything to Ventriq (standing rule) — and note his line "what the MIC is physically, I am digitally" is a *private* mental model, not printable.
- **FAH copy math changed:** paid tiers kill "free to join," the Skool honesty sentence (platform TBC), and "Is it free? Yes." The **zero-on-purpose tally** and "the board doesn't lie" survive untouched.
- **"Free" was load-bearing in the Summit design** (hero $0, ticker FREE, corridor-scene $0 numeral, announcement bar, FAQ #1, proof band) — the PWYW sweep touches every one of them; the competition dive's "free + gated replays ≈ 10× throughput" logic softens but PWYW-$1 largely preserves it.
- His **schedule doc** may contradict the Aug 10–21 / 8-sessions / Mon-Tue-Thu-Fri shape we designed — reconcile before Wednesday.

## 6 · File-impact map (the update pass, in order — NOT yet executed)

1. `copy/` — the big sweep: **00-global** (nav: FAH restored, Donate button OUT of nav for MVP; announcement bar "free"→PWYW; confirmation email: Eventbrite→Luma), **01-home** (restore three-door layout per `how-to-request-updates.md` restore path, but donor section → sponsor-only or cut for MVP), **02-summit** (PWYW pricing register, Luma reassurance line, replay funnel intact), **03-fah** (paid two-tier rewrite: $39 digital / ~$89–99 in-person, platform TBC, chapters framing unchanged), **06-donate** (**park the page** — keep file, mark DO-NOT-SHIP until filings), **08-motion** (ticker "FREE"→PWYW beat, corridor-scene $0), **05-about** (Ventriq Ventures one-liner? — only after Justin's write-up; mission language upgrade candidates ⚠️), 04-mastermind (spring cohort mention for FAQ "when is cohort 3").
2. `design/` — round-trip prompts per `how-to-request-updates.md`: FAH restore (chrome-wide flip), donate suppression, PWYW swaps, Luma line. Mastermind untouched. Update `design-export-review.md` §6 (FAH decision superseded) + §10.
3. `meetings/2026-07-10-justin-questions.md` — mark answered items (§3) so the open list is clean.
4. `findings/` — 02 (structure: Ventriq Ventures), 03 (programs: FAH tiers/pricing, HRPB, two masterminds/yr), 05 (stack: Luma in, Eventbrite out, accounts live), 06 (timeline: Jul 15 tangible, Jul 20 entity), 07 (brief: audience 20–35, service+social-enterprise ICP).
5. `competition/` README — pricing corridor note: FAH $39/$89–99 sits inside our recommended $29–49 digital band; PWYW summit note.
6. Auto-memory — after the pass.

## 7 · Stress-test addendum (second pass, same day — what the first pass missed)

### 7a · Independently verified (don't re-litigate)
- **ventriq.io purchase CONFIRMED** — RDAP: registered **2026-07-10 15:14 UTC via GoDaddy, 1-year, expires 2027-07-10**. Matches the call timeline exactly.
- **ventriq.org is STILL UNREGISTERED** (PIR RDAP 404). Justin bought only the .io. → ~$12/yr defensive buy, and it's the *natural nonprofit TLD*. Add to next check-in.
- **ventriq.com expires 2026-07-25 — fifteen days out** (registered 2016, the for-sale squatter must renew). A ~$25 backorder (DropCatch/GoDaddy) is a cheap lottery ticket against their $2–6K ask. **Watch the drop** (grace/auction cycle runs ~75 days past expiry).
- **Luma PWYW verified**: "flexible" ticket pricing with a **minimum + suggested price** exists — D5 is implementable as specced. **But fees:** on Luma's free plan, *paid* tickets carry a **5% platform fee + Stripe 2.9% + $0.30** → **a $1 ticket nets ~$0.62**; Luma Plus ($59/mo) removes the 5%. Justin's "doesn't cost anything" is true only for free tickets. Practical move: set a **suggested price** ($10–25) so the floor isn't the anchor. Luma's SMS is real but blast/limit details unverified — fold into the old Q74 check.
- **Skool CAN do his two tiers now** — 2026 Skool added native multi-tier pricing (freemium + multiple paid tiers + one-time purchases) in one community. So $39 digital + $89–99 in-person fits Skool *if* Skool is still the platform (still unconfirmed — top confirm item).

### 7b · Transcript points the first pass under-weighted
- **Government money is part of the model** (52:55): for chapter/topic programming, "I can get the funding… from the political figures in the area based off of whatever their priorities are" — county/municipal funding aligned to local priorities is a planned revenue stream alongside tithe/sponsors/tiers. Feeds About/Donate narrative *later* and findings/02–03 now.
- **The suit-story sensitivity** (18:55–19:36): he actively downplays the suit-guy identity now ("in Howard County I don't even talk about none of that stuff"; "not taking new people for suits" → *"Exactly. Go ahead and kill that."*). Our About page leans on the suit origin story (the bakery "What do you like?", mayor suits). Reading: the *history-as-origin-story* is probably fine, the *active identity* is dead — but **confirm with Justin how much suit-era he wants on Ventriq's About** before it ships.
- **Google Workspace is on a 14-day trial** (29:25 "Free try. 14 days") → **billing kicks in ~July 24**; Google for Nonprofits needs the 501(c)(3) letter (months away). Someone needs a card on file + a calendar nudge.
- **Stripe pre-existed** (Derrick asked for "your Stripe info"; connected 59:39) — confirm **which entity owns that Stripe account** (IAMJS? personal?). Payouts for Ventriq things through a non-Ventriq Stripe = accounting mess later.
- The vault is **1Password** ("I'll add it to the one password").
- **Flyer nuance** (33:32): physical promo is fine "you just can't slap a picture on it" — his face/name stays off promo materials; consistent with stealth.
- **HBCU interest is INBOUND, not aspirational** (34:38): "some HBCUs actually want to just get access to my events and share with their students." Real existing demand; possible partnerships copy post-launch.
- **Confidence calibration on D4/D5**: both were said with "probably." Luma = high confidence (account created on-call + API docs requested). PWYW-$1 = medium (stated intent, nothing configured). Write the copy PWYW-ready but don't hard-code "$1" anywhere a suggested-price change would strand it.
- Scorecard adds: **Q31b (infrastructure ownership) = ANSWERED** — everything created under Justin's identities, shared via vault. **Justin's photo = answered** ("I really don't be caring which one — easy edit").

### 7c · Repo collisions the §6 impact map missed (grep-verified)
1. **`.claude/skills/ventriq-stack/SKILL.md:17`** — "Keep third parties at the edge: **Eventbrite** (registration), **Skool** (community)…" — a skill that will *actively mislead the build phase*. Must be updated with Luma (+ API), paid-FAH reality, and the no-donate rule. **Highest-priority collision.**
2. `findings/05-tech-stack-and-tools.md:13` — "Eventbrite … **Already in use**" now false; Luma swap + accounts-now-live table.
3. `findings/07-website-brief.md:9,20,45` — "Register → Eventbrite," "Stripe (donations)" are load-bearing lines in the brief.
4. `findings/README.md:15` — scope line "Eventbrite + Skool + Stripe (donations) carry the load."
5. `findings/03-programs-and-roadmap.md:40` + `findings/11-stack-and-packages.md:33` — registration-flow + package notes reference Eventbrite.
6. **SEO metadata**: `copy/02-summit.md:3` meta title = "…**free** virtual summit…"; `copy/01-home.md:4` meta description ends "…**free**…" — the PWYW sweep must include meta tags, not just visible copy.
7. `design/ventriq-design-system-brief.md:76` (§Microcopy) uses "**Save your free seat**" as the canonical button example — the tool-facing standing authority teaches the now-wrong label.
8. `design/claude-design-prompts.md` (Phases 3/7 embed Eventbrite microcopy + free CTAs) — historical doc; **add a "superseded by meeting-2 outcomes" banner** instead of rewriting.
9. Button inventory ground truth: `copy/00-global.md:35–36` ("Register for the Summit — free" / "Save your free seat") + every page CTA that inherits them (01:16,34 · 02:17,103 · 08:22).

### 7d · Legal/compliance sharpening (beyond §5)
- **The MD question follows the solicitation, not the website** (Charleston-Principles logic): a **Luma listing framed as "donation"** is itself a charitable solicitation reaching MD residents. Until entity + filings: the Luma event must read as **pay-what-you-want ticket**, never "donation" — same ban as the site. (Justin's verbal framing "that's a donation" is exactly the wording to keep OFF the listing.)
- **Entity-form check** (see D9 ⚠️): confirm nonstock corporation vs LLC the moment paperwork lands ~7/20.
- Selling paid FAH memberships pre-determination is ordinary program revenue — fine — but receipts/refund policy language still shouldn't imply deductibility anywhere (already our rule).

## 8 · Quote bank (⚠️ all need audio verification before any public use)

- "Do what's right with strength and integrity to assist those who want to inspire the masses." (28:14 — his written-at-21 mission)
- "I'm here to support the leader's leader." (28:14)
- "If I can pour into those 10 global leaders that can make that global economic impact, they can touch a lot more people than I could." (28:14)
- "My legacy will last longer if I put it into others versus it being like, Justin's the deal." (28:14)
- "I want the community driving it the entire time." (29:33, on chapters)
- "I'm low-key building in stealth… but it's hard to be stealth when it's a community." (32:00)
- "In Baltimore, when you're known for something, it's gonna stay with you for life." (18:55, the suit-guy identity — good About texture)
