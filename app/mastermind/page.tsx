import type { Metadata } from "next";
import { Eyebrow, RedlineChip, PhotoGrade } from "@/components/primitives";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "The Mastermind — ten founders, ninety days — Ventriq" },
  description:
    "Ten founders, ninety days, weekly working sessions, a dashboard that keeps score — and a graduation bar you have to earn. Cohort 2 starts September 2026. Apply now.",
  alternates: { canonical: "/mastermind" },
  openGraph: { images: [{ url: "/og/mastermind.png", width: 1200, height: 630 }] },
};

/** Static hero gesture: two construction hairlines converging on a single
 *  point — the plan narrowing to the room. */
function ConvergingLines() {
  return (
    <svg aria-hidden viewBox="0 0 1440 520" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full" fill="none">
      <line x1="0" y1="80" x2="1150" y2="300" stroke="#C9A24C" strokeWidth="1" opacity="0.3" />
      <line x1="0" y1="470" x2="1150" y2="300" stroke="#C9A24C" strokeWidth="1" opacity="0.3" />
      <circle cx="1150" cy="300" r="2" fill="#C9A24C" opacity="0.55" />
    </svg>
  );
}

/** The three-pillar structure line: one gold line with a start tick and an
 *  arrowhead, dropping to the room, the scoreboard, and the systems. */
