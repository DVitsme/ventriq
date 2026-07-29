# Ventriq — design change brief

**Source:** the July 23, 2026 design review with Justin (89 min). Transcript at
`docs/transcripts/7-28-2026.md` (misnamed — it is the Jul 23 call). Full
decision record, including copy/business/infra, in
`docs/meetings/07-23-2026-meeting-3-outcomes.md`. **This file is the design
subset only.**

**Who this is for:** me and Fable, in later sessions, building these changes.

**What this file is:** the *what* and the *why*. What each surface should
become, what feeling it's reaching for, what must not happen to it, and how we
know when it's right.

**What this file is not:** a build guide. No components, no techniques, no
markup. Where a file path appears it is a *locator* — where the thing currently
lives — never a prescription for how to change it. Choose the technique when
you build; the constraints in §10 are the only things that bind.

**Ground truth you must load before working:** the `ventriq-design` skill,
`docs/design/ventriq-design-system-brief.md` and its refusal catalog,
`docs/design/design-export-review.md` §7, and the pixel refs in
`docs/build-handoff/design-refs/*.dc.html` (open in a browser with
`support.js` beside them). This brief *amends* those; it does not replace them.
Where this brief and a design ref disagree, **this brief wins** — it is newer
and it is the client's own reaction to the built thing.

**Status legend:** 🟩 shipped · 🟨 partially shipped · 🟥 not started ·
⏸️ pinned, awaiting Justin · ⚠️ conflicts with something and needs a decision

**Working files derived from this brief (Jul 29):** the ranked build order
lives in [`build-queue.md`](./build-queue.md) and the blocked items with
unblock conditions in [`build-blockers.md`](./build-blockers.md) — **start
there when picking up work**; this brief is the intent reference they point
back into.

---

## §1 · The through-lines

Nine ideas run under every item below. When a specific instruction and one of
these conflict, raise it rather than guessing — but these are what the pass is
*for*.

**1 · The geometric field is the spine.** Derrick, on the hero (8:02):
*"Geometric image here. You're going to notice this kind of as a **reoccurring
theme where this is going to move around a bit**."* And again on the Summit
(9:40): *"the same geometric kind of thing playing in here."* And on the
Mastermind (12:50): *"You're going to now recognize where I'm headed with this
sort of style. **It's going to be the same sort of thing all the way through.**"*
This is not decoration per page. It is one moving system, recognizable across
every hero, which is what makes a six-page site read as one site.

**2 · Motion is what earns the layout.** Justin assumed the Summit hero would be
centered (40:39). Derrick: *"**I'm not going to center it.** It's going to be
just like that. **Trust me. When the animation's there, it's going to look
better.**"* Justin: *"I see the vision."* The left-aligned, asymmetric,
slightly-off-balance compositions are deliberate and they are **incomplete until
the motion lands**. Do not "fix" an unbalanced composition by centering it. Fix
it by finishing the motion.

**3 · Navy is a transition signal, not a mood.** Justin, asking for the new
homepage band (27:15): *"it'd be really dope to have like that **navy blue
background** to it to **break it up as far as contrast-wise. So that way people
know that they're transitioning from one part to the next.** Then they come back
down here. It's back into this **eggshell** color."* Midnight is punctuation. It
tells the reader a new argument is starting. That means the *rhythm* of dark and
light bands carries meaning, and stacking two midnight bands in a row spends the
signal for nothing.

**4 · Sell → answer → identity.** Derrick's stated page doctrine (8:45):
*"Give people the ability first always to sell… If they don't want to buy, they
normally have some basic questions. **Answer their quick questions.** And if
they're still like, no, then you're like, **okay, this is who I am.** That's
normally how I just structure my webpages."* Identity comes last, and only for
the people who didn't convert. This is why About dies and why the founder
letters shrink.

**5 · The speaker section is designed for the speakers.** Justin, unprompted
(40:55): *"This was **by far one of my favorite parts. Our speakers are going to
love this. It's going to make them feel super awesome.**"* Read that as a brief.
The speaker surfaces have a second audience — the people *on* them — and being
on the page should feel like an honor. That raises the bar on the portrait
treatment, the card, and the reveal, above what an audience-only view would need.

**6 · Never stock footage of people.** Derrick (7:21): *"Originally, I wanted a
video of people. But because you don't have any video for people yet… **if you
use stock video, the people who are involved are like, what the hell is this?**"*
The audience for this site overlaps the people in it. Fake humans get caught.
Abstract geometry doesn't lie about anything. This holds for stills too — the
`PhotoGrade` placeholders wait for **real** Baltimore photography, not stock.

**7 · Ventriq is a brand without a face.** Justin (31:18): *"**This is my first
time building a brand without a face**, low key. Will I be the face though?
Yes."* His day job is the reason (30:22: *"Justin is supposed to be somewhat
incognito… so I'm not getting any type of red flags"*). Design consequence: the
portrait slots that carry *him* shrink or go. The one deliberate exception is
the Mastermind, which he asked to keep personal.

**8 · Restraint, stated twice.** Derrick on the Summit: *"And that's it. **Kind
of relatively keeping it short.**"* On About: *"I don't want it to be super
long, super complicated."* Justin on attention (26:26): *"users only stay on a
page like **60 seconds max**."* Adding a section is expensive. Three of the
changes below are *removals*.

**9 · Colour is currently under-used, by the author's own admission.** Derrick
(1:10:23): *"I think I like **some more color popping at some locations**."* And
on the Summit agenda (10:20): *"**This needs a little bit more color to give it a
little bit more pop.**"* The palette is seven locked colours and the build
currently leans hard on two of them. There is headroom inside the system —
find it without adding a colour.

---

## §2 · Site-wide

### G1 · Hero backgrounds become moving geometric fields 🟥

**Applies to:** homepage, `/summit`, `/founders-after-hours` — Derrick named all
three (7:21, 9:40, 11:46: *"This will be a video background again"*).

