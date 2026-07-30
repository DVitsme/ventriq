import type { Metadata } from "next";
import { Eyebrow } from "@/components/primitives";
import { LumaRegisterButton } from "@/components/luma-register-button";
import { SpeakerWall } from "@/components/hero/speaker-wall";
import { WallDriver } from "@/components/hero/wall-driver";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { SpeakerPlate, type Speaker } from "@/components/speaker-plate";
import { DoorsCountdown } from "@/components/doors-countdown";
import { SummitSubnav, SheetIndex } from "@/components/summit-subnav";
import { NIGHTS, LUMA_URL } from "@/lib/agenda";
import { eventPhase, nightOf, nextNight, agendaRowState } from "@/lib/calendar";
import { CountUp, Reveal, ScrollLit } from "@/components/motion";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Forge The Future Summit — Ventriq's free virtual founder summit, Aug 10–20" },
  description:
    "Eight nights, two weeks — brand, PR, sales, technology, capital, exit. Every session ends with a move you can make the next morning. Free, virtual, live on Zoom.",
  alternates: { canonical: "/summit" },
  openGraph: { images: [{ url: "/og/summit.png", width: 1200, height: 630 }] },
};



const SPEAKERS: Speaker[] = [
  { name: "Theodore Savage", title: "Founder, The Cultivation Effect®", bio: "Two decades developing leaders across corporate, fitness, and education — featured on Good Morning America and the Today Show.", role: "opening the summit", initials: "TS", sheet: "S-01" },
  { name: "Darren Willoughby", title: "Brand & business strategist", bio: "A decade helping companies find their voice, sharpen their message, and show up with intention — equal parts analytical and human.", role: "hosting The Art of Desire", initials: "DW", sheet: "S-02", img: "darren-willoughby" },
  { name: "Timothy Robertson", title: "Founder, STATUS International", bio: "Brand work for Visa, JP Morgan Chase, Amazon AWS Sports, NBC Universal — and F1 Monaco hospitality when no one else could deliver.", role: "", initials: "TR", sheet: "S-03", img: "timothy-robertson" },
  { name: "Tiffany Bethea", title: "Executive Director, Baltimore City Chamber of Commerce", bio: "Award-winning speaker and brand strategist whose clients double revenue in 30–60 days — 16 years launching profitable online brands.", role: "", initials: "TB", sheet: "S-04", img: "tiffany-bethea" },
  { name: "Keisha Bradley", title: "CEO, The PR Alliance", bio: "Client visibility in Forbes, ESSENCE, ABC, FOX and Black Enterprise — and a TEDx Talk nearing 2 million views.", role: "", initials: "KB", sheet: "S-05", img: "keisha-bradley" },
  { name: "Gilbryonna Shaw", title: "Founder, Nü Momish", bio: "Building the village mamas deserve — community and resources for mothers from preconception to empty-nesting.", role: "hosting The Rainmaker's Craft", initials: "GS", sheet: "S-06", img: "gilbryonna-shaw" },
  { name: "Calvin Royster", title: "Encore Insurance Group", bio: "Insurance as a business asset — risk strategy for businesses, nonprofits, and government contractors.", role: "hosting The End of the Beginning", initials: "CR", sheet: "S-07" },
  { name: "Tony Wagner", title: "", bio: "", role: "", initials: "TW", sheet: "S-08", img: "tony-wagner" },
  { name: "Quintel Harcum", title: "Founder, QS Studio", bio: "Johns Hopkins' first Black food-service partner, $720K in revenue — now coaching 40+ businesses on AI systems.", role: "hosting The Modern Advantage", initials: "QH", sheet: "S-09", img: "quintel-harcum" },
  { name: "Jeffrey Scruggs", title: "Founder & CEO, Majestic Light Group", bio: "AI engineer built at the Department of Defense and Booz Allen Hamilton — currently building 50 AI-powered applications in public.", role: "", initials: "JS", sheet: "S-10", img: "jeffrey-scruggs" },
  { name: "Alex Johnson", title: "Founder, Optumize Solutions", bio: "Automation that recovered $150K+ in lost annual revenue for one client — and is projected to drive $1.2–1.6M in another.", role: "", initials: "AJ", sheet: "S-11" },
  { name: "Jerone Anthony Tyler", title: "Founder, Posteridy.ai", bio: "Has helped entrepreneurs secure $30M+ in funding.", role: "hosting Capital & Command", initials: "JT", sheet: "S-12", img: "jerone-anthony-tyler" },
  { name: "Claudius Taylor", title: "", bio: "", role: "", initials: "CT", sheet: "S-13", img: "claudius-taylor" },
  { name: "Lyndsae' Peele", title: "Senior Entrepreneurial Ecosystem Manager, Kiva U.S.", bio: "Finance coach and ESSENCE Fest 2026 speaker — $1M+ in first-year real estate sales, five years helping families of color build wealth.", role: "", initials: "LP", sheet: "S-14", img: "lyndsae-peele" },
  { name: "Lake Mitchell", title: "Founder & CEO, Lake Tax & Advisory Group", bio: "Wealth Engineer — $2M+ in client tax savings identified; U.S. Army First Lieutenant and PhD researcher.", role: "", initials: "LM", sheet: "S-15", img: "lake-mitchell" },
  { name: "Robin Haynes", title: "Business Advisor, Goldman Sachs 10,000 Small Businesses", bio: "800+ entrepreneurs advised across 25 years — client revenue growth of 72% or more.", role: "hosting The Endgame", initials: "RH", sheet: "S-16" },
  { name: "Cedric Powell", title: "M&A Partner, Squire Patton Boggs", bio: "Advises private equity buyers and sellers on acquisitions, divestitures, and recapitalizations.", role: "", initials: "CP", sheet: "S-17", img: "cedric-powell" },
  { name: "Margo Burr", title: "Dance studio co-owner", bio: "A Baltimore Business Journal 40 Under 40 honoree serving hundreds of children across Maryland.", role: "", initials: "MB", sheet: "S-18", img: "margo-burr" },
  { name: "Jaren Kirkland", title: "M&A Investment Banking, Wells Fargo", bio: "Built a $5M last-mile delivery business at 21 — plus two auto-body franchises grossing $1M+ each.", role: "", initials: "JK", sheet: "S-19", img: "jaren-kirkland" },
  { name: "James Busia", title: "State Farm® Agency Owner", bio: "Chairman's Circle in two of his first three years — agency grown from $220K to $1M gross annual revenue.", role: "", initials: "JB", sheet: "S-20", img: "james-busia" },
  { name: "Erika Baez-Grimes", title: "M&A Advisor, CM&AP", bio: "$350M+ in business scale and exit activity across the companies she's founded, led, or advises.", role: "", initials: "EB", sheet: "S-21" },
];

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  "@id": "https://ventriq.io/summit#event",
  name: "Forge The Future Virtual Summit",
  alternateName: "Forge The Future",
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: { "@type": "VirtualLocation", url: LUMA_URL },
  startDate: "2026-08-10T18:30:00-04:00",
  endDate: "2026-08-20T20:00:00-04:00",
  // Rich-results note (research doc §9): Google withdrew virtual-event rich
  // results in Jun 2025, so this markup can never produce an event snippet —
  // by Google's rule, not our defect. It stays polished for AI answer
  // engines: image, typed organizer (cross-page @id refs don't resolve —
  // Google parses per-page), and the named speakers as performers.
  image: ["https://ventriq.io/og/summit.png"],
  organizer: { "@type": "Organization", "@id": "https://ventriq.io/#org", name: "Ventriq", url: "https://ventriq.io" },
  performer: SPEAKERS.map((s) => ({ "@type": "Person", name: s.name })),
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD", availability: "https://schema.org/InStock", url: LUMA_URL, validFrom: "2026-07-20T00:00:00-04:00" },
  description:
    "Eight nights, two weeks — brand, PR, sales, technology, capital, exit. Every session ends with a move you can make the next morning. Free, virtual, live on Zoom.",
};

