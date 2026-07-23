import type { Metadata } from "next";
import { Eyebrow } from "@/components/primitives";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "About Ventriq — built by a founder nobody handed a map" },
  description:
    "Ventriq (ven-TREEK) equips founders — small business owners, startups, and nonprofits — with capital, programming, and council. Rooted in Baltimore. Built to travel.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[960px] px-5 py-20 md:px-20 md:py-32">
      <Eyebrow>ven-treek · est. Baltimore, 2026</Eyebrow>
      <h1 className="mt-6 max-w-[18ch] text-4xl font-medium leading-[1.08] tracking-[-0.015em] md:text-6xl">
        Built by a founder nobody handed a map.
      </h1>
      <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-cream/85">
        Ventriq — say it <strong>ven-TREEK</strong> — is venture + corridor.
        The mark is two lines converging on a way in: a V, a corridor, a
        threshold. That&rsquo;s the whole idea, drawn — a room worth getting
        into, and a door that actually opens.
      </p>
      <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-cream/85">
        Ventriq equips founders — small business owners, startups, and
        nonprofits, with a focus on the builders the old models overlook —
        through capital, programming, and council. Rooted in Baltimore. Built
        to travel.
      </p>
      <p className="mt-10">
        <a href="/summit" className="text-accent hover:underline">
          The first thing we built: Forge The Future, Aug 10–20 →
        </a>
      </p>
    </main>
  );
}