function StructureLine() {
  const drops: [number, string][] = [
    [60.5, "the room"],
    [440.5, "the scoreboard"],
    [820.5, "the systems"],
  ];
  return (
    <svg
      role="img"
      aria-label="Diagram: one structure line dropping to the room, the scoreboard, and the systems"
      viewBox="0 0 1120 132"
      className="mt-12 block h-auto w-full max-w-[1120px]"
      fill="none"
    >
      <line x1="0" y1="24" x2="1040" y2="24" stroke="#C9A24C" strokeWidth="1" />
      <line x1="0.5" y1="17" x2="0.5" y2="31" stroke="#C9A24C" strokeWidth="1" />
      <path d="M1040 24 L1032 20.5 L1032 27.5 Z" fill="#C9A24C" />
      {drops.map(([x, label]) => (
        <g key={label}>
          <line x1={x} y1="24" x2={x} y2="76" stroke="#C9A24C" strokeWidth="1" />
          <circle cx={x} cy="80" r="2.2" fill="#C9A24C" />
          <text x={x + 15.5} y="86" fill="rgba(241,236,223,0.85)" fontSize="15">
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function MastermindPage() {
  return (
    <main>
      {/* Hero — converging lines, one CTA, the deadline stated */}
      <section className="relative overflow-hidden bg-midnight">
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(700px 460px at 74% 42%, rgba(201,162,76,0.09), rgba(201,162,76,0) 70%)" }} />
        <ConvergingLines />
        <div className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-20 md:py-32">
          <Eyebrow>
            <span className="[font-variant-numeric:tabular-nums]">cohort 2 · September–December 2026 · 10 seats</span>
          </Eyebrow>
          <h1 className="mt-6 max-w-[17ch] text-4xl font-medium leading-[1.05] tracking-[-0.015em] md:text-[64px]">
            The room for what comes after the plan.
          </h1>
          <p className="mt-7 max-w-[56ch] text-lg leading-relaxed text-cream/85">
            You&rsquo;ve done the course. You&rsquo;ve got the strategy deck.
            Ninety days of installing it is what&rsquo;s rare — ten founders,
            weekly working sessions, a dashboard that keeps score, and
            advisors who&rsquo;ve built before you.
          </p>
          <div className="mt-9 flex flex-col items-start gap-3">
            <a href="/contact" className="inline-block rounded-[2px] bg-gold px-6 py-[15px] font-semibold leading-none text-ink hover:bg-gold-hover">
              Start your application
            </a>
            <span className="text-sm text-cream/75">
              Applications close <RedlineChip>APP-DEADLINE</RedlineChip>. The
              committee reads every one.
            </span>
          </div>
        </div>
      </section>

      {/* Who this is for — four ruled rows, criteria stated plainly */}
      <section className="bg-cream text-ink">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:grid-cols-[5fr_7fr] md:gap-16 md:px-20 md:py-28">
          <h2 className="text-3xl font-medium md:text-[44px] md:leading-[1.12]">This is for you if</h2>
          <div>
            {[
              "There's a real business: revenue, customers, something to grow — not just a deck.",
              "You're the bottleneck. Decisions, quality, follow-through: it all routes through you, and it's costing you.",
              "You can commit 90 minutes a week live, plus the work between sessions.",
              "You're coachable. You want a thinking partner and a room that pushes back — not a lecture.",
            ].map((row, i) => (
              <div key={row} className={`flex gap-4 border-t py-5 ${i === 0 ? "border-ink/20" : "border-ink/12"}`}>
                <span aria-hidden className="mt-[13px] h-px w-3.5 shrink-0 bg-gold" />
                <p className="text-[17.5px] leading-relaxed">{row}</p>
              </div>
            ))}
            <div aria-hidden className="border-t border-ink/20" />
            <p className="mt-6 text-[16px] leading-relaxed text-ink/70">
              <strong className="font-semibold text-ink">And plainly:</strong>{" "}
              this isn&rsquo;t for coaches selling coaching, spectators, or
              anyone who wants applause more than progress.
            </p>
          </div>
        </div>
      </section>

      {/* Three pillars — the drawn structure line, then his real program names */}
      <section className="bg-midnight">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-20 md:py-28">
          <h2 className="text-3xl font-medium md:text-[44px]">Ninety days, three pillars</h2>
          <StructureLine />
          <div className="mt-5 grid max-w-[1240px] gap-8 md:grid-cols-3 md:gap-14">
            {([
              ["Collaboration — the room.", "Ten founders max, cross-industry, every week. Your roadblocks get worked in-session by people who've hit them; marketplace opportunities move across the table because the industries don't compete. Plus one-on-one time with a strategic advisor throughout.", "md:mt-0"],
              ["Acceleration — the scoreboard.", "In week one you make your declaration pitch: what you're building this quarter, in front of the cohort. Then the dashboard tracks the metrics you chose — leads, sales, margin, hours — every week, in the open. Write the plan and make it plain.", "md:mt-6"],
              ["Escalation — the systems.", "Forge sessions turn what's working into documented process — so the business runs on systems, and stops running on you.", "md:mt-12"],
            ] as const).map(([t, b, m]) => (
              <article key={t} className={m}>
                <h3 className="text-xl font-semibold">{t}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-cream/80">{b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The format — the transparency block: a midnight spec sheet on cream */}
      <section className="bg-cream text-ink">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:grid-cols-[5fr_7fr] md:gap-16 md:px-20 md:py-28">
          <h2 className="text-3xl font-medium md:text-[44px] md:leading-[1.12]">The format, stated plainly</h2>
          <div className="overflow-hidden rounded-[2px] bg-midnight text-cream">
            <div aria-hidden className="h-[2px] bg-gold" />
            <div className="px-6 pb-8 pt-1 md:px-9 md:pb-9 md:pt-3">
              {([
                ["length", <>90 days — <RedlineChip>COHORT-DATES</RedlineChip></>],
                ["sessions", "weekly, Monday evenings, 60–90 minutes, live on Zoom"],
                ["cohort", "10 founders, maximum — chosen by committee for mix and fit"],
                ["between sessions", "private performance dashboard + the cohort community + 1:1 advisor access"],
                ["graduation", "hit 80% of your declared goals and fulfill the requirements — then you graduate, certificate and celebration included. Miss it, and you don't. The bar is the point."],
                ["investment", <>
                  <span className="font-semibold text-gold">$[INVESTMENT]</span>,
                  invoiced on acceptance. Partial scholarships exist — ask in
                  your application. <RedlineChip>README #3 — Justin&rsquo;s call</RedlineChip>
                </>],
              ] as [string, React.ReactNode][]).map(([label, value], i, rows) => (
                <div key={label} className={`grid gap-2 py-5 md:grid-cols-[170px_1fr] md:gap-6 ${i < rows.length - 1 ? "border-b border-cream/15" : ""}`}>
                  <span className="flex items-center gap-2.5">
                    <span aria-hidden className="inline-block h-px w-3 shrink-0 bg-gold" />
                    <span className="text-[14.5px] tracking-[0.1em] text-cream/70 [font-variant:small-caps]">{label}</span>
                  </span>
                  <span className="text-[16px] leading-[1.55] [font-variant-numeric:tabular-nums]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What graduates leave with — program claims, stated as program claims */}
      <section className="bg-cream pb-20 text-ink md:pb-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="max-w-[880px]">
            <h2 className="text-3xl font-medium md:text-[34px]">What graduates leave with</h2>
            <div className="mt-5">
              {[
                "Two to three systems documented and installed, not just planned.",
                "A tracking method you'll keep long after the ninety days.",
                "And hours back — most founders reclaim five to ten a week by the end.",
              ].map((row, i) => (
                <div key={row} className={`border-t py-[18px] ${i === 0 ? "border-ink/20" : "border-ink/12"}`}>
                  <p className="text-lg leading-relaxed">{row}</p>
                </div>
              ))}
              <div aria-hidden className="border-t border-ink/20" />
            </div>
            <p className="mt-3.5">
              <RedlineChip onCream>Program claims from cohort 1 design — replace with measured cohort-1 outcomes when Justin provides them; dropped the &ldquo;15–100% revenue&rdquo; range as unprintably wide</RedlineChip>
            </p>
          </div>
        </div>
      </section>

      {/* The application — four numbered steps, transparent dates, the honest rejection line */}
      <section className="bg-cream pb-20 text-ink md:pb-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="border-t border-ink/15 pt-14 md:pt-16">
            <h2 className="text-3xl font-medium md:text-[44px]">The application, step by step</h2>
            <div className="mt-10 grid max-w-[1240px] gap-8 md:grid-cols-4 md:gap-11">
              {([
                ["1", "Apply.", "About seven minutes. Honest answers beat polished ones — the committee is reading for fit, not grammar.", "md:mt-0"],
                ["2", "Committee review.", <>Every application gets read. Decisions land by <RedlineChip onCream>DECISION-DATE</RedlineChip>.</>, "md:mt-[26px]"],
                ["3", "Acceptance.", "Your letter arrives with the details and the invoice, and a window to commit your seat.", "md:mt-[52px]"],
                ["4", "Declaration pitch.", "Onboarding, then you tell the room what you're building this quarter — and they hold you to it.", "md:mt-[78px]"],
              ] as [string, string, React.ReactNode, string][]).map(([n, t, b, m]) => (
                <div key={n} className={`border-t border-ink/15 pt-5 ${m}`}>
                  <p className="text-[38px] font-semibold leading-none text-gold [font-variant-numeric:tabular-nums]">{n}</p>
                  <h3 className="mt-3 text-[19px] font-semibold">{t}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/78">{b}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-[62ch] text-[16.5px] leading-relaxed text-ink/80">
              Not accepted this cohort? You&rsquo;ll hear it straight, with the
              why — and{" "}
              <a href="/founders-after-hours" className="font-medium text-accent-deep hover:underline">
                Founders After Hours
              </a>{" "}
              is open to you either way.
            </p>
          </div>
        </div>
      </section>

      {/* Founder letter — portrait, the flagged pull-quote, signature */}
      <section className="bg-cream pb-20 text-ink md:pb-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="grid gap-10 border-t border-ink/15 pt-14 md:grid-cols-[4fr_7fr] md:items-center md:gap-16 md:pt-[72px]">
            <PhotoGrade label="Justin Shaw — warm, navy-tinted grade" className="min-h-[280px] md:min-h-[360px]" />
            <div>
              <p className="text-xl leading-[1.65]">
                I&rsquo;ve sat in rooms that changed my business — and paid for
                a few that didn&rsquo;t. The difference was never the content.
                It was whether the room expected something of me.
              </p>
              <p className="mt-4 text-xl leading-[1.65]">This one does.</p>
              <figure className="mt-6">
                <svg aria-hidden viewBox="0 0 64 10" className="w-16" fill="none">
                  <line x1="0" y1="5" x2="64" y2="5" stroke="#C9A24C" strokeWidth="1" />
                  <line x1="0.5" y1="0" x2="0.5" y2="10" stroke="#C9A24C" strokeWidth="1" />
                </svg>
                <blockquote className="mt-3.5 max-w-[28ch] text-2xl font-medium leading-[1.4] md:text-[27px]">
                  &ldquo;We&rsquo;re not here to make you feel good; we&rsquo;re
                  here to forge founders who can scale the thing.&rdquo;
                </blockquote>
                <p className="mt-3.5">
                  <RedlineChip onCream>⚠️ paraphrased from his interviews — verify before setting as a pull-quote</RedlineChip>
                </p>
              </figure>
              <p className="mt-6 text-xl leading-[1.65]">
                If that reads as pressure, it isn&rsquo;t your room yet. If it
                reads as relief — apply.
              </p>
              <p className="mt-6 text-[17px] font-semibold">— Justin Shaw</p>
              <span aria-hidden className="mt-3 block h-px w-14 bg-gold" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream pb-20 text-ink md:pb-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="grid gap-10 border-t border-ink/15 pt-14 md:grid-cols-[4fr_8fr] md:pt-16">
            <h2 className="text-3xl font-medium md:text-[40px]">Questions, answered</h2>
            <div>
              {([
                ["What does it cost?", <><RedlineChip onCream>Justin&rsquo;s call — two variants</RedlineChip> Variant A: It&rsquo;s $[INVESTMENT], invoiced on acceptance — and partial scholarships exist; ask in your application. · Variant B: The investment is shared at acceptance, with time to decide before you commit. Either way: no surprise fees, no upsells inside the room.</>],
                ["What if I miss a week?", "Life happens; patterns don't get to. Sessions are recorded for the cohort, but the room only works if you're in it — miss enough and graduation math gets hard."],
                ["Why only ten?", "Because twelve is a class and eight is a clique. Ten founders means everyone's business gets worked on, every month, out loud."],
                ["What's the dashboard?", "A private tracker for the metrics you declared — updated weekly, visible to your cohort. Not surveillance; a scoreboard. The board doesn't lie."],
                ["What if I don't hit 80%?", "Then you don't graduate — and we'll both know exactly why, which is worth more than the certificate."],
                ["How is this different from an accelerator or 10KSB?", "Those programs teach, some brilliantly — and many are free; go do them. This room is for installing what you already know, with people who won't let you drift. Think of it as the after-program."],
                ["Is this the IAMJS mastermind?", "It grew from it. The pilot cohort ran January–March 2026 under IAMJS; Ventriq now runs it as a nonprofit program, same architect."],
                ["When is cohort 3?", "Early 2027, most likely. But you're reading this now, and the September room has ten seats."],
              ] as [string, React.ReactNode][]).map(([q, a]) => (
                <details key={q} className="group border-t border-ink/15 py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                    {q}
                    <span aria-hidden className="text-2xl font-normal text-gold transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-ink/78">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-midnight">
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(700px 420px at 70% 40%, rgba(201,162,76,0.09), rgba(201,162,76,0) 70%)" }} />
        <div className="relative mx-auto max-w-[1440px] px-5 py-20 md:px-20 md:py-28">
          <h2 className="max-w-[18ch] text-4xl font-medium leading-[1.1] md:text-[52px]">
            Declare it. Track it. Build it.
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a href="/contact" className="inline-block rounded-[2px] bg-gold px-6 py-[15px] font-semibold leading-none text-ink hover:bg-gold-hover">
              Start your application
            </a>
            <span className="text-[15px] text-cream/80 [font-variant-numeric:tabular-nums]">
              Applications close <RedlineChip>APP-DEADLINE</RedlineChip> ·
              decisions by <RedlineChip>DECISION-DATE</RedlineChip>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
