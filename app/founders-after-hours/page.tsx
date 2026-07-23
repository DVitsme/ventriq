import type { Metadata } from "next";
import { Eyebrow, RedlineChip } from "@/components/primitives";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Founders After Hours — the founder community that does the work" },
  description:
    "A Ventriq membership: session replays, advisor office hours, and a monthly in-person hour where founders make the calls, send the emails, and tally the wins. From $39/month.",
  alternates: { canonical: "/founders-after-hours" },
};

export default function FahPage() {
  return (
    <main className="mx-auto max-w-[960px] px-5 py-20 md:px-20 md:py-32">
      <Eyebrow>a Ventriq community · Baltimore first</Eyebrow>
      <h1 className="mt-6 max-w-[18ch] text-4xl font-medium leading-[1.08] tracking-[-0.015em] md:text-6xl">
        Come do the work. We&rsquo;ll count it.
      </h1>
      <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-cream/85">
        Founders After Hours is a working membership — a digital home for
        replays, office hours, and straight answers, and a monthly in-person
        night where the first hour is heads-down execution and every result
        goes up on the board.
      </p>
      <p className="mt-8 text-cream/75">
        From $39/month · doors open soon{" "}
        <RedlineChip>full page + membership checkout coming with launch</RedlineChip>
      </p>
      <p className="mt-10">
        <a href="/summit" className="text-accent hover:underline">
          Start with the Summit — free, Aug 10–20 →
        </a>
      </p>
    </main>
  );
}