**Today:** static SVG line systems with Phase-4 entrance draws — `CorridorRays`
on home, `Rays` on Summit, `TallyMarks` on FAH. They draw once, then hold.

**Intent:** the hero should feel *alive and ongoing*, not like a thing that
finished animating. Continuous, slow, ambient geometric movement behind the
headline. Derrick called it *"a video"* but the operative word is **geometric** —
what matters is that the corridor/threshold/drafting world keeps moving, not the
delivery format. If a generated motion field, a canvas system, or an extended
CSS/SVG animation reads better than a video file, that satisfies the intent.

**Feeling to hit:** a drafting table where the lines are still being drawn.
Perspective, convergence, a vanishing point that breathes. Slow enough to be
ignorable while reading.

**Hard limits:**
- Never people. Never stock footage. (§1.6)
- It sits *behind* type that must stay AA-legible at all times — the motion may
  never brighten into the text's contrast band.
- It is the LCP surface on the site's three most important pages, and we already
  have an open performance calibration item. A hero that costs the LCP is a
  failed hero.
- Must resolve to a still, composed frame under `prefers-reduced-motion`, and
  the page must be readable if it never loads at all.

**Cost signal from the call:** Derrick scoped it at *"20, 30 minutes out the
door"* and called it *"the easiest piece to fix. If you don't like it…"* Treat it
as **cheap and reversible**, which means it's worth trying two or three
directions rather than committing to the first.

**Done when:** all three heroes share one recognizable system, a viewer moving
between pages feels continuity rather than repetition, and nothing about the
type got harder to read.

### G2 · A colour pass, site-wide 🟥

Derrick's own note (1:10:23) and his live comment on the agenda block (10:20).
The build is currently midnight + cream doing ~90% of the work, with gold as a
hairline and accent as a link colour.

