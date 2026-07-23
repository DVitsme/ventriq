import type { Metadata } from "next";
import { Eyebrow, RedlineChip } from "@/components/primitives";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "The Mastermind — ten founders, ninety days — Ventriq" },
  description:
    "Ten founders. Ninety days. A scoreboard. Weekly working sessions, a performance dashboard, and a graduation bar you have to earn. Cohort 2, September 2026.",
  alternates: { canonical: "/mastermind" },
};

export default function MastermindPage() {
  return (
    <main className="mx-auto max-w-[960px] px-5 py-20 md:px-20 md:py-32">
      <Eyebrow>cohort 2 · September–December 2026 · 10 seats</Eyebrow>
      <h1 className="mt-6 max-w-[18ch] text-4xl font-medium leading-[1.08] tracking-[-0.015em] md:text-6xl">
        The room for what comes after the plan.
      </h1>
      <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-cream/85">
        You&rsquo;ve done the course. You&rsquo;ve got the strategy deck.
        Ninety days of installing it is what&rsquo;s rare — ten founders,
        weekly working sessions, a dashboard that keeps score, and advisors
        who&rsquo;ve built before you.
      </p>
      <p className="mt-8 text-cream/75">
        Applications for cohort 2 open{" "}
        <RedlineChip>APP-OPEN DATE</RedlineChip>
      </p>
      <p className="mt-10">
        <a href="/contact" className="text-accent hover:underline">
          Want a heads-up when applications open? Talk to us →
        </a>
      </p>
    </main>
  );
}
