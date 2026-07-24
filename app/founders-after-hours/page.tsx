import type { Metadata } from "next";
import { Eyebrow, RedlineChip, PhotoGrade } from "@/components/primitives";
import { ChapterForm } from "@/components/chapter-form";
import { CountUp } from "@/components/motion";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Founders After Hours — the founder community that does the work" },
  description:
    "A Ventriq membership: session replays, advisor office hours, and a monthly in-person hour where founders make the calls, send the emails, and tally the wins. From $39/month.",
  alternates: { canonical: "/founders-after-hours" },
  openGraph: { images: [{ url: "/og/founders-after-hours.png", width: 1200, height: 630 }] },
};

/** Static tally strokes (draw-in arrives Phase 4): groups of five with jitter,
 *  one group stopped at three — the page's one gesture. */
function TallyMarks() {
  const groups = [
    { x: 880, y: 90, r: -2, n: 5 },
    { x: 1060, y: 150, r: 1.5, n: 5 },
    { x: 960, y: 260, r: -1, n: 5 },
    { x: 1180, y: 320, r: 2, n: 3 },
    { x: 860, y: 400, r: 1, n: 5 },
  ];
  return (
    <svg aria-hidden viewBox="0 0 1440 520" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.5]" fill="none">
      {groups.map((g, gi) => (
        <g key={gi} transform={`rotate(${g.r} ${g.x} ${g.y})`}>
          {Array.from({ length: Math.min(g.n, 4) }, (_, i) => (
            <line key={i} className="vq-draw" pathLength={1} style={{ ["--vqd" as string]: `${gi * 0.48 + i * 0.095}s` }} x1={g.x + i * 14 + (i % 2)} y1={g.y + (i % 3)} x2={g.x + i * 14 - (i % 2)} y2={g.y + 56 - (i % 3)} stroke="#C9A24C" strokeWidth="2" strokeLinecap="round" />
          ))}
          {g.n === 5 && (
            <line className="vq-draw" pathLength={1} style={{ ["--vqd" as string]: `${gi * 0.48 + 0.45}s` }} x1={g.x - 10} y1={g.y + 46} x2={g.x + 52} y2={g.y + 8} stroke="#C9A24C" strokeWidth="2" strokeLinecap="round" />
          )}
        </g>
      ))}
    </svg>
  );
}