**Intent:** find more moments for gold and accent to carry weight — not more
colours, more *use* of the seven we have. Candidate surfaces named or implied on
the call: the Summit agenda ("needs a little bit more color to give it a little
bit more pop"), the FAH premium card (§5.5), the Mastermind spec sheet, section
rules and dividers.

**Hard limit — this one has bitten us already.** Gold maxes at **2.03:1 on
cream** and cannot carry body text there; accent `#C15A2C` is **3.9:1 on
midnight** and fails body-size AA. Both were discovered the hard way in the Jul
24 sweep. More colour must mean more colour in *large type, rules, grounds, and
fills* — not in body copy. The site is at 100/100 accessibility and this pass is
the most likely thing to break it.

### G3 · Real photography replaces the placeholder grades 🟥 ⏸️

`PhotoGrade` renders a warm-navy gradient block with a label where a photo goes.
Live in five slots: the homepage founder portrait, the Mastermind portrait, and
the FAH triptych (*"the hour — laptops open" · "the calls — phones out" · "the
board — wins tallied"*). Those three labels are a shot list already.

**Intent:** the grade defines the treatment — warm highlights falling into navy
shadow — so incoming photography should be *graded into* that world rather than
dropped in raw. Phone photos in good light, per the standing note to Justin.

⚠️ **Two of these slots are affected by §1.7.** The homepage portrait is Justin;
under D5 (§3.4) that section stops being about him. Decide whether the slot
takes a room/Baltimore image instead, or goes away. The Mastermind portrait
stays — that page is deliberately personal.

### G4 · A call-to-action in every section 🟥

Derrick (47:11): *"CTA button. So effectively added to **each section** for the
most part."* Justin's own rationale, pointing at the spot under the Summit
agenda (46:21): *"because **this will be a decision point** right here. It's
like, okay, I want to go to this, this, and this. And alright, I'm ready.
Click."*

**Intent:** conversion should never require scrolling back. But the design
question this raises is *variation* — eight identical gold buttons down a page
is a worse design than four. Vary weight by position: the hero and final CTA
carry full weight; mid-page CTAs after a decision point can be lighter — an
inline link, a rule-and-arrow, a text CTA. **The decision points are what
matter, not the button count.** The one Justin named specifically is directly
after the agenda.

### G5 · Left alignment is settled 🟩 (decision, no work)

Recorded so it doesn't get re-litigated. See §1.2. If a composition looks
unbalanced, the missing thing is motion, not symmetry.

### G6 · Branded email is a design surface 🟥

At 1:21:00 Derrick showed Justin a marketing email he'd designed for another
brand and promised the same: *"you can incorporate pictures… you can start to
really tell a story… **I chose these colors because these are already his brand
colors. So I would do the same thing for you. Same fonts**, right?"*

**Intent:** Ventriq's email should be visibly the same object as Ventriq's
website — Space Grotesk, the seven colours, 2px radius, the architect's line,
no shadows. Today only transactional email exists and it is unstyled. This is a
whole design surface nobody has drawn yet, and it needs the same refusal list
the site has: no rounded-corner gradient buttons, no drop shadows, no stock
photography, no template look.

**Constraint the medium adds:** email clients are hostile to the techniques the
site uses. The line-drawing motif has to survive as static artwork. Design it
knowing the motion can't come along.

### G7 · Mobile is the last pass, deliberately 🟥

Derrick's sequencing (1:10:23): *"I'll take the copy changes… wait on the other
new ones and the pictures… make the videos… **and then mobile last**, because
there's no point fixing the mobile, then I change something else, and then I got
to fix the mobile again."*

Respect the order. But note the two mobile items already *known* — the agenda
face cards go circular on mobile (§4.5) and there is a real crowding bug on
`/mastermind` (§6.3) — so mobile-last does not mean mobile-unconsidered.

---

## §3 · Homepage

Current order: hero → proof band → three ways in → **one structure, three
doors** → why this exists → voices → sponsors → footer.

### 3.1 · New pain-point band, on midnight 🟥

**Placement, stated precisely** (23:00): *"in between **this line right here**
and then **the three ways in**"* — i.e. after the proof band, before the three
cards. It is the first thing after the numbers.

**Why it exists:** Justin refused to let the page go from hero straight to
options. *"I don't want us to jump straight into pricing… talk about **who this
is designed for and why it's designed**… focus on the **pain points** of the
individual that's on the page. So that way they're like, **oh, no, this sounds
like it's for me.** And ultimately by the time they get down to the next
section, they'd be like, okay, this sounds like something I need. But what
exactly is it? And then it's like, well, **here are the three ways that you can
engage with us.**"*

So the band's job is a **recognition beat** that reframes the three cards from a
menu into an answer.

**Form:** bullets, not prose. Justin: *"we have to get to the point"* and
*"users only stay on a page like 60 seconds max."* Derrick's model: *"**I'll
treat you like Geico**… they come in really quick — I'm not going to tell you
all the things that can go wrong with riding a motorcycle, but get insurance."*
Short, scannable, no wall of text.

**Ground:** midnight, per §1.3 — it is the transition marker between "who we
are" and "here's how you get in."

**The recognition list, in Justin's own words** (copy is drafted in the outcomes
doc §3.3; what matters to design is that it is a **list of gaps**): never
managed cash flow · never managed a sales funnel · never built a marketing
system · never operated a whole business · only ever operated in one area of
expertise. Derrick's endorsed one-liner: *"**no matter who you are, you suck at
a couple of these.**"*

**Design opportunity worth taking:** a list of gaps in a structure is *literally*
the brand's concept — an incomplete drawing, missing spans, a corridor with
doors that don't open yet. This is the strongest candidate home for the
convergence diagram displaced in §3.3. Consider it seriously rather than setting
plain bullets on a dark ground.

### 3.2 · Three ways in — numerals and price ⏸️

The three threshold cards currently lead with `Aug 10` / `$39` / `Sep`. Justin
caught the inconsistency himself: *"my OCD is making sure that these all are…"*
Derrick explained they were meant chronologically.

Two things came out of it:

**(a) Price comes off — direction clear, not formally closed.** *"I probably
don't want to show pricing right here yet because **I want to highlight value
first**, even though $39 is absolutely nothing. **I want us to prioritize what it
is and what we do.**"* Plus a maintenance reason he raised unprompted: *"for the
sake of… **you're not having to be on the back end updating this every other
day**."*

**(b) The numeral system must be one kind of thing.** *"they all need to kind of
stay like this so people know."* Derrick: *"put a pin in this piece… the beauty
of being able to sleep on some stuff."*

⏸️ **Pinned on Justin.** Three systems to put to him — each is internally
consistent, which was his actual complaint:
- **chronological** — `Aug` / `Ongoing` / `Sep`
- **quantity** ← *recommended* — `8 nights` / `Monthly` / `10 seats`; every one
  reads as scale or scarcity, and none of them needs maintaining
- **no numerals** — let the titles carry, and let the cards' stagger do the work

Note the numeral is doing real compositional work in the card — it is the
type-scale anchor. Whatever replaces it must survive at that size; `Ongoing` and
`Monthly` are much longer than `$39` and will change the card's balance.

### 3.3 · "One structure. Three doors." → testimonials carousel 🟥 ⚠️

**Both parties wanted this section gone.** Derrick, in the walkthrough (8:30):
*"**I don't like this section.** I started this. I didn't come back to re-cook
this."* Later (29:36): *"**I don't know what I was thinking with this section.**
I'm so real with you. It needs something there for the flow of the site."*
Justin, independently (29:22): *"if we already have this part, I don't know if we
necessarily need this part."*

**What replaces it:** the testimonials, moved up from lower on the page, as a
**carousel**. Derrick: *"one structure, three doors becomes the testimonials.
And we can even make that a carousel."*

**Why here:** Justin's reason is proof placement — *"This could be where the
**proof of concept** is. Like, okay, **this isn't just hypothetical. This is the
real deal.**"* It lands immediately after the three options, answering "does
this actually work" at the moment the question forms.

**The card needs four fields, not two.** This is the part most likely to get
built too small. Justin (32:46): *"**I got pictures of people**"* and *"**I have
data points now** that I can point to versus it just being like, ooh, we feel
better… **We actually have production numbers.**"*
1. the quote
2. attribution — name and company, exactly as he specifies
3. **a photograph of the person**
4. **a hard number** — the outcome, e.g. "+$180K in nine months"

The number is the design problem. It has to read as evidence without looking
like a marketing stat block — the brand's register is a drafting annotation, not
a dashboard tile. Treat it as a measurement on a drawing, not a KPI.

⚠️ **Design debt this creates — and it is worse than it first looks.**
`ConvergenceDiagram` — two lines converging on a threshold — is the brand's
signature gesture and the concept the entire identity derives from
(*venture + corridor*, "a room worth getting into"). **Repo-verified: it is
defined and used in exactly one place, this section.** The Mastermind's diagram
is a *different* drawing — one horizontal structure line dropping to three
labels — not a convergence. So deleting this section removes the convergence
gesture from the entire site at any scale larger than the logo mark.

**Three options:** relocate it into the new pain-point band (§3.1, strongest —
an incomplete structure is exactly what that section is about), fold it into the
footer as a closing mark, or accept that the monogram alone carries the idea.
**Do not silently drop it.**

⚠️ Also: a carousel hides content behind interaction, which cuts against §1.8's
"get to the point." If the proof is the point, consider whether the first slide
should be visually complete before any interaction happens.

### 3.4 · "Why this exists" — the section stops being about Justin 🟥

Derrick's framing (30:51): *"this could be the first time we really start to
write **Ventriq's** branding story and honestly just **ignore you**. Instead of
Justin's story, we write Ventriq's story. **It was started for… we aim to.**"*
Justin agreed and went further — *"let's shift this to **Ventriq-centric**."*

**Design consequences, beyond the words:**
- The first-person letter form goes. So does the *"— Justin Shaw, Founder"*
  signature and the gold rule under it.
- The `PhotoGrade` portrait slot beside it is now unassigned (§2.G3).
- The *"Read Justin's story →"* link dies with the About page (§7).
- What remains is an origin statement without a person in it, which is a
  genuinely harder thing to make feel warm. That is the design problem to solve:
  **institutional voice that doesn't read as corporate boilerplate.** The
  brand's answer is probably the drawn line — let the structure carry the warmth
  that a face used to.

### 3.5 · New Upcoming Events section 🟥

**Placement:** the slot the testimonials vacate — Derrick (36:00): *"where those
testimonies are right now, we can have the upcoming events."* So low on the page,
above sponsors.

**Why:** Justin wants the year to look real and full. Derrick's reference:
*"**Alex [Hormozi] tells me about all the events he has coming up that I can't
sign up for all the time. Creates FOMO.**"* Justin: *"it would be great to have
our upcoming events available for people to see."*

**Content:** public events and Founders After Hours events only. Internal and
cohort rows are deliberately excluded — Justin is filtering them out because the
master schedule is private.

**Behaviour:** *"you can **click on them**, you can see it, but it'll be like, to
join, be part of the Founder After Hours — this date, this date, this date."*
So: dated rows, clickable through to the event.

**Design intent:** abundance, legibly. A dense schedule read at a glance —
closer to a printed programme or a wall calendar than to a card grid. It should
make the year look inhabited. It must also degrade gracefully to three rows when
there are only three, without looking empty.

**Also asked for:** *"we might be able to copy and paste it in the founder after
hours tab"* — the same block, repeated on `/founders-after-hours`.

### 3.6 · Sponsors — approved 🟩

Justin, reading it (31:18): *"Put a name behind the builders, sponsor the
Summit, talk partnerships. **I love this.**"* No changes.

### 3.7 · The band rhythm has to be re-solved ⚠️

Adding a midnight band at §3.1 and a midnight-ish events block at §3.5, while
removing the midnight band at §3.3, changes the page's whole light/dark cadence.
Naively applied you get five alternating bands in a row, which spends the
transition signal (§1.3) until it means nothing.

Proposed cadence — **verify it by eye, this is arithmetic, not design**:

| | Section | Ground | Note |
|---|---|---|---|
| 1 | Hero | midnight | geometric field (G1) |
| 2 | Proof band | cream | unchanged |
| 3 | **Pain points** | **midnight** | new; the transition marker |
| 4 | Three ways in | cream | numerals resolved |
| 5 | Testimonials carousel | cream | replaces the diagram |
| 6 | Why Ventriq exists | cream | needs a rule or grade to separate from 5 |
| 7 | Upcoming events | ? | ⚠️ open |
| 8 | Sponsors | midnight | unchanged |

**The unsolved seam is 5→6→7→8.** Three consecutive cream sections then two
consecutive dark ones. Options: give the events block a cream ground and let
sponsors be the single closing dark note; or merge events and sponsors into one
dark closing band; or find a third ground treatment inside the palette for one
of them. **This is a real design decision, not a detail — make it on purpose.**

---

## §4 · The Summit — highest priority page

Justin, on why (1:12:19): *"this will be **the main page I'm driving traffic to,
like ASAP**… I will just link everything, like our bio, it'll go straight to this
page. **This could be the first page that you prioritize.**"* His Instagram bio
points here.

### 4.1 · Hero: geometric field, and the missing countdown 🟥

Per G1. Plus two Summit-specific items.

**(a) The countdown that was asked for and never built.** Derrick (9:50):
*"**I want this to count down** because I saw an Eventbrite one time and I've
loved it ever since."*

There is no countdown anywhere in the codebase. And the hero currently ends with
the small-caps label **"doors open in"** followed by a *static date string*. That
label is a countdown label with nothing attached to it — it promises a live
number and delivers text.

⚠️ *Ambiguity, flagged honestly:* his walkthrough order suggests he may have been
pointing at the statistics band (8 · 8 · 90 · 2), which Phase 4 did ship with
count-up animation. But either way the gap is real, and the orphaned "doors open
in" label is the strongest single piece of evidence for what was intended.
**Build the countdown to Aug 10, 6:30 PM ET, under that label.**

**Design intent for it:** urgency without a carnival. Eventbrite-style countdowns
are usually four boxed digit-tiles, which is exactly the generic pattern the
brand refuses. The Ventriq version should read as a **measurement** — tabular
numerals, a hairline rule, small-caps units, the drafting register. It must also
have a defined terminal state: what it says on Aug 10 during the event, and what
it becomes after Aug 20.

**(b) "Virtual" must become impossible to miss.** Justin (39:14): *"the virtual
piece — **even though I've plastered it everywhere, people still don't know it's
virtual**… If there's another way that we can say, like, **'save your virtual
seat'**… **If you're still hearing it, it's not enough.**"*

Treat this as a **visual hierarchy failure, not a copy shortage.** The word is
already in the eyebrow, the trust row, the ticker and the final CTA — and it
still isn't landing. So repeating it a sixth time is not the fix. Give it a
different *rank*: put it in the CTA itself, and consider whether it deserves
treatment (a mark, a rule, a location line rendered as a place rather than a
qualifier). Something that a scanning eye catches at a different level than body
text does.

⏸️ **Pinned:** whether the H1 itself changes. Derrick floated *"the most
intensive virtual event for people in Baltimore"*; Justin liked it but is
sleeping on it. ⚠️ **If it changes, do not geo-narrow** — Justin confirmed on the
same call that registrants span multiple states and some outside the country
(53:22). A Baltimore-locked title would be actively wrong.

### 4.2 · The rolling ticker 🟩

*"I want this to animate… it's going to be a **carousel. It'll just roll. You
know exactly where it's going to go.**"* Shipped in Phase 4 as the marquee band.
No further work. Noted so it isn't rebuilt.

### 4.3 · The manifesto's scroll reveal 🟨

Asked for (9:55): *"I want this to **animate in on scroll** here for every
August. So as you scroll down, it'll have a **typewriter effect almost. I want it
to be interactive.**"* Approved verbally on the call — *"Exactly like that,
yeah."*

Phase 4 shipped `ScrollLit`: word-by-word colour lighting driven by scroll
position, dim gold → cream.

⚠️ **Divergence worth re-checking with fresh eyes.** "Typewriter" implies
characters *arriving*; what we built is words *illuminating*. Both are
scroll-driven and both are interactive. The lighting version is arguably the more
brand-correct choice — a typewriter is a writing metaphor, lighting is an
architectural one, and this brand is architectural. **Recommendation: keep the
lighting, but look at it once against the ask before calling it done.**

### 4.4 · Speaker wall → clickable, flipping cards 🟥 ⚠️

**Today:** fifteen placeholder tiles — a 4:5 bordered frame with corner ticks and
a generic bust silhouette, labelled `speaker 01`… It scales to 30+.

**Asked for:** *"I want **each one of these to be clickable**. So you got the
speaker. **This can be a bio.**"* Derrick's original reference for the reveal was
the Luma checkout overlay he'd just demoed: *"**with this sort of modal thing, I
want this to have the same sort of effect here.** So when you click on the
speaker, boom, pops up, bio."*

**Then revised, and this is the final decision** (50:58): the card **flips**.
Derrick: *"I was going to have it do a pop-up. You want me to do a flip?"*
Justin: *"**the flip would go crazy.**"* Derrick: *"Alright, I could do a flip.
Let me write that down."*

**Intent:** the card turning over is the reveal — front is the face, back is the
bio. It should feel like turning over a printed card, which sits naturally in
the drafting/architect's world. Keep the flip *materially* honest: the card has
two sides, the same size, the same edges.

⚠️ **This is the single most a11y-fragile item in the entire brief.** We are at
100/100 on every page and the e2e suite will catch a regression. As a *design*
matter, that means the flip cannot be the only affordance:
- The card must be operable and understandable without a pointer, so it needs a
  visible interactive affordance, not just a hover cue.
- Under `prefers-reduced-motion`, the reveal must still work — as a cross-fade
  or an exchange, not a 3D rotation.
- **On touch, tap-to-flip is a known usability trap** (nothing tells you it's
  flippable, and there's no hover to hint). Derrick already planned a different
  mobile treatment for the agenda thumbnails; the speaker wall likely wants a
  different mobile reveal too — an expansion or a sheet rather than a flip.
- Back-face content must not be readable by assistive tech while the card is
  face-down.

**Design bar, per §1.5:** these cards are the thing Justin said his speakers
would love. They should look like something a speaker would screenshot and post.

### 4.5 · Agenda gets faces, and more colour 🟥

**The block:** "Two weeks, mapped" — eight nights in two week-columns, each row
currently carrying a `[SPEAKERS]` redline chip where names will go.

**(a) Face thumbnails per night.** Justin: *"we have the **mini face cards** down
here, so they know **who's on what panels**."* Derrick: *"I can use just pictures
and **small, tiny little squares**. And then for mobile, I can be kind of clever
about it with **circles as opposed to squares**, which will break a bit of the
flow, but it'll work on mobile."*

**Explicitly rejected: progressive disclosure.** Justin floated a plus-toggle and
immediately talked himself out of it — *"**I wouldn't have to bury the lead at
all.**"* The faces are visible without interaction.

**Squares on desktop, circles on mobile** is a deliberate inconsistency Derrick
chose knowingly (*"which will break a bit of the flow, but it'll work"*). Honour
it — squares carry the drafting register; circles pack better in a narrow column.

**(b) Colour.** Derrick, on this exact block (10:20): *"**This needs a little bit
more color to give it a little bit more pop**, but this is kind of how I'm
thinking it can start out."* It is currently the flattest section on the page —
cream ground, ink text, hairline rules — and it is the section people will spend
the most time reading. See G2's contrast limits.

**Note:** the agenda already has three live row states (upcoming / tonight /
replay). Faces have to work in all three, including the dimmed replay state.

### 4.6 · "Who is this for?" needs a heading 🟥

Justin (43:30): *"I will probably put like **large header** saying like, **'who
is this for?'** So that way they know what that means, basically. **I feel like
something's just missing right there.**"* Derrick, locating it: *"above where it
says small business owners, put a header in here."*

The section — three ruled audience rows — currently has **no visible heading at
all**. It reads as an orphaned list. Note Justin said *large*: this is a
section-scale heading matching the page's other h2s, not a small label.

Bonus: it also closes a heading-outline gap, so it's an accessibility
improvement for free.

### 4.7 · Founder letter → registrant voices 🟥

Justin (45:09): *"**instead of this part**, there's going to be extra work on my
side, but I think it would be really cool if I can get **a few people that tell
me why they're excited about attending** the event that are already registered.
And we can actually put that down there — even though it's not like a
testimonial, **it's a testimonial on them being excited.**"*

*"This part"* is the "Why Justin built it" block — a signed first-person
paragraph with a "Read the full story →" link.

**Design intent:** this is a *different object* from the homepage testimonial
carousel and should not look like it. Those are outcomes from finished work;
these are anticipation from people who haven't attended yet. Lighter, more
plural, more voices at smaller weight — closer to a wall of notes than to
featured quotes. Justin also wants to gather video, so the treatment should
accommodate a mix of text and short clips without one looking like a fallback for
the other.

It also satisfies §1.7 — a Justin signature and an About link both leave the page.

### 4.8 · Video in the Q&A block 🟥

Derrick (10:25): *"Quick Q&A. **This here should be a video, which will make it
feel more premium.**"*

Intent is explicitly *feel*, not information — a moving element beside the
accordion so the page's densest text block isn't its dullest moment. Content is
open: it could be Justin, a speaker, or ambient footage of the work. Given §1.6,
if no real footage exists, an abstract geometric piece is a legitimate answer
rather than stock.

⚠️ It sits low on the page, so it must not load eagerly and must not become a
second LCP candidate.

### 4.9 · CTA cadence, and the decision point 🟥

Per G4. The one Justin located precisely is **directly after the agenda**:
*"under here, because **this will be a decision point** right here."* He also
confirmed adding one mid-page — *"Should we have another one right here? **Yes.**"*

### 4.10 · The attendee share card — an unclaimed opportunity 🟥

Justin (47:34): *"I'm going to have them be able to grab this and **actually put
their headshot on here too. That's good marketing.**"* Derrick: *"People love
that. **They love to see themselves.**"* Justin: *"**That's how people don't miss
events.**"*

A personalized "I'll be there" graphic a registrant drops their face into and
posts. **This is a design deliverable nobody has assigned.** It is the brand
leaving the site and going onto other people's feeds, so it carries the identity
into the hardest environment it will face — a crowded Instagram grid — and needs
to survive at thumbnail size. Square and story-ratio versions.

---

## §5 · Founders After Hours

Justin on the page as a whole (50:19): *"**Perfect layout. Perfect.** And boom.
Yep. Love it."* The structure is approved; these are refinements inside it.

### 5.1 · Hero: geometric field 🟥
Per G1. Derrick: *"This will be a video background again."*

### 5.2 · Tally marks 🟩
*"I kind of wanted it to move, and I thought it would be cool if, like, the
numbers — the **numerals** — **wrote themselves in and they crossed out.** Why? I
don't know. It was 1 a.m. Don't question it."* Shipped in Phase 4. Noted so it
isn't rebuilt.

### 5.3 · Three cards become the three real pillars 🟥

Currently three action-phrase cards: "Join the room." / "Show up." / "Bring your
challenge." Justin worked out live that these should be the membership's actual
pillars, which changed what the cards *are* — from an invitation sequence to a
**contents list**.

| Was | Becomes |
|---|---|
| Join the room. | **Office hours** |
| Show up. | **Live sessions** |
| Bring your challenge. | **Founders After Hours** |

**Design consequence, which matters more than the rename.** Cards saying "Join
the room / Show up / Bring your challenge" are *verbs* — a journey, which is what
the staggered ascending layout expresses. Cards saying "Office hours / Live
sessions / Founders After Hours" are *nouns* — three parallel things you get.
**The stagger may no longer be saying the right thing.** Look at whether these
want equal footing rather than a sequence.

⚠️ The section heading **"Three doors in"** should probably change with them —
they're pillars now, and "doors" is already doing work on the homepage. This is
a judgment call to make deliberately, not to skip.

### 5.4 · Run of show — real times 🟥

The block carries a live redline chip flagging the times as unconfirmed. Justin
confirmed them (58:30), listing all four: **6:00 the brief · 6:15 the hour · 7:15
the tally · 8:15 the room.** The chip comes off.

⚠️ One oddity worth a single-line check with him: 7:15→8:15 gives "the tally" a
full hour, where it previously had fifteen minutes. Ship his four times as
stated; ask what fills the hour.

### 5.5 · Membership cards: symmetry, and a midnight premium card 🟥

Justin (59:25): *"I want this **symmetrical**… in the sense of, like, **this
one's larger than this one**… horizontal, you know what I'm saying."* The digital
card is currently wider than the in-person card.

Derrick: *"make them — **don't give more credence to one than the other**. Do you
want one to be a different color?… **Make the more expensive one the better
color, so like a blue background?**"* Justin: *"**Yeah, maybe blue, yep, make it
rich.**"* Derrick: *"the $99 one, because **if it's going to go to one, go to the
premium**."*

**Three moves, and they're in tension — resolve deliberately:**
1. **Equal widths.** This was the actual complaint ("horizontal").
2. **The premium card goes midnight.** "Make it rich" is the brief — it should
   feel like the better thing, not merely the more expensive thing.
3. **The vertical stagger between them.** ⚠️ Not raised on the call, but a
   colour-differentiated card *plus* a vertical offset is two emphasis
   mechanisms doing the same job, and it will read unbalanced — which is the
   exact thing Justin objected to. **Recommendation: equal width, no stagger, on
   this pair only.** The stagger stays a brand device everywhere else.

**Constraint:** a midnight *card* inside a cream section is a new pattern for
this system — midnight has so far been a full-bleed band. Make sure it reads as
intentional rather than as a mistake, and remember accent orange fails AA on
midnight at body size, so the card's link needs the cream-underline treatment.

### 5.6 · The zero board 🟩
The `0` counter with *"the count starts at zero — on purpose"* drew no comment.
Untouched.

### 5.7 · Upcoming events, repeated here 🟥
Per §3.5 — Justin asked for the same block on this page.

---

## §6 · The Mastermind

### 6.1 · Style consistency 🟩
Derrick: *"You're going to now recognize where I'm headed with this sort of
style. **It's going to be the same sort of thing all the way through.**"* Confirms
G1's motif belongs here too.

### 6.2 · Approved as-is 🟩
More of this page survived untouched than any other. Justin: *"Nothing for you to
change right here"* (hero) · *"90 days, three pillars, the room, the scoreboard,
and the systems — **that's beautiful**"* · *"**Formatting-wise, this is fine.**"*
The changes he asked for are copy, not design. **Do not redesign this page.**

### 6.3 · A real mobile bug 🟥
Justin (1:09:00): *"when I looked at this briefly on mobile, **this part was kind
of bunched up**. So we may want to look at how we can maneuver that."* He didn't
say which part. Prime suspects: the midnight format spec sheet (label/value rows
in a narrow column) and the four-step application grid. **Find it with a mobile
screenshot pass** — it's the only concrete mobile defect anyone reported.

### 6.4 · The ethos section 🟥 ⏸️
Derrick built a deliberate exception here (12:50): *"this is your baby… I figured
this one could have its own separate sort of what the ethos is. **I couldn't
write this piece for you. You'll have to write this one yourself.**"* The slot
exists; Justin owes the words. **This page is where §1.7 does not apply** — it
stays personal on purpose.

### 6.5 · The structure-line diagram 🟩
The drawn line dropping to *the room · the scoreboard · the systems* is the only
other line-diagram on the site. ⚠️ **It is not a convergence** — it does not
substitute for the mark §3.3 removes from the homepage. Don't let its existence
talk you out of solving §3.3. Untouched either way.

---

## §7 · About — removed

Killed for v1 (1:10:55). Derrick's reason was Justin's bandwidth, not the design:
*"there's already a lot you got to write, and I'm already asking a lot from you.
I think I just killed the about page."* Justin: *"That's fine… that is a great
idea."* A phase-2 rebuild was agreed in the same breath.

**Design-relevant consequences:**
- Two inbound links disappear — "Read Justin's story →" (homepage) and "Read the
  full story →" (Summit). Both were already dying under §1.7. Neither leaves a
  dangling stub.
- The nav drops from four items to three, which **frees the slot for Contact** —
  a gap Derrick spotted on the call and which is still open (§8).
- Its social share card retires with it.
- The design refs for About stay valid for phase 2.

---

## §8 · Chrome

**Contact belongs in the nav.** Derrick, live on the call (15:55): *"Contact
page, that's what I was missing… **I need to put it on the nav bar. Slipping.**"*
Still not there. With About gone the nav is Summit · Founders After Hours ·
Mastermind — three items and room for a fourth.

**Footer.** The only footer note from the call is that sponsors sit above it and
Justin liked that section. Otherwise untouched.

**The logo is a reconstruction, and Justin approved it.** Derrick admitted the
provenance: a screenshot, then a Photoshop file from a third party, *"turned that
into a **janky SVG**. So it kind of works, but it's not the original."* Justin:
*"the funny thing is, **I like this one, too. We could do both. Nobody's going to
know.**" ✅ **Not a blocker.** If the original ever arrives it's a fidelity
upgrade — cleaner curves at large sizes — not a correction.

---

## §9 · Design surfaces that don't exist yet

Named on the call as real future work (1:01:11). Not in scope now; recorded so
they're designed rather than accreted.

- **A leaderboard.** Derrick: *"This is going to be really fun figuring out how
  to build out this leaderboard."* It connects two things the site already talks
  about — the Mastermind's scoreboard and the FAH tally board (*"the board
  doesn't lie"*). The visual language for both already exists in the marketing
  pages, so the product surface should inherit it, not invent a dashboard look.
- **A logged-in membership area** with role tiers (super admin, coordinator,
  teacher, student, guest speaker). Different information density than a
  marketing site, same identity.
- Justin's horizon for it, which Derrick endorsed: *"this is going to be a **four
  year project** that will grow to be something large."*

---

## §10 · Constraints — these bind everything above

Non-negotiable. From `AGENTS.md`, the design system brief, and things we learned
the hard way on Jul 24.

1. **Space Grotesk only** (400/500/600). Seven locked colours. **2px radius.**
   **No shadows** except focus rings.
2. **Contrast is a hard gate, and it has already forced changes.** Gold is
   **2.03:1 on cream** — it cannot carry text there, only rules and fills. Accent
   `#C15A2C` is **3.9:1 on midnight** — it fails body-size AA, which is why hero
   secondary links are cream-underlined rather than orange. The site is at
   **100/100 accessibility on every page** and the e2e suite enforces it.
3. **Content visible by default; motion is enhancement.** The prototype's
   JS-gated reveals are inverted in production. Anything new follows that.
4. **`prefers-reduced-motion` is honoured everywhere**, and "honoured" means the
   thing still communicates — a reduced-motion user must not lose information.
5. **Links inside text carry persistent underlines** (Jul 24 sweep).
6. **Numerals on cream grounds are ink, not gold.**
7. **No "donate"/"donation" language, routes, or components.** Legal hold.
8. **`[BRACKETED]` tokens render as visible redline chips.** Never invent a value
   to make a design look finished.
9. **Performance is a live constraint, not a nicety.** Hero video, the Q&A video,
   speaker photography and carousel imagery all land on the three most important
   pages, and the performance budget is already under calibration. Every visual
   addition in this brief has a weight cost — spend it knowingly.
10. **No AI-default look.** The `design-tells` refusal catalog applies to
    everything here: no gradient-blob heroes, no glassmorphism, no purple, no
    generic countdown digit-tiles, no card grids with soft shadows.

---

## §11 · Open design questions

Do not resolve these unilaterally.

| # | Question | Waiting on |
|---|---|---|
| Q1 | Homepage card numerals — chronological, quantity, or none? | **Justin** — he asked to sleep on it |
| Q2 | Does the Summit H1 change to lead with "virtual"? | **Justin** — same |
| Q3 | Where does `ConvergenceDiagram` live once the carousel takes its slot? | **Derrick** — §3.3 |
| Q4 | The 5→6→7→8 band rhythm seam on the homepage | **Derrick** — §3.7 |
| Q5 | Does the FAH "Three doors in" heading change now that the cards are nouns? | **Derrick** — §5.3 |
| Q6 | Keep the stagger on the membership card pair, or drop it? | **Derrick** — §5.5 |
| Q7 | What fills the FAH 7:15–8:15 hour? | **Justin** — §5.4 |
| Q8 | Does the homepage portrait slot take a room/Baltimore image, or go? | **Derrick** — §3.4 |
| Q9 | Is the ScrollLit treatment accepted in place of "typewriter"? | **Derrick** — §4.3 |
| Q10 | What's in the Summit Q&A video? | **Justin** — §4.8 |

---

## §12 · Stress test

A final adversarial pass over this brief. Written down so the next session
inherits the doubts, not just the conclusions.

### 12.1 · Coverage — how I know nothing's missing

Three passes: (1) the demo narration, where line 101 of the transcript alone
carries eleven distinct design instructions; (2) Justin's page-by-page reactions,
19:36–1:10:55; (3) a keyword sweep for design vocabulary — *color, animate,
video, carousel, scroll, click, flip, modal, background, center, symmetry,
layout, mobile, circle, square, card, photo, headshot, font, spacing, premium,
countdown, typewriter, blue, navy, eggshell, gold, design* — returning 63 lines,
each checked against this document. Every design-bearing line is represented in
§2–§9.

**Deliberately excluded** as not-design, and living in the outcomes doc instead:
copy rewrites where wording is the only change · pricing and naming decisions ·
the nonprofit→mission-driven correction · analytics and email infrastructure ·
domain, hosting and commercial items.

**Two judgment calls on the boundary,** both included here because they are
visual-design work even though they read as business items: the branded email
templates (§2.G6) and the attendee share card (§4.10).

### 12.2 · Where I am confident

Directly stated, unambiguous, single-speaker: the pain-point band and its navy
ground · the testimonials carousel replacing the diagram · Ventriq-centric
rewrite · upcoming events · "Who is this for?" heading · agenda face cards,
squares/circles, no plus-toggle · FAH pillar renames · the run-of-show times ·
equal-width cards with a midnight premium card · left alignment · mobile last ·
About removed · Contact into the nav · more colour · geometric video heroes.

### 12.3 · Where I am not — read these before building

**The countdown (§4.1a).** Derrick's walkthrough order plausibly points at the
statistics band rather than the hero. My reasoning for the hero: the orphaned
"doors open in" label. **But note the gap is real under either reading**, so the
work is justified regardless. Confirm placement with Derrick.

**"Carousel, it'll just roll" (§4.2).** I read this as the marquee ticker, from
its position in the walkthrough. It could conceivably describe a speaker
carousel. Marked shipped — **if Derrick meant something else, that item is
unbuilt and this brief is wrong about it.**

**Typewriter vs scroll-lit (§4.3).** Different effects. Approved in concept
before either existed. Flagged as Q9.

**The flip decision (§4.4).** ~~Speaker attribution is scrambled at 50:58…~~
✅ **SETTLED Jul 29 — Derrick re-pasted the passage himself as the flip
reference.** Detangled: **Justin** asked *"when you click on it, it's going to,
like, flip the card?"* → **Derrick** (who had planned a pop-up since the 9:40
walkthrough): *"I was going to have it do a pop-up. You want me to do a flip?"*
→ **Justin**: *"the flip would go crazy"* → **Derrick**: *"All right, I could do
a flip. Let me write that down."* The surface is the **summit speaker cards** —
pinned by Fathom's own action item (*"Implement Summit page updates: … add
speaker cards; build flip modals"*) and by the mobile check seconds later
opening with *"Speaker, click."* The stray *"after hours"* at 50:19 is
transcript garble; the real FAH walk starts at 52:30.

**"Make it rich" (§5.5).** Justin said blue; the brand's blue is midnight. I've
read "rich" as depth and weight. If he meant something more saturated, the
palette doesn't have it and that's a conversation, not a fix.

### 12.4 · Internal tensions this brief contains

Not errors — genuine trade-offs that will surface during the build.

1. **More sections vs "keep it short."** Three sections are added to the homepage
   (§3.1, §3.5, and the carousel) while §1.8 says brevity. Resolution: two of the
   three are *replacements*, and the pain-point band is what makes the rest of
   the page make sense. Net growth is one section. Watch it doesn't become three.
2. **A carousel hides content, and Justin wants the point made fast.** §3.3.
3. **More colour vs a contrast regime that already forced retreats.** §2.G2 and
   §10.2 are pulling against each other. Colour must land in fills, rules and
   large type — never body text.
4. **Video-heavy heroes vs an unresolved performance budget.** Four video
   surfaces are proposed across the three most-trafficked pages while the
   Lighthouse budget is still being calibrated. This is the highest-risk
   interaction in the brief.
5. **The flip card vs 100/100 accessibility.** §4.4. The most fragile single item.
6. **Removing the convergence diagram vs the identity being built on it.** §3.3.
   Both parties disliked the *section*; neither discussed losing the *mark* —
   and it is used in exactly one place, so the section and the mark die together.

### 12.4a · One claim in an earlier draft of this brief was wrong

Worth recording, because it's the kind of thing that reads as reassuring and
isn't. I initially wrote that the convergence gesture "survives on
`/mastermind`." It does not. Grep shows `ConvergenceDiagram` defined and
rendered only on the homepage; the Mastermind drawing is a horizontal structure
line with three drops — same drafting language, different idea. **Verify before
you let a "it still exists elsewhere" argument settle a removal decision.**

### 12.5 · Things nobody said, but that follow necessarily

Flagged as inference, not instruction — none of these came from the client.

- The FAH card stagger may now be semantically wrong (§5.3) — the cards changed
  from verbs to nouns.
- The homepage portrait slot is orphaned by the Ventriq-centric rewrite (§3.4).
- The homepage band rhythm breaks arithmetically once §3.1/§3.3/§3.5 all land
  (§3.7).
- The numeral replacements are much longer strings than `$39` and will change the
  card's type balance (§3.2).
- Faces on agenda rows have to work in the dimmed "replay" state (§4.5).
- Registrant excitement quotes must not look like the homepage testimonials —
  they're a different kind of evidence (§4.7).
- The countdown needs defined during-event and post-event states (§4.1).

### 12.6 · If you only have an afternoon

Ranked by value over effort. Nothing here is blocked on Justin.

1. **"Who is this for?" heading** (§4.6) — smallest change on the list, fixes an
   orphaned section and a heading-outline gap at once.
2. **Contact into the nav** (§8) — flagged on the call five days ago, still open.
3. **FAH run-of-show times and the pillar renames** (§5.4, §5.3) — clears two
   redline chips off a live page.
4. **Membership card symmetry and the midnight premium card** (§5.5).
5. **Mastermind mobile crowding** (§6.3) — the only reported visual defect.
6. **The colour pass on the Summit agenda** (§4.5b) — the flattest section on the
   most important page.

Everything else needs either Justin's assets, a pinned decision, or the video
work.