/* Rays retired Jul 30 — the summit hero's subject is now the Speaker
   Wall (components/hero/speaker-wall.tsx); plan doc 08. */

function Hero() {
  const now = new Date();
  const phase = eventPhase(now);
  const tonight = nightOf(now);
  const upcoming = nextNight(now);

  if (phase === "live-night" && tonight) {
    return (
      <>
        <Eyebrow>tonight · night {tonight.n} of 8</Eyebrow>
        <h1 className="mt-6 max-w-[16ch] text-4xl font-medium leading-[1.08] tracking-[-0.015em] md:text-[60px]">
          {tonight.title}
        </h1>
        <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-cream/85">
          {tonight.subtitle} — live at 6:30 PM ET.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a href={LUMA_URL} className="inline-block rounded-[2px] bg-gold px-6 py-[15px] font-semibold leading-none text-ink hover:bg-gold-hover">
            Join live
          </a>
          <span className="text-sm text-cream/60">Registered? Your link is in your inbox.</span>
        </div>
      </>
    );
  }
  if (phase === "between") {
    return (
      <>
        <Eyebrow>between sessions</Eyebrow>
        <h1 className="mt-6 text-4xl font-medium leading-[1.08] tracking-[-0.015em] md:text-[60px]">Go build.</h1>
        <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-cream/85">
          Next up: {upcoming?.title}, {upcoming?.day} at 6:30 PM ET. This week&rsquo;s replays are already in the community.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a href="/founders-after-hours" className="inline-block rounded-[2px] bg-gold px-6 py-[15px] font-semibold leading-none text-ink hover:bg-gold-hover">
            Catch the replays
          </a>
          <LumaRegisterButton ctaLocation="summit-hero-between" variant="outline">
            Save My Free Seat
          </LumaRegisterButton>
        </div>
      </>
    );
  }
  if (phase === "post") {
    return (
      <>
        <Eyebrow>forge the future summit · August 2026</Eyebrow>
        <h1 className="mt-6 max-w-[16ch] text-4xl font-medium leading-[1.08] tracking-[-0.015em] md:text-[60px]">
          The room keeps what you missed.
        </h1>
        {/* Post-summit state. `[OURS]` — the brief misses this third $39 because
            it only renders after Aug 20, but leaving it would contradict the two
            the brief does strip the day the summit ends. */}
        <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-cream/85">
          All eight sessions live in Founders After Hours — replays, office hours, and the founders who showed up.
        </p>
        <div className="mt-10">
          <a href="/founders-after-hours" className="inline-block rounded-[2px] bg-gold px-6 py-[15px] font-semibold leading-none text-ink hover:bg-gold-hover">
            Join Founders After Hours
          </a>
        </div>
      </>
    );
  }
  // pre / announced (State A/B)
  return (
    <>
      {/* Brief §02: "virtual" was in a 12px eyebrow and the marquee —
          "technically present and functionally invisible". Promoted to a gold
          display line above the H1; the eyebrow drops to the event name alone
          so the date and "virtual" aren't stated twice in one hero.
          Gold on midnight clears AA at this size; it could NOT carry this on
          cream (2.03:1) if the pattern gets reused. */}
      <div className="vq-in"><Eyebrow>forge the future summit</Eyebrow></div>
      <p
        style={{ ["--vqd" as string]: "0.05s" }}
        className="vq-in mt-5 text-[15px] font-semibold uppercase leading-tight tracking-[0.18em] text-gold sm:text-lg md:text-xl"
      >
        A free virtual summit{" "}
        <span className="text-gold/70">·</span>{" "}
        <span className="[font-variant-numeric:tabular-nums]">Aug 10&ndash;20, 2026</span>
      </p>
      <h1 className="mt-6 text-4xl font-medium leading-[1.08] tracking-[-0.015em] md:text-[60px]">
        <span className="vq-in inline-block" style={{ ["--vqd" as string]: "0.15s" }}>Not just education.</span>{" "}
        <span className="vq-in inline-block" style={{ ["--vqd" as string]: "0.65s" }}>Implementation.</span>
      </h1>
      <svg aria-hidden viewBox="0 0 440 8" className="mt-4 w-full max-w-[440px]" fill="none">
        <line className="vq-draw" pathLength={1} style={{ ["--vqd" as string]: "1.15s" }} x1="0" y1="4" x2="440" y2="4" stroke="#C9A24C" strokeWidth="1.5" />
        <line className="vq-tick" style={{ ["--vqd" as string]: "1.8s" }} x1="440" y1="0" x2="440" y2="8" stroke="#C9A24C" strokeWidth="1.5" />
      </svg>
      <p style={{ ["--vqd" as string]: "1.3s" }} className="vq-in mt-6 max-w-[54ch] text-lg leading-relaxed text-cream/85">
        Eight nights across two weeks — one session a night, ninety minutes each. Each one pointed at something you can do the next morning.
      </p>
      {/* §02b — a cold visitor from an Instagram link self-identifies in under
          two seconds or leaves. Says "founders"; the trust line below says
          "entrepreneurs". Both are the brief's own wording — O1, ship as
          written, do not harmonise. */}
      <p style={{ ["--vqd" as string]: "1.45s" }} className="vq-in mt-4 max-w-[54ch] text-lg font-medium leading-relaxed text-cream">
        Built for founders who are past the idea and into the work.
      </p>
      <div style={{ ["--vqd" as string]: "1.7s" }} className="vq-in mt-10 flex flex-wrap items-center gap-6">
        <LumaRegisterButton ctaLocation="summit-hero">Save My Free Seat</LumaRegisterButton>
        <span className="text-sm text-cream/60">Free. Registration runs on Luma — your seat and calendar invite arrive together.</span>
      </div>
      {/* §02c — Ventriq was only identified in the footer, by which point the
          decision is already made. */}
      <p style={{ ["--vqd" as string]: "1.85s" }} className="vq-in mt-5 max-w-[54ch] text-sm leading-relaxed text-cream/70">
        Built by Ventriq — equipping entrepreneurs with capital, programming, and council.
      </p>
      {/* Watched by MobileCtaBar: while this is on screen the sticky bar stays
          down, so a phone never shows two identical buttons at once. */}
      <div id="vq-hero-cta-sentinel" aria-hidden className="h-px w-px" />
      {/* The countdown the Jul 23 call asked for — the "doors open in" label
          finally has a number under it. Server/no-JS render is the complete
          static date sentence; the tick mounts after hydration. */}
      <DoorsCountdown />
      <p className="mt-2 text-sm tracking-[0.14em] text-cream/80 [font-variant:small-caps] [font-variant-numeric:tabular-nums]">
        aug 10–20 · 6:30–8:00 pm et · zoom · free
      </p>
    </>
  );
}

