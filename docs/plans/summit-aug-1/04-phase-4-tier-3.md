# Phase 4 — Tier 3: drop-in copy replacements

**Justin's framing:** *"Drop-in copy replacements — no engineering required.
Fourteen copy blocks, all written and final. Sections 2, 4, 5, 6, 7, 9, 10,
11, 12, 13, 14, 15."*
**When:** by Aug 1 · **Status:** 🟨 **13 of 14 built Jul 29 — 1 deliberately held**

> ## Build notes — Jul 29
>
> **§05b (the ambassador prompt) is HELD, not skipped.** This file's own
> instruction: *"Test the field before shipping the prompt — driving people to
> a field that silently drops data is worse than not asking."* The Luma
> referral-field test ([T2·3](./03-phase-3-tier-2.md)) has never been run, so
> shipping *"Referred by someone? Add their name on the registration form"*
> would actively invite people to fill in a field we cannot confirm works, and
> the failure would be silent. **Ship it the moment the field is verified** —
> it's a one-line addition under step 1.
>
> **O5 taken: step 3 is titled "The room stays open."** The brief's recommended
> option, over "Keep building." / "After the eighth night." / "What happens
> next." Same reasoning as O4 — one string, reversible, and the brief argues it
> *"keeps the original idea, reads more elevated, and implies continuation
> rather than possession."*
>
> **`CountUp` gained a `suffix` prop** for `17+`. `$0` uses the existing
> `prefix` and has nothing to animate toward, so it renders statically — which
> is the right behaviour for a zero.
>
> **Three things fixed that the brief doesn't cover** (`[OURS]`):
> the third `$39` in the post-summit hero state (`:103`) — invisible until
> Aug 20, but it would have contradicted the two the brief does strip on the
> exact day the summit ends; the homepage sponsor block's identical
> "underwritten … foundations" language, outside the brief's summit-only scope;
> and the missing `<h2>` on "Who is this for?", which the brief omits because
> it addresses copy rather than structure.
>
> **O1 held to its scope.** *entrepreneurs* now appears in exactly the places
> the brief wrote it — the audience block, the hero trust line, the footer, and
> the sponsor reframe. It was **not** extended to the FAQ, the step copy, or
> "Founders After Hours". The hero deliberately says *founders* two lines above
> a trust line saying *entrepreneurs*; that inconsistency is the brief's own
> and is what O1 is about.
**Prev:** [`03-phase-3-tier-2.md`](./03-phase-3-tier-2.md) ·
**Next:** [`05-phase-5-tier-4.md`](./05-phase-5-tier-4.md) ·
**Index:** [`00-README.md`](./00-README.md)

> **COPY IS LAW.** Every gold box below is final. Paste it verbatim — em
> dashes, punctuation, capitalisation, all of it. Do not improve, do not
> paraphrase, do not "fix". The brief's own words: *"Every copy replacement
> below is final and drop-in ready. Nothing here requires a writing pass."* And
> its closing line: *"Anything unclear, ask before improvising: on this page a
> small wording change carries further than it looks."*

Ordered by brief section number, as he wrote them.

`[OURS]` **§03 is included below but is absent from Justin's Tier 3 section
list.** It carries a clear copy replacement and no engineering, so it belongs
here; flagging the omission rather than silently reclassifying it.

---

## §02 — Hero
`3 copy blocks` · the fourth hero item (VIRTUAL display line) is structural — [Phase 3 T2·5](./03-phase-3-tier-2.md)

### 02a — Registration microcopy
tag: **`JUSTIN`** · **Locator:** `app/summit/page.tsx:130` · grep anchor: `about a minute, free`

- [ ] Replace

`CURRENTLY ON THE PAGE`
> *"Registration runs on Luma — about a minute, free."*

`REPLACE WITH`
> **"Free. Registration runs on Luma — your seat and calendar invite arrive together."**

Brief's note: *"Keep the Luma name. It signals a real event with real
infrastructure rather than a form on a landing page."*

⚠️ **Supersedes the Jul 23 call**, which decided to *delete* this line
outright ([design brief D8](../../design/07-23-2026-design-change-brief.md)) —
Justin had read it aloud and found it broken, and Derrick admitted it was one
of his own working notes that shipped by accident. **The brief replaces rather
than deletes**, and its reason is sound: deleting loses the Luma trust signal.
Brief wins (Phase 1 §3.4).