export default function FahPage() {
  return (
    <main>
      {/* Hero — tally strokes, the one gesture; no ticker on this page */}
      <section className="relative overflow-hidden bg-midnight">
        <TallyMarks />
        <div className="vq-hero relative mx-auto max-w-[1440px] px-5 py-24 md:px-20 md:py-32">
          <Eyebrow>a Ventriq community · Baltimore first</Eyebrow>
          <h1 className="mt-6 max-w-[15ch] text-4xl font-medium leading-[1.08] tracking-[-0.015em] md:text-[60px]">
            Come do the work. We&rsquo;ll count it.
          </h1>
          <p className="mt-8 max-w-[54ch] text-lg leading-relaxed text-cream/85">
            Founders After Hours is a working membership — a digital home for
            replays, office hours, and straight answers, and a monthly
            in-person night where the first hour is heads-down execution and
            every result goes up on the board.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a href="/contact" className="inline-block rounded-[2px] bg-gold px-6 py-[15px] font-semibold leading-none text-ink hover:bg-gold-hover">
              Join Founders After Hours
            </a>
            <span className="text-sm text-cream/70">
              From $39/month · cancel anytime <RedlineChip>POLICY — confirm</RedlineChip>{" "}
              <RedlineChip>SKOOL-URL — platform TBC</RedlineChip>
            </span>
          </div>
          <p className="mt-6">
            <a href="/contact" className="text-accent hover:underline">
              Want a chapter in your city? Raise your hand →
            </a>
          </p>
        </div>
      </section>

      {/* Three doors in — role cards, no numerals (roles aren't a sequence) */}
      <section className="bg-cream text-ink">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-20 md:py-28">
          <h2 className="text-3xl font-medium md:text-[40px]">Three doors in</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
            {[
              ["Join the room.", "The digital home: every Summit replay 24 hours after it airs, monthly webinars, advisor office hours, and founders worth knowing between meetups.", "md:mt-0"],
              ["Show up.", "One night a month, in person. Baltimore first, then wherever founders raise their hands. The hour is the point — see below.", "md:mt-[30px]"],
              ["Bring your challenge.", "Each night has a focus — sales, funding, hiring. You come with your list: the prospects to call, the emails to send, the asks you've been sitting on.", "md:mt-[56px]"],
            ].map(([t, b, m]) => (
              <article key={t as string} className={`border border-ink/18 border-t-2 border-t-gold bg-cream px-7 py-6 rounded-[2px] ${m}`}>
                <h3 className="text-xl font-semibold">{t}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-ink/78">{b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The hour, mapped — run-of-show + photo strip */}
      <section className="bg-cream pb-20 text-ink md:pb-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:grid-cols-[6fr_5fr] md:gap-20 md:px-20">
          <div>
            <h2 className="text-3xl font-medium md:text-[40px]">The hour, mapped</h2>
            <p className="mt-3"><RedlineChip onCream>TIMES — confirm run-of-show with Justin; drafted from his format description</RedlineChip></p>
            <ul className="mt-8">
              {[
                ["7:00", "The brief.", "The month's focus and the room's targets. You brought your list; everyone did."],
                ["7:15", "The hour.", "Phones out, laptops open. Calls get made. Emails get sent. Asks get asked. Nobody's networking at you — everyone's working."],
                ["8:15", "The tally.", "Results go on the board: calls, sends, booked meetings, closed work. Wins get loud."],
                ["8:30", "The room.", "Food, founders, and the conversations that only happen after the work — because by then, you've got something real to talk about."],
              ].map(([t, h, b]) => (
                <li key={t} className="border-t-[1.5px] border-gold py-5">
                  <div className="flex flex-col gap-1 md:flex-row md:gap-6">
                    <span className="w-16 shrink-0 text-2xl font-semibold text-accent-deep [font-variant-numeric:tabular-nums]">{t}</span>
                    <p className="text-[15.5px] leading-relaxed text-ink/80">
                      <strong className="font-semibold text-ink">{h}</strong> {b}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4">
            <PhotoGrade label="the hour — laptops open" className="min-h-[180px]" />
            <div className="grid grid-cols-2 gap-4">
              <PhotoGrade label="the calls — phones out" className="min-h-[150px]" />
              <PhotoGrade label="the board — wins tallied" className="min-h-[150px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Why it works + pull-quote */}
      <section className="bg-cream pb-20 text-ink md:pb-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:grid-cols-[7fr_5fr] md:px-20">
          <p className="max-w-[54ch] border-t border-ink/15 pt-8 text-lg leading-relaxed text-ink/88">
            You can do a lot more in a room full of founders doing the same
            thing than you can alone at your desk — that&rsquo;s not a slogan,
            it&rsquo;s the format. Justin calls it accountability masked in
            community <RedlineChip onCream>⚠️ verify audio before quoting verbatim</RedlineChip>:
            nobody&rsquo;s grading you, but the board doesn&rsquo;t lie, and
            iron sharpens iron.
          </p>
          <figure className="pt-8">
            <svg aria-hidden viewBox="0 0 56 10" className="w-14" fill="none">
              <line x1="0" y1="5" x2="56" y2="5" stroke="#C9A24C" strokeWidth="1" />
              <line x1="0" y1="0" x2="0" y2="10" stroke="#C9A24C" strokeWidth="1" />
            </svg>
            <blockquote className="mt-4 text-2xl font-medium md:text-3xl">
              &ldquo;The board doesn&rsquo;t lie.&rdquo;
            </blockquote>
          </figure>
        </div>
      </section>

      {/* Membership — Two ways to hold a seat. */}
      <section className="bg-cream pb-20 text-ink md:pb-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <h2 className="text-3xl font-medium md:text-[40px]">Two ways to hold a seat.</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-[1.15fr_1fr] md:gap-6">
            <article className="border border-ink/18 border-t-2 border-t-gold bg-cream px-7 py-6 rounded-[2px]">
              <p className="text-4xl font-semibold text-gold [font-variant-numeric:tabular-nums]">$39<span className="text-lg text-ink/55">/month</span></p>
              <h3 className="mt-3 text-2xl font-medium">Digital</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink/78">
                The full digital home, anywhere: every Summit replay 24 hours
                after it airs, monthly webinars, office hours with
                Ventriq&rsquo;s council, the grants-and-funding feed, and
                founders in the thread who answer before the algorithm does.
              </p>
              <p className="mt-4"><a href="/contact" className="font-medium text-accent-deep hover:underline">Join Founders After Hours →</a></p>
            </article>
            <article className="border border-ink/18 border-t-2 border-t-gold bg-cream px-7 py-6 rounded-[2px] md:mt-[34px]">
              <p className="text-4xl font-semibold text-gold [font-variant-numeric:tabular-nums]">$[89–99]<span className="text-lg text-ink/55">/month</span></p>
              <p className="mt-1"><RedlineChip onCream>PRICE — confirm exact figure</RedlineChip></p>
              <h3 className="mt-2 text-2xl font-medium">In person</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink/78">
                Everything in digital, plus your seat at the monthly chapter
                night — the hour, the board, the room. Fifteen to twenty-five
                founders, capped on purpose. Baltimore first; your city when it
                opens.
              </p>
              <p className="mt-4"><a href="/contact" className="font-medium text-accent-deep hover:underline">Join Founders After Hours →</a></p>
            </article>
          </div>
          <p className="mt-8 max-w-[64ch] text-[15px] text-ink/70">
            Not ready to commit? Come to a session of{" "}
            <strong className="font-semibold text-ink">How to Run a Profitable Business</strong>{" "}
            first — free, twice a month, open to everybody.{" "}
            <RedlineChip onCream>HRPB — starts Sept 28; add link when the event page exists</RedlineChip>
          </p>
        </div>
      </section>

      {/* The tally — zero on purpose */}
      <section className="bg-midnight">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-20 md:grid-cols-2 md:px-20 md:py-28">
          <div>
            <p className="text-[130px] font-semibold leading-none text-gold [font-variant-numeric:tabular-nums] md:text-[160px]">0</p>
            <p className="mt-4 max-w-[36ch] text-[15.5px] text-cream/75">
              The first board goes up this fall in Baltimore. The count starts
              at zero — on purpose.
            </p>
          </div>
          <div className="space-y-2 text-2xl font-semibold md:text-3xl">
            <p>Calls made.</p>
            <p>Emails sent.</p>
            <p>Wins counted.</p>
          </div>
        </div>
      </section>

      {/* Digital home */}
      <section className="bg-cream text-ink">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:grid-cols-2 md:gap-20 md:px-20 md:py-28">
          <div>
            <p className="text-sm tracking-[0.14em] text-ink/55 [font-variant:small-caps]">what&rsquo;s inside</p>
            <ul className="mt-4">
              {[
                "Summit session replays (24 hours after each airs)",
                "monthly webinars",
                "office hours with Ventriq's council of advisors",
                "the tally leaderboard",
                "founders in the thread who answer before the algorithm does",
              ].map((x, i) => (
                <li key={x} className={`border-t py-3 text-[16px] ${i === 0 ? "border-ink/20" : "border-ink/12"}`}>{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <PhotoGrade label="SCREENSHOT: the Skool space — when live" className="min-h-[240px]" />
            <p className="mt-5 text-[15.5px] leading-relaxed text-ink/78">
              <strong className="font-semibold text-ink">The handoff, plainly:</strong>{" "}
              Joining takes about two minutes — the community runs on{" "}
              <RedlineChip onCream>PLATFORM — Skool TBC</RedlineChip>, you pick
              your tier and land inside.
            </p>
            <p className="mt-5">
              <a href="/contact" className="inline-block rounded-[2px] bg-gold px-6 py-[14px] font-semibold leading-none text-ink hover:bg-gold-hover">
                Join Founders After Hours
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section className="bg-cream pb-20 text-ink md:pb-28">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 md:grid-cols-2 md:px-20">
          <article className="border border-ink/18 border-t-2 border-t-gold rounded-[2px] overflow-hidden">
            <PhotoGrade label="Baltimore founders — the first room" className="min-h-[170px]" />
            <div className="px-7 py-5">
              <h3 className="text-2xl font-medium">Baltimore</h3>
              <p className="mt-2 text-[15.5px] text-ink/78">
                first chapter, first board. Founding night this fall.{" "}
                <RedlineChip onCream>DATE when set</RedlineChip>
              </p>
            </div>
          </article>
          <article className="rounded-[2px] border border-dashed border-ink/35 px-7 py-6">
            <h3 className="mt-24 text-2xl font-medium md:mt-28">Your city</h3>
            <p className="mt-2 text-[15.5px] leading-relaxed text-ink/78">
              chapters open where founders raise their hands and an organizer
              steps up. Organizers get training, the format, and the brand —
              and a room full of builders who show up.
            </p>
            <div className="mt-5">
              <ChapterForm />
            </div>
          </article>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream pb-20 text-ink md:pb-28">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 md:grid-cols-[4fr_8fr] md:px-20">
          <h2 className="text-3xl font-medium md:text-[40px]">Questions, answered</h2>
          <div>
            {([
              ["What does it cost?", <>$39 a month for the digital membership. $[89–99] a month adds the in-person chapter night. <RedlineChip onCream>PRICE — confirm</RedlineChip> Cancel anytime. <RedlineChip onCream>POLICY — confirm, Q73</RedlineChip></>],
              ["Why isn't it free?", "Because the board is the product. A membership buys the replays, the advisors, and a room where everybody showed up to work — and people who pay for the hour protect the hour."],
              ["What do I bring?", "Your laptop or phone, and the list you've been avoiding: prospects, follow-ups, asks. The night works because you arrive loaded."],
              ["I'm not in Baltimore.", "Start with the digital membership — replays, office hours, and webinars aren't city-bound. And raise your hand for your city; chapters go where founders ask."],
              ["I'm an introvert. Be honest.", "The first hour, nobody's networking at you — everyone's working. The talking comes after, and by then you've already got something to talk about."],
              ["Who runs it?", "Ventriq — a nonprofit. Chapter nights are run by trained local organizers, founders themselves."],
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
      </section>

      {/* Final CTA */}
      <section className="bg-midnight">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-20 md:py-28">
          <h2 className="max-w-[18ch] text-4xl font-medium leading-[1.1] md:text-[52px]">
            The work you&rsquo;ve been putting off has a room now.
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a href="/contact" className="inline-block rounded-[2px] bg-gold px-6 py-[15px] font-semibold leading-none text-ink hover:bg-gold-hover">
              Join Founders After Hours
            </a>
            <span className="text-sm text-cream/60">From $39/month · replays, office hours, the board</span>
          </div>
        </div>
      </section>
    </main>
  );
}
