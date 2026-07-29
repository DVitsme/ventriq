# Phase 1 — Understanding & research

**Status:** ✅ complete · **Date:** July 29, 2026
**Inputs:** the four files Justin delivered to `docs/notes-from-justin/7-29/`
**Output:** this document, plus the conflict resolutions that unblock Phases 2–5.

Read this before touching any build phase. It is the record of *what is
actually true* as of Jul 29 — several things we believed on Jul 28 turned out
to be wrong, and several things Justin believes are also wrong.

---

## §1 · Method

1. **Both TSVs read directly** — small, structured, and they carry the
   critical-path data (night assignments, dates), so precision mattered more
   than delegation.
2. **Both PDFs extracted by parallel agents** under instructions to reproduce
   verbatim rather than summarize, because the brief states its copy is final
   and paraphrase would destroy it.
3. **Every factual claim in the brief was then verified against the live
   site** by fetching `ventriq.io/summit` and grepping the repo. This is the
   part that mattered most — see §7. **All of the brief's claims hold.**
4. **The one conflict found was adjudicated against a third source** (the live
   Luma listing) rather than assumed — see §3.1.

---

## §2 · The webpage brief is the spine

`Forge-The-Future-Summit-Webpage-Brief.pdf` — 16 pages, WeasyPrint, dated
**July 25, 2026**, cover reads *"WEBPAGE REVISION BRIEF · PREPARED FOR
DERRICK"*, **LIVE DATE: August 1, 2026**.

It is not a page brief. It is a **revision brief against the page we shipped**:
47 changes across 17 sections, structured as `CURRENTLY ON THE PAGE` (what we
built) → `REPLACE WITH` (final copy). It tags each change `JUSTIN` (requested
directly) or `COPY AUDIT` (surfaced in a conversion review), and states both
carry equal weight.

**Its four tiers become our Phases 2–5, unchanged and in his order:**

| Tier | His framing | Phase |
|---|---|---|
| 1 | *"Today — credibility leaks currently visible to the public"* | 2 |
| 2 | *"By August 1 — structural, requires build time"* | 3 |
| 3 | *"Drop-in copy replacements — no engineering required"* | 4 |
| 4 | *"After launch — improves the page, does not block it"* | 5 |

**Why Aug 1**, in his words: *"the summit page is receiving partner newsletter
traffic in early August and takes priority over everything else."* Plus a
build note naming a **paid-retargeting decision gate on August 7** that "gets
made blind" without channel-level conversion data by Aug 1.

**Scope discipline he set himself:** *"This brief covers the summit page only.
The full site still needs revision."* Two cross-site items are exempted in §17
because they "cannot wait" — the nonprofit sweep and the event-name
standardization.

**The document's own summary tiles:** 47 changes · 17 sections · 14 final copy
blocks · 5 Tier-1 items · **1 open decision**.

---

## §3 · Conflicts found, and how each resolved

### 3.1 · The summit dates — RESOLVED, no change ✅

This was the scariest thing found and it resolved cleanly.

| Night | Luma (live, 36 registered) | Webpage brief §09 | Our `lib/agenda.ts` | **Agenda TSV** |
|---|---|---|---|---|
| 7 · The Endgame | Wed **Aug 19** | Wed **Aug 19** | Wed **Aug 19** | Thu **Aug 20** |
| 8 · The End of the Beginning | Thu **Aug 20** | Thu **Aug 20** | Thu **Aug 20** | Fri **Aug 21** |

Nights 1–6 agree everywhere (Aug 10/11/12/13/17/18). Titles and subtitles in
the TSV match our shipped data word for word. **Only the agenda TSV moves the
finale**, and its version drops Wed Aug 19 entirely — which would have made
week 2 Mon·Tue·Thu·Fri and broken the "Monday through Thursday" claim we
repeat in six places, plus pushed the end date into **24 separate "Aug 10–20"
occurrences** across metadata, ticker, announcement bar, OG generator, JSON-LD
and nine copy-deck lines.

**Three sources beat one.** A fourth data point seals it: our own Jul 23
findings already recorded the correction explicitly — *"ends Aug 20, not 21"*
(`docs/findings/12-forge-the-future-launch-intel.md:11`,
`docs/copy/02-summit.md:3`) — resolved at the time against the then-new Luma
listing.

