# Meeting 3 outcomes — Justin × Derrick, July 23, 2026 (89 min, design review v1)

**Source:** `docs/transcripts/7-28-2026.md` — Fathom auto-transcript.
**Recording:** https://fathom.video/share/-ixNyx9QJyT3RDDLaaMB-XYaYrB1xzZ5
**Design subset:** the visual/layout/motion decisions are extracted, expanded
and stress-tested in `docs/design/07-23-2026-design-change-brief.md` — use that
one when building design changes; use this one for the full record.

> ⚠️ **The source file is misnamed.** It is saved as `7-28-2026.md`, but its own
> header says *"Website Update - July 23"* and its content dates it beyond
> doubt: ventriq.com "expires on July 25th… **two days**", the Workspace trial
> "ending", and Derrick saying *"I only launched it like 30 minutes ago"* — the
> site went live Jul 23 (`TODO.md` ✅ log). `docs/transcripts/7-23-2026.md`
> exists but is **0 bytes**. Recommend `mv 7-28-2026.md 7-23-2026.md`.
>
> **This matters for reading everything below.** Five days of build work
> (Phases 3–5 + QA sweep 1, commits `019fe9a`…`131569c`) landed *after* this
> meeting. Some asks are already shipped; most are not; several are now
> overdue. Each item below is marked against the **Jul 28 repo state**, not
> against what was on screen during the call.

> ⚠️ Auto-transcript. Speaker attribution is interleaved in at least four
> places (50:58, 26:16, 30:51, 1:00:12) and words are mangled throughout —
> "Ventric", "Ventrix", "Alex Romali" (Hormozi), "goal fish" (goldfish),
> "normal noodles" (numerals), "Tanks gets bigger and advantages get priced"
> (stages/badges). **Verify audio before printing any quote.** See §10.

---

## §0 · Read this first — the five things that matter

1. **Justin committed to sending the Summit assets in "24, 48 hours" (1:25:32).
   That was Jul 23. It is Jul 28 — five days overdue.** The Summit page is his
   stated #1 priority and his Instagram bio target, Aug 10 is 13 days out, and
   the page cannot be finished without speaker headshots, bios, and night
   assignments. **This is the critical path.**
2. **Derrick owed Justin a consolidated asset-request email "tomorrow"
   (1:27:34) — i.e. Jul 24.** No evidence it was sent. It is the unblock for
   item 1 and the highest-leverage single action available today.
3. **Ventriq is NOT a nonprofit and the live site says it is, 20+ times**
   (19:36). Justin: *"I technically can't put a non-profit for founders right
   here right now because I don't want that to be misleading."* Agreed
   replacement: **"mission-driven."** This is live, client-flagged, and
   accuracy-critical. §4 has the grep-verified inventory.
4. **The live Summit FAQ says "Nobody's selling you a course at the end"
   (48:25). Justin's actual policy is the opposite** — a soft pitch every
   session, escalating toward the end. Attendees will notice on night one.
5. **The About page is killed for v1 (1:10:55)** — and killing it is not one
   file delete. Nav, footer, two inbound links, sitemap, OG card, and the e2e
   route list all reference it. §4.7 has the full blast radius.

---

## §1 · Headline decisions

Each row changes something already built. **State** is against the Jul 28 repo.

| # | Decision | Was | Now | Time | State |
|---|---|---|---|---|---|
| **D1** | **Ventriq is a for-profit today; nonprofit arm builds in Q4.** Summit + membership revenue sits under the for-profit and funnels to the nonprofit later. Board, incorporation, filings all pending. | "a nonprofit for founders" everywhere | **"mission-driven"** | 19:36–21:23 | 🔴 not started |
| **D2** | **Kill the `ven-TREEK` pronunciation respelling.** Justin: the name is already rolling off people's tongues; Derrick: *"that's not the right way you'd spell that."* | `ven-TREEK` in eyebrow, footer, About, all copy decks | removed | 21:23–21:51 | 🔴 not started · ⚠️ confirm reading (§10) |
| **D3** | **New homepage pain-point section**, between the proof band and "Three ways in." Navy/midnight ground for contrast break. Bulleted, Geico-brief — Justin: *"users only stay on a page like 60 seconds max."* | nothing there | new section | 21:51–28:06 | 🔴 not started · copy drafted §3.3 |
| **D4** | **Homepage S4 "One structure. Three doors." → testimonials carousel.** Both parties disliked the section. Testimonials carry photos **and hard data points**. | `ConvergenceDiagram` + copy | carousel | 29:22–30:17 | 🔴 blocked on Justin · ⚠️ design consequence §4.3 |
| **D5** | **Homepage "Why this exists" goes Ventriq-centric.** Third person, no Justin signature, no "Read Justin's story." Derrick: *"Justin's story, we write Ventriq's story. It was started for, we aim to."* | first-person Justin letter | Ventriq origin story | 30:21–31:18 | 🔴 not started |
| **D6** | **New Upcoming Events section** in the old testimonials slot. Public + Founders After Hours events only; clickable. Justin's rationale is FOMO + showing the year is real. | nothing | events list | 33:00–37:35 | 🔴 blocked on Justin's filtered list |
| **D7** | **Remove pricing from the homepage cards** — value before price, and it cuts the maintenance surface. | `$39` numeral + "from $39/mo" | value-first | 28:21 | ⏸️ **pinned — Justin sleeping on it** |
| **D8** | **Delete the "about a minute, free" microcopy** under the Summit CTA. It was one of Derrick's own working notes that shipped by accident. | live on `/summit` | deleted | 37:46–39:14 | 🔴 not started · trivial |
| **D9** | **Push "virtual" much harder on the Summit.** Justin: *"even though I've plastered it everywhere, people still don't know it's virtual… If you're still hearing it, it's not enough."* CTA → "Save your **virtual** seat." | "Save your free seat" | virtual-forward CTA | 39:14–40:34 | 🔴 not started |
| **D10** | **Add a visible "Who is this for?" heading** above the three audience rows on `/summit`. | no heading at all | `<h2>` | 43:30–45:06 | 🔴 not started · also fixes a heading-outline gap |
| **D11** | **Speaker face thumbnails on every agenda night.** Squares on desktop, circles on mobile. Justin: *"I wouldn't have to bury the lead"* — shown, not behind a plus-toggle. | `[SPEAKERS]` redline chip | face cards | 41:41–43:00 | 🔴 blocked on Justin's assignments |
| **D12** | **Speaker cards flip; they do not pop up a modal.** Justin: *"the flip would go crazy."* | pop-up planned | flip | 50:58–51:13 | 🔴 not started · ⚠️ a11y spec §4.5 |
| **D13** | **Replace the Summit's "Why Justin built it" section with registrant excitement quotes** — *"it's a testimonial on them being excited"* — plus more register CTAs at section boundaries, especially after the agenda ("this will be a decision point"). | Justin letter + "Read the full story" | registrant voices + CTAs | 45:09–47:21 | 🔴 blocked on Justin |
| **D14** | **Remove pricing from the Summit page too**, for now. | `$39/month` in 3 places | removed | 47:55–48:25 | 🔴 not started · ⚠️ breaks an FAQ line, §4.4 |
| **D15** | **Rewrite "Will I be pitched?"** — the honest answer is *"yeah, we're definitely going to be pitching,"* softly every night, harder near the end. | "Nobody's selling you a course at the end." | honest framing | 48:25–50:11 | 🔴 not started · credibility risk |
| **D16** | **Founders After Hours pillars renamed** to Justin's actual three: **Office hours · Live sessions · Founders After Hours.** Descriptions dictated verbatim (§3.5). | "Join the room / Show up / Bring your challenge" | real pillar names | 54:00–58:28 | 🔴 not started · copy is ready to paste |
| **D17** | **FAH run-of-show confirmed: 6:00 the brief · 6:15 the hour · 7:15 the tally · 8:15 the room.** | 7:00 / 7:15 / 8:15 / 8:30 + `[TIMES — confirm]` chip | confirmed times | 58:30–59:25 | 🔴 not started · resolves a redline chip |
| **D18** | **FAH in-person tier = $99/month.** Justin: *"I like $99. Everything else is premium."* | `$[89–99]` token + `[PRICE — confirm]` chip | **$99** | 1:26:22–1:26:49 | 🔴 not started · resolves a redline chip |
| **D19** | **Membership cards: equal width, premium card gets a midnight ground.** Justin wanted symmetry; Derrick: *"if it's going to go to one, go to the premium."* | 1.15fr/1fr, both cream | equal + blue | 59:25–1:00:34 | 🔴 not started |
| **D20** | **Mastermind: outcome-driven copy, weeks not days, tighter application steps, drop the 10KSB comparison** (Justin: *"so it won't look like a shot"*). | capability language, "90 days", 10KSB FAQ | outcomes, "13 weeks", no 10KSB | 1:06:18–1:09:00 | 🔴 blocked on Justin's copy · 10KSB removal is unblocked |
| **D21** | **About page killed for v1; rebuilt in phase 2.** Derrick's call, to protect Justin's writing bandwidth. | `/about` live + in nav | removed | 1:10:55–1:11:36 | 🔴 not started · blast radius §4.7 |
| **D22** | **Reconstructed logo approved.** Justin: *"I like this one, too. We could do both. Nobody's going to know."* Original file is now an upgrade, not a blocker. | blocking asset | nice-to-have | 1:11:36–1:12:39 | ✅ decided — downgrade on Justin's list |