const FAQ: [string, React.ReactNode][] = [
  ["What does it cost?", "Nothing — the seat is free. Register on Luma and you're in every night live."],
  ["What if I can't make a session live?", "Every replay lands in Founders After Hours 24 hours later — that's Ventriq's working community, where the summit keeps going. The live seat is the free one, and it's where the real work happens. Save it and show up."],
  // §12d — 6:30 ET is 3:30 PT, a real conflict for anyone with a day job.
  // "A question that will otherwise arrive by email eighty times."
  ["What time is this in my zone?", "6:30–8:00 PM ET each night — so 5:30 CT, 4:30 MT, 3:30 PT. The calendar invite in your confirmation will convert it for you automatically."],
  ["How much time is this, honestly?", "Ninety minutes a night, Monday through Thursday, for two weeks. Fridays through Sundays are yours. It's built for people running businesses, because you are."],
  ["Who are the speakers?", "Operators, builders, and funders — people who've done the thing they're teaching. Twenty-one of them named across the eight nights, with more announced weekly."],
  // §12a — "Will I be pitched?" retired, not rewritten. The old answer claimed
  // "nobody's selling you a course at the end", which contradicted Justin's own
  // stated plan to lean into the community every night. The brief takes the
  // slot for the bigger unasked objection instead of arguing the small one.
  ["Do I have to attend all eight nights?", "No. Choose your sessions when you register — one night, four, or all eight. Most founders come for the nights that map to what they're solving right now, then stay for the ones they didn't expect to need."],
  ["What do I need?", "Zoom, a notebook, and one real challenge in your business you want to move."],
  ["Can I send my team?", "Yes — registration is per person, so have them grab their own seats. It's free for everybody who builds."],
  ["What's Founders After Hours?", <>Ventriq&rsquo;s working community: replays, office hours with advisors, webinars, and a monthly in-person hour where founders do the work together. <a href="/founders-after-hours" className="text-accent-deep underline">Read about it →</a></>],
];