**Action: none on the site.** The residual risk moved to Justin's side — if he
runs the event off that agenda file, his finale is on the wrong nights. Flagged
plainly on his list.

**A fourth source arrived and settles it beyond argument.** Justin's Kit
broadcast of Jul 23 (§10) — sent to his actual list — lists *"Wed, Aug 19 —
The Endgame"* and *"Thu, Aug 20 — The End of the Beginning."* **Four sources
to one.** The TSV is simply wrong.

**Standing lesson:** the site, Luma, the brief and his sent email form a
four-way cross-check. Use it before acting on any single new document.

### 3.2 · Speaker count — the site overclaims by ~13

- **Site says:** "Thirty-plus builders, operators, and funders" (twice —
  speakers section and FAQ).
- **Brief says:** correct it to **"Seventeen-plus"**, calling the overclaim
  *"a credibility risk that buys nothing — seventeen operators is already the
  strongest asset on the page."*
- **The TSV says:** 29 unique named people, but only 21 have any confirmation
  status at all.

**All three reconcile.** 29 is the aspirational roster; 21 have responded in
some form; 17+ is the number Justin is willing to stand behind publicly. **Use
seventeen-plus** — it is his number, it is conservative, and it is defensible
if anyone counts.

### 3.3 · Membership naming — see §6

### 3.4 · Where the brief supersedes the July 23 call

The brief is two days newer than the call and written rather than transcribed.
Where they differ, **the brief wins.** Four places this matters:

| Item | Jul 23 call said | Brief (Jul 25) says | Take |
|---|---|---|---|
| "Will I be pitched?" FAQ | Rewrite it honestly — Justin: *"we're definitely going to be pitching"* | **Remove the question entirely**, replace the slot with *"Do I have to attend all eight nights?"* | Brief. Retiring the defensive frame is stronger than answering it honestly, and the replacement targets a bigger objection. |
| "about a minute, free" microcopy | Delete it | **Replace** with *"Free. Registration runs on Luma — your seat and calendar invite arrive together."* | Brief. Deleting loses the Luma trust signal, which the brief explicitly wants kept. |
| Justin's visibility | Go Ventriq-centric, pull his name back | Keeps *"— Justin Shaw"* on the NBBM block, and **removes the outbound link so the block ends on his name** | Brief, *for this block*. His name stays on exactly one attributed quote. The §1.7 "brand without a face" principle still governs everywhere else. |
| Summit pricing | Remove pricing from the page | Same — and adds that the FAQ instance must go too *"or the page contradicts itself within one scroll"* | Both agree; brief is more complete. |

**Two Jul 23 decisions the brief leaves untouched and still stand:** the
speaker flip cards, and the agenda face thumbnails. Neither appears in the
brief; both come from the call.

---

## §4 · The speakers file — assignments complete, images ~28%

`The Forge The Future_ Summit - Speakers.tsv` — 8 day-blocks, columns for
Subject · Role · Name · Email · Number · Status · Headshot · Bio.

**29 unique people.** Email and Number columns are **empty** — no PII. The
Headshot and Bio columns are also empty; they're status-tracking only, so the
**actual image and bio assets are not in this file.**

| Readiness | Count | Who |
|---|---|---|
| **Headshot & Bio Received** — usable now | **8** | Theodore Savage · Darren Willoughby · Timothy Robertson · Gilbryonna Shaw · Erika Rodriguez · Cedric Powell · Margo Burley · Justin Shaw |
| **Promo Graphic Received** — the Instagram card only, *not* a raw headshot | **13** | Tiffany Bethea · Calvin Royster · Tony Wagner · Quintel Q. · Jeff Scruggs · Alex Johnson · Jerone Tyler · Claudius Taylor · Lydnsae Peele · Lake Mitchell · Robin Haynes · Jaren Kirkland · James Busia |
| **Outreach** — not confirmed | **7** | Justin Drummond · Samantha · Keisha Bradley · Caleb Jackson · Montaz McCray · Sharif Small · Taber Small |
| **Blank** | **1** | Nelle |

**What this unblocks and what it doesn't.** Night-by-night assignments are
complete for all 29 — that was the blocker on the agenda face cards
(`build-blockers.md` A2). But the images are not: 13 people have only the
promo graphic, which is precisely what Justin was told we *cannot* use. **The
blocker didn't clear, it split.**