**Also decided, no work needed:** site stays public, no password gate (16:00) ·
hero copy stays left-aligned, not centered (40:39) · Skool confirmed as the
community platform (11:38) · naming stays "Founders After Hours" until Justin
says otherwise (52:30) · Mastermind hero approved as-is (1:05:02) · FAH FAQ
approved as-is (1:02:34) · FAH chapter-interest form validated as valuable
(53:22).

---

## §2 · Standing constraints this meeting established

These are not tasks. They silently govern future decisions and should be
checked against every new page, section, and asset.

**C1 · Justin's day job means minimizing his surface on the brand.**
Stated twice, for the same reason. At 30:22: *"Justin is supposed to be
somewhat incognito for this. So that way I'm not getting any type of red
flags."* At 1:26:49, on LinkedIn: *"it's going to be attached to my LinkedIn,
and my work likes to snoop around."*
**Governs:** the About page, both founder letters, JSON-LD `founder`, OG cards,
bylines, LinkedIn, press. **Deliberate exception:** the Mastermind keeps his
ethos section — he asked for it (12:50) and *"this is your baby."*

**C2 · Justin's bandwidth is the binding constraint, not Derrick's.**
*"when you're planning a summit, sleep ain't an option"* (0:22); Derrick at
1:11:18: *"there's already a lot you got to write, and I'm already asking a lot
from you."* Every plan below should minimize what Justin must write and
maximize what we can draft for his approval.

