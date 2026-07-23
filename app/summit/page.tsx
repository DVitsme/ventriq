import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Forge The Future — Ventriq's virtual founder summit, Aug 10–20",
  },
  description:
    "Eight nights, two weeks — brand, influence, revenue, capital, AI, exit. Each session ends with a move you can make the next morning. Free, live on Zoom.",
  alternates: { canonical: "/summit" },
};

const NIGHTS = [
  ["Mon Aug 10", "The Weight and the Vision", "a fireside conversation on leading from the inside out"],
  ["Tue Aug 11", "The Art of Desire", "building a brand that commands the room"],
  ["Wed Aug 12", "Renowned", "the art of influence, press & becoming a movement"],
  ["Thu Aug 13", "The Rainmaker's Craft", "turning passion into profit"],
  ["Mon Aug 17", "The Modern Advantage", "tech, AI & doing more with less"],
  ["Tue Aug 18", "Capital & Command", "mastering business finances and funding"],
  ["Wed Aug 19", "The Endgame", "preparing for an exit before you need one"],
  ["Thu Aug 20", "The End of the Beginning", "the real cost & reward of building"],
] as const;

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  "@id": "https://ventriq.io/summit#event",
  name: "Forge The Future Virtual Summit",
  alternateName: "Forge The Future",
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: { "@type": "VirtualLocation", url: "https://luma.com/lp9z8iav" },
  startDate: "2026-08-10T18:30:00-04:00",
  endDate: "2026-08-20T20:00:00-04:00",
  organizer: { "@id": "https://ventriq.io/#org", name: "Ventriq", url: "https://ventriq.io" },
  offers: {
    "@type": "Offer",
    price: 0,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://luma.com/lp9z8iav",
    validFrom: "2026-07-20T00:00:00-04:00",
  },
  description:
    "Eight nights across two weeks — one session a night, ninety minutes, each pointed at something you can do the next morning. Free, live on Zoom, presented by Ventriq.",
};

export default function SummitPage() {
  return (
    <main className="mx-auto max-w-[960px] px-5 py-20 md:px-20 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <p className="text-sm tracking-[0.15em] text-gold [font-variant:small-caps]">
        forge the future · a Ventriq summit · Aug 10–20 · virtual · free
      </p>
      <h1 className="mt-6 text-4xl font-medium leading-[1.08] tracking-[-0.015em] md:text-6xl">
        Not just education. Implementation.
      </h1>
      <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-cream/85">
        Eight nights across two weeks — one session a night, ninety minutes,
        each pointed at something you can do the next morning. Live on Zoom,
        6:30–8:00 PM ET.
      </p>
      <p className="mt-4 text-cream/75">
        Forged together. Built to last.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-6">
        <a
          href="https://luma.com/lp9z8iav"
          className="rounded-[2px] bg-gold px-6 py-4 font-semibold text-ink hover:bg-gold-hover"
        >
          Save your free seat
        </a>
        <span className="text-sm text-cream/60">
          Registration runs on Luma — about a minute, free.
        </span>
      </div>

      <h2 className="mt-20 text-2xl font-medium">Two weeks, mapped</h2>
      <ul className="mt-8 max-w-[64ch]">
        {NIGHTS.map(([date, title, subtitle]) => (
          <li
            key={date}
            className="flex flex-col gap-1 border-t border-cream/15 py-4 md:flex-row md:gap-6"
          >
            <span className="w-28 shrink-0 text-gold [font-variant-numeric:tabular-nums]">
              {date}
            </span>
            <span>
              <strong className="font-semibold">{title}</strong>
              <span className="text-cream/75"> — {subtitle}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-cream/60">
        All sessions 6:30–8:00 PM ET. Fridays through Sundays are yours — go
        build with the week.
      </p>

      <div className="mt-16">
        <a
          href="https://luma.com/lp9z8iav"
          className="rounded-[2px] bg-gold px-6 py-4 font-semibold text-ink hover:bg-gold-hover"
        >
          Save your free seat
        </a>
      </div>

      <footer className="mt-24 border-t border-cream/15 pt-6 text-sm text-cream/60">
        <p>
          <a href="/" className="text-accent hover:underline">
            ← Ventriq
          </a>{" "}
          · presented by Ventriq, a nonprofit for founders · Baltimore, MD
        </p>
      </footer>
    </main>
  );
}