**Per-night slot counts:** Day 1: 3 · Day 2: 3 · Day 3: 6 · Day 4: 6 ·
Day 5: 4 · Day 6: 5 · Day 7: 6 · Day 8: 6 + closing. The design brief's
requirement that the grid "look deliberate at six, twelve, and seventeen"
matches this — nights vary from 3 to 6 people.

**Two people are already on our homepage.** *Margo Burley* speaks Day 8 and
*Calvin Royster* hosts Day 8 and panels Day 4 — and "Margo B., Artvantage" and
"Calvin R., Encore Insurance Group" are two of the three homepage
testimonials. **Same people.** That bundles the outstanding testimonial-
permissions ask with speaker outreach he's already doing.

**Data-hygiene flags:** likely typos — `Lydnsae Peele` (Lyndsae?),
`Lake MItchell` (capital I), `Quintel Q.` (abbreviated), and `Samantha` /
`Nelle` have no surnames. All need resolving before they render publicly.

---

## §5 · The agenda file — new copy, and a corruption warning

`The Forge The Future_ Summit - Agenda.tsv` — the internal run-of-show.

**New material we did not have:**

- **Per-night one-line hooks** for 7 of 8 nights. These are strong and usable:
  *"The world sees the vision. Few understand the weight."* ·
  *"Build a brand that isn't just seen — it's sought."* ·
  *"Anyone can be seen. Few become a movement."* ·
  *"Passion builds the product. Craft sells it."* ·
  *"Capital isn't just raised — it's managed, chosen, and commanded."* ·
  *"The best exits are built long before they're taken."* ·
  *"The summit ends. The building begins."*
  **Night 5 (The Modern Advantage) has no hook** — a gap to fill.
- **Full session descriptions** for all 8 nights, several paragraphs each.
- **The internal run-of-show:** tech/speaker check 6:00–6:15 · attendees join
  6:25–6:30 · intro & **"Founder's Exchange"** 6:30–6:45 (Night 1: 6:30–6:50)
  · main session 6:45–7:50 (Night 1: 6:50–7:50) · close 7:50–8:00.
  ✅ This **confirms** the public "6:30–8:00 PM ET" we already publish.
  *"Founder's Exchange"* is a named recurring segment we've never used.

⚠️ **The long descriptions are corrupted and must not be pasted.** Several have
copy-paste damage — duplicated half-sentences spliced mid-paragraph. Night 1's
description breaks mid-clause: *"On our opening night, Justin D. Expect real
talk, breakout rooms… — president and COO of a global organization spanning
120+ locations — and Teddy…"*. Nights 3, 4 and 6 have the same defect, with
whole clauses repeated. **These need reconstruction and Justin's sign-off
before publication.** The one-line hooks are clean; the long descriptions are
not.

⚠️ **Also:** Night 5's title carries a typo — *"Doing More With Les"* (should
be "Less"). Our shipped subtitle already says "less" correctly.

**Two named third parties appear** and would need permission before printing:
**STATUS Branding** leads Night 2; Night 1 features "Justin D." (Justin
Drummond) described as *"president and COO of a global organization spanning
120+ locations"* and "Teddy" (Theodore Savage) as *"a leadership coach,
founder, and author."*

---

## §6 · The Foundry one-pager — the membership is being rebranded

`the-foundry-one-pager.pdf` — 1 page, internal title *"The Foundry - Ventriq
Membership Brand One-Pager"*, author `Ventriq`, created **Jul 25, 2026**, and
**stamped `FINAL` in the top-right corner.**

**The membership is `THE FOUNDRY`.** Not "The Forge" (what Justin floated on
the Jul 23 call), not "Founders After Hours". The rationale is etymological
and it's genuinely good:

> *"A foundry is where metal is cast — and the person who casts it has always
> been called a founder. The name is literally true in both senses of the
> word."*

Tagline: **"Where founders do the work."** And the reason it isn't "The
Forge": *"Same fire-and-metal world as Forge The Future, without reusing the
word. **One universe, no name collision.**"* — which answers the concern raised
in the Jul 23 design brief §5.3 that *Forge The Future* and *The Forge* sat
too close together.

### 6.1 · The brand architecture, restated

