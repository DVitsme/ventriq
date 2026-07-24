import type { Metadata } from "next";
import {
  Eyebrow,
  RedlineChip,
  ThresholdCard,
  PhotoGrade,
  PrimaryLink,
  OutlineLink,
} from "@/components/primitives";
import { LumaRegisterButton } from "@/components/luma-register-button";
import { Reveal } from "@/components/motion";
import { EMAIL } from "@/content/placeholders";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Ventriq — capital, programming & council for founders" },
  description:
    "A nonprofit backing small business owners, startups, and nonprofit builders — the Forge The Future summit Aug 10–20, a working founder community, and a 90-day mastermind. Rooted in Baltimore.",
  alternates: { canonical: "/" },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://ventriq.io/#org",
      name: "Ventriq",
      url: "https://ventriq.io",
      description:
        "A Baltimore-rooted nonprofit equipping founders with capital, programming, and council.",
      email: "jshaw@ventriq.io",
      areaServed: "US",
      sameAs: [
        "https://www.instagram.com/ventriqofficial",
        "https://luma.com/user/Ventriqofficial",
        "https://www.iamjs.io",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://ventriq.io/#website",
      url: "https://ventriq.io",
      name: "Ventriq",
      publisher: { "@id": "https://ventriq.io/#org" },
    },
  ],
};

/** Static corridor rays (motion draws them in Phase 4): hairlines converging
 *  on a vanishing-point crosshair, upper right — one drawing system. */
function CorridorRays() {
  const vp = { x: 1060, y: 300 };
  const edges = [
    [0, 60], [0, 240], [0, 470], [0, 660], [340, 720], [780, 720], [1200, 720], [1440, 640], [1440, 90], [1050, 0], [620, 0], [220, 0],
  ];
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 720"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.28]"
      fill="none"
    >
      {edges.map(([x, y], i) => (
        <line key={i} className="vq-draw" pathLength={1} style={{ ["--vqd" as string]: `${i * 0.06}s` }} x1={x} y1={y} x2={vp.x} y2={vp.y} stroke="#C9A24C" strokeWidth="0.75" />
      ))}
      {/* dimension ticks on two rays */}
      <line x1="368" y1="216" x2="374" y2="228" stroke="#C9A24C" strokeWidth="1" />
      <line x1="704" y1="504" x2="712" y2="514" stroke="#C9A24C" strokeWidth="1" />
      {/* vanishing-point crosshair */}
      <circle className="vq-tick" cx={vp.x} cy={vp.y} r="2.2" fill="#C9A24C" />
      {[[-14, 0, -6, 0], [6, 0, 14, 0], [0, -14, 0, -6], [0, 6, 0, 14]].map(([a, b, c, d], i) => (
        <line key={`c${i}`} className="vq-tick" x1={vp.x + a} y1={vp.y + b} x2={vp.x + c} y2={vp.y + d} stroke="#C9A24C" strokeWidth="1" />
      ))}
    </svg>
  );
}

/** S4 diagram: three labeled lines converge through a crosshair into a
 *  drawn doorway (jambs, lintel, threshold, exit arrow). */
