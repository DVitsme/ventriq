import type { Metadata } from "next";
import { EMAIL } from "@/content/placeholders";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Contact — talk to us — Ventriq" },
  description:
    "Question about a program, a city, a sponsorship, a story? Send it. A real person reads every message — expect a reply within two business days.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-[960px] px-5 py-20 md:px-20 md:py-32">
      <span aria-hidden className="block h-px w-11 bg-gold" />
      <h1 className="mt-6 text-4xl font-medium leading-[1.08] tracking-[-0.015em] md:text-6xl">
        Talk to us.
      </h1>
      <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-cream/85">
        Question about a program, a city, a sponsorship, a story? Send it. A
        real person reads every message — expect a reply within two business
        days.
      </p>
      <p className="mt-10">
        <a
          href={`mailto:${EMAIL}`}
          className="inline-block rounded-[2px] bg-gold px-6 py-[15px] font-semibold leading-none text-ink hover:bg-gold-hover"
        >
          Email {EMAIL}
        </a>
      </p>
      <p className="mt-6 text-sm text-cream/60">
        The full contact form lands here with the site launch.
      </p>
    </main>
  );
}
