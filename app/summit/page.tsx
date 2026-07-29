import type { Metadata } from "next";
import { Eyebrow } from "@/components/primitives";
import { LumaRegisterButton } from "@/components/luma-register-button";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
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
  organizer: { "@id": "https://ventriq.io/#org", name: "Ventriq", url: "https://ventriq.io" },
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD", availability: "https://schema.org/InStock", url: LUMA_URL, validFrom: "2026-07-20T00:00:00-04:00" },
  description:
    "Eight nights, two weeks — brand, PR, sales, technology, capital, exit. Every session ends with a move you can make the next morning. Free, virtual, live on Zoom.",
};

function Rays() {
  const vp = { x: 1120, y: 260 };
  const edges = [[0, 40], [0, 260], [0, 520], [300, 620], [760, 620], [1180, 620], [1440, 560], [1440, 60], [900, 0], [420, 0]];
  return (
    <svg aria-hidden viewBox="0 0 1440 620" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.26]" fill="none">
      {edges.map(([x, y], i) => (
        <line key={i} className="vq-draw" pathLength={1} style={{ ["--vqd" as string]: `${i * 0.07}s` }} x1={x} y1={y} x2={vp.x} y2={vp.y} stroke="#C9A24C" strokeWidth="0.75" />
      ))}
      <circle cx={vp.x} cy={vp.y} r="2.2" fill="#C9A24C" />
      {[[-14, 0, -6, 0], [6, 0, 14, 0], [0, -14, 0, -6], [0, 6, 0, 14]].map(([a, b, c, d], i) => (
        <line key={`c${i}`} x1={vp.x + a} y1={vp.y + b} x2={vp.x + c} y2={vp.y + d} stroke="#C9A24C" strokeWidth="1" />
      ))}
    </svg>
  );
}

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
        <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-cream/85">
          All eight sessions live in Founders After Hours — replays, office hours, and the founders who showed up. Membership from $39/month.
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
      <div style={{ ["--vqd" as string]: "1.7s" }} className="vq-in mt-10 flex flex-wrap items-center gap-6">
        <LumaRegisterButton ctaLocation="summit-hero">Save My Free Seat</LumaRegisterButton>
        <span className="text-sm text-cream/60">Registration runs on Luma — about a minute, free.</span>
      </div>
      {/* Watched by MobileCtaBar: while this is on screen the sticky bar stays
          down, so a phone never shows two identical buttons at once. */}
      <div id="vq-hero-cta-sentinel" aria-hidden className="h-px w-px" />
      <p className="mt-8 text-sm tracking-[0.1em] text-cream/60 [font-variant:small-caps]">doors open in</p>
      <p className="mt-1 text-sm tracking-[0.14em] text-cream/80 [font-variant:small-caps] [font-variant-numeric:tabular-nums]">
        aug 10–20 · 6:30–8:00 pm et · zoom · free
      </p>
    </>
  );
}

/** The five speakers Justin named in his Jul 23 Kit broadcast — already sent
 *  to his list, so cleared for print. Names, titles and proof lines are his
 *  wording, verbatim (note "Jerone Anthony Tyler" and "Jeffrey", which differ
 *  from the shorter forms in his speakers tracker).
 *  Source: docs/plans/summit-aug-1/01-phase-1-research.md §10.1 */
const SPEAKERS = [
  {
    name: "Jerone Anthony Tyler",
    title: "Founder, Posteridy.ai",
    proof: "Has helped entrepreneurs secure $30M+ in funding.",
    role: "hosting Capital & Command",
  },
  {
    name: "Cedric Powell",
    title: "M&A Partner, Squire Patton Boggs",
    proof:
      "Advises private equity buyers and sellers on acquisitions, divestitures, and recapitalizations.",
    role: "",
  },
  {
    name: "Theodore Savage",
    title: "Founder, The Cultivation Effect®",
    proof:
      "Former global executive who led 1,500+ employees across 90+ locations.",
    role: "opening the summit",
  },
  {
    name: "Tiffany Bethea",
    title: "Executive Director, Baltimore City Chamber of Commerce",
    proof: "Brand strategist whose clients double revenue in 30–60 days.",
    role: "",
  },
  {
    name: "Jeffrey Scruggs",
    title: "Founder, Majestic Light Group",
    proof:
      "AI engineer built at the Department of Defense and Booz Allen Hamilton.",
    role: "",
  },
];

const FAQ: [string, React.ReactNode][] = [
  ["What does it cost?", "Nothing — the seat is free. Register on Luma and you're in every night live."],
  ["What if I can't make a session live?", "Every replay lands in Founders After Hours 24 hours after the session — that's the membership community, from $39/month. The live seat is the free one; save it and show up."],
  ["How much time is this, honestly?", "Ninety minutes a night, Monday through Thursday, for two weeks. Fridays through Sundays are yours. It's built for people running businesses, because you are."],
  ["Who are the speakers?", "Operators, builders, and funders — people who've done the thing they're teaching. Seventeen-plus of them across the eight nights, with more announced weekly."],
  ["Will I be pitched?", "Every session is seventy percent teaching, thirty percent questions. Nobody's selling you a course at the end. The only call-to-action you'll hear is Founders After Hours — and its price is on the label."],
  ["What do I need?", "Zoom, a notebook, and one real challenge in your business you want to move."],
  ["Can I send my team?", "Yes — registration is per person, so have them grab their own seats. It's free for everybody who builds."],
  ["What's Founders After Hours?", <>Ventriq&rsquo;s working community: replays, office hours with advisors, webinars, and a monthly in-person hour where founders do the work together. <a href="/founders-after-hours" className="text-accent-deep underline">Read about it →</a></>],
];