### 02b — Add an audience line beneath the subhead
tag: **`COPY AUDIT`** · **Locator:** after `app/summit/page.tsx:125–127` · grep anchor: `Each one pointed at something`

- [ ] Add

`ADD BENEATH THE SUBHEAD`
> **"Built for founders who are past the idea and into the work."**

Brief: *"Not just education. Implementation. is a strong brand line and should
stay as the H1. But **a cold visitor arriving from an Instagram link
self-identifies in under two seconds or leaves.**"*

⚠️ Uses *founders*. The footer replacement in §15 uses *entrepreneurs*. Both
are the brief's own wording — the inconsistency is real and is exactly what
**[O1](./01-phase-1-research.md#8--open-questions--do-not-resolve-these-alone)**
is about. Ship as written; do not harmonise.

### 02c — Add a trust line beneath the CTA
tag: **`COPY AUDIT`** · **Locator:** after `app/summit/page.tsx:128–131` · grep anchor: `LumaRegisterButton ctaLocation="summit-hero"`

- [ ] Add

`ADD BENEATH THE CTA`
> **"Built by Ventriq — equipping entrepreneurs with capital, programming, and council."**

Brief: *"Ventriq is only identified in the footer. **By the time a reader
reaches the footer the decision is already made.**"*

⚠️ Same O1 tension — *entrepreneurs* here, *founders* two lines above.

---

## §03 — Statistic strip
`[OURS] — not in Justin's Tier 3 list` · tag: **`COPY AUDIT`**

**Locator:** `app/summit/page.tsx:184` · grep anchor: `[[8, "nights"], [8, "sessions"]`

- [ ] Replace the four stat slots

`CURRENTLY ON THE PAGE`
> *"8 nights · 8 sessions · 90 minutes a night · 2 weeks"*

`REPLACE WITH`
> **"8 nights · 17+ operators · 90 minutes a night · $0"**

Brief: *"8 nights and 8 sessions are the same fact stated twice — **one of four
slots is saying nothing new.** Leading with roster size and closing on zero
cost does considerably more work."*

⚠️ **Two build notes.** The band renders through `<CountUp>`, which animates a
number — `17+` and `$0` are not bare integers. Either extend `CountUp` to
accept a prefix/suffix or render those two statically. And `17+` must stay in
sync with the speaker-count correction in
[Phase 2 T1·5](./02-phase-2-tier-1.md).

---

## §04 — Countdown block (the manifesto)
`1 copy block` · tag: **`JUSTIN`**

**Locator:** `app/summit/page.tsx:199` · grep anchor: `Every August, the stages get bigger`

- [ ] Replace the `ScrollLit` text

`CURRENTLY ON THE PAGE`
> *"Every August, the stages get bigger and the badges get pricier. This is the
> other thing. Eight nights in the summer. Ninety minutes at a time. People
> who've built, telling you exactly how — and a room that keeps the receipts.
> The resources are out there. For two weeks, they're not camouflaged."*

`REPLACE WITH`
> **"This is the first one. Eight nights, ninety minutes each, across every
> unit of the business you're building — brand, influence, sales, marketing and
> PR, technology, capital, and the exit you haven't thought about yet. You won't
> sit and take notes. You'll work on your own business in real time, in the
> room, with the people who've already done it."**

Brief's note: *"Note on what was removed: the bigger stages, pricier badges
framing has been cut here because **the same idea is reused in the National
Black Business Month block in Section 11. Stating it twice weakens both.**
Section 11 is the stronger home for it."*

✅ **This resolves a Jul 23 complaint.** Justin read this exact paragraph on the
call and said *"we can both read that this came straight from chat… we'll clean
it up to make the brand voice more humanistic"*
([design brief §4.3](../../design/07-23-2026-design-change-brief.md)). He has
now done it himself. **No rewrite pass needed from us.**

⚠️ **Build note:** the string is a JS literal with escaped unicode
(`’`, `—`) passed to `<ScrollLit text={...}>`, which splits on words
for the scroll-lighting effect. Keep the escaping convention and re-check the
effect at the new length — it is ~15% longer.

`[OURS]` **The section is *called* the countdown block but contains no
countdown.** See [Phase 5 T4·4](./05-phase-5-tier-4.md).

---

## §05 — How it works, Step 1
`2 copy blocks` · title **"Save your free seat."** stays

### 05a — New description
tag: **`JUSTIN`** · **Locator:** `app/summit/page.tsx:210` · grep anchor: `Takes a minute on Luma`

- [ ] Replace

`CURRENTLY ON THE PAGE`
> *"Takes a minute on Luma. Your confirmation email carries the calendar
> invite; add it before you forget."*

`REPLACE WITH`
> **"Free registration on Luma. Your confirmation arrives with the calendar
> invite attached — add it, and you're locked in for every night you choose."**

### 05b — Ambassador prompt
tag: **`COPY AUDIT`** · **Locator:** new line under the step

- [ ] ⛔ **HELD — do not ship until the Luma referral field is verified**

`ADD BENEATH THE STEP, SET SMALL`
> **"Referred by someone? Add their name on the registration form."**

🔴 **This is the only Phase 4 item not shipped, and it is held on purpose.**
The referral field has never been tested end to end
([T2·3](./03-phase-3-tier-2.md)). Shipping this line would send people to a
field we cannot confirm captures anything, and the brief itself says the
failure *"will not announce itself."* Asking for data we then lose is worse
than not asking. **Unblock: run one real registration, confirm the name appears
in the Luma export, then add this line.** One-line change.

Brief: *"**The entire referral attribution model depends on registrants filling
in the referral-name field on the Luma form, and nothing on the page currently
tells anyone to do it.** One small line recovers the data."*

⚠️ **Test the field before shipping the prompt** — [Phase 3 T2·3](./03-phase-3-tier-2.md).
Driving people to a field that silently drops data is worse than not asking.

---

## §06 — How it works, Step 2
`1 copy block` · title **"Show up live."** stays · tag: **`JUSTIN`**

**Locator:** `app/summit/page.tsx:211` · grep anchor: `Seventy percent teaching`

- [ ] Replace

`CURRENTLY ON THE PAGE`
> *"Monday through Thursday nights, 6:30–8:00 PM ET, for two weeks. Seventy
> percent teaching, thirty percent your questions. Then Friday through Sunday —
> go build with it."*

`REPLACE WITH`
> **"Monday through Thursday, 6:30–8:00 PM ET. Choose your nights when you
> register — all eight, or only the ones your business needs. Every session is
> live and worked, not watched: exercises, breakouts, and real questions
> answered in the room."**

Brief's note: *"**This opt-in message is mirrored in two more places by
design** — beneath the schedule in Section 9 and in the FAQ in Section 12. A
reader who is stretched too thin needs to hear it more than once before it
registers as permission."*

⚠️ **"Seventy percent teaching, thirty percent" is retired.** It also appears
in the FAQ (`app/summit/page.tsx:145`) — but that whole FAQ entry is being
removed in §12a below, so it resolves there. Don't leave one instance behind.

---

## §07 — How it works, Step 3
`2 copy blocks` · tag: **`JUSTIN`**

### 07a — New section title
**Locator:** `app/summit/page.tsx:212` · grep anchor: `Keep the room.`

- [ ] Replace

`CURRENTLY ON THE PAGE`
> *"Keep the room."*

`REPLACE WITH — RECOMMENDED`
> **"The room stays open."**

`ALTERNATES`
> **"Keep building."** · **"After the eighth night."** · **"What happens next."**

Brief's note: *"The room stays open keeps the original idea, reads more
elevated, and implies continuation rather than possession."*

⚠️ **[O5](./01-phase-1-research.md#8--open-questions--do-not-resolve-these-alone) — Derrick's call.** Recommended option and all three alternates are
above. Not resolved here.

### 07b — Remove the membership price point
**Locator:** `app/summit/page.tsx:212` · grep anchor: `Membership from $39/month`

- [ ] Replace

`CURRENTLY ON THE PAGE`
> *"Founders After Hours holds every replay 24 hours after each session, along
> with speaker office hours and the founders you met in the chat. Membership
> from $39/month."*

`REPLACE WITH`
> **"Every session replays inside Founders After Hours 24 hours later — along
> with speaker office hours, and the founders you met in the chat. It's where
> two weeks turns into a practice."**

Brief: *"**If pricing comes off here it must come off there too, or the page
contradicts itself within one scroll.**"* The FAQ instance is §12b below.

⚠️ **Third `$39` instance** on this page at `:103` (the post-summit hero state,
grep anchor `Membership from $39/month`) — the brief doesn't mention it because
it only renders after Aug 20. **Strip it in the same pass** or it contradicts
the others the day the summit ends.

⚠️ **This copy says "Founders After Hours" (plural).** Per Phase 1 §6, the
membership is being renamed **The Foundry** with FAH demoted to a monthly
event, and the one-pager writes it **singular**. Justin wrote this brief on the
same day as the one-pager and still used the current plural name — consistent
with the Night-1 reveal theory. **Ship it as written**;
[O10/O11](./01-phase-1-research.md#8--open-questions--do-not-resolve-these-alone)
govern when and whether it changes.

---

## §09 — "Two weeks, mapped"
`copy for this section lives with the structural work` — [Phase 3 T2·4](./03-phase-3-tier-2.md) (schedule line, button, microcopy) and [T2·6](./03-phase-3-tier-2.md) (discipline tags)

- [ ] **Leave the Aug 14–16 break line exactly as it is** · tag: **`COPY AUDIT`**

**Locator:** `app/summit/page.tsx:302` · grep anchor: `off — go build`

Brief: *"aug 14–16 · off — go build is **the clearest signal on the page that
this was designed by someone who runs a business.** No change."*

Recorded so nobody tidies it away during the surrounding edits.

---

## §10 — "Who this is for"
`1 copy block, replacing three lines` · tag: **`JUSTIN`**

**Locator:** `app/summit/page.tsx:318–321` · grep anchor: `Small business owners`

- [ ] Replace all three audience rows

`CURRENTLY ON THE PAGE`
> *"Small business owners past the idea stage … Startup founders from first
> traction to first raise … Nonprofit builders who run their organization like
> founders, because they are."*

`REPLACE ALL THREE LINES`
> **"Idea-stage entrepreneurs** — you have the vision and the nerve. What's
> missing is the blueprint, and the conviction to start before it's perfect.
>
> **Early-stage entrepreneurs** — zero to three years in, revenue coming
> through the door, and every system in the business still running through you.
>
> **Scaling entrepreneurs** — the thing works. Now the questions are capital,
> leverage, and what this becomes when you're not the one holding it up."

`CLOSING LINE — UNCHANGED`
> **"If you're serious, you belong here."**

⚠️ **"Nonprofit builders" is cut here for a different reason than the Tier 1
nonprofit sweep.** Tier 1 removes Ventriq *describing itself* as a nonprofit;
this removes a nonprofit *audience tier*. Both land, but don't conflate them —
and note the Phase 2 caution about not blanket-replacing "nonprofit" no longer
protects this line.

⚠️ **This section still needs its heading.** It currently has **no visible
`<h2>` at all** — a Jul 23 finding
([design brief §4.6](../../design/07-23-2026-design-change-brief.md), Justin:
*"I will probably put like large header saying 'who is this for?'"*). The brief
doesn't mention it because it's addressing the copy, not the structure.
**Add the heading in the same pass** — it also closes a heading-outline gap.

⚠️ **[O1](./01-phase-1-research.md#8--open-questions--do-not-resolve-these-alone) lives here.** The brief: *"The word founders appears roughly a dozen more
times across the page: hero, FAQ, Founders After Hours, footer. **The swap to
entrepreneurs was scoped to this block only, and that is how it is written
above.** The recommendation is to hold it there — Founders After Hours locks
the word into the brand, so a global swap would create a fresh inconsistency
while fixing an intentional one. **Flagged rather than decided.**"*

**Do not extend *entrepreneurs* beyond this block** (and the two hero/footer
lines the brief itself wrote that way). See also
[O14](./01-phase-1-research.md#8--open-questions--do-not-resolve-these-alone) —
the "Founders After Hours locks the word" argument expires if the membership is
renamed on Aug 10.

---

## §11 — National Black Business Month block
`1 copy block + 1 removal` · tag: **`JUSTIN`**

**Locator:** `app/summit/page.tsx:339–350` · grep anchor: `August is National Black Business Month`

- [ ] Replace the paragraph

`CURRENTLY ON THE PAGE`
> *"August is National Black Business Month, and every fall the big conferences
> arrive with big stages and bigger badges. This is the other thing: eight
> nights in the summer, ninety minutes at a time, where the point isn't who's in
> the room — it's what you do when you leave it. That's the whole Ventriq idea,
> in miniature."*

`REPLACE WITH`
> **"August is National Black Business Month. Most of what that means arrives
> as a conference — a flight, a hotel, a badge, and three days away from the
> business you're supposed to be building. This is the other thing. Ninety
> minutes a night, from the beach, the office, or the edge of your bed. Eight
> small deliberate moves instead of one big weekend. Come September, you won't
> have a lanyard. You'll have momentum."**

`ATTRIBUTION — UNCHANGED`
> **"— Justin Shaw"**

- [ ] **Remove the "Read the full story →" link**

**Locator:** `app/summit/page.tsx:349` · grep anchor: `Read the full story`

Brief: *"It leads nowhere useful, and the block is stronger ending on the
attribution. **A closing thought from the founder should not hand off to
another page.**"*

✅ **Two agreements with the Jul 23 call.** The link dies anyway when `/about`
is deleted ([design brief D21](../../design/07-23-2026-design-change-brief.md)).

⚠️ **But the brief KEEPS Justin's byline here**, where the Jul 23 call decided
to pull his name back sitewide (§1.7, "brand without a face"). **The brief
wins for this block** — his name stays on exactly one attributed quote, and
removing the outbound link makes it land harder. The principle still governs
everywhere else (Phase 1 §3.4).

⚠️ **Conflicts with the Jul 23 plan to replace this whole block** with
registrant excitement quotes
([design brief §4.7](../../design/07-23-2026-design-change-brief.md), Justin:
*"instead of this part…"*). The brief rewrites it instead of replacing it.
**Brief wins for Aug 1** — and the registrant quotes are blocked on assets
anyway. Revisit after launch.

---

## §12 — "Questions, answered"
`3 copy blocks + 1 correction` · **Locator:** `app/summit/page.tsx:140–149` (the `FAQ` array)

### 12a — Remove "Will I be pitched?" and replace the slot
tag: **`JUSTIN`** · grep anchor: `Will I be pitched?`

- [ ] Replace the entry

Brief: *"The objection exists in the reader's head whether or not the page
addresses it. The move is to **retire the defensive framing and use the slot
for a higher-value question** — which is very likely the single biggest unasked
objection blocking registrations from busy operators."*

`NEW QUESTION AND ANSWER`
> **Q: "Do I have to attend all eight nights?"**
>
> **A: "No. Choose your sessions when you register — one night, four, or all
> eight. Most founders come for the nights that map to what they're solving
> right now, then stay for the ones they didn't expect to need."**

⚠️ **Supersedes the Jul 23 call**, which decided to *rewrite* this answer
honestly ([design brief D15](../../design/07-23-2026-design-change-brief.md))
because the live copy — *"Nobody's selling you a course at the end"* —
contradicts Justin's stated plan to pitch softly every night. **The brief
removes the question entirely**, which solves the credibility problem more
cleanly. Brief wins (Phase 1 §3.4).

### 12b — Rewrite "What if I can't make a session live?"
tag: **`COPY AUDIT`** · grep anchor: `Every replay lands in Founders After Hours`

- [ ] Replace

Brief: *"**As written, the answer to what if I miss one is pay thirty-nine
dollars a month.** That is the wrong note in a free-event FAQ, and it now
contradicts the pricing removal in Section 7."*

`CURRENTLY ON THE PAGE`
> *"Every replay lands in Founders After Hours 24 hours after the session —
> that's the membership community, from $39/month. The live seat is the free
> one; save it and show up."*

`REPLACE WITH`
> **"Every replay lands in Founders After Hours 24 hours later — that's
> Ventriq's working community, where the summit keeps going. The live seat is
> the free one, and it's where the real work happens. Save it and show up."**

### 12c — Correct the speaker answer
tag: **`COPY AUDIT`** · grep anchor: `Thirty-plus of them`

- [ ] Thirty-plus → seventeen-plus; `ANNOUNCE-DATE` resolves or the sentence comes out

Both halves are **Tier 1** — see [Phase 2 T1·5](./02-phase-2-tier-1.md) and
[T1·2](./02-phase-2-tier-1.md). Listed here so the FAQ pass doesn't miss it.

### 12d — Add a timezone question
tag: **`COPY AUDIT`**

- [ ] Add

Brief: *"National audience, 6:30 PM Eastern start. That is 3:30 in the
afternoon on the West Coast — a real conflict for anyone with a day job, and
**a question that will otherwise arrive by email eighty times.**"*

`NEW QUESTION AND ANSWER`
> **Q: "What time is this in my zone?"**
>
> **A: "6:30–8:00 PM ET each night — so 5:30 CT, 4:30 MT, 3:30 PT. The calendar
> invite in your confirmation will convert it for you automatically."**

✅ **Corroborated independently.** Justin confirmed on the Jul 23 call that
registrants span *"multiple different states. And some people out the
country"* — the design brief records this as constraint **C4**.

---

## §13 — Sponsor block
`1 copy block` · tag: **`JUSTIN`** · the *move* is [Phase 3 T2·7](./03-phase-3-tier-2.md)

**Locator:** `app/summit/page.tsx:360–363` · grep anchor: `can be underwritten by companies`

- [ ] Replace

`CURRENTLY ON THE PAGE`
> *"Summit sessions can be underwritten by companies and foundations that want
> to reach serious founders — visibly and usefully."*

`REPLACE WITH`
> **"Summit sessions can be sponsored by companies and organizations that want
> to reach serious entrepreneurs — visibly and usefully."**

Brief: *"**This matters more than the wording.** Underwritten and foundations
both signal philanthropic giving, and **a foundation grant to a for-profit
entity is a different and considerably harder transaction than a
sponsorship.** Reframe it as what it now is: commercial exposure."*

Brief's note: *"No tax-deductibility language anywhere on the site, including
the sponsor and contact pages."*

⚠️ **This is the "no grant framing" clause from Tier 1** landing in specific
copy — see [Phase 2 T1·3](./02-phase-2-tier-1.md). The homepage sponsor
section (`app/page.tsx:320–323`, grep anchor `underwritten by companies`)
carries the same language and is **not** covered by the brief's summit-only
scope. `[OURS]` — sweep it too.

---

## §14 — Final call to action
`1 copy block` · tag: **`COPY AUDIT`**

**Locator:** `app/summit/page.tsx:399–401` · grep anchor: `live on Zoom · free`

- [ ] Replace

`CURRENTLY ON THE PAGE`
> *"Aug 10–20 · 6:30–8:00 PM ET · live on Zoom · free"*

`REPLACE WITH`
> **"Aug 10–20 · 6:30–8:00 PM ET · live on Zoom · free · one registration, all eight nights"**

Brief: *"This is the last opportunity to remove the assumption that eight
nights means eight commitments."*

⚠️ **"Zoom" is unconfirmed.** Justin said on Jul 23 he was *"actually TBD if
I'm going to do it on Zoom"* and was weighing StreamYard for branding
([design brief §3.4](../../design/07-23-2026-design-change-brief.md)). The
brief names Zoom throughout and never mentions StreamYard, which is decent
evidence Zoom holds — but it's still on Justin's list. **Ship as written**;
if it changes, six places on this page need updating (grep anchor: `Zoom`).

---

## §15 — Footer
`2 copy blocks` · **both are Tier 1** — full detail in [Phase 2 T1·1](./02-phase-2-tier-1.md) and [T1·3](./02-phase-2-tier-1.md)

- [ ] Identity line — `components/footer.tsx:17–19`
- [ ] Copyright line — `components/footer.tsx:58–62`

Listed here for section completeness. **Do them in Phase 2** — the copyright
line is the single most urgent item in the whole plan.

---

## Phase gate

After the copy pass: re-read the page top to bottom in one sitting. The brief
mirrors the session opt-in message deliberately in three places (§06, §09,
§12a) — confirm it reads as reinforcement rather than repetition. Then check
no `$39`, no "thirty-plus", no "Seventy percent teaching", and no
"underwritten/foundations" survives anywhere on `/summit`.

Deploy with **`pnpm run deploy`**.
