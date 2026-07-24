import type { Metadata } from "next";
import { Eyebrow, RedlineChip, PhotoGrade } from "@/components/primitives";
import { Monogram } from "@/components/monogram";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "About Ventriq — built by a founder nobody handed a map" },
  description:
    "Ventriq (ven-TREEK) is a nonprofit built by Justin Shaw — Baltimore founder, Goldman Sachs 10KSB alum — to hand other builders the map he never got.",
  alternates: { canonical: "/about" },
  openGraph: { images: [{ url: "/og/about.png", width: 1200, height: 630 }] },
};

/** Static corridor line pair behind the hero heading — two faint gold
 *  construction lines converging on a vanishing point (draw-in arrives Phase 4). */
function CorridorLines() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 480"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
    >
      <line x1="0" y1="60" x2="1180" y2="330" stroke="#C9A24C" strokeWidth="1" opacity="0.28" />
      <line x1="0" y1="430" x2="1180" y2="330" stroke="#C9A24C" strokeWidth="1" opacity="0.28" />
      <circle cx="1180" cy="330" r="2" fill="#C9A24C" opacity="0.5" />
    </svg>
  );
}

/** Gold pull-quote rule: hairline + end tick (drafting semantics). */
function QuoteRule({ w = 72 }: { w?: number }) {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${w} 10`}
      width={w}
      height="10"
      className="block shrink-0"
      fill="none"
    >
      <line x1="0" y1="5" x2={w} y2="5" stroke="#C9A24C" strokeWidth="1" />
      <line x1="0.5" y1="0" x2="0.5" y2="10" stroke="#C9A24C" strokeWidth="1" />
    </svg>
  );
}

/** Margin drafting label: gold tick + a date numeral or a small-caps phase name. */
function MarginLabel({
  children,
  numeral = false,
}: {
  children: React.ReactNode;
  numeral?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-2.5">
      <span aria-hidden className="inline-block h-px w-3.5 shrink-0 self-center bg-gold" />
      {numeral ? (
        <span className="text-2xl font-semibold [font-variant-numeric:tabular-nums]">
          {children}
        </span>
      ) : (
        <span className="text-[15px] font-semibold leading-snug tracking-[0.1em] [font-variant:small-caps]">
          {children}
        </span>
      )}
    </div>
  );
}

/** One story row: 130px drafting margin + the reading column. */
function StoryRow({
  label,
  rule = true,
  children,
}: {
  label?: React.ReactNode;
  rule?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`grid gap-4 md:grid-cols-[130px_1fr] md:gap-7 ${
        rule ? "border-t border-ink/12 pt-7 md:pt-9" : ""
      }`}
    >
      {label ?? <span aria-hidden className="hidden md:block" />}
      <div className="flex flex-col gap-[18px]">{children}</div>
    </div>
  );
}

/** Dashed empty advisor slot — faint circle-and-arc bust, pre-launch state. */
function AdvisorSlot() {
  return (
    <div className="relative h-[120px] rounded-[2px] border border-dashed border-ink/30 md:h-[150px]">
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 text-ink/25 md:h-[68px] md:w-[68px]"
        fill="none"
      >
        <circle cx="50" cy="32" r="13" stroke="currentColor" strokeWidth="1" />
        <path d="M18 88 C30 60, 70 60, 82 88" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="bg-cream text-ink">
      {/* S1 · Hero — the one cream-led page; corridor pair drawn faint behind the heading */}
      <section className="relative overflow-hidden">
        <CorridorLines />
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-10 px-5 pb-12 pt-16 md:grid-cols-[7fr_4fr] md:gap-20 md:px-20 md:pb-20 md:pt-24">
          <div>
            <Eyebrow onCream>ven-treek · est. Baltimore, 2026</Eyebrow>
            <h1 className="mt-6 max-w-[17ch] text-4xl font-medium leading-[1.08] tracking-[-0.015em] md:text-[60px] md:leading-[1.06]">
              Built by a founder nobody handed a map.
            </h1>
          </div>
          <PhotoGrade
            label="Justin Shaw — warm, navy-tinted grade"
            className="min-h-[300px] md:min-h-[420px]"
          />
        </div>
      </section>

      {/* S2 · The story — ~880px reading measure, margin drafting labels */}
      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="flex max-w-[880px] flex-col gap-8 md:gap-10">
            <StoryRow rule={false} label={<MarginLabel numeral>2015</MarginLabel>}>
              <p className="text-base leading-[1.7] text-ink/88 md:text-lg">
                A Corner Bakery in Pikesville, Maryland. Justin Shaw was working
                a job he didn&rsquo;t want, and a friend asked him the question
                that started everything:
              </p>
              <div className="flex items-center gap-3 py-1 md:gap-4">
                <QuoteRule w={56} />
                <p className="text-[22px] font-medium leading-[1.3] md:text-[27px]">
                  &ldquo;What do you like?&rdquo;
                </p>
              </div>
              <p className="text-base leading-[1.7] text-ink/88 md:text-lg">
                The honest answer — &ldquo;suits, I guess&rdquo; — took two more
                years to become anything.
              </p>
            </StoryRow>

            <StoryRow label={<MarginLabel numeral>2017</MarginLabel>}>
              <p className="text-base leading-[1.7] text-ink/88 md:text-lg">
                It became something at a desk, with a prayer, when a $1,000
                grant call came minutes after he&rsquo;d decided to risk it. He
                gave himself ninety days. On September 1 at 7 p.m., his custom
                clothing company went live; by midnight it was booked out two
                weeks, and by October he&rsquo;d quit the day job. For years he
                drove rideshare from 5 a.m. to noon and built in the evenings.
              </p>
            </StoryRow>

            <StoryRow label={<MarginLabel>the decade since</MarginLabel>}>
              <p className="text-base leading-[1.7] text-ink/88 md:text-lg">
                That company grew into a six-figure business that dressed
                Baltimore&rsquo;s mayor twice. Justin graduated from Goldman
                Sachs&rsquo; 10,000 Small Businesses program, co-authored a
                book, hosted more than a hundred events for entrepreneurs, and
                generated over a million dollars across his ventures — most of
                that time spent doing one thing in different costumes: putting
                resources in founders&rsquo; hands.{" "}
                <RedlineChip onCream>
                  STATS — his self-authored receipts; confirm the set — README #5/#7
                </RedlineChip>
              </p>
            </StoryRow>

            <StoryRow rule={false}>
              <figure className="flex flex-col items-start gap-4">
                <QuoteRule />
                <blockquote className="max-w-[24ch] text-2xl font-medium leading-[1.35] md:text-[31px]">
                  &ldquo;It&rsquo;s not a transaction for me, it&rsquo;s a
                  transformation.&rdquo;
                </blockquote>
                <figcaption className="text-sm tracking-[0.04em] text-ink/60">
                  — Justin Shaw, AFRO, 2023
                </figcaption>
              </figure>
            </StoryRow>

            <StoryRow label={<MarginLabel>the pattern</MarginLabel>}>
              <p className="text-base leading-[1.7] text-ink/88 md:text-lg">
                Everywhere he worked, the same thing kept being true: the
                resources founders need mostly exist. The grants, the advisors,
                the rooms — they&rsquo;re out there. They&rsquo;re just
                camouflaged, findable only by people who already know somebody.
                Programs end. Cohorts graduate. And founders go back to
                building alone.
              </p>
            </StoryRow>

            <StoryRow label={<MarginLabel numeral>2026</MarginLabel>}>
              <p className="text-base leading-[1.7] text-ink/88 md:text-lg">
                Ventriq is his answer — a nonprofit that holds capital,
                programming, and council under one roof, so no founder has to
                choose which kind of help to go hunting for by themselves.
                It&rsquo;s the structure he wishes had existed at that desk in
                2017.
              </p>
            </StoryRow>
          </div>
        </div>
      </section>

      {/* S3 · The name — the monogram, large, over the threshold line */}
      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="grid items-center gap-10 border-t border-ink/12 pt-12 md:grid-cols-[5fr_7fr] md:gap-20 md:pt-[72px]">
            <div className="flex w-fit flex-col items-center">
              <Monogram className="h-52 w-auto text-ink md:h-[280px]" />
              <span aria-hidden className="mt-6 block h-[2px] w-20 bg-gold" />
            </div>
            <div>
              <h2 className="text-3xl font-medium tracking-[-0.01em] md:text-[44px]">
                Why &ldquo;Ventriq&rdquo;?
              </h2>
              <p className="mt-5 max-w-[52ch] text-base leading-[1.65] text-ink/88 md:text-[19px]">
                Ventriq — say it{" "}
                <strong className="font-semibold">ven-TREEK</strong> — is
                venture + corridor. The mark is two lines converging on a way
                in: a V, a corridor, a threshold. That&rsquo;s the whole idea,
                drawn — a room worth getting into, and a door that actually
                opens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* S4 · Mission — the midnight card, 2px gold top rule */}
      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="rounded-[2px] bg-midnight text-cream">
            <div className="h-[2px] bg-gold" />
            <div className="px-6 py-8 md:px-16 md:pb-[60px] md:pt-14">
              <p className="max-w-[34ch] text-[20px] font-medium leading-[1.45] md:text-[30px]">
                Ventriq equips founders — small business owners, startups, and
                nonprofits, with a focus on the builders the old models
                overlook — through capital, programming, and council. Rooted in
                Baltimore. Built to travel.
              </p>
              <p className="mt-4">
                <RedlineChip>
                  MISSION — Justin to ratify; README #6 · COUNSEL-REVIEW on audience wording
                </RedlineChip>
              </p>
              <dl className="mt-6 w-full max-w-[720px] md:mt-10">
                {[
                  ["Capital", "grants, pitch competitions, and a road to funding readiness."],
                  ["Programming", "the Summit, Founders After Hours, the Mastermind: built for implementation."],
                  ["Council", "advisors who’ve done it, on call — office hours, not gatekeepers."],
                ].map(([t, d]) => (
                  <div
                    key={t}
                    className="grid gap-1 border-t border-cream/15 py-4 md:grid-cols-[170px_1fr] md:gap-5"
                  >
                    <dt className="text-[17px] font-semibold">{t}</dt>
                    <dd className="text-[15.5px] leading-[1.55] text-cream/80">{d}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* S5 · How it's funded — v1.1: "Back the builders →" is parked with the
          Donate page (00-global §CTA inventory); the section ends on the sentence. */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="max-w-[760px]">
            <QuoteRule />
            <h2 className="mt-4 text-[27px] font-medium tracking-[-0.01em] md:text-[34px]">
              Skin in the game
            </h2>
            <p className="mt-4 text-base leading-[1.65] text-ink/88 md:text-lg">
              Ventriq doesn&rsquo;t wait on grants to do the work. Ten percent
              of everything Justin&rsquo;s ventures earn funds this
              organization — committed before any donor gives a dollar.{" "}
              <RedlineChip onCream>TITHE — README #4</RedlineChip> Donations and
              sponsorships extend what that foundation starts.
            </p>
          </div>
        </div>
      </section>

      {/* S6 · The founder, formally */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="grid items-start gap-6 border-y border-ink/15 py-8 md:grid-cols-[240px_1fr] md:gap-14 md:py-12">
            <PhotoGrade
              label="Justin Shaw"
              className="min-h-[190px] w-40 md:w-auto md:min-h-[280px]"
            />
            <p className="max-w-[66ch] text-base leading-[1.7] text-ink/88 md:text-lg">
              <strong className="font-semibold">Justin Shaw</strong> is a
              Baltimore-born entrepreneur and ecosystem builder. He founded a
              bespoke clothing company at 22 and ran it for eight years;
              graduated from Goldman Sachs 10,000 Small Businesses; co-authored{" "}
              <cite className="font-semibold not-italic">Emerge</cite>; and has
              spent his career in economic development, leading programming and
              partnerships for founders across Maryland.{" "}
              <RedlineChip onCream>
                MIC title by name — Justin&rsquo;s call, README #7
              </RedlineChip>{" "}
              He&rsquo;s a husband and a father, and if you ask what the whole
              thing runs on, he&rsquo;ll tell you: faith, family, and
              follow-through.
            </p>
          </div>
        </div>
      </section>

      {/* S7 · The council — pre-launch state, four empty slots */}
      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <h2 className="text-[27px] font-medium tracking-[-0.01em] md:text-[34px]">
            The council
          </h2>
          <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.6] text-ink/78 md:text-[17px]">
            <RedlineChip onCream>ADVISORS — TBD; pre-launch state:</RedlineChip>{" "}
            The first advisors join this fall, starting with the
            Summit&rsquo;s speakers — operators and funders who hold office
            hours inside Founders After Hours.
          </p>
          <div className="mt-6 grid max-w-[880px] grid-cols-2 gap-3.5 md:mt-8 md:grid-cols-4 md:gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <AdvisorSlot key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* S8 · Final CTA */}
      <section className="bg-midnight text-cream">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-20 md:py-28">
          <h2 className="max-w-[18ch] text-4xl font-medium leading-[1.1] tracking-[-0.01em] md:text-[48px]">
            Ready to build differently?
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="/summit"
              className="inline-block rounded-[2px] bg-gold px-6 py-[15px] font-semibold leading-none text-ink hover:bg-gold-hover"
            >
              Register for the Summit
            </a>
            <a
              href="/founders-after-hours"
              className="inline-block rounded-[2px] border border-gold/75 px-6 py-[14px] font-medium leading-none text-gold hover:bg-gold/10"
            >
              Join Founders After Hours
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