export default function SummitPage() {
  const now = new Date();
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />

      {/* Hero — state machine, rays behind */}
      <section className="relative overflow-hidden bg-midnight">
        <Rays />
        <div className="vq-hero relative mx-auto max-w-[1440px] px-5 py-24 md:px-20 md:py-32">
          <Hero />
        </div>
      </section>

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

      {/* The shape of it — count-up band (static; NumberFlow in Phase 4) */}
      <section className="bg-midnight">
        <div className="mx-auto flex max-w-[1440px] flex-wrap gap-x-14 gap-y-8 px-5 py-16 md:px-20">
          {[[8, "nights"], [8, "sessions"], [90, "minutes a night"], [2, "weeks"]].map(([n, l]) => (
            <div key={l as string}>
              <p className="text-6xl font-semibold text-gold [font-variant-numeric:tabular-nums] md:text-[66px]">
                <CountUp value={n as number} />
              </p>
              <p className="mt-1 text-sm text-cream/70">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Manifesto — static-lit (scroll-lighting arrives in Phase 4) */}
      <section className="bg-midnight">
        <div className="mx-auto max-w-[1440px] px-5 pb-20 md:px-20 md:pb-28">
          <p className="max-w-[28ch] text-[28px] font-medium leading-[1.5] text-cream md:text-[38px]">
            <ScrollLit text={"Every August, the stages get bigger and the badges get pricier. This is the other thing. Eight nights in the summer. Ninety minutes at a time. People who\u2019ve built, telling you exactly how \u2014 and a room that keeps the receipts. The resources are out there. For two weeks, they\u2019re not camouflaged."} />
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-cream text-ink">
        {/* The three cards are h3s; without this the outline skips h1 → h3. */}
        <h2 className="sr-only">How it works</h2>
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:grid-cols-3 md:px-20 md:py-28">
          {[
            ["1", "Save your free seat.", "Takes a minute on Luma. Your confirmation email carries the calendar invite; add it before you forget."],
            ["2", "Show up live.", "Monday through Thursday nights, 6:30–8:00 PM ET, for two weeks. Seventy percent teaching, thirty percent your questions. Then Friday through Sunday — go build with it."],
            ["3", "Keep the room.", "Founders After Hours holds every replay 24 hours after each session, along with speaker office hours and the founders you met in the chat. Membership from $39/month."],
          ].map(([n, t, b]) => (
            <div key={n} className="border-t border-ink/20 pt-5">
              <p className="text-3xl font-semibold text-ink [font-variant-numeric:tabular-nums]">{n}</p>
              <h3 className="mt-3 text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-[15.5px] leading-relaxed text-ink/78">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The 2026 speakers — the five named in Justin's Jul 23 broadcast.
          Already public, so cleared to print; his spellings, his proof lines.
          Text-first by decision (Phase 2 D-B) — the photo grid and flip cards
          wait on real headshots. Corner ticks carry the drafting register in
          place of the portrait. */}
      <section className="bg-midnight">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-3xl font-medium md:text-[40px]">The 2026 speakers</h2>
            <p className="max-w-[44ch] text-[15px] text-cream/75">
              Seventeen-plus builders, operators, and funders — no professional
              motivators. More announced weekly.{" "}
              <a href="/contact" className="text-gold underline underline-offset-4 hover:text-gold-hover">
                Get the speaker announcement →
              </a>
            </p>
          </div>
          <ul className="mt-10 grid gap-px bg-cream/13 sm:grid-cols-2 lg:grid-cols-3">
            {SPEAKERS.map((s) => (
              <li key={s.name} className="relative bg-midnight px-6 py-7">
                <svg aria-hidden className="absolute left-2 top-2 h-3 w-3" fill="none" viewBox="0 0 12 12">
                  <path d="M0 4 V0 H4" stroke="#C9A24C" strokeWidth="1" />
                </svg>
                <h3 className="text-lg font-semibold leading-snug">{s.name}</h3>
                <p className="mt-1 text-sm text-gold">{s.title}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-cream/78">{s.proof}</p>
                {s.role && (
                  <p className="mt-3 text-xs tracking-[0.14em] text-cream/55 [font-variant:small-caps]">
                    {s.role}
                  </p>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[15px] text-cream/70">
            And that&rsquo;s five of seventeen. Goldman Sachs advisors. Angel
            investors. Luxury brand strategists. Tax and capital specialists.
          </p>
        </div>
      </section>

      {/* Two weeks, mapped — agenda with live row states */}
      <section className="bg-cream text-ink">
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

      {/* Who it's for */}
      <section className="bg-cream pb-20 text-ink md:pb-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          {[
            ["Small business owners", "past the idea stage — there's revenue, customers, a real thing to grow."],
            ["Startup founders", "from first traction to first raise, tired of advice that assumes a Stanford network."],
            ["Nonprofit builders", "who run their organization like founders, because they are."],
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
            <p className="text-lg leading-relaxed text-ink/88">
              August is National Black Business Month, and every fall the big
              conferences arrive with big stages and bigger badges. This is the
              other thing: eight nights in the summer, ninety minutes at a
              time, where the point isn&rsquo;t who&rsquo;s in the room —
              it&rsquo;s what you do when you leave it. That&rsquo;s the whole
              Ventriq idea, in miniature.
            </p>
            <p className="mt-5 font-semibold">— Justin Shaw</p>
            <p className="mt-3">
              <a href="/about" className="font-medium text-accent-deep hover:underline">Read the full story →</a>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream text-ink">
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
              Aug 10–20 · 6:30–8:00 PM ET · live on Zoom · free
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
