import { Monogram } from "./monogram";
import { RedlineChip } from "./primitives";
import { EMAIL } from "@/content/placeholders";
import { NewsletterForm } from "./newsletter-form";

/** Canonical footer (Global System 1b), minus the Founder Digest field —
 *  that arrives with the Phase 3 newsletter action (tracked in TODO.md).
 *  Privacy page ships with the legal set (TODO.md). */
export function Footer() {
  return (
    <footer className="bg-midnight">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 md:grid-cols-[1.3fr_0.7fr_0.9fr_1.3fr] md:px-20 md:py-16">
        <div>
          <span className="text-cream">
            <Monogram className="h-8 w-auto" />
          </span>
          <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-cream/60">
            Ventriq (ven-TREEK) is a nonprofit equipping founders with capital,
            programming, and council — rooted in Baltimore, built to travel.
          </p>
        </div>
        <nav aria-label="Pages">
          <h2 className="text-sm tracking-[0.14em] text-cream/55 [font-variant:small-caps]">
            pages
          </h2>
          <ul className="mt-3 space-y-2 text-[15px]">
            <li><a href="/about" className="text-cream/85 hover:text-cream">About</a></li>
            <li><a href="/contact" className="text-cream/85 hover:text-cream">Contact</a></li>
          </ul>
        </nav>
        <nav aria-label="Programs">
          <h2 className="text-sm tracking-[0.14em] text-cream/55 [font-variant:small-caps]">
            programs
          </h2>
          <ul className="mt-3 space-y-2 text-[15px]">
            <li><a href="/summit" className="text-cream/85 hover:text-cream">The Summit</a></li>
            <li><a href="/founders-after-hours" className="text-cream/85 hover:text-cream">Founders After Hours</a></li>
            <li><a href="/mastermind" className="text-cream/85 hover:text-cream">The Mastermind</a></li>
          </ul>
        </nav>
        <div>
          <h2 className="text-sm tracking-[0.14em] text-cream/55 [font-variant:small-caps]">
            contact
          </h2>
          <p className="mt-3 text-[15px] text-cream/85">
            <a href={`mailto:${EMAIL}`} className="hover:text-cream">{EMAIL}</a>{" "}
            · Baltimore, MD
          </p>
          <div className="mt-7">
            <NewsletterForm source="footer" />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] px-5 md:px-20">
        <div className="h-px bg-gold/60" />
        <div className="flex flex-col items-start justify-between gap-3 py-6 text-sm text-cream/60 md:flex-row md:items-center">
          <p>
            © 2026 Ventriq. A nonprofit organization.{" "}
            <RedlineChip>
              EIN — add when issued; no deductibility language until determination letter
            </RedlineChip>
          </p>
          <p className="flex gap-5">
            <a href="/contact" className="hover:text-cream">Contact</a>
            <a
              href="https://www.instagram.com/ventriqofficial"
              className="hover:text-cream"
            >
              Instagram
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