| Level | Entity | Role |
|---|---|---|
| 0 | **VENTRIQ** | parent brand |
| 1 | **FORGE THE FUTURE SUMMIT** | annual flagship — top of funnel |
| 2 | **THE FOUNDRY** | year-round paid membership |
| 3 | **FOUNDER AFTER HOURS** | monthly in-person Power Hour |
| 4 | **MASTERMIND (name TBD)** | highest-touch layer — *"name from the same world"* |

⚠️ **Founder After Hours is demoted.** It is no longer the membership — it is
**one monthly event inside** The Foundry. This is exactly what Justin said on
the Jul 23 call (*"Founders After Hours is probably going to be more so the
event that happens inside the community"*), now formalized.

⚠️ **And it loses its "s".** The one-pager writes **"Founder After Hours"**
(singular) in all three occurrences. Our site, our copy decks and the
`ventriq-voice` skill all specify **"Founders After Hours"** (plural,
explicitly). That is a deliberate-looking change and needs confirming, because
it touches a route, a nav label, and ~40 copy instances.

### 6.2 · Pricing and tiers change

| | Site today | The Foundry one-pager |
|---|---|---|
| Digital | **$39**/mo, "Digital" | **$45**/mo, **`DIGITAL CORE`** |
| In-person | **$99**/mo, "In person" | **$99**/mo, **`POWER HOUR`** |

**The digital tier goes $39 → $45.** That is a live-copy change: `$39` appears
on the homepage card, three places on `/summit`, and the FAH membership block.
$99 holds — confirming the Jul 23 call.

`DIGITAL CORE` — curated community feed · live expert office hours · live
webinars · full on-demand library + playbacks.
`POWER HOUR` — everything in Digital Core · monthly in-person Founder After
Hours · **live production leaderboard** · in-person founder networking.

### 6.3 · A progression system we didn't know existed

Five earned ranks, separate from the paid tiers:

**`ORE`** (joined) → **`EMBER`** (showing up) → **`BLADE`** (producing) →
**`TEMPERED`** (consistent) → **`DAMASCUS`** (compounded)

> *"Standing is scored across three tracks — engagement, production, and
> Founder After Hours attendance — then rolled into one composite rank. **Metal
> is changed by work; gems are only graded.**"*

This is the **leaderboard** Derrick described on the Jul 23 call (*"really fun
figuring out how to build out this leaderboard"*) — now with a defined ranking
model. It connects the Mastermind's scoreboard and the FAH tally board. It is
a Phase-2+ product surface, not Aug 1 work, but the design language now exists
and `docs/design/build-blockers.md` C-group should inherit it.

### 6.4 · ⚠️ The one-pager conflicts with the design system — and defers

| | Ventriq locked system | The Foundry one-pager |
|---|---|---|
| Type | **Space Grotesk** (400/500/600) | **Poppins** (Light/Regular/Medium/Bold) |
| Dark | midnight `#101b2d` | `INK #0B0F16` |
| Light | cream `#f1ecdf` | `PAPER #F7F5F1` |
| Accent | `#c15a2c` | `EMBER #E4572E` |
| Gold | `#c9a24c` | `MOLTEN #F2A43A` |
| — | — | `STEEL #5C6470` (new) |

**Do not adopt this palette or typeface.** Two reasons. First, the document
disarms itself in its own footnote:

> *"Ember and Molten are **proposed** accents for The Foundry sub-brand —
> **swap in the Ventriq accents if they differ**."*

They differ. So: swap. Only `INK #0B0F16` is asserted as sourced (*"sampled
from the supplied Ventriq lockup"*) — and it matches our `--color-ink` exactly,
which is a good sign the lockup they were handed was ours.

Second, Poppins is almost certainly an artifact of how the PDF was produced
(ReportLab), not a type decision. **Space Grotesk stands.**

**What IS worth taking from it:** the metallurgy metaphor (ore, ember, blade,
tempering, Damascus), the dark-card-for-premium-tier inversion — which
independently matches the Jul 23 decision to make the $99 card midnight — and
the "no imagery, type and rules only" restraint, which is already our system.

### 6.5 · ⚠️ It contradicts the webpage brief, and both are dated Jul 25

| | Webpage brief | Foundry one-pager |
|---|---|---|
| Membership name | **"Founders After Hours"**, 6×, never varied | **"The Foundry"** |
| Argument | §10: *"Founders After Hours **locks the word into the brand**"* — used as the reason not to swap *founders*→*entrepreneurs* sitewide | FAH demoted to a monthly event |
| Digital price | pricing removed from the summit page entirely | **$45** |

**They reconcile, and the brief itself supplies the key.** §16:

> *"Build the Founders After Hours section **behind a toggle**, so it can be
> switched on the moment **it is named from the stage on Night 1**, without a
> deploy."*

So: **"Founders After Hours" is the current public name; "The Foundry" is the
name being announced live on Night 1 (Aug 10).** The brief describes the
pre-announcement state; the one-pager defines the post-announcement state. The
toggle exists precisely to cross between them without shipping code mid-summit.

**Three consequences:**
1. **`lib/brand.ts` stops being a nice-to-have and becomes a requirement.** A
   deploy-free name flip is only possible if the name lives in one constant.
   (`build-queue.md` rank 22 — promote it.)
2. **The brief's §10 argument has an expiry date.** It declines the
   *founders*→*entrepreneurs* swap because "Founders After Hours locks the
   word" — but if FAH stops being the membership name on Aug 10, that lock
   releases. Worth raising when O1 is decided.
3. **The route question returns.** `/founders-after-hours` → `/the-foundry`
   would need a 301 and would reset indexing we're about to earn. Decide
   before Aug 10, not after.

### 6.6 · This retargets the Skool ask

We wired five join CTAs to `skool.com/iamjs-collective-9599` on Jul 29 — a
free, 1-member group named "IAMJS Collective". The one-pager makes the fix
concrete: that group should become **The Foundry**, with **two tiers at $45
and $99**. Justin's TODO item can now name the exact end state instead of
asking him to decide it.

⚠️ Skool is **never mentioned** in the one-pager — no platform, tooling or
delivery mechanism is named anywhere. So the platform decision from the Jul 23
call is not contradicted, just not re-confirmed.

---

## §7 · Live-site verification — every brief claim holds

Fetched `ventriq.io/summit` and grepped the repo. **All Tier-1 leaks confirmed
live and public right now:**

| Claim | Verified | Where |
|---|---|---|
| Internal legal note is public | ✅ **"EIN — add when issued; no deductibility language until determination letter"** renders in the footer | `components/footer.tsx:60` |
| `ANNOUNCE-DATE` placeholder visible | ✅ 2 visible instances | `app/summit/page.tsx:144`, `:229` |
| `SPEAKERS` chip beside session titles | ✅ 8 instances, one per night | `app/summit/page.tsx:284` |
| "thirty-plus" overclaim | ✅ 2 visible instances | `app/summit/page.tsx:144`, `:230` |
| `speaker 01–15` tiles | ✅ 15 placeholder tiles | `app/summit/page.tsx:237–255` |
| Three competing CTA labels | ✅ **"Save your seat →"** (announcement bar) · **"Register for the Summit"** (home, about) · **"Save your free seat"** (×5) | 7 instances total |
| Sponsor block sits before the FAQ | ✅ Sponsors `:355` → FAQ `:373` | brief wants it *after* the FAQ |
| Speaker-announcement link is a dead end | ✅ *"Get the speaker announcement →"* points at `/contact` | `app/summit/page.tsx:232` |
| No persistent mobile CTA bar | ✅ nothing fixed/sticky anywhere on the page | — |
| No sticky sub-navigation | ✅ the nav isn't even sticky | `components/nav.tsx` |
| Nonprofit language sitewide | ✅ ~20 instances (already tracked from Jul 23) | `TODO.md` 🔴 |

**Analytics reality check** for Tier 2's *"conversion tracking live before the
partner push"*: four events are wired — `sign_up`, `generate_lead` (×2 forms),
`luma_register_click`. There is **no** scroll-depth, form-abandonment,
CTA-attribution or funnel instrumentation, and the Luma referral-name field
has never been tested end to end.

**One thing Justin believes that isn't true:** his build notes ask for *"mobile
QA on the countdown timer,"* describing it as sitting in the first phone
screen. **There is no countdown timer.** The hero has a small-caps label
reading *"doors open in"* followed by a static date string. This independently
confirms the reading in
[`../../design/07-23-2026-design-change-brief.md`](../../design/07-23-2026-design-change-brief.md)
§4.1a — the countdown was expected, was never built, and its label is sitting
there orphaned.

---

## §10 · The Kit broadcast — five publishable speaker bios

`$30M raised. 1,500 employees led. An M&A partner. Free..eml` — a Kit
(ConvertKit) broadcast **sent Jul 23, 11:15 UTC**, from **`jshaw@iamjs.io`**
to Derrick and the rest of Justin's list. Subject: *"$30M raised. 1,500
employees led. An M&A partner. Free."* Preview: *"Eight virtual nights.
Seventeen operators. August 10–20."*

This is the highest-value file of the five, because it is **already public**.
Anything in it is cleared for the website by definition.

### 10.1 · Five speaker bios, publishable today

The blocker was never really the bios — it was that we had none. Here are five,
already sent to a list, with the proof points Justin chose himself:

| Speaker | Title | Proof line |
|---|---|---|
| **Jerone Anthony Tyler** | Founder, Posteridy.ai | *"Has helped entrepreneurs secure **$30M+ in funding.**"* — hosting Capital & Command |
| **Cedric Powell** | M&A Partner, Squire Patton Boggs | *"Advises private equity buyers and sellers on **acquisitions, divestitures, and recapitalizations.**"* |
| **Theodore Savage** | Founder, The Cultivation Effect® | *"Former global executive who led **1,500+ employees across 90+ locations.**"* — opening the summit |
| **Tiffany Bethea** | Executive Director, Baltimore City Chamber of Commerce | *"Brand strategist whose clients **double revenue in 30–60 days.**"* |
| **Jeffrey Scruggs** | Founder, Majestic Light Group | *"AI engineer built at the **Department of Defense and Booz Allen Hamilton.**"* |

Plus the roster tease, verbatim: *"And that's five of seventeen. Goldman Sachs
advisors. Angel investors. Luxury brand strategists. Tax and capital
specialists. More announced weekly."*

⚠️ **Name corrections vs the TSV:** "Jerone Tyler" → **Jerone Anthony Tyler**;
"Jeff Scruggs" → **Jeffrey Scruggs**. Use the email's spellings — he wrote them
for publication.

**Still missing: the headshot image files.** The email's images are hosted on
Kit's CDN and are composed graphics, not raw portraits. §4's readiness table is
unchanged on images.

### 10.2 · It confirms seventeen — and contradicts our own site

*"five of seventeen"* and *"Seventeen operators"* in the preview text. **Justin
has already told his list seventeen while our site says thirty-plus.** That
elevates the Tier 1 count fix from "overclaim" to "our website contradicts an
email he already sent." Phase 2.

### 10.3 · New copy we don't have anywhere

**"What you'll walk away with"** — seven outcome bullets, verbatim:
> * A clear read on the leader you need to become before the business can grow
> * A brand people seek out instead of one you have to sell
> * A press and influence strategy you can run yourself
> * A repeatable path from first pitch to loyal customer
> * An AI stack that gives you back your hours
> * Real funding paths — and the numbers to qualify for them
> * An exit-ready business, whether you sell in three years or thirty

These map 1:1 onto the eight nights and are **outcome-framed**, which is
exactly what the Jul 23 call asked for on the Mastermind (D20) and what the
summit page currently lacks. Strong candidate for a new section.

**"Who this is for"** — *"Founders who are serious about the climb. Whether
you're shaping your first venture or scaling the one you've got — if you want
the room, the network, and the truth about what building actually takes, you
belong here."* Closing line: *"**If you've been building alone, this is the
part where that stops.**"*

⚠️ Note this uses **founders**, not *entrepreneurs* — relevant to **O1**.

### 10.4 · Two operational findings

**The list runs on `iamjs.io`, not `ventriq.io`.** The broadcast was sent from
`jshaw@iamjs.io`. Our Jul 23 SPF/DKIM/DMARC work authenticated **ventriq.io
only** — it does nothing for the domain he actually broadcasts from. Worth
checking iamjs.io's records before the next send.

**The CAN-SPAM footer address is Kit's, not Ventriq's:** *"600 1st Ave, Ste
330 PMB 92768, Seattle, WA 98104-2246."* That is ConvertKit's corporate
address, used as the default. It's legally permissible but it tells a Baltimore
audience the mail comes from Seattle. This is the same gap as the outstanding
"mailing address for email footers" item on Justin's list — now with evidence
of what's filling it today.

### 10.5 · His email already uses our palette

The broadcast's own styling: background `#101b2d` (our midnight), button text
`#c9a24c` (our gold), CTA on midnight. So **G6 (branded email design) is
partly self-solved** — Justin is already reaching for the Ventriq colours in
Kit. What's missing is typography (Roboto, not Space Grotesk) and the
architect's-line motif. That lowers the cost of G6 considerably.

Also: he **bolds and underlines "virtual"** in the body — `<u><strong>virtual
</strong></u>`. He is fighting the same problem the brief describes in §02.
Independent confirmation that this is a real conversion issue, not a hunch.

---

## §8 · Open questions — do not resolve these alone

| # | Question | Owner | Source |
|---|---|---|---|
| **O1** | *founders* vs *entrepreneurs* sitewide. Written the recommended way (scoped to the "Who this is for" block only). Brief: *"Do not resolve it independently."* | **Justin** | brief §10 |
| **O2** | `ANNOUNCE-DATE` — a real date, or cut the sentence? Brief: *"A visible placeholder costs more than a missing date."* | **Justin** | brief §08, §12 |
| **O3** | Speaker-announcement link — point at newsletter capture, or wire an inline email field? | **Derrick** | brief §08 |
| **O4** | CTA register: **"Save My Free Seat"** (recommended, first person) vs "Save Your Free Seat" (fallback). Whichever wins goes in all five places. | **Derrick** | brief §01 |
| **O5** | §07 title: **"The room stays open."** (recommended) vs "Keep building." / "After the eighth night." / "What happens next." | **Derrick** | brief §07 |
| **O6** | The corrupted long session descriptions — reconstruct and get sign-off, or ship one-line hooks only? | **Justin** | §5 above |
| **O7** | Night 5 has no one-line hook. | **Justin** | §5 above |
| **O8** | Speaker name spellings + missing surnames (Lyndsae? Lake Mitchell, Samantha, Nelle) | **Justin** | §4 above |
| **O9** | Permission to name **STATUS Branding** and describe Justin Drummond / Theodore Savage as written | **Justin** | §5 above |
| **O10** | **Is Night 1 (Aug 10) the moment "The Foundry" goes public?** Inferred from brief §16's toggle language — never stated outright. Everything in §6 hangs on it. | **Justin** | §6.5 |
| **O11** | **"Founder After Hours" (singular) or "Founders After Hours" (plural)?** The one-pager drops the "s" in all three occurrences; our site, copy decks and the `ventriq-voice` skill all specify plural. Touches a route, a nav label and ~40 copy instances. | **Justin** | §6.1 |
| **O12** | **Digital tier $39 → $45 — confirm.** The one-pager says $45; the live site says $39 in five places. $99 is unchanged. Does the new price apply now, or at the Night 1 launch? | **Justin** | §6.2 |
| **O13** | Does `/founders-after-hours` become `/the-foundry`? Needs a 301 and resets indexing — **decide before Aug 10, not after.** | **Derrick + Justin** | §6.5 |
| **O14** | The brief declines the *founders*→*entrepreneurs* swap because *"Founders After Hours locks the word into the brand."* If FAH stops being the membership name, that argument expires. Revisit O1 alongside O10. | **Justin** | §6.5 |

---

## §9 · What this changes in our existing plans

- **`docs/design/build-queue.md`** — its ranks 1–9 were built for the Jul 23
  backlog. Several are superseded or re-scoped by the brief (the "about a
  minute" deletion becomes a replacement; the "Who is this for?" heading now
  arrives with three new audience tiers under it). **Phases 2–4 take
  precedence until Aug 1.** Return to the queue after.
- **`docs/design/build-blockers.md`** — A2 (agenda face cards) partially
  clears: assignments in hand, images short. A1 (flip cards) unchanged: 8
  usable headshots out of 29 isn't enough to build the wall.
- **`TODO.md`** — the nonprofit sweep is escalated by the brief from our own
  🔴 item to *his* Tier 1, with a named page list (`/about` ·
  `/founders-after-hours` · `/mastermind` · `/contact`) and an explicit ban:
  *"no grant or donation framing anywhere on the site."*
- **The design brief's §4.1b "virtual" item** is now specified rather than
  open: a display line above the H1, *"set large, in gold, with real
  letterspacing"*, with the existing eyebrow reduced to the date range so the
  fact isn't stated twice.
