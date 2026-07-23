import type { Metadata } from "next";
import { RedlineChip } from "@/components/primitives";
import { EMAIL } from "@/content/placeholders";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Contact — talk to us — Ventriq" },
  description:
    "Question about a program, a city, a sponsorship, a story? Send it. A real person reads every message — expect a reply within two business days.",
  alternates: { canonical: "/contact" },
};

const TOPICS = [
  "The Summit",
  "Founders After Hours",
  "The Mastermind",
  "Sponsorship & partnerships",
  "Press",
  "Something else",
];

const field =
  "w-full rounded-[2px] border border-ink/30 bg-cream px-3 py-2.5 text-[15px] text-ink";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  const topicDefault =
    topic === "sponsorship" ? "Sponsorship & partnerships" : "";

  return (
    <main className="bg-cream text-ink">
      {/* S1 · header + form — simple split; no map, no office-hours theater */}
      <section className="mx-auto grid max-w-[1440px] items-start gap-12 px-5 py-16 md:grid-cols-[5fr_6fr] md:gap-24 md:px-20 md:py-24">
        <div>
          <span aria-hidden className="block h-px w-11 bg-gold" />
          <h1 className="mt-6 text-4xl font-medium leading-[1.08] tracking-[-0.015em] md:text-[60px]">
            Talk to us.
          </h1>
          <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-ink/85">
            Question about a program, a city, a sponsorship, a story? Send it.
            A real person reads every message — expect a reply within two
            business days.
          </p>
        </div>

        {/* Form card — UI shell only; the server action lands in Phase 3 */}
        <div className="rounded-[2px] border border-ink/18 border-t-2 border-t-gold bg-cream px-6 py-7 md:px-9 md:py-8">
          <form className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm text-ink/70">Your name</span>
                <input type="text" name="name" className={field} />
              </label>
              <label className="grid gap-2">
                <span className="text-sm text-ink/70">Your email</span>
                <input type="email" name="email" className={field} />
              </label>
            </div>
            <label className="grid gap-2">
              <span className="text-sm text-ink/70">
                What&rsquo;s this about?
              </span>
              <select name="topic" defaultValue={topicDefault} className={field}>
                <option value="" disabled>
                  Pick one
                </option>
                {TOPICS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2">
              <span className="text-sm text-ink/70">Your message</span>
              <textarea
                name="message"
                rows={5}
                className={`${field} resize-y`}
              />
            </label>
            <button
              type="submit"
              disabled
              aria-disabled="true"
              title="Form goes live with the full site — email us meanwhile"
              className="w-fit rounded-[2px] bg-gold px-6 py-[15px] font-semibold leading-none text-ink disabled:cursor-not-allowed disabled:opacity-60"
            >
              Send it
            </button>
          </form>
          <p className="mt-5 border-t border-ink/12 pt-4 text-[15.5px] text-ink/78">
            Prefer email?{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="font-semibold text-accent-deep hover:underline"
            >
              {EMAIL}
            </a>
          </p>
        </div>
      </section>

      {/* S2 · quick routes — three ruled rows, not cards */}
      <section className="mx-auto max-w-[1440px] px-5 pb-20 md:px-20 md:pb-28">
        <div className="max-w-[980px]">
          <div className="grid gap-1.5 border-t border-ink/20 py-5 md:grid-cols-[220px_1fr] md:gap-7 md:py-6">
            <h2 className="text-[17px] font-semibold">Press &amp; speaking</h2>
            <p className="text-base leading-relaxed text-ink/80">
              <a
                href={`mailto:${EMAIL}`}
                className="font-medium text-accent-deep hover:underline"
              >
                {EMAIL}
              </a>
              , subject &ldquo;Press.&rdquo; Bio, photos, and the press kit:
              /press{" "}
              <RedlineChip onCream>
                press kit page = post-launch; drop row until then
              </RedlineChip>
            </p>
          </div>
          <div className="grid gap-1.5 border-t border-ink/12 py-5 md:grid-cols-[220px_1fr] md:gap-7 md:py-6">
            <h2 className="text-[17px] font-semibold">Chapter organizers</h2>
            <p className="text-base leading-relaxed text-ink/80">
              want Founders After Hours in your city?{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="font-semibold text-accent-deep hover:underline"
              >
                Raise your hand →
              </a>{" "}
              <RedlineChip onCream>FORM/EMAIL</RedlineChip>
            </p>
          </div>
          <div className="grid gap-1.5 border-t border-b border-ink/12 border-b-ink/20 py-5 md:grid-cols-[220px_1fr] md:gap-7 md:py-6">
            <h2 className="text-[17px] font-semibold">Justin, directly</h2>
            <p className="text-base leading-relaxed text-ink/80">
              the honest route is the room: office hours happen inside{" "}
              <a
                href="/founders-after-hours"
                className="font-medium text-accent-deep hover:underline"
              >
                Founders After Hours
              </a>{" "}
              every month.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
