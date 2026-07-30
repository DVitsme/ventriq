# Ventriq — work log

A running, plain-language record of everything done on this engagement. Newest
first. Written so it can be pasted straight into a client update for Justin.

## July 29, 2026 — late night (the full speaker roster + the reveal plan)

- **All 21 speakers are on the summit page** — names, titles, credential
  lines from the bios Justin sent, night-host badges, and 16 real headshots
  processed into a matched black-and-white treatment so photos taken in
  totally different conditions read as one set. Speakers without photos get
  a dignified initials plate — the cards look like siblings, not gaps.
  (Built and tested; publishing on the word.)
- **The flip got two upgrades Justin asked for:** cards now flip when the
  mouse moves over them (desktop), and people with "reduce motion" switched
  on now SEE the flip too — as a quick crossfade instead of a rotation,
  which is the accessibility-safe way to honor that setting.
- **Names corrected from the bios document:** Quintel Harcum (was "Quintel
  Q."), Lyndsae' Peele, Jerone Anthony Tyler, Erika Baez-Grimes. One needs
  Justin's eye: his heading says "Margo Burley" but her own bio says "Margo
  Burr" — we printed Burr and asked him to confirm.
- **The Foundry: name and pricing locked ($39/$99), and the reveal plan is
  researched and written.** Three research tracks (rebrand case studies,
  launch mechanics, rename operations) agree: flip the name publicly Aug
  3–4 before the summit, tell the naming story on opening night, and make
  Monday Aug 17 the founding-member offer moment with the window closing
  Sunday Aug 23. The failed version of this move (a surprise on-stage
  rename) has a famous case study — ConvertKit's "Seva," reversed within a
  month. Awaiting Justin's go; the site can flip the moment he gives it.

## July 29, 2026 — night (the polish build — LIVE)

- **Built the card flip Justin asked for.** Every speaker card on the summit
  page now turns over like a physical card — front is the speaker, back is
  their credentials — with a labeled "Bio" button so nobody has to guess it's
  there. It works by keyboard, respects reduced-motion settings (instant swap
  instead of a rotation), and loses nothing if scripts are off.
- **The speaker section got the full plate treatment** — two featured cards
  for the summit's opener and the Capital & Command host, three alongside,
  every row closing cleanly, each card with a drafting sheet number and the
  speaker's initials set large as the ground until their photo arrives. A
  small "rev 02 · jul 29" line tracks roster updates the way architects track
  drawing revisions — and gives visitors a reason to come back.
- **The countdown finally exists.** "Doors open in" now has a live number
  under it — one clean line, down to the minute (seconds appear on the final
  day), silent for screen readers except one polite announcement the moment
  doors actually open.
- **Section navigation:** desktop gets a slim bar (Schedule · Speakers · FAQ ·
  Register) that follows the scroll; phones get a compact index under the
  hero instead of a third bar eating the screen — the research was firm that
  stacking three bars on a phone drives people away.
- **Deleted the About page** (as agreed on the call) — its address now
  forwards to the homepage, Contact took its menu slot, and the internal
  editorial notes it was showing the public are gone with it.
- **Applied the decided community-page fixes:** $99 confirmed on the page,
  the real run-of-show times (6:00 brief · 6:15 the hour · 7:15 tally · 8:15
  the room), the three pillars renamed to what Justin actually calls them
  (Office hours · Live sessions · Founders After Hours), and the in-person
  card now sits equal-width in midnight blue — "make it rich."
- **Fixed the registration-button tracking bug** found in the research sweep,
  so ambassador links will be credited correctly.
- **Every change passed the full accessibility suite** (43 checks, zero
  failures) and was eyeballed at desktop and phone sizes before being called
  done. **Published to ventriq.io the same night and re-verified live, page by page.**

## July 29, 2026 — evening (research sweep before the polish build)

- **Ran an eight-track research sweep before building the next round** — the
  card-flip Justin asked for, how top conferences present speakers, animation
  systems, the page-navigation bar, making the hero backgrounds move, a real
  performance measurement of the live site, verification of everything we
  believed about Skool/Luma/Kit, and a pre-launch audit. Everything below
  came out of it; the full record lives in the project docs.
- **One correction to an instruction we gave Justin: renaming the Skool group
  is safe.** We'd said renaming changes the web address — Skool's docs say
  name and address are separate settings. What DOES break links is claiming a
  custom address ($100 per change after the first, and old links die rather
  than redirect). His to-do list is corrected.
- **Confirmed Skool can run both membership prices natively** — the two-tier
  plan needs no workaround. Two setup decisions for Justin are on his list.
- **Found and flagged a bug in our own registration button** before it could
  cost anything: it was overwriting the one piece of tracking that records
  which ambassador sent each registrant. Fix is queued ahead of any
  ambassador campaign.
- **Discovered Justin's iamjs.io email domain has zero spam protection** —
  the domain his newsletters actually send from. His summit emails risk the
  spam folder until four DNS records are added; exact steps are on his list,
  and it's urgent because inboxes take 2–3 weeks to trust the new setup.
- **Measured the real performance of the live site for the first time** —
  the site is structurally excellent (zero layout shift across every test,
  no images to slow it down), and the speed targets in our automated checks
  were confirmed impossible as written; a corrected set is drafted. Verdict
  on the "video hero" idea: a real video would slow the most important pages
  exactly when partner traffic arrives — the plan instead is to animate the
  existing line art (costs nothing to load), and give Justin an exported
  video capture of it for his social posts.
- **Found that the placeholder chips are still visible on four pages** one
  click from the summit page — including the About page showing internal
  notes. Deleting About and applying the already-decided community-page fixes
  moved to the front of the queue before partner newsletters send traffic.
- **The site isn't in Google yet** — searching for it returns nothing, while
  ventriq.com (the domain squatter) shows "for sale." Requesting indexing
  this week is now the top of the checklist.

## July 29, 2026

- **Added a registration bar that follows phone visitors down the page.**
  Justin called this the single highest-value change on his list, and the
  reasoning is that most traffic will arrive from an Instagram link on a phone
  and scroll one-handed. The bar stays out of the way while the main button is
  on screen, then slides up and stays reachable the rest of the way down.
- **"VIRTUAL" is now impossible to miss on the summit page.** It was buried in
  small text; it's now a large gold line directly above the headline, reading
  "A FREE VIRTUAL SUMMIT · AUG 10–20, 2026". Justin has said repeatedly that
  people still don't realize the event is online — this gives the word a
  different rank on the page rather than just repeating it again.
- **Every session night now carries a plain-language label** — Leadership,
  Brand, Marketing & PR, Sales, Technology & AI, Finance & Funding, Exit
  Strategy, The Founder's Reality. The titles are memorable but don't tell a
  stranger what the night is about; now someone scanning can find the sales
  night or the funding night in a second.
- **Added a register button directly under the schedule** — the point where
  someone has just read all eight nights and decided. Previously they had to
  scroll to the bottom of the page to act on it.
- **One button label everywhere.** The site was using three different phrasings
  for the same action; it's now "Save My Free Seat" in all nine places.
- **Moved the sponsor block below the FAQ**, so a founder deciding whether to
  register doesn't hit a section aimed at funders mid-decision. Rewrote it
  away from charity language at the same time — "sponsored by companies and
  organizations" rather than "underwritten by companies and foundations",
  which matters now that Ventriq is a for-profit.

- **Put in all 14 of the final copy replacements from Justin's brief** (built,
  not yet published). The summit page now reads the way he wrote it: the
  opening paragraph he rewrote himself, the new "Who is this for?" section with
  its three founder stages, the rewritten Black Business Month passage ("come
  September, you won't have a lanyard — you'll have momentum"), and a hero that
  finally says who the page is for and who's behind it.
- **Two new FAQ answers that head off the most common questions** — "do I have
  to attend all eight nights?" (no, you pick) and "what time is this in my
  zone?", which as Justin's brief put it would otherwise "arrive by email
  eighty times."
- **Removed the "will I be pitched?" answer.** It promised nobody would sell
  you anything at the end, which isn't what Justin actually plans to do. The
  slot now answers a more useful question instead.
- **Took all pricing off the summit page** — it belongs on the community page,
  and having it in both places was starting to contradict itself.
- **One thing deliberately left out:** a line asking registrants to name
  whoever referred them. The referral field on Luma has never been tested, and
  pointing people at a field that might silently drop what they type is worse
  than not asking. It goes in as soon as we've confirmed it works.

- **All of today's earlier work is now live on ventriq.io** — published and
  checked page by page. Every internal placeholder is confirmed gone, every new
  section confirmed present, and the accessibility scan re-run clean across
  all seven pages on desktop, mobile and reduced-motion settings.

- **Fixed everything on the site that was leaking internal notes to the
  public.** The footer was
  printing a working reminder to ourselves — "EIN, add when issued; no
  deductibility language until determination letter" — on every page. That's
  gone, along with two "announcement date" placeholders, the "speakers" marker
  beside all eight session titles, and fifteen blank speaker tiles.
- **The summit page now names five real speakers** instead of showing empty
  boxes — Jerone Anthony Tyler, Cedric Powell, Theodore Savage, Tiffany
  Bethea and Jeffrey Scruggs, with the credentials Justin himself wrote in his
  July 23 email. Since that email already went out, the wording is his and
  it's already public.
- **Corrected the speaker count from "thirty-plus" to "seventeen-plus"** — the
  real number, and the one Justin had already told his own list.
- **Removed the "nonprofit" description everywhere Ventriq describes itself**,
  across the home, summit, community, mastermind and about pages, plus the
  search-engine descriptions. Kept it where it describes the *audience* —
  "nonprofit builders" are still welcome, Ventriq just isn't one yet.
- **Standardized the event name to "Forge The Future Summit"** in the page
  title, both search descriptions, the top banner and the hero.

- **Read everything Justin sent this morning, and built a plan around it.**
  Four documents: the summit webpage brief, the speaker roster, the agenda,
  and the Foundry membership one-pager. All four are now read end to end and
  turned into a phased plan at `docs/plans/summit-aug-1/` — research first,
  then four build stages matching the priority tiers in Justin's own brief.
- **Noted the August 1 date in the brief.** The brief lists a live date of
  August 1 for the summit page, which we hadn't been working toward. Plan is
  built around it.
- **Checked every claim in the brief against the live site — all of them are
  correct.** Most urgent: **an internal note of ours is currently printing in
  the footer of every page** — "EIN, add when issued; no deductibility
  language until determination letter." That's a working reminder to
  ourselves, not public copy, and it's been visible to visitors. Also
  confirmed live: two "announcement date" placeholders, a "speakers" marker
  beside all eight session titles, fifteen blank speaker tiles, and a claim of
  "thirty-plus" speakers where the real confirmed number is around seventeen.
  All of it is first in line to fix.
- **Caught a date mismatch and resolved it — no change needed.** The agenda
  spreadsheet puts the last two summit nights on Aug 20 and 21; Luma, the
  website, and Justin's own July 25 brief all say Aug 19 and 20. Three sources
  agree, so we left the site alone. Flagged the spreadsheet to Justin, since
  running the summit off it would put his finale on the wrong nights.
- **The membership has a name: The Foundry.** Justin's one-pager sets the
  structure — Ventriq at the top, the Forge The Future summit as the annual
  event, The Foundry as the year-round membership, and Founder After Hours
  becoming one monthly in-person night inside it rather than the whole thing.
  Two tiers, $45 and $99, plus a five-level progression system members earn
  their way up. We've planned the site so the new name can go live the night
  he announces it without us having to ship anything.
- **Four things need a yes from Justin** before they can be built: whether the
  name goes public on opening night, whether the digital tier is $39 or $45,
  whether it's "Founder" or "Founders" After Hours, and whether the web
  address changes. All four are on his list in plain language.
- **Read the 2026 program calendar — it's the first view of the whole year,
  and it unblocks the "upcoming events" section.** Sixteen public and
  community events between September and December are now dated and ready to
  put on the site: the free monthly business class, the in-person community
  nights, the monthly webinars, and a public Mastermind graduation in
  December.
- **Found three places the calendar disagrees with what's on the site** — the
  Mastermind's meeting day and time, when the free business class starts, and
  the length of the Mastermind program. We've changed nothing yet; all three
  are questions for Justin, since the calendar might be the newer plan or the
  older one. (Its summit dates are definitely the older one, so we're going by
  Luma there.)
- **Recovered five speaker write-ups from an email Justin already sent** — the
  credentials and one-line proof points for five of the summit speakers,
  already public, so they can go straight onto the site.

- **The community "Join" buttons are now connected to the real Skool group.**
  All five "Join Founders After Hours" buttons on the community page now go
  straight to the Skool community instead of the contact form — one click from
  the site into the room.
- **Before connecting, we checked the group and flagged what still needs
  setting up.** The group is currently free (the site sells $39 and $99
  memberships), it's named "IAMJS Collective" rather than the community's
  brand, and it's nearly empty. We connected it anyway — the call was made to
  start seeding early members now — but that makes Justin's three-step setup
  time-sensitive: set the two prices in Skool, lock in the group's name, and
  tell us when it's done. One thing to be careful with: renaming a Skool
  group can change its web address, and the site now links to it — so any
  rename needs to reach us the same day or the button breaks.

## July 28, 2026

- **Went back through the full 89-minute July 23 design review and turned it
  into a build plan.** Every minute of the call is now written down as a
  decision with a place to go — 22 decisions in all, from "change nonprofit to
  mission-driven" down to "the speaker cards should flip." The plan is
  sequenced the way we agreed on the call: the copy changes we already have,
  then the pieces waiting on your assets, then the video and animation, then
  mobile last. Nothing from that conversation is sitting only in someone's
  memory.
- **Caught four things on the live site that need correcting this week.**
  (1) The site still describes Ventriq as a nonprofit in about twenty places —
  you flagged that on the call and it's the first thing we're fixing.
  (2) The Summit FAQ currently promises "nobody's selling you a course at the
  end," which isn't what you're actually planning, and attendees would notice
  on night one. (3) A working note of ours — "about a minute, free" — shipped
  by accident under the register button. (4) The Contact page still isn't in
  the top menu.
- **Corrected the ventriq.com advice we gave you.** We said it would become
  available at midnight on July 25. That isn't how domain expiry works — the
  current owner still gets a grace period and then a redemption window, so the
  real opportunity is closer to mid-September. Nothing was lost by the date
  passing. The plan now is two backorders instead of one, and you're only
  charged if one of them actually catches it.
- **Flagged an email problem worth fixing before August 10.** Your live
  newsletter runs on Kit, and the signup form we built on the site feeds a
  different list. As of now those two are drifting apart, and the Summit is
  about to add a lot of names. Connecting the site's signup form straight into
  Kit is about an hour of work; doing it after the summit means merging lists
  by hand. Recommending we do it now.

## July 24, 2026

- **All of today's accessibility and speed work is live on ventriq.io** —
  deployed, spot-verified page by page (contrast fixes, underlined links,
  lighter loading all confirmed on the live site), and the code is backed
  up to GitHub.
- **First full accessibility audit ran — and the site now passes it clean.**
  Every page was scanned against the WCAG 2.2 AA standard (the legal-grade
  accessibility bar) on desktop, mobile, and reduced-motion profiles — the
  first time this scan has actually executed. It found ~110 real issues,
  all fixed the same day: dimmed labels and chips darkened to readable
  levels, links inside text now underlined instead of color-only, the
  announcement bar made visible to screen readers, a missing heading level
  on the summit page, and gold numerals on light backgrounds switched to
  ink (gold physically can't reach the required contrast on cream — the
  gold rules and lines stay). Accessibility now scores 100/100 on every
  page, and the checks re-run automatically with every future change.
- **Made every page lighter and faster for visitors** — the analytics
  script now loads while the browser is idle instead of competing with the
  page, and the bot-protection widget (previously ~0.4 MB loaded on every
  single page) now loads only when someone actually starts filling in a
  form. No data or protection lost — just moved out of everyone's way.
- **Social sharing cards shipped** — every page now has a branded preview
  image (midnight, corridor lines, Space Grotesk) for links shared on
  LinkedIn, Instagram DMs, iMessage, Slack, X. Generated by script so they
  regenerate in seconds when titles change; zero performance cost.
- **The motion layer is live** — the site now draws itself: corridor lines
  sweep to their vanishing point behind the homepage headline, the summit
  title lands in two beats with its gold rule drawing beneath, tally marks
  stroke in on the community page, the stats count up as you reach them,
  and the summit manifesto lights word by word as you scroll. Every effect
  respects "reduce motion" settings (verified) and the content is always
  readable even with scripts off.

- **Newsletter signup verified end to end** — footer signup → confirmation
  email → one click → subscriber stored in the "Founder Digest" audience,
  ready for the first broadcast. All three forms now proven with real
  submissions.
- **Contact form verified end to end by a real submission** — human check
  rendered cleanly, "Got it." confirmed, message stored, notification email
  delivered. Two follow-ups shipped immediately: notifications now come
  from site@ventriq.io (fixes the spam trigger of an address emailing
  itself), and our security policy now permits Cloudflare's own analytics
  beacon.
- **Fixed the contact-form security check** — the human-verification widget
  was configured with keys from a different project (a copy-paste artifact
  in the environment file), so it rejected everyone. Created the proper
  Ventriq widget, rotated the keys, redeployed, verified live. Forms are
  ready for a real submission test.

## July 23, 2026

**All three forms are LIVE on the site** — newsletter signup in the footer
(with confirm-your-email flow), the full contact form, and the chapter
interest form on the community page. Spam protection verified working in
production: an automated test submission was correctly blocked by the
human-check, exactly as designed. One human test submission will confirm
the final step (the notification email to jshaw@ventriq.io).

**Forms infrastructure switched on in production** — security keys
installed on the server, the database tables created and verified, spam
protection configured. One item left before the forms appear on the site:
creating the newsletter audience list (2 minutes) and mounting the forms.

**Forms engine + automated quality gates written and staged.** The entire
backend for the three forms (newsletter with confirm-your-email flow,
contact, chapter interest) is code-complete — spam protection, rate
limiting, the database tables, notification emails to Justin — waiting
only on two security keys to switch on. And the site now has an automated
test suite: 40 calendar-logic tests (passing), accessibility scans for
every page, and performance budgets that run on every change.

**All six pages now built in full — the whole site is real.** Mastermind
(the acceptance-letter page: who it's for, the three pillars diagram, the
plain-stated format spec sheet, application steps, Justin's letter, FAQ),
About (the story page: the bakery question, the timeline, why "Ventriq,"
the mission card, skin-in-the-game, the council seats), and Contact (the
form — goes live with launch; email works today — plus press, chapter,
and Justin routes). Built by three parallel builders and quality-checked.

**Founders After Hours page built in full** — tally-mark hero, the three
role cards, the mapped hour (7:00 brief / 7:15 the hour / 8:15 the tally /
8:30 the room), the "board doesn't lie" pull-quote, both membership tiers
($39 digital, in-person pending Justin's price confirm), the
starts-at-zero board, what's-inside, Baltimore + your-city chapter cards,
FAQ, and the closing call.

**Summit page built in full** — the flagship: a hero that changes itself
with the calendar (tonight's session title on live nights, "Go build."
on the off-weekend, replay mode after Aug 20), the scrolling tagline
ribbon, the 8-nights stats band, the manifesto, how-it-works, the
15-slot speaker wall awaiting the reveal, the full two-week agenda with
live "tonight"/"replay" states, who-it's-for, Justin's letter, sponsor
card, 8-question FAQ, and the closing call. Animations layer on next.

**Homepage built in full** — the complete designed page is live: the
corridor-line hero, the facts band, the three staggered program cards
(Summit / community / Mastermind with real dates and pricing), the
"One structure. Three doors." drawn diagram, Justin's letter with photo
slot, three founder quotes, and the sponsor section. Animations layer on
next; the page reads finished today.

**Stress-tested the new chrome and fixed five findings** — the event
"clock" now treats opening day correctly all day (hero and banner agree),
the announcement banner is visible to search engines and doesn't shift the
page, the registration overlay's styles are no longer blocked by our
security policy, the sitemap lists all six pages, and banner links were
recolored to meet accessibility contrast. Verified live after deploy.

**Site navigation and structure live.** Every page now has the real header
(announcement bar that changes with the event calendar, navigation, the
registration button that opens Luma right on the page) and footer; all six
pages exist at their final addresses — home and summit in full starter form,
the others as clean single-screen previews with real copy. The 404 page got
its brand treatment. Registration clicks are now tracked by placement
(homepage vs summit vs nav) for channel reporting.

**The site is live.** https://ventriq.io now serves a real (starter) version of
the site — homepage + summit page with the event details, registration link,
and everything search engines need to start finding it. The full designed site
replaces it on the same links around Aug 1.

- **Hosting set up** on Cloudflare (fast, global, scales automatically) with
  automatic deploys: every code update we approve goes live on push.
- **Connected ventriq.io to the new site** — moved the domain's DNS to
  Cloudflare, cleaned out leftover GoDaddy records, and attached the domain
  (www redirects to the main address).
- **Email deliverability fully secured** — found that mail from
  jshaw@ventriq.io was at risk of landing in spam (missing authentication).
  Fixed the SPF record, installed the 2048-bit DKIM signing key in DNS, and
  authentication was activated in Google Admin — the full SPF + DKIM + DMARC
  chain now passes end to end.
- **Created Justin's task list** (`TODO-JUSTIN.md`) — everything only he can
  do, in plain language with time estimates, kept current as the build moves.
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