function ConvergenceDiagram() {
  return (
    <svg
      viewBox="0 0 700 260"
      role="img"
      aria-label="Diagram: The Summit, Founders After Hours, and The Mastermind converge on one doorway"
      className="w-full max-w-[700px]"
      fill="none"
    >
      {[
        [0, 30, "The Summit", 24],
        [0, 130, "Founders After Hours", 124],
        [0, 230, "The Mastermind", 224],
      ].map(([x, y, label, ly], i) => (
        <g key={i}>
          <line className="vq-draw" pathLength={1} style={{ ["--vqd" as string]: `${i * 0.18}s` }} x1={x as number} y1={y as number} x2="510" y2="130" stroke="#C9A24C" strokeWidth="1" />
          <text x="8" y={(ly as number) - 8} fill="#F1ECDF" fontSize="15">
            {label as string}
          </text>
        </g>
      ))}
      {/* mid-line ticks */}
      <line x1="228" y1="72" x2="234" y2="84" stroke="#C9A24C" strokeWidth="1" />
      <line x1="228" y1="186" x2="234" y2="176" stroke="#C9A24C" strokeWidth="1" />
      {/* crosshair */}
      <circle cx="510" cy="130" r="2.2" fill="#C9A24C" />
      <line x1="496" y1="130" x2="503" y2="130" stroke="#C9A24C" strokeWidth="1" />
      <line x1="517" y1="130" x2="524" y2="130" stroke="#C9A24C" strokeWidth="1" />
      <line x1="510" y1="116" x2="510" y2="123" stroke="#C9A24C" strokeWidth="1" />
      <line x1="510" y1="137" x2="510" y2="144" stroke="#C9A24C" strokeWidth="1" />
      {/* doorway: jambs + 60% lintel + 2px threshold + exit arrow */}
      <line className="vq-draw" pathLength={1} style={{ ["--vqd" as string]: "0.7s" }} x1="580" y1="55" x2="580" y2="205" stroke="#C9A24C" strokeWidth="1.5" />
      <line className="vq-draw" pathLength={1} style={{ ["--vqd" as string]: "0.7s" }} x1="640" y1="55" x2="640" y2="205" stroke="#C9A24C" strokeWidth="1.5" />
      <line x1="580" y1="55" x2="640" y2="55" stroke="#C9A24C" strokeWidth="1" opacity="0.6" />
      <line className="vq-draw" pathLength={1} style={{ ["--vqd" as string]: "0.7s" }} x1="572" y1="207" x2="648" y2="207" stroke="#C9A24C" strokeWidth="2" />
      <line className="vq-draw" pathLength={1} style={{ ["--vqd" as string]: "0.7s" }} x1="640" y1="130" x2="692" y2="130" stroke="#C9A24C" strokeWidth="1" />
      <path className="vq-tick" style={{ ["--vqd" as string]: "1.5s" }} d="M692 130 l-9 -4.5 v9 Z" fill="#C9A24C" />
    </svg>
  );
}

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      {/* S1 · Hero — midnight, asymmetric 5/7, corridor rays behind */}
      <section className="relative overflow-hidden bg-midnight">
        <CorridorRays />
        <div className="vq-hero relative mx-auto max-w-[1440px] px-5 py-24 md:px-20 md:py-36">
          <div className="vq-in"><Eyebrow>ven-treek · a nonprofit for founders</Eyebrow></div>
          <h1 style={{ ["--vqd" as string]: "0.15s" }} className="vq-in mt-6 max-w-[21ch] text-4xl font-medium leading-[1.08] tracking-[-0.015em] md:text-[60px]">
            The resources are out there. They&rsquo;re just camouflaged.
          </h1>
          <p style={{ ["--vqd" as string]: "0.6s" }} className="vq-in mt-8 max-w-[54ch] text-lg leading-relaxed text-cream/85">
            Ventriq points the way in: capital, programming, and council for
            small business owners, startups, and nonprofits doing the real work
            — every serious founder welcome, with a focus on the builders the
            old models overlook.{" "}
            <RedlineChip>COUNSEL-REVIEW</RedlineChip>
          </p>
          <div style={{ ["--vqd" as string]: "0.95s" }} className="vq-in mt-10 flex flex-wrap items-center gap-6">
            <LumaRegisterButton ctaLocation="home-hero">
              Register for the Summit
            </LumaRegisterButton>
            <a href="/founders-after-hours" className="text-accent hover:underline">
              Or step into the community → Founders After Hours
            </a>
          </div>
        </div>
      </section>

      {/* S2 · Proof band — cream, drafting facts, dimension rule */}
      <section className="bg-cream text-ink">
        <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-20 md:py-14">
          <dl className="grid gap-8 md:grid-cols-4 md:gap-6">
            {[
              ["Aug 10–20", "Forge The Future, Ventriq's first summit"],
              ["8", "nights, 90 minutes each"],
              ["Baltimore", "first Founders After Hours chapter"],
              ["10", "seats — Mastermind cohort 2, September"],
            ].map(([n, d], i) => (
              <div key={i} className="md:border-l md:border-gold/60 md:pl-5 first:md:border-0 first:md:pl-0">
                <dt className="sr-only">{d}</dt>
                <dd>
                  <span className="block text-3xl font-semibold [font-variant-numeric:tabular-nums]">
                    {n}
                  </span>
                  <span className="mt-1 block text-sm text-ink/70">{d}</span>
                </dd>
              </div>
            ))}
          </dl>
          <svg aria-hidden viewBox="0 0 1280 16" className="mt-8 w-full" fill="none">
            <line x1="0" y1="8" x2="1120" y2="8" stroke="#C9A24C" strokeWidth="1" />
            <line x1="0" y1="3" x2="0" y2="13" stroke="#C9A24C" strokeWidth="1" />
            <path d="M1120 8 l-10 -5 v10 Z" fill="#C9A24C" />
            <line x1="1120" y1="8" x2="1280" y2="8" stroke="#C9A24C" strokeWidth="1" opacity="0.35" />
          </svg>
        </div>
      </section>

      {/* S3 · Three ways in — the one card moment, staggered thresholds */}
      <section className="bg-cream pb-20 text-ink md:pb-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <h2 className="text-3xl font-medium md:text-[40px]">Three ways in.</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
            <ThresholdCard
              numeral="Aug 10"
              title="Forge The Future"
              titleNote="(the Summit)"
              strap="Eight nights. Two weeks. Ninety minutes a night."
              body="A virtual summit built for implementation, not inspiration — every session ends with a move you can make the next morning."
              meta="Aug 10–20 · virtual · free"
              cta={{ label: "Save your free seat", href: "/summit" }}
            />
            <ThresholdCard
              numeral="$39"
              title="Founders After Hours"
              strap="The founder night you leave with work done."
              body="A digital home for replays, office hours, and answers — and a monthly in-person hour where the calls get made, the emails get sent, and the wins get tallied."
              meta="Baltimore first · membership from $39/mo"
              cta={{ label: "Join Founders After Hours", href: "/founders-after-hours" }}
              className="md:mt-[30px]"
            />
            <ThresholdCard
              numeral="Sep"
              title="The Mastermind"
              strap="Ten founders. Ninety days. A scoreboard."
              body={
                <>
                  Weekly working sessions, a performance dashboard, and a
                  graduation bar you have to earn. Applications for cohort 2
                  open <RedlineChip onCream>APP-OPEN DATE</RedlineChip>.
                </>
              }
              meta="September · 10 seats · application-gated"
              cta={{ label: "Start your application", href: "/mastermind" }}
              className="md:mt-[56px]"
            />
          </div>
        </div>
      </section>

      {/* S4 · One structure. Three doors. — midnight, drawn diagram */}
      <section className="bg-midnight">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-20 md:grid-cols-[5fr_7fr] md:px-20 md:py-28">
          <div>
            <h2 className="max-w-[14ch] text-3xl font-medium md:text-[40px]">
              One structure. Three doors.
            </h2>
            <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-cream/85">
              Every program leads into the next. Come for a session. Stay for
              the room. Build for the decade. Ventriq holds three pillars under
              one roof — capital, programming, and council — so a founder never
              has to choose which kind of help to go find alone.
            </p>
          </div>
          <Reveal><ConvergenceDiagram /></Reveal>
        </div>
      </section>

      {/* S5 · Founder letter — cream, portrait right */}
      <section className="bg-cream text-ink">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:grid-cols-[7fr_5fr] md:px-20 md:py-28">
          <div>
            <h2 className="text-3xl font-medium md:text-[40px]">Why this exists</h2>
            <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-ink/88">
              I started my first company with a prayer, a $1,000 grant, and a
              ninety-day deadline. Nobody handed me a map — and I still got
              further than anyone expected. Ventriq is the map I wish somebody
              had handed me.
            </p>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink/88">
              If you&rsquo;re building something real, you belong in this room.
            </p>
            <p className="mt-6 font-semibold">— Justin Shaw, Founder</p>
            <span aria-hidden className="mt-2 block h-px w-14 bg-gold" />
            <p className="mt-4">
              <a href="/about" className="font-medium text-accent-deep hover:underline">
                Read Justin&rsquo;s story →
              </a>
            </p>
          </div>
          <PhotoGrade
            label="Justin Shaw — warm, navy-tinted grade"
            className="min-h-[320px] md:min-h-[420px]"
          />
        </div>
      </section>

      {/* S6 · Voices — three ruled quote columns (not cards) */}
      <section className="bg-cream pb-20 text-ink md:pb-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <h2 className="text-3xl font-medium md:text-[40px]">
            Founders who&rsquo;ve built with Justin{" "}
            <RedlineChip onCream>TESTIMONIAL PERMISSIONS — README #5</RedlineChip>
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {[
              ["They completely restructured my nonprofit — a three-year vision, and the systems to run it.", "Margo B., Artvantage", "md:mt-0"],
              ["Justin built a roadmap to exit our business in four years. We're ahead of schedule.", "Calvin R., Encore Insurance Group", "md:mt-8"],
              ["The executive guidance reframed how I manage my business.", "Sophia D., financial services", "md:mt-16"],
            ].map(([q, a, m], i) => (
              <figure key={i} className={m as string}>
                <svg aria-hidden viewBox="0 0 56 10" className="w-14" fill="none">
                  <line x1="0" y1="5" x2="56" y2="5" stroke="#C9A24C" strokeWidth="1" />
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#C9A24C" strokeWidth="1" />
                </svg>
                <blockquote className="mt-4 text-xl font-medium leading-snug">
                  &ldquo;{q as string}&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-sm font-semibold text-ink/70">
                  {a as string}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* S7 · Sponsors — the one dark section near the footer */}
      <section className="bg-midnight">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-20 md:py-24">
          <span aria-hidden className="block h-px w-14 bg-gold" />
          <h2 className="mt-6 text-3xl font-medium md:text-[40px]">
            Put a name behind the builders
          </h2>
          <p className="mt-5 max-w-[54ch] text-[17px] leading-relaxed text-cream/82">
            Summit sessions and chapter nights can be underwritten by companies
            and foundations that want to reach serious founders — visibly and
            usefully, not a logo on a lanyard.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <PrimaryLink href="/contact">Sponsor the Summit</PrimaryLink>
            <a href={`mailto:${EMAIL}`} className="text-accent hover:underline">
              Talk partnerships →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