**C3 · Justin does not want to depend on us for routine content updates.**
Said twice, unprompted — on homepage pricing (28:21: *"you're not having to be
on the back end updating this every other day"*) and implicitly across the
events list and speaker roster. **This is the CMS argument, in his own words.**
Build content surfaces so they can migrate to self-serve.

**C4 · The audience is not local.** *"we do have people registering in multiple
different states. And some people out the country"* (53:22). This kills
Derrick's floated Summit title *"the most intensive virtual event for people in
Baltimore"* (40:05) and shapes chapter/geography copy everywhere.

---

## §3 · Complete transcript walk

Every segment, in order, with a disposition. Nothing skipped — banter is marked
as such so the coverage is visibly complete.

### 3.1 · Opening (lines 6–89, 0:00–5:38)

| Lines | Time | Content | Disposition |
|---|---|---|---|
| 6–18 | 0:00–0:34 | Sleep, gym, mutual overwork | No action. Context for **C2**. |
| 19 | 0:34 | **"I've secured probably about 14 or 15 so far. And I probably just need, like, another seven"** | ⚠️ **FACT + COLLISION.** ~14–15 speakers secured, ~21–22 target. The live site claims **"Thirty-plus"** twice (`app/summit/page.tsx:230`, `:144`). Either 30+ counts panelists Justin isn't counting, or the site overstates. **Verify with Justin before Aug 10.** |
| 19 | 0:34 | *"I don't want to have any speakers that last minute we toss on"* | Explains why the roster is late. Not a defect. |
| 21–25 | 1:05–2:36 | Derrick's week: a WordPress client hacked and rebuilt; a cousin's court case | No action. |
| 27–47 | 2:41–3:26 | **ventriq.com expires Jul 25, no auto-renew.** Prior ask $2–3K; a drop-catch is ~$25. `ACTION ITEM: Register ventriq.com on Jul 24 11:59 PM` | 🔴 **STALE — 3 days past.** See §3.1a below; Derrick's "available at midnight" model is wrong and the item is probably still live. |
| 49–57 | 3:26–3:50 | Justin calendars it; notes email would need moving | Migration is a "good problem," not a task. |
| 58–81 | 3:50–4:58 | Drop-catch bots; does it auto-appear on GoDaddy | See §3.1a. |
| 83 | 4:58 | **Google Workspace trial ending** | 🔴 **STALE — billed ~Jul 24, 4 days past.** Verify jshaw@ventriq.io still resolves. |
| 83 | 5:12 | Derrick praises the speaker graphic | No action. |
| 85–87 | 5:30 | **"I got a lot of them, and if I have their headshot, have their bio, too."** | ⭐ **The assets exist.** D11 is a handoff problem, not a creation problem. |

#### §3.1a · The ventriq.com plan actually needs redoing

Derrick's on-call model — *"the registration on ICANN will expire at midnight,
and then it should just become available"* — is not how gTLD expiry works. The
real sequence after Jul 25 is: **~30–45 day Registrar Grace Period** (owner can
still renew at normal price) → **30-day Redemption Grace Period** (owner can
restore, ~$80–200) → **5-day Pending Delete** → **drop**. The domain does not
appear on GoDaddy the next morning.

**So the item is not blown — it just has a different shape than we told him.**

1. Run `whois ventriq.com` and read `Registrar Registration Expiration Date` +
   `Domain Status`. `autoRenewPeriod` / `redemptionPeriod` / `pendingDelete`
   each imply a different date.
2. If the owner let it lapse, the actual drop lands roughly **mid-September**.
   Place backorders at **DropCatch and SnapNames** (~$20–25 each, charged only
   on catch) — multiple catchers materially raise the odds on a name anyone
   else is watching.
3. **Correct the record with Justin** so he isn't refreshing GoDaddy in vain.

### 3.2 · The demo, narrated (lines 89–155, 5:38–19:36)

| Lines | Time | Content | Disposition |
|---|---|---|---|
| 89 | 5:38–7:12 | Process change: no sketch round, coded v1 straight through, AI-leveraged, because the timeline demands it. Offer to restart with sketches if the direction is wrong. | ✅ **Direction approved** — 1:12:19: *"Overall, I'm thoroughly pleased."* No restart. Iterate on v1. |
| 91–95 | 7:12–7:21 | *"I'm not a hard man to please"* / *"this is intentionally rough"* | No action. |
| 95 | 7:21–8:02 | **Hero background should be video.** Wanted people; no owned footage; stock video reads false for this kind of event → **abstract geometric motion instead.** | 🟠 **New build item.** Today the hero is `CorridorRays` (static SVG + Phase-4 CSS). Constraints: must not regress LCP (already a live perf watch), poster fallback, `prefers-reduced-motion` honored. Derrick self-scoped 20–30 min. |
| 101 | 8:02 | *"Geometric image… reoccurring theme where this is going to move around a bit"* | Confirms the motif is the through-line. Phase 4 delivered the static half. |
| 101 | 8:30 | Derrick dislikes "One structure, three doors," asks Justin for ideas | → resolved as **D4**. |
| 101 | 8:45 | **Page-structure doctrine:** sell → answer quick questions → *then* say who you are | Records *why* CTAs repeat and why About dies (**D21**). Keep as house doctrine. |
| 101 | 9:10 | "a quick why this exists sort of situation" | → revised by **D5**. |
| 101 | 9:30 | Footer/sponsors | Shipped. |
| 101 | 9:40 | Summit motion asks: rolling **carousel** · **countdown** ("I saw an Eventbrite one time and I've loved it ever since") · **typewriter/scroll reveal on the August dates** · clickable speakers → bio · Luma **embed modal** · agenda needs "more color to give it a little bit more pop" · **video in the Q&A block** ("will make it feel more premium") | Mixed: **Luma embed ✅ shipped** (`LumaRegisterButton`, checkout overlay). **Scroll-reveal ✅ partially** (Phase 4 `ScrollLit`, but on the manifesto, not the dates). **Countdown ❌ does not exist** — grep found nothing. **Carousel ❌**, **agenda colour ❌**, **Q&A video ❌**. |
| 101 | 10:50 | FAH: *"the numbers, the normal noodles wrote themselves in and they crossed out"* (tally marks) | ✅ **Shipped in Phase 4** — `TallyMarks`, "tally marks stroke in on the community page." |
| 101–104 | 11:20 | **Skool confirmed** as the community platform; Justin to email the URL | ✅ Platform confirmed (resolves a TODO-JUSTIN question). ⚠️ **URL never verified as received** — `[SKOOL-URL — platform TBC]` chip is still live at `app/founders-after-hours/page.tsx:65`. |
| 107 | 11:46 | *"People love that. They want to know what they're paying, what they're signing up for"* + FAH video background | Reinforces schedule transparency. Video background → same item as 7:21. |
| 119 | 12:50 | Mastermind walk; **Justin must write the Mastermind ethos section himself** — *"I couldn't write this piece for you"* | 🟠 **Justin owes.** The deliberate **C1** exception: he stays the face here. |
| 119 | 13:40 | *"always at the end, give people a chance… try to sell them again at the end"* | ✅ Shipped — every page has a final CTA. |
| 119 | 13:50 | About page built from public research; least effort spent; expected the most feedback | → **D21**, killed. |
| 131 | 15:40 | **Site is live**, domain connected, forms wired | Historical. Dates the meeting. |
| 131 | 15:55 | **"Contact page… I need to put it on the nav bar. Slipping."** | 🔴 **STILL OPEN.** `components/nav.tsx:10–13` = Summit, FAH, Mastermind, About. **No Contact.** Killing About (**D21**) frees the slot — do them together. |
| 131 | 16:20 | Password-gate offered; Derrick recommends leaving it public; reasoning laid out | ✅ **Decided: public.** Closed, no action. |
| 133–137 | 17:52 | Justin thanks Derrick for the bones | No action. |
| 139–153 | 18:05–18:37 | Screen-share swap, laptop switch | No action. |
| 155 | 18:40 | **CCBC surgical-instrument sterilization cert** — $35/hr, no degree, county pairs you with a hospital. *"go forward and bless others."* | Not a site item. ⭐ **Log as Digest/social content** — Justin: *"a good random fun fact that I will share with the people."* Exactly his audience. |

### 3.3 · Homepage review (lines 158–305, 19:36–37:46)

**Line 158, 19:36 — D1, the nonprofit reversal.** Full quote:

> *"the nonprofit process is very fun. Long story short, we are not going to be
> a nonprofit at this exact moment. We will be later this year. So Ventriq is
> going to be a for-profit for now… we're going to build out the nonprofit arm,
> like, towards Q4 between finding… my board, getting all the incorporations,
> all the preparations for it, it takes a lot of time… I'm going to use the
> summit… that stuff will be under the for-profit, but it's going to funnel
> into the nonprofit… I technically can't put a non-profit for founders right
> here right now because I don't want that to be misleading."*

Derrick offers **"mission-driven"**; Justin: *"Yes… that works just fine."*

**Plan:** §4.1 has the grep-verified inventory. Three rules for the sweep:
- **Do not blanket-replace.** `app/summit/page.tsx:321` "**Nonprofit builders** —
  who run their organization like founders" describes the *audience*. **Keep.**
  Same for "nonprofits doing the real work." Only *Ventriq's own* description
  changes.
- **The footer legal line** (`components/footer.tsx:58`, "© 2026 Ventriq. A
  nonprofit organization." + `[EIN]` token) should **drop the entity descriptor
  entirely** — we still don't know corp vs LLC (open on Justin's list), so any
  descriptor is a guess.
- **This strengthens the existing "no donate" legal hold** rather than relaxing
  it, and the no-tax-deductibility rule in `AGENTS.md` now has a second reason.

**Line 165, 21:23 — D2, kill the pronunciation gag.** Justin: *"We've been
calling it Ventriq by default. It's rolling off. Everybody's talking about it
that way."* Derrick: *"that's not the right way you'd spell that. Should I
rewrite it or should I just kill it?"* Justin: *"kill it."*
⚠️ Transcript garble ("Ventric versus Ventric"). **Reading:** the `ven-TREEK`
respelling dies. Derrick was in the room — one-line confirm before executing.

**Lines 171–207, 21:51–28:06 — D3, the pain-point section.** Placement is
explicit: *"in between this line right here and then the three ways in."*

Justin's own language, which is the copy source:

> *"we're doing **founder development**. Most individuals, as they start their
> businesses and organizations, they understand their product and their
> service. But we need to actually help them understand how to become an
> **actual operator**, how each department or each unit within their
> organization works… then how to leverage them strategically to get to
> whatever their target goal is. Giving them the **executive level thinking
> versus their tactical thinking**. And so that's why we are forging the future
> by ensuring that the founders are **forging themselves into executives**
> versus being traditional employees or self-employed individuals."*

Simplified on request (24:47) — this is the bullet source:

> *"Are you a first-time founder… you have absolutely no idea what you're
> doing? You may know your product, you may know your service, but **you've
> never managed cash flow. You've never managed a sales funnel. You've never
> developed a marketing system. You've never operated a full business. You've
> only operated in one specific area of expertise.** We're here to help you
> evolve into the individual that can manage an entire organization."*

Derrick's playback, which Justin endorsed with *"There you go"* (25:46):

> *"running a business is a holistic task. There's a bunch of stuff to it. And
> **no matter who you are, you suck at a couple of these. And I'm going to help
> you be good at the whole thing.**"*

**Format (26:16–27:15):** *"users only stay on a page like 60 seconds max"* →
**bullets**, not prose. Derrick's model: *"I'll treat you like Geico"* — don't
enumerate everything that can go wrong, cut to *"hey, what you need?"*

**Visual (27:15):** *"that navy blue background to it to break it up as far as
contrast-wise. So that way people know that they're transitioning from one part
to the next. Then they come back down here. It's back into this eggshell."*

⚠️ **Band-rhythm problem to solve.** Inserting midnight between S2 and S3
produces midnight → cream → midnight → cream → midnight in five consecutive
bands, and the design system treats midnight as a *sparing* accent. Proposed
new rhythm, which also absorbs D4/D5/D6:

| | Section | Ground | Change |
|---|---|---|---|
| S1 | Hero | midnight | — (video upgrade later) |
| S2 | Proof band | cream | — |
| **S3** | **Pain points** | **midnight** | **NEW (D3)** |
| S4 | Three ways in | cream | pricing out (D7) |
| S5 | Testimonials carousel | cream | replaces the diagram (D4) |
| S6 | Why Ventriq exists | cream + rule | Ventriq-centric (D5) |
| S7 | Upcoming events | midnight | NEW (D6) |
| S8 | Sponsors | midnight | merge with S7 or alternate |

S7/S8 both being midnight is the one open seam — either merge them into a
single dark closing band or flip Upcoming Events to cream. **Derrick's call.**

**Lines 209–222, 28:06–29:22 — D7, homepage numerals and pricing.** Justin
noticed the mismatched card numerals (`Aug 10` / `$39` / `Sep`); Derrick
explained they're chronological. Justin: *"I probably don't want to show pricing
right here yet because I want to highlight value first, even though $39 is
absolutely nothing… Also, for the sake of… you're not having to be on the back
end updating this every other day."* Derrick: *"put a pin in this piece… the
site's live for you."*

⏸️ **PINNED.** Direction is clear (drop the price); the replacement numeral
system is not. Three options to put to him:
- **(a)** all-chronological — `Aug` / `Ongoing` / `Sep`
- **(b)** all-quantity — `8 nights` / `Monthly` / `10 seats` ← *recommended;*
  each reads as scarcity or scale, none needs maintenance
- **(c)** drop numerals entirely, let the titles carry

**Lines 225–235, 29:22–30:17 — D4, the carousel.** Justin: *"if we already have
this part, I don't know if we necessarily need this part."* Derrick: *"I don't
know what I was thinking with this section… It needs something there for the
flow. I had testimonies."* Justin: *"This could be where the **proof of
concept** is… This isn't just hypothetical. This is the real deal. **I got
pictures of people.**"* → *"one structure, three doors becomes the testimonials.
And we can even make that a **carousel**."*

⚠️ **Design consequence to raise, not to silently accept:** `ConvergenceDiagram`
is the brand's signature "architect's line" moment — two lines converging on a
threshold, the concept the entire identity derives from
(`ventriq-design-system-brief.md`). Deleting it removes that gesture from the
homepage. It survives on `/mastermind:37` only. **Options:** relocate it into
the new D3 pain-point band (thematically apt — one structure, many gaps), fold
it into the footer, or accept the loss. Flag to Derrick.

**Lines 240–250, 30:21–31:18 — D5, Ventriq-centric.** Justin: *"Justin is
supposed to be somewhat incognito for this. So that way I'm not getting any type
of red flags."* Derrick: *"this could be the first time we really start to write
Ventriq's branding story and honestly just ignore you… Justin's story, we write
Ventriq's story. It was started for, we aim to."* Justin: *"I probably don't
have to be a face for this necessarily. **This is my first time building a brand
without a face**, low key. Will I be the face though? Yes… let's shift this to
Ventriq-centric."* → establishes **C1**.

**Lines 250–268, 31:18–33:00 — testimonial provenance and data points.**
Derrick: *"Read those testimonials to make sure. Are those right? I legit just
don't remember where I found them."* Justin: they came from the old **Opulence**
or **IAMJS** sites — *"I'm not saying that they're recycled, but they have been
used before"* — and crucially: **"No, these are real."** Then:

> *"I have **data points** now that I can point to versus it just being like,
> ooh, we feel better… We actually have **production numbers**. And I'll have
> you give me both the testimonials and the data points."*

**Plan:** ⚠️ *Real* ≠ *cleared to print.* The
`[TESTIMONIAL PERMISSIONS — README #5]` chip at `app/page.tsx:288` **stays**
until Justin blesses names and companies. And the carousel component must be
specced for **four** fields, not two: quote · attribution · **photo** ·
**metric** (e.g. "+$180K in 9 months").

**Lines 268–293, 33:00–37:35 — D6, Upcoming Events.** Justin wants the year
visible: internal events, a recurring webinar as an on-ramp to the community,
speaker sessions inside the membership, office hours. Derrick: *"Alex [Hormozi]
tells me about all the events he has coming up that I can't sign up for all the
time. Creates FOMO."* Placement (36:00): the slot the testimonials vacate.
Clickable rows.

**Data handling (36:29) — worth recording as a privacy decision.** Derrick saw
Justin's master schedule on screen: *"That list seems **hyper private** to me.
Do you want to clean that up… I can take the whole thing too… but I don't know
if you want me doing that."* Justin: *"I'll clean it up… you're only going to
see cohort like one time. Everything else is internal, for the cohort members,
for the mastermind… just filter it — **public and FAH**."* **Derrick correctly
declined the raw file.** Only the filtered subset comes to us.

**Architecture recommendation (this is where C3 bites):** an events list that
changes all year should not be hardcoded JSX. For v1, a typed `lib/events.ts`
array — cheap, type-safe, renders server-side, no new infra — with the shape
designed so a Supabase-backed swap in phase 2 is a data-source change, not a
rewrite. Do **not** build a CMS for this now.

**Lines 295–305, 37:35–37:46 — banter, then page approved.** *"that's it for
this page. I'm cool to jump to the next."*

### 3.4 · Summit review (lines 305–464, 37:46–52:30)

**Lines 305–311, 37:46–39:14 — D8, the note that shipped.** Justin, reading
aloud, hits *"Registration runs on Luma about a minute free"* three times and
asks *"Am I not understanding the sentence?"* Derrick: *"I wrote this right
here. **This is a note for me.** In my head, I was thinking, signing up on Luma
is really fast, and it doesn't cost anything… **You've now seen my notes.** I'm
so embarrassed."* Justin: *"imagine that without that piece there. So just save
your seat."*

**Plan:** delete the trailing `<span>` at `app/summit/page.tsx:130` and the
source line at `docs/copy/08-event-motion-copy.md:70`. Leave the CTA. (It is
literally residue of the Eventbrite→Luma rewrite — `docs/copy/README.md:22`
still records the ancestor line *"about a minute, pay what you want."*)

**Lines 311–334, 39:14–40:55 — D9, "virtual" isn't landing.** Justin:
*"people still don't know it's virtual… **If you're still hearing it, it's not
enough.**"* Derrick floats retitling the H1 around virtual. Justin: *"Put it in
the title… You're going to sleep on this."*

**Split into two:**
- ✅ **Do now:** CTA "Save your free seat" → **"Save your free virtual seat"**
  (`app/summit/page.tsx:129`, `:398`, and the home card at `app/page.tsx:206`).
  Keeping *free* matters — it's load-bearing after the pay-what-you-want
  reversal — so add rather than swap.
- ⏸️ **Pinned:** the H1. ⚠️ **If it changes, do not geo-narrow.** Derrick's
  *"for people in Baltimore"* contradicts **C4** — registrants are multi-state
  and international. Virtual-forward, geography-neutral.

**Line 322, 40:39 — centering.** Justin assumed centered; Derrick: *"I'm not
going to center it… Trust me. When the animation's there, it's going to look
better."* Justin: *"I see the vision."* ✅ **Left-aligned stands.** Recorded so
it isn't re-litigated.

**Line 329, 40:55 — ⭐ the manifesto reads as AI.** Justin, reading the
ScrollLit block: *"I will probably change the copy on this a little bit, so that
way people know… **we can both read that this came straight from chat.** So
we'll probably just clean it up to make the **brand voice more humanistic**."*

**Plan:** this is a direct hit on the `human-copy` / `ventriq-voice` mandate,
and Justin caught it unprompted. He's taking the rewrite, but we shouldn't leave
AI-tell copy live while waiting — **offer him a rewritten draft** of
`app/summit/page.tsx:199` rather than an empty ask. Treat his comment as a
**site-wide tone note**, not a one-block note.

**Line 329, 41:20 — speakers section praised.** *"This was by far one of my
favorite parts. Our speakers are going to love this."* No action.

**Lines 329–342, 41:41–43:17 — D11, face cards on the agenda.** Justin wants
*"mini face cards down here, so they know who's on what panels"* and explicitly
rejects hiding them behind a toggle: *"I wouldn't have to bury the lead at
all."* Derrick: *"small, tiny little squares. And then for mobile… **circles as
opposed to squares**."* Then: *"You'll give me the data for who's speaking on
which day, yes?"* — *"Yep."*

**At 43:17 a Google Doc with the speaker roster was shared on-call** (comment
access, to Derrick's ventriq.io address), with a headshot file to follow.
⚠️ **Verify it arrived** — this is checkable in Drive today and is the
single blocking dependency for the Summit page.

**Lines 342–354, 43:30–45:09 — D10, "Who is this for?"** *"I will probably put
like large header saying like, 'who is this for?'… I feel like something's just
missing right there."* Derrick: *"above where it says small business owners, put
a header in here."*
✅ **Smallest, cleanest win on the list.** `app/summit/page.tsx:316` — the
section has a code comment but **no `<h2>`**. Adding it also closes a
heading-outline gap, which is a free a11y improvement on top.

**Lines 354–398, 45:09–47:55 — D13, registrant voices + more CTAs.** *"instead
of this part… if I can get a few people that tell me why they're excited about
attending… **it's a testimonial on them being excited**."* Then CTAs: *"maybe we
should have it, so we only have it right here. Should we have another one right
here? **Yes.**"* and *"under here… **this will be a decision point**. It's like,
okay, I want to go to this, this, and this. And all right, I'm ready. Click."*

⭐ **"Instead of this part" refers to the "Why Justin built it" block
(`:335–353`).** So D13 also satisfies **C1** — it removes a Justin signature and
a "Read the full story" link that dies with the About page anyway. One change,
three problems solved.

**Line 398, 47:11 — the registrant email.** Derrick: *"Can you get those people
to give you a **video**?"* Justin: *"one, I want to do that. And two, I'm going
to have them be able to grab this and actually **put their headshot on** here
too. That's good marketing."* — *"**That's how people don't miss events.**"*

⭐ **Unclaimed build opportunity:** the personalized "I'll be there" share card
Justin describes is a near-free extension of the Phase-5 OG-card generator we
already have. Propose it — it's a marketing asset, not just a favour.

**Lines 398–416, 47:55–50:11 — D14 and D15.** Justin: *"just remove the pricing
off of here for now."* Then the FAQ moment. Justin reads *"Will I be pitched…
Nobody's telling you"*; Derrick deadpans *"But we are"*; Justin: *"**Take that
off. What the hell were you thinking?**"* Derrick: *"Always be selling."* Then
Justin states the real policy:

> *"some of these people aren't coming all the way until the end… so **there
> will be some type of mechanism where we do kind of lean into it every
> session. It probably won't be a hard sell until we get closer towards the
> end**… So yeah, **we're definitely going to be pitching.**"*

**Plan:** the live answer at `:145` says *"Nobody's selling you a course at the
end. The only call-to-action you'll hear is Founders After Hours — and its price
is on the label."* Both halves break: the first is false, the second collapses
when D14 strips prices. **Rewrite as one honest answer** — every night points at
the community, framed as continuation rather than upsell. This is exactly the
register `ventriq-voice` calls for: say the true thing, confidently.

**Lines 416–422, 50:11–50:58 — Zoom vs StreamYard, unresolved.** *"I'm actually
TBD if I'm going to do it on Zoom. I do really want to do it on Zoom. So that
way they can **network**. But I'm also entertaining StreamYard… for **branding
purposes** — down here, it could say Forge the Future Summit, in the banner."*

⚠️ **"Zoom" is hardcoded in 6 places** (§4.6) and feeds the Event JSON-LD and
the pending Luma virtual-location fix on Justin's list.
**Plan:** genericize to *"live online"* now — zero cost, removes a wrong-fact
risk, needs no decision from Justin. And hand him the actual answer he was
fishing for: **Zoom Webinars/Events does branded registration, banners and
backgrounds**, so he isn't trading away the networking he says he wants;
StreamYard's real edge is multistreaming to IG/LinkedIn/YouTube, which is
one-way and would kill the room. **Recommend Zoom + a branded template, with
StreamYard restreaming alongside if he wants reach.**

**Lines 422–431, 50:58–51:13 — D12, flip not modal.** ⚠️ Attribution is
scrambled here; the sense is Justin asking "does it flip?", Derrick answering *"I
was going to have it do a pop-up — you want me to do a flip?"*, Justin: *"the
flip would go crazy"*, Derrick: *"All right, I could do a flip. Let me write
that down."*

⚠️ **A11y spec is not optional here** (we are at 100/100 and must not regress):
`<button>` not `<div>`, `aria-expanded`, back-face hidden from AT until flipped,
`prefers-reduced-motion` → cross-fade instead of 3D rotate, no focus trap. **And
on mobile, flip-on-tap is a known usability trap** — Derrick already planned
circles for mobile, so mobile should expand into a sheet rather than flip.

**Lines 433–461, 51:13–52:30 — mobile spot-check.** Justin: *"it looks good on
mobile, too."* Derrick explains shadcn/ui and jokes about untested site number
six. No action — but see the sequencing at 1:10:23.

### 3.5 · Founders After Hours review (lines 463–543, 52:30–1:03:48)

**Lines 463–470, 52:30–53:22 — ⚠️ naming is provisional.** *"majority of the
names that I created have been **placeholders**… Founders After Hours is
probably going to be more so the **event that happens inside** the community.
I'm probably going to switch the name of the actual membership itself. I don't
know what it's going to be called. **I feel like 'the Forge' might be it.**"*
Derrick: *"I'm just going to keep calling it Founders After Hours until you tell
me."* Justin: *"Yes."*

✅ **Decision: no rename now.** ⚠️ **But build for it.** Today the one name does
two jobs across a route, nav, footer, three pages, OG cards, metadata and a copy
deck. **Recommend:** hoist the membership name into a single constant
(`lib/brand.ts` → `MEMBERSHIP_NAME`) so a rename is one line, not a 60-site
grep. And flag the timing to Justin: **renaming after Aug 10 costs SEO** —
`/founders-after-hours` → `/the-forge` would need a 301 and would reset whatever
indexing we've earned. Better to decide before launch. Also worth raising:
*Forge The Future* (summit) and *The Forge* (membership) may be too close.

**Line 470, 53:22 — FAH copy notes.**
- *"Come do the work. We'll count it."* → *"I understand what 'we'll count it'
  is. **I'll probably change that verbiage a little bit so they know what in the
  world that means.**"* ⏸️ **Justin owes.** It's a real clarity problem — the
  line only parses once you know about the board. `:50`.
- The sub-paragraph ("digital home for replays, office hours, straight
  answers…") → *"Love it"* **six times.** ✅ Approved, don't touch.
- **The chapter form validated:** *"we do have people registering in multiple
  different states. And some people out the country. So I want to know where
  they want us. So that is **literally perfect**."* ✅ Already shipped
  (`components/chapter-form.tsx`) — and this establishes **C4**.

**Lines 470–501, 54:00–58:28 — D16, the three pillars.** Working through it live,
Justin lands on: *"what are the top three? **Office hours, digital programming**
— but people are going to be like, what is programming? Because programming is
eight different things. But **webinars**… So office hours, webinars, and then
founder after hours."* Derrick confirms the mapping (56:01). Then the middle one
gets refined (56:12–57:26): digital library vs live training sessions → *"**live
training sessions**. That sounds like more value"* → Derrick: *"past sessions,
live sessions is the best one. Archive is a little [weak]"* → Justin: *"keep it
as **live sessions** for now. And then by default we'll just put in… '**saved to
our digital library**' or something in the description."*

**Final mapping and copy — ready to paste** (`app/founders-after-hours/page.tsx:82–84`):

| Was | Now | Description, dictated at 57:34 |
|---|---|---|
| "Join the room." | **Office hours** | *"an hour to get your questions answered on specific subjects such as marketing, sales, operations, funding."* |
| "Show up." | **Live sessions** | live training sessions — with *"saved to our digital library"* in the description |
| "Bring your challenge." | **Founders After Hours** | *"our in-person production experience to help people drive results."* |

⚠️ The section heading **"Three doors in"** should change too — these are pillars
now, not doors, and "doors" already does work on the homepage. Suggest
**"What's inside"**. Small judgment call, Derrick's to make.

**Lines 506–513, 58:30–59:25 — D17, the run-of-show.** *"let's shift this down to
six o'clock and have it conclude at… like 8.15."* Derrick works the arithmetic
aloud. Justin enumerates all four: *"**six o'clock for the brief, 6.15 for the
hour, 7.15 for the tally, and then 8.15 to engage in the room with your
people.**"*

**Plan:** rewrite `:102–106` to 6:00 / 6:15 / 7:15 / 8:15 and **delete the
`[TIMES — confirm run-of-show]` chip at `:100`.** ⚠️ One arithmetic oddity worth
a single-line confirm, not a blocker: 7:15→8:15 is a full hour for "the tally,"
which was 15 minutes in the old schedule. Ship his four times verbatim and ask
what fills that hour.

**Lines 513–531, 59:25–1:00:34 — D19, the membership cards.** Justin: *"I want
this symmetrical… this one's larger than this one… horizontal."* Derrick: *"don't
give more credence to one than the other. Do you want one to be a different
color?… Make the more expensive one the better color, so like a blue
background?"* Justin: *"Yeah, maybe blue, yep, **make it rich**."* Derrick: *"the
one that's $99 a month the blue one, because if it's going to go to one, go to
the premium."*

**Plan:** `md:grid-cols-[1.15fr_1fr]` → `md:grid-cols-2`; in-person card →
midnight ground. ⚠️ Two design constraints: (a) Justin's complaint was **width**
("horizontal"), so equal widths are required — but the `md:mt-[34px]` stagger is
a brand device; recommend dropping it **on this pair only**, since an offset
*plus* a colour change reads unbalanced. (b) On midnight, **accent orange
`#C15A2C` fails AA at body size** (established Jul 24) — that card's link must be
cream-underlined, not accent.

**Lines 533–540, 1:01:01–1:02:34 — the membership platform.** Derrick describes
the architecture: leaderboard, *"an entire authentication and membership system
built into this website right now already… hash and store passwords securely…
the data structures for these things exist. The actual CMS… does not exist"* —
then the tier model: *"super admin. That's you. Coordinators… Teachers…
Students. So you got four different tiers. That's off rip. You could probably
think of two more… guest speakers might be different than teachers."* Closing:
*"I came into this thinking this is going to be a **four year project**."*
Justin: *"Absolutely. This man gets the vision and I love it."*

⚠️ **Verified against the repo — see §9.2.** No auth, roles, or leaderboard
schema exists today. Only `newsletter_signups`, `contact_messages`,
`chapter_interest`. Worth squaring before Justin asks to switch the leaderboard
on.

✅ **Requirements captured for the phase-2 roadmap:** auth · role tiers (super
admin / coordinator / teacher / student / guest speaker / +1 TBD) · rooms ·
leaderboard, tied to the Mastermind scoreboard and the FAH tally · staged
rollout, leaderboard-only first.

**Line 543, 1:02:34–1:03:48 — the FAH FAQ, read aloud in full.** *"Why isn't it
free? Because it's already dirt cheap… What do I bring? Yes, I'm an introvert, so
what? You still got to get this money… The work you've been putting off has a
room now. It sure does. Join us. **All right, that's great.**"*
✅ **APPROVED as written — no changes requested.** One exception: *"Who runs it?
Ventriq — **a nonprofit**"* (`:280`) falls under **D1**.

**Lines 545–552, 1:03:48–1:05:02 — water break.** No action.

### 3.6 · Mastermind review (lines 554–595, 1:05:02–1:10:55)

**Line 555, 1:05:02 — hero approved.** *"Nothing for you to change right here.
It's just keeping you FYI."*

**Line 555, 1:05:20 — ⚠️ *"I may just make the Mastermind, like, click to buy."***
❓ **Open question, and consequential.** The whole page rests on selectivity: a
four-step application, a reading committee, 10 seats, an honest-rejection line,
a graduation bar. **Click-to-buy guts the value proposition it's built on.**
Justin said *"may"* — a musing, not a decision. **Recommend a hybrid:** apply →
accepted → Stripe payment link. Preserves the gate and removes the friction he's
reacting to. Stripe is already in his stack.

**Lines 563–589, 1:05:33–1:06:18 — Arrow the dog.** No action (explains the
DigitalDog name).

**Line 591, 1:06:18–1:09:00 — the page walk.** Approved without change: *"This
isn't for coaches selling coaching"* · *"90 days, three pillars, the room, the
scoreboard, and the systems — **that's beautiful**"* · "Collaborate, accelerate,
escalate" · the honest-rejection line · the founder pull-quote · the FAQ block ·
*"Formatting-wise, this is fine."* Changes requested:

- **"Length: 90 days" → weeks.** *"I'll probably switch that to, like, weeks.
  That way it doesn't sound too intimidating."*
  ⚠️ **Scope this narrowly.** "Ninety days" is load-bearing brand copy — page
  title `:7`, meta `:9`, H2 `:119`, body `:74`, the home card strap
  (`app/page.tsx:220`), and the copy deck. He was reading **the format spec row**
  (`:144`). **Change `:144` to "13 weeks (about 90 days)" and leave the brand
  line alone** unless he says otherwise.
- **Session cadence not final.** *"this will probably change as far as it being
  on Monday evenings."* `:145` currently states *"weekly, Monday evenings,
  60–90 minutes, live on Zoom"* — three unconfirmed facts in one row (day, and
  Zoom per §3.4). **Add to Justin's list.**
- **"What graduates leave with" → outcome-driven.** *"I probably want this to be
  results driven or outcome driven versus like they walked away with systems,
  because that probably won't move people to action. More so like **you walk
  away with an increase in X amount of production**."* 🟠 Justin owes the
  numbers; `:168–176` is the target.
- **Tighter application steps.** *"I've cleaned this up… I can give you more
  concise words for applications step by step. **Apply, committee, accept,
  declare.**"* 🟠 Justin owes; `:199+` is the target.
- **Remove the 10KSB comparison.** *"I will probably remove that part so it won't
  look like a shot."* — he's a 10KSB alum and doesn't want to swing at it.
  ⚠️ **Reframe, don't delete.** `:271` is a genuinely useful differentiator
  ("this room is for installing what you already know"). Retitle to *"How is this
  different from an accelerator?"* and drop the 10KSB name and the comparative
  clause. Keep 10KSB where it appears as **his credential** — that's not a shot.
- **⭐ Mobile bug.** *"when I looked at this briefly on mobile, **this part was
  kind of bunched up**."* He didn't say which part. **Actionable now:** run a
  mobile screenshot pass on `/mastermind`. Prime suspects: the midnight format
  spec sheet `:136` (label/value rows) and the four-step application grid `:192`.

**Line 595, 1:10:23 — ⭐ Derrick's stated execution order.** *"in my mind, the way
I'm thinking it'll go is I'll take the **copy changes you already told me about**,
put that in, wait on the **other new ones and the pictures**, put all that in,
**make the videos**, and then **mobile last** — because there's no point fixing
the mobile, then I change something else, and then I got to fix the mobile
again."* Plus a self-note: *"more color popping at some locations."*

**§5 follows this order.** It's the right sequencing and it was agreed on the
call.

### 3.7 · About page and logo (lines 597–624, 1:10:55–1:14:04)

**Lines 597–608, 1:10:55 — D21.** Justin: *"I do like this stuff, but I do want
to make it Ventriq-centric."* Derrick: *"there's already a lot you got to write,
and I'm already asking a lot from you. **I think I just killed the about page**…
and then we plan for a **phase two**, come back in, hit the about page."*
Justin: *"That's fine… that is a great idea."*

**Blast radius in §4.7 — this is six files, not one.**

**Lines 611–618, 1:11:36 — D22, the logo.** Derrick admits the provenance:
*"I did print screen, and then I copied it that way. That's not the actual file…
Charles sent a Photoshop, turned that into a **janky SVG**."* Justin: *"The funny
thing is, **I like this one, too. We could do both. Nobody's going to know.**"*
✅ Downgrade from blocker to nice-to-have on Justin's list. Note **Charles** as an
alternate source for the original.

**Lines 621–624, 1:12:19 — ⭐ priority, stated by the client.** *"my major things
I need to send you are the **speaker headshots and bios**, because **this will be
the main page I'm driving traffic to, like ASAP**… **this could be the first page
that you prioritize** — because I will just link everything, like our bio, it'll
go straight to this page. All the other pages can kind of follow afterwards."*

⭐ **`/summit` outranks everything.** And the Instagram-bio link is a UTM
opportunity: `docs/utm-registry.md` already defines the `^ig-` channel grouping,
so **hand Justin the exact tagged URL** to paste into his bio. Small, concrete,
makes the GA4 channel work pay off immediately.

Also: *"Overall, I'm thoroughly pleased with this"* and *"this is a custom site…
it helps build out the ratings on Google."* ✅ Direction approved.

### 3.8 · The infrastructure conversation (lines 626–690, 1:14:04–1:23:41)

**Lines 626–648, 1:14:04 — the $750 / $10 exchange.** Derrick: *"right now, this
is living on my AWS server. So it costs me around, like, **$750 a month** to host
this… And I was going to be like, yo, can I just charge you, like, a **$10 Stripe
fee** to host this for $10? But it's fine. I'll get the $10."* Justin: *"I don't
know if it's worth it at this point right now."*

⚠️ **Two live issues.**
1. **The record is wrong and should be corrected.** The site is on **Cloudflare
   Workers**, not AWS — Workers Builds, Workers Paid, R2, opennextjs, all logged
   Jul 23. Derrick even says *"we're about to get into what **R2 buckets** are"*
   two minutes later, which is Cloudflare. Real monthly cost is **~$5 Workers
   Paid + Supabase + Resend + domain**, not $750. Justin is budget-conscious and
   will eventually need the true number for his P&L. Correct it casually in the
   next update.
2. **The $10/month hosting fee was never actually answered.** It got joked past
   and the conversation moved to "invest in your future." **Open commercial
   item:** is there a monthly hosting/maintenance charge, and who carries
   Workers/Supabase/Resend/domain? Today Derrick appears to be absorbing them.

**Line 642 — ⭐ the traffic target.** *"all I know is I got to send **8,000 people
to this website a month**."* That is Justin's own KPI, unprompted. Comfortably
inside Workers' capacity, so no cost risk — but it makes the GA4 build and the
perf budget matter, and it's the number every future report should be measured
against.

**Lines 650–657, 1:15:32 — host vs database vs CDN, explained.** Educational, no
action, except: **Justin asks good infrastructure questions and clearly values
plain-language answers.** Keep writing client updates that way — it's working.

**Lines 659–669, 1:18:11 — ⭐ the analytics commitment.** Justin: *"what does it
look like for reporting on the back end, more so for the **website owner** —
seeing the traffic, seeing the click-through rates?"* Derrick: *"I already built
it out"* — then describes what's still in progress:

> *"how many people are **filling out forms and then abandoning it**? How many
> people are coming and **clicking on certain buttons and then going to a page
> and then immediately leaving**? So it's not just they came to the site and then
> they left. It's **they came, they did this, they did this, in this order, and
> then they left.**"*

⚠️ **This is a commitment beyond what's on TODO.md.** The existing GA4 item
covers retention, key events, channel groups and the IP filter. This promises
**form-abandonment and path/funnel analysis** — and note the existing item says
*"form-interactions OFF"*, which contradicts it.

**Reconciliation (they're compatible):** GA4's automatic form_start/form_submit
is noisy and unreliable, which is exactly why it's off. The right build is
**custom events on our own forms** — we already have `lib/analytics.ts` with
`track()`. Plan: `form_start` / `form_abandon` / `cta_click` as explicit events,
then **Path exploration + Funnel exploration** in GA4 for the reporting half.
And since Justin asked specifically about reporting *for the owner*, a
**Looker Studio dashboard** he can open himself is the honest answer to his
question.

**Line 669, 1:20:30 — email authentication.** *"I registered your business with
Google spam servers, DKIM and SPF… it takes about 48 to 72 hours."*
✅ **Done and verified** — SPF fixed, 2048-bit DKIM added, Start-authentication
clicked (`TODO.md`, Jul 23). The 48–72h window has elapsed and it passed. Good
line for the next client update.

**Line 669, 1:21:00 — ⭐ branded marketing email templates, promised.** Derrick
shows a template he built for **Love Candy** (a DC pralines brand) — images,
storytelling, brand colours, brand fonts, buttons that look like commerce but
aren't — and says: *"I built that server out for you with the expectation that
you're going to want to send out stylized emails in the future. So that's set up
too."*

🟠 **New roadmap item.** `lib/emails.ts` covers transactional (confirm,
notification). **Marketing-grade branded templates do not exist.**
⚠️ And they trigger a legal dependency: marketing email requires a **physical
mailing address** in the footer (CAN-SPAM). That's already on Justin's list —
it's now blocking a promised deliverable, so it moves up.

**Lines 671–689, 1:22:54 — ⭐⭐ Kit, and the list-fragmentation problem.**
Justin: *"I just sent out a couple of emails this past week and some change
through **Kit**."* Derrick: *"Do you want to hook up your Kit to this so people
can sign up for a newsletter?"* Justin: *"**Kit's got a dope API.**"* Derrick:
*"I can hit the API if you want."* Justin: *"…**Let's pin that one for a
second.**"* Derrick: *"Let's get the site built first."* Justin: *"**We'll do the
Kit last.**"*

⚠️ **I'd push back on "last," and here's why.** Justin's real, active list is in
Kit and he's already sending from it. Our shipped Founder Digest form writes to
**Supabase + a Resend audience** (Phase 3, human-verified Jul 24). **From today
those are two diverging lists**, and every new signup lands somewhere Justin
doesn't send from. Meanwhile Luma holds the registrants. Three lists, one
audience.

**Recommendation: dual-write before Aug 10, not after.** Keep Supabase as source
of truth, and on confirmation mirror the subscriber into **Kit** via its v4 API
(subscriber + tag) alongside or instead of the Resend audience. Roughly an hour
of work. Doing it after the summit means reconciling opt-in state and tags by
hand across a list that just tripled. **This is the single cheapest thing on the
list with the largest downside if skipped.**

### 3.9 · Close-out (lines 689–752, 1:23:41–1:28:26)

| Lines | Time | Content | Disposition |
|---|---|---|---|
| 689–694 | 1:23:41 | **Justin comps Derrick a Mastermind seat** for the next cohort. Derrick: *"The class you put on at the MIC changed the way I think about business as a whole. I feel like I should be doing a damn testimonial video for you."* | Log as a business/relationship fact. ⭐ **Derrick is a genuine testimonial source and offered one.** |
| 696–706 | 1:24:35 | **MIC video testimonial shoot.** Justin needs it for work — *"we need more testimony"* — with an on-site videographer *"because it's an EDA thing. They want to look a certain way."* Needs Derrick's availability against the videographer's slots. | 🟠 **Mutual action.** Justin owes slots, Derrick owes availability. Not a website item, but a real calendar commitment. ⭐ **Ask whether the footage can be reused as a Ventriq testimonial** — Derrick already volunteered one. |
| 708–715 | 1:25:24 | **⭐ Justin's commitment:** *"updated copy for the website on mainly the **summit page** and also the **speaker graphics and their bios**… That's going to be my priority to get to you **like in the next 24, 48 hours**."* | 🔴 **DUE JUL 24–25. FIVE DAYS OVERDUE.** The #1 item in §0. |
| 717–727 | 1:26:22 | Derrick reads from *"a whole file on my computer called **to-do list for Justin**"* — workspace, ventriq.com, then: *"Is it $89 or $99?"* → *"**I like $99. Everything else is premium.**"* | ✅ **D18 — resolved.** Kills the `$[89–99]` token and the `[PRICE — confirm]` chip, and closes an open item on `TODO-JUSTIN.md`. |
| 729–740 | 1:26:49 | **LinkedIn.** *"I'm nervous to claim it because it's going to be attached to my LinkedIn, and **my work likes to snoop around**."* Derrick: *"have one of your friends just hold it."* Justin: *"I could do that. I'm going to give my [partner] to do that."* | ✅ **Solved via delegation.** Update Justin's list with the *why* and the workaround. Re-confirms **C1**. |
| 742–743 | 1:27:34 | *"I'm going to put together an email, **not tonight, but tomorrow**, and I'll send it over to you just with the stuff that I need. So that way, when memory fails, both of us, it can be in one spot."* | 🔴 **DERRICK OWED THIS JUL 24.** Item 2 in §0. `TODO-JUSTIN.md` is effectively the content already; the `client-email-voice` skill is the tool. |
| 745–752 | 1:27:57 | **Granola.** *"I'm using Granola for the first time… And it integrates with Claude."* — and earlier, at 21:51: *"**I have my Granola recording this. That way you can have it as reference too.**"* | ⭐ **An explicit, unclaimed offer.** Justin's own AI notes will capture what he committed to in his own words, where Fathom garbled it. **Ask him to forward the Granola notes** — near-zero cost, high value, and it gives him a reason to reply. |
| 752 | 1:28:26 | Sign-off | No action. |

---

## §4 · Collisions with what's already shipped (grep-verified, Jul 28)

### 4.1 · D1 — "nonprofit" → "mission-driven"

**Change (Ventriq describing itself):**

| File:line | Text |
|---|---|
| `app/layout.tsx:19` | meta description — "A nonprofit backing…" |
| `app/page.tsx:19` | meta description (same string) |
| `app/page.tsx:33` | **JSON-LD** `Organization.description` — "A Baltimore-rooted nonprofit…" |
| `app/page.tsx:137` | hero eyebrow — "ven-treek · a nonprofit for founders" (also **D2**) |
| `app/mastermind/page.tsx:272` | FAQ — "Ventriq now runs it as a nonprofit program" |
| `app/founders-after-hours/page.tsx:280` | FAQ — "Who runs it? Ventriq — a nonprofit." |
| `app/about/page.tsx:10, 207, 251` | dying with **D21**, but the copy deck lives on |
| `components/footer.tsx:18` | mission line |
| `components/footer.tsx:58` | **legal line** — "© 2026 Ventriq. A nonprofit organization." → **drop the descriptor entirely** |
| `docs/copy/00-global.md:27,34` · `01-home.md:4,13` · `03-…:98` · `04-…:93` · `05-about.md:4,30,43` · `06-donate.md` (parked) | copy decks |
| `docs/build-handoff/copy-source/` mirrors of the above | |
| `docs/build-handoff/copy-source/ventriq-design-system-brief.md:7` | |

**Do NOT change (describes the audience):** `app/page.tsx:143` "nonprofits doing
the real work" · `app/page.tsx:292` Margo B.'s quote · `app/summit/page.tsx:321`
"Nonprofit builders" · `docs/copy/01-home.md:15,71`.

### 4.2 · D2 — `ven-TREEK`
`app/page.tsx:137` · `components/footer.tsx:18` · `app/about/page.tsx:121,232`
(dying) · `docs/copy/00-global.md:27` · `01-home.md:13` · `05-about.md:4,13,37`
· copy-source mirrors · `skill-ventriq-voice.md:48` (skill reference — update
the note, since it currently instructs future copy to use it).

### 4.3 · D4 — the carousel replaces `ConvergenceDiagram`
`app/page.tsx:236–252`. Diagram survives only at `app/mastermind/page.tsx:37`.
See §3.3 for the design consequence and three options.

### 4.4 · D14 — pricing on `/summit`
`app/summit/page.tsx:103` ("Membership from $39/month") · `:142` (FAQ) · `:212`
(step 3). ⚠️ **`:145` breaks when prices go** — *"its price is on the label"*
becomes meaningless. Rewrite with **D15** in the same pass.

### 4.5 · D12 — flip-card a11y
Nothing exists yet — no `dialog`, `modal`, `flip` or carousel code in the repo.
Greenfield, so build it right the first time: button semantics, `aria-expanded`,
reduced-motion cross-fade, mobile sheet instead of flip. We are at **100/100
accessibility on every page** and `e2e/a11y.spec.ts` will catch a regression.

### 4.6 · Zoom hardcodes (pending §3.4)
`app/summit/page.tsx:13, 32, 134, 146, 400` · `app/mastermind/page.tsx:145`.
Plus the Event JSON-LD virtual location and the Luma fix on Justin's list.

### 4.7 · D21 — the About page blast radius

1. `app/about/page.tsx` — delete
2. `components/nav.tsx:13` — remove (**and add Contact**, per 15:55)
3. `components/footer.tsx:27` — remove
4. `app/page.tsx:271` — "Read Justin's story →" (also dies under **D5**)
5. `app/summit/page.tsx:349` — "Read the full story →" (also dies under **D13**)
6. **`app/sitemap.ts:16`** — remove the `/about` entry ⚠️
7. **`e2e/a11y.spec.ts:14`** — remove from `ROUTES` or the suite fails ⚠️
8. **`public/og/about.png`** + its generator entry — remove
9. **Serve a `301` to `/`, not a 404** — the page is live and may be crawled.
   Good news: `TODO.md`'s indexing plan only submits `/` and `/summit`.
10. `docs/copy/05-about.md` → rename to `05-about-PARKED.md`, matching the
    existing `06-donate-PARKED.md` convention.

---

## §5 · The build plan, in Derrick's agreed order (1:10:23)

### Phase A — copy changes we already have (unblocked, today)

Nothing here needs Justin. Roughly a day's work, all of it on live inaccuracies.

**A1 · `/summit` first — it is the client's stated priority.**
1. Delete the "about a minute, free" microcopy (**D8**) — `:130`
2. Add `<h2>Who is this for?</h2>` (**D10**) — `:316`
3. CTA → "Save your free virtual seat" (**D9**) — `:129`, `:398`, `app/page.tsx:206`
4. Rewrite "Will I be pitched?" honestly (**D15**) — `:145`
5. Strip pricing (**D14**) — `:103`, `:142`, `:212`
6. Genericize Zoom → "live online" (§3.4) — `:13, 32, 134, 146, 400`
7. Add a register CTA after the agenda — the decision point (**D13b**)
8. ⚠️ Verify the "Thirty-plus speakers" claim against 14–15 secured (§3.1)

**A2 · Site-wide accuracy**
9. "nonprofit" → "mission-driven" (**D1**) — full inventory §4.1
10. Remove `ven-TREEK` (**D2**) — §4.2, after Derrick confirms the reading
11. Footer legal line — drop the entity descriptor

**A3 · `/founders-after-hours`**
12. Three pillars renamed + descriptions (**D16**) — paste-ready in §3.5
13. Run-of-show → 6:00 / 6:15 / 7:15 / 8:15, delete the `[TIMES]` chip (**D17**)
14. **$99**, delete the `[PRICE]` chip (**D18**)
15. Equal-width cards, midnight premium card (**D19**)
16. Chase the Skool URL, clear the `[SKOOL-URL]` chip

**A4 · `/mastermind`**
17. Reframe the 10KSB FAQ, drop the name (**D20d**)
18. Format spec: "90 days" → "13 weeks (about 90 days)" (**D20b**), spec row only
19. Mobile screenshot pass to find the "bunched up" section (§3.6)

**A5 · Structure**
20. Kill `/about` — all ten steps in §4.7 (**D21**)
21. **Add Contact to the nav** (15:55)
22. Hoist `MEMBERSHIP_NAME` into `lib/brand.ts` so the rename is one line (§3.5)

**A6 · Homepage**
23. Build the pain-point section (**D3**) — copy drafted §3.3, midnight ground
24. Rewrite "Why this exists" Ventriq-centric, remove the signature (**D5**)
25. Resolve the band rhythm (§3.3 table)

### Phase B — needs Justin's assets

26. Speaker face cards on agenda nights (**D11**) — *blocked: assignments*
27. Speaker flip cards (**D12**) — *blocked: headshots + bios*
28. Testimonials carousel with photos and metrics (**D4**) — *blocked*
29. Registrant excitement quotes on `/summit` (**D13a**) — *blocked*
30. Upcoming Events section (**D6**) — *blocked: filtered list*
31. Mastermind outcomes + application steps + ethos section (**D20a/c**, 12:50)
32. Manifesto rewritten out of AI voice (40:55) — **offer him a draft**
33. Homepage numerals, once **D7** unpins

### Phase C — motion and video

34. Hero video backgrounds — geometric, home + summit + FAH (7:21)
35. Countdown to Aug 10 (9:40) — **does not exist**
36. Scroll/typewriter reveal on the August dates (9:40)
37. Video in the Summit Q&A block (9:40)
38. "More colour popping" pass (1:10:23, Derrick's own note)

### Phase D — mobile last (explicitly sequenced)

39. Full mobile pass once C lands, including the mastermind crowding

### Parallel track — not in Derrick's list, but time-sensitive

40. **⭐ Send the consolidated asset email — today** (§0.2)
41. **⭐ Kit dual-write before Aug 10** (§3.8) — ~1 hour, prevents a list split
42. GA4 custom events: `form_start` / `form_abandon` / `cta_click` (§3.8)
43. Branded marketing email templates (§3.8) — *blocked: mailing address*
44. Hand Justin the UTM-tagged Summit URL for his Instagram bio (§3.7)
45. Re-plan ventriq.com against the real drop timeline (§3.1a)
46. Correct the AWS/$750 record; settle the $10/mo hosting question (§3.8)
47. Propose the attendee share-card generator (§3.4)
48. **Ask for Justin's Granola notes** — he offered them twice

---

## §6 · Blocked on Justin (the content of the overdue email)

**Critical path — promised Jul 24–25, five days late:**
1. **Speaker headshots** (raw photos, not the Instagram graphics)
2. **Speaker bios**
3. **Which speaker on which night** — blocks the agenda face cards
4. **Updated Summit copy**, including the manifesto rewrite

**Next tier:**
5. Testimonials + **data points / production numbers** + photos + **permission
   to print names and companies**
6. Filtered **public + FAH events list** for the Upcoming Events section
7. **Registrant excitement quotes** (and video, if he can get it)
8. ~~**Skool URL**~~ — *received Jul 29* (skool.com/iamjs-collective-9599) and
   **wired live same day at Derrick's direction** despite the group being
   free, "IAMJS Collective"-branded, and 1-member (concern flagged, his
   call). Justin still owes: $39/$99 tiers + name lock — tracked in TODO.md
   and 🔴 on his list, since a Skool rename now breaks a live link.
9. Mastermind: outcomes, tightened application steps, the ethos section he
   agreed to write, confirmed session day/time
10. **Mailing address** for email footers — now blocking marketing templates
11. Cancel/refund policy for the `[POLICY — confirm]` chip
12. Zoom vs StreamYard decision
13. Whether the Mastermind stays application-gated (§3.6)
14. Dates for the MIC video shoot

**Pinned, awaiting his thinking:** homepage pricing/numerals (**D7**) · the
Summit H1 (**D9b**) · the membership name (§3.5) · "We'll count it" rewrite.

---

## §7 · Facts learned

- **Ventriq is a for-profit today**; nonprofit arm targeted for **Q4 2026**;
  board, incorporation and filings all outstanding.
- **14–15 speakers secured** as of Jul 23, targeting ~21–22.
- **Justin has headshots and bios** for the secured speakers already.
- **Registrants span multiple states and some outside the US.**
- **Traffic target: 8,000 visitors/month.**
- **Skool confirmed** as the community platform.
- **FAH in-person = $99/month.**
- **Naming is provisional** — "Founders After Hours" may become the *event*
  inside a membership possibly called **"The Forge."**
- Justin runs **Kit** for email and has already sent campaigns from it.
- Justin runs **Granola** and offered his notes — twice.
- The testimonials came from the old **Opulence** / **IAMJS** sites and are real.
- **Charles** holds a Photoshop original of the logo.
- Derrick has a **comped Mastermind seat** for the next cohort.
- The MIC video shoot is an **EDA** (federal grant) reporting requirement.
- Justin's **day job constrains his public association with the brand** (**C1**).

---

## §8 · Watch-outs

1. **Aug 10 is 13 days out** and the highest-priority page is blocked on assets
   that are 5 days late.
2. **The site currently misstates the entity type.** Justin raised it himself
   as a "don't want to be misleading" issue. It should not be live another week.
3. **The "nobody's selling you" FAQ will be contradicted on night one.**
4. **Three email lists are diverging** — Kit, Resend, Luma — starting today.
5. **A post-launch rename** of Founders After Hours would cost the SEO we're
   about to build. Push for the decision before Aug 10.
6. **Click-to-buy on the Mastermind** would contradict the page's entire
   argument. Don't build it on the strength of a "may."
7. **A flip card built carelessly loses the 100/100 a11y score** we just earned.
8. **The $10/mo hosting question is unanswered**, and the client believes
   hosting costs $750/mo on AWS.
9. **Removing `ConvergenceDiagram`** removes the brand's signature gesture from
   the homepage. Decide deliberately.
10. **Justin's bandwidth is the bottleneck** (**C2**). Every ask should arrive
    pre-drafted for approval rather than as a blank page.

---

## §9 · Record corrections

**9.1 · Hosting is Cloudflare, not AWS.** Stated three times on the call (the
$750 figure, "my MX… I do that through AWS too"). Actual: Cloudflare Workers +
Workers Builds + R2; email via **Resend**; database **Supabase**. Real cost is
roughly **$5/mo Workers Paid** plus service tiers. Correct it casually — Justin
is budget-conscious and will need the true number.

**9.2 · The auth/membership system is not built yet.** Derrick told Justin at
1:01:11 that *"there's an entire authentication and membership system built into
this website right now already… the data structures for these things exist."*

**Verified against the repo, Jul 28:** the only migration is
`supabase/migrations/20260723180000_forms.sql`, containing exactly three tables —
`newsletter_signups`, `contact_messages`, `chapter_interest`. `lib/supabase-admin.ts`
is a secret-key server client for those forms. There is **no auth, no roles or
tiers, no membership schema, no leaderboard**.

**The defensible version of the claim:** Supabase was chosen *precisely so* this
is later a schema-and-config job rather than a rebuild — `@supabase/ssr` is
already a dependency, and Supabase Auth handles password hashing as a platform
service. That's a real architectural head start. But it is a head start, not a
built system, and the gap should be closed before Justin asks to switch the
leaderboard on.

**9.3 · The ventriq.com drop timeline.** See §3.1a — "available at midnight" is
not how gTLD expiry works, and Justin was told to watch the wrong date.

---

## §10 · Quote bank — ⚠️ verify audio before any public use

Fathom mangled this transcript badly. Confirmed corruptions: **"Ventric" /
"Ventrix"** for Ventriq throughout · **"Alex Romali"** → Hormozi · **"goal
fish"** → goldfish · **"normal noodles"** → numerals · **"Tanks gets bigger and
advantages get priced"** → *"the stages get bigger and the badges get pricier"* ·
**"my granola"** → Granola · **"a rum now"** → *"a room now"* · **"paper
chasers"** (1:02:34) → unclear.

Speaker attribution is interleaved at **26:16**, **30:51**, **50:58** and
**1:00:12** — in each case the question and answer are assigned to the wrong
people. **The 50:58 flip-card exchange and the 21:23 pronunciation exchange are
both load-bearing decisions sitting on garbled lines.** Confirm with Derrick
before executing **D2** and **D12**.

Quotes worth using once verified:
- *"we are forging the future by ensuring that the founders are forging
  themselves into executives"* (23:00) — the mission line, in his own words
- *"no matter who you are, you suck at a couple of these"* (25:46) — Derrick's,
  but Justin endorsed it; strong pain-point copy
- *"If you're still hearing it, it's not enough."* (39:14)
- *"This is my first time building a brand without a face."* (31:18)
- *"The work you've been putting off has a room now."* (1:02:34) — already live