export default function SummitPage() {
  const now = new Date();
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />

      {/* Hero — state machine + THE SPEAKER WALL (Wave 2b, plan doc 08):
          eight duotone plates pinned beside the copy. Desktop: absolute
          field right of the copy's exclusion zone; mobile: in-flow contact
          strip below the copy. The copy machine is untouched. */}
      <section className="relative overflow-hidden bg-midnight md:min-h-[74vh]">
        <div className="relative mx-auto h-full max-w-[1440px]">
          <div className="vq-hero relative z-[1] px-5 py-24 md:px-20 md:py-32 lg:max-w-[50%]">
            <Hero />
          </div>
          <SpeakerWall />
        </div>
        <WallDriver />
      </section>

      {/* Section nav — brief §16, research doc §5. Desktop: the slim sticky
          bar (once scrolled it's the only top chrome). Mobile: an in-flow
          sheet index instead of a third chrome layer. */}
      <SummitSubnav />
      <SheetIndex />

      {/* Ticker — the page's one festival gesture */}
      <div className="overflow-hidden border-b border-cream/10 bg-midnight py-3">
        <div className="vq-marquee flex w-max">
          {[false, true].map((hidden) => (
            <span
              key={String(hidden)}
              aria-hidden={hidden || undefined}
              className="whitespace-nowrap pr-2 text-sm tracking-[0.22em] text-gold [font-variant:small-caps] [font-variant-numeric:tabular-nums]"
            >
              forged together · built to last · aug 10–20 · free · eight nights ·{" "}
              forged together · built to last · aug 10–20 · free · eight nights ·{" "}
            </span>
          ))}
        </div>
      </div>

      {/* The shape of it — §03. "8 nights" and "8 sessions" were the same fact
          twice, so one of four slots said nothing new. Roster size leads and
          zero cost closes. `17+` keeps its suffix through CountUp; `$0` has
          nothing to animate to, so it just renders. */}
      <section className="bg-midnight">
        <div className="mx-auto flex max-w-[1440px] flex-wrap gap-x-14 gap-y-8 px-5 py-16 md:px-20">
          {/* Typed explicitly: a bare literal infers a union of shapes and
              destructuring `prefix`/`suffix` then fails on the members without
              them. */}
          {(
            [
              { n: 8, label: "nights" },
              { n: 21, label: "operators", suffix: "+" },
              { n: 90, label: "minutes a night" },
              { n: 0, label: "to attend", prefix: "$" },
            ] as { n: number; label: string; prefix?: string; suffix?: string }[]
          ).map(({ n, label, prefix, suffix }) => (
            <div key={label}>
              <p className="text-6xl font-semibold text-gold [font-variant-numeric:tabular-nums] md:text-[66px]">
                <CountUp value={n} prefix={prefix} suffix={suffix} />
              </p>
              <p className="mt-1 text-sm text-cream/70">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Manifesto — static-lit (scroll-lighting arrives in Phase 4) */}
      <section className="bg-midnight">
        <div className="mx-auto max-w-[1440px] px-5 pb-20 md:px-20 md:pb-28">
          <p className="max-w-[28ch] text-[28px] font-medium leading-[1.5] text-cream md:text-[38px]">
            {/* \u00a704 \u2014 Justin's own rewrite. He read the old version aloud on the
                Jul 23 call and said "we can both read that this came straight
                from chat"; this is his replacement, verbatim. The
                bigger-stages/pricier-badges framing moved to the National Black
                Business Month block (\u00a711) rather than being said twice. */}
            <ScrollLit text={"This is the first one. Eight nights, ninety minutes each, across every unit of the business you\u2019re building \u2014 brand, influence, sales, marketing and PR, technology, capital, and the exit you haven\u2019t thought about yet. You won\u2019t sit and take notes. You\u2019ll work on your own business in real time, in the room, with the people who\u2019ve already done it."} />
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-cream text-ink">
        {/* The three cards are h3s; without this the outline skips h1 → h3. */}
        <h2 className="sr-only">How it works</h2>
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:grid-cols-3 md:px-20 md:py-28">
          {/* §05a / §06 / §07 — step titles 1 and 2 stay per the brief; step 3
              retitled. The session opt-in line in step 2 is mirrored under the
              schedule and in the FAQ on purpose: "a reader who is stretched too
              thin needs to hear it more than once before it registers as
              permission." */}
          {[
            ["1", "Save your free seat.", "Free registration on Luma. Your confirmation arrives with the calendar invite attached — add it, and you're locked in for every night you choose."],
            ["2", "Show up live.", "Monday through Thursday, 6:30–8:00 PM ET. Choose your nights when you register — all eight, or only the ones your business needs. Every session is live and worked, not watched: exercises, breakouts, and real questions answered in the room."],
            ["3", "The room stays open.", "Every session replays inside Founders After Hours 24 hours later — along with speaker office hours, and the founders you met in the chat. It's where two weeks turns into a practice."],
          ].map(([n, t, b]) => (
            <div key={n} className="border-t border-ink/20 pt-5">
              <p className="text-3xl font-semibold text-ink [font-variant-numeric:tabular-nums]">{n}</p>
              <h3 className="mt-3 text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-[15.5px] leading-relaxed text-ink/78">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The 2026 speakers — 21 plates + THE FLIP (Justin: "the flip would go
          crazy"), now with 16 real headshots in the midnight/cream duotone.
          At 21 the grid closes perfectly uniform (7 rows of 3) — the featured
          tier is no longer needed as a modulo sink; night hosts carry a gold
          top-rule on the back instead. Hover flips on fine pointers; the chip
          is the keyboard/touch trigger. Spec: research doc §3–§4. */}
      <section id="speakers" className="scroll-mt-[72px] bg-midnight">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-medium md:text-[40px]">The 2026 speakers</h2>
              <p className="mt-2 text-xs tracking-[0.18em] text-gold/85 [font-variant:small-caps] [font-variant-numeric:tabular-nums]">
                rev 03 · jul 29 · twenty-one named
              </p>
            </div>
            <p className="max-w-[44ch] text-[15px] text-cream/75">
              Twenty-one builders, operators, and funders — no professional
              motivators. More announced weekly.{" "}
              <a href="/contact" className="text-gold underline underline-offset-4 hover:text-gold-hover">
                Get the speaker announcement →
              </a>
            </p>
          </div>
          <Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SPEAKERS.map((s, i) => (
                <SpeakerPlate key={s.name} s={s} index={i} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Two weeks, mapped — agenda with live row states */}
      <section id="schedule" className="scroll-mt-[72px] bg-cream text-ink">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-20 md:py-28">
          <h2 className="text-3xl font-medium md:text-[40px]">Two weeks, mapped</h2>
          <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
            {[NIGHTS.slice(0, 4), NIGHTS.slice(4)].map((week, w) => (
              <div key={w}>
                <p className="text-sm tracking-[0.14em] text-ink/65 [font-variant:small-caps]">
                  week {w === 0 ? "one" : "two"}
                </p>
                <ul className="mt-2">
                  {week.map((night) => {
                    const st = agendaRowState(night, now);
                    return (
                      <li
                        key={night.n}
                        className={`border-t py-4 ${st === "tonight" ? "border-t-2 border-gold" : "border-ink/15"}`}
                      >
                        <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-5">
                          <span className={`w-28 shrink-0 font-semibold [font-variant-numeric:tabular-nums] ${st === "replay" ? "text-ink/65" : "text-ink"}`}>
                            {night.day.split(" ").slice(1).join(" ")}
                          </span>
                          <span className={st === "replay" ? "text-ink/65" : ""}>
                            <strong className="font-semibold">{night.title}</strong>
                            {/* Discipline tag (brief §09) — stored title-case and
                                cased by CSS, so screen readers say "Sales", not
                                "S-A-L-E-S". Ink-on-cream: gold can't carry text
                                here (2.03:1). */}
                            <span className="ml-2 whitespace-nowrap align-[0.1em] text-[13px] tracking-[0.12em] text-ink/60 [font-variant:small-caps]">
                              {night.discipline}
                            </span>
                            <span className="text-ink/70"> — {night.subtitle}</span>
                          </span>
                        </div>
                        {st === "tonight" && (
                          <p className="mt-1 text-sm tracking-[0.12em] text-accent-deep [font-variant:small-caps]">
                            tonight · <a href={LUMA_URL} className="underline">join live 6:30 pm et</a>
                          </p>
                        )}
                        {st === "replay" && (
                          <p className="mt-1 text-sm tracking-[0.12em] [font-variant:small-caps]">
                            <a href="/founders-after-hours" className="text-accent-deep underline">replay in the community →</a>
                          </p>
                        )}
                      </li>
                    );
                  })}
                  {w === 0 && (
                    <li className="border-t border-dashed border-ink/25 py-4 text-sm tracking-[0.12em] text-ink/65 [font-variant:small-caps]">
                      aug 14–16 · off — go build
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
          {/* Brief §09 + the Jul 23 call, independently: this is the decision
              point. Someone who just read all eight titles has already made up
              their mind and shouldn't have to scroll to the footer to act. */}
          <p className="mt-8 max-w-[70ch] text-sm text-ink/60">
            All sessions 6:30–8:00 PM ET. One registration, and you choose the
            nights. Fridays through Sundays are yours — go build with the week.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <LumaRegisterButton ctaLocation="summit-agenda">Save My Free Seat</LumaRegisterButton>
            <span className="text-sm text-ink/65">
              Free · virtual · one registration covers all eight nights
            </span>
          </div>
        </div>
      </section>

      {/* Who it's for — §10 replaces all three rows with the audience tiers,
          and the heading Justin asked for on Jul 23 ("I will probably put like
          large header saying 'who is this for?'") finally lands. The section
          had no visible h2 at all, so this also closes a heading-outline gap.
          NOTE: "entrepreneurs" is scoped to THIS block — O1 reserves the
          sitewide swap for Justin. Do not extend it. */}
      <section className="bg-cream pb-20 text-ink md:pb-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <h2 className="mb-8 text-3xl font-medium md:text-[40px]">Who is this for?</h2>
          {[
            ["Idea-stage entrepreneurs", "you have the vision and the nerve. What's missing is the blueprint, and the conviction to start before it's perfect."],
            ["Early-stage entrepreneurs", "zero to three years in, revenue coming through the door, and every system in the business still running through you."],
            ["Scaling entrepreneurs", "the thing works. Now the questions are capital, leverage, and what this becomes when you're not the one holding it up."],
          ].map(([b, r]) => (
            <p key={b} className="border-t border-ink/15 py-5 text-lg">
              <strong className="font-semibold">{b}</strong>{" "}
              <span className="text-ink/78">{r}</span>
            </p>
          ))}
          <p className="mt-8 flex items-center gap-3 text-xl font-medium">
            <span aria-hidden className="inline-block h-px w-8 bg-gold" />
            If you&rsquo;re serious, you belong here.
          </p>
        </div>
      </section>

      {/* Why Justin built it */}
      <section className="bg-cream pb-20 text-ink md:pb-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="max-w-[62ch] border-t border-ink/15 pt-10">
            {/* §11 — rewritten, and the "Read the full story" link removed:
                "a closing thought from the founder should not hand off to
                another page." The byline STAYS here — this is the one place the
                brief deliberately keeps Justin's name, against the otherwise
                standing "brand without a face" direction. */}
            <p className="text-lg leading-relaxed text-ink/88">
              August is National Black Business Month. Most of what that means
              arrives as a conference — a flight, a hotel, a badge, and three
              days away from the business you&rsquo;re supposed to be building.
              This is the other thing. Ninety minutes a night, from the beach,
              the office, or the edge of your bed. Eight small deliberate moves
              instead of one big weekend. Come September, you won&rsquo;t have a
              lanyard. You&rsquo;ll have momentum.
            </p>
            <p className="mt-5 font-semibold">— Justin Shaw</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-[72px] bg-cream text-ink">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:grid-cols-[4fr_8fr] md:px-20 md:py-28">
          <h2 className="text-3xl font-medium md:text-[40px]">Questions, answered</h2>
          <div>
            {FAQ.map(([q, a]) => (
              <details key={q as string} className="group border-t border-ink/15 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                  {q}
                  <span aria-hidden className="text-2xl font-normal text-gold transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-ink/78">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors — moved below the FAQ (brief §13). It used to sit between
          the mission block and the FAQ, where "a founder mid-decision hits a
          block that is not addressed to them and loses momentum." Funders
          scroll further and with more patience than founders do.
          Copy reframed off philanthropic language in the same pass: Ventriq is
          for-profit now, and a foundation grant to a for-profit is a different
          and much harder transaction than a sponsorship. */}
      <section className="bg-cream text-ink">
        <div className="mx-auto max-w-[1440px] px-5 pb-20 md:px-20 md:pb-24">
          <div className="max-w-[760px] border border-ink/18 border-t-2 border-t-gold px-8 py-7">
            <h2 className="text-2xl font-medium">Put your name behind the builders</h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-ink/78">
              Summit sessions can be sponsored by companies and organizations
              that want to reach serious entrepreneurs — visibly and usefully.
            </p>
            <p className="mt-5">
              <a href="/contact" className="inline-block rounded-[2px] bg-gold px-6 py-[14px] font-semibold leading-none text-ink hover:bg-gold-hover">
                Sponsor the Summit
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-midnight">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-20 md:py-28">
          <h2 className="max-w-[16ch] text-4xl font-medium leading-[1.1] md:text-[52px]">
            Eight nights. Two weeks. Your move.
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <LumaRegisterButton ctaLocation="summit-final">Save My Free Seat</LumaRegisterButton>
            <span className="text-sm text-cream/60 [font-variant-numeric:tabular-nums]">
              Aug 10–20 · 6:30–8:00 PM ET · live on Zoom · free · one registration, all eight nights
            </span>
          </div>
        </div>
      </section>

      {/* Last in the DOM on purpose: the bar never intercepts tab order on the
          way down the page. Phone only. */}
      <MobileCtaBar />
    </main>
  );
}
