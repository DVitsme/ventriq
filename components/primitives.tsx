/** Core drafting-system primitives (design brief + build-spec §1). */

/** Small-caps gold eyebrow, always paired with its hairline. */
export function Eyebrow({
  children,
  onCream = false,
}: {
  children: React.ReactNode;
  onCream?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-sm tracking-[0.15em] [font-variant:small-caps] ${
        onCream ? "text-ink/65" : "text-gold"
      }`}
    >
      <span
        aria-hidden
        className={`inline-block h-px w-8 md:w-11 ${onCream ? "bg-ink/40" : "bg-gold"}`}
      />
      {children}
    </p>
  );
}

/** Dashed redline chip for unresolved [PLACEHOLDER] content (deliberate, visible). */
export function RedlineChip({
  children,
  onCream = false,
}: {
  children: React.ReactNode;
  onCream?: boolean;
}) {
  return (
    <span
      className={`inline-block rounded-[2px] border border-dashed px-1.5 py-px align-middle text-[11px] tracking-[0.06em] ${
        onCream ? "border-ink/35 text-ink/55" : "border-cream/35 text-cream/55"
      }`}
    >
      {children}
    </span>
  );
}

/** Gold primary button — the only solid button on the site. */
export function PrimaryLink({
  href,
  children,
  className = "",
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a
      href={href}
      className={`inline-block rounded-[2px] bg-gold px-6 py-[15px] font-semibold leading-none text-ink hover:bg-gold-hover focus-visible:outline-cream ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}

export function OutlineLink({
  href,
  children,
  className = "",
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a
      href={href}
      className={`inline-block rounded-[2px] border border-gold/75 px-6 py-[14px] font-medium leading-none text-gold hover:bg-gold/10 ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}

/** Threshold card — the one card moment per page: 2px gold top rule +
 *  a drafting numeral that means something. Ground-aware. */
export function ThresholdCard({
  numeral,
  title,
  titleNote,
  strap,
  body,
  meta,
  cta,
  className = "",
}: {
  numeral: string;
  title: string;
  titleNote?: string;
  strap: string;
  body: React.ReactNode;
  meta: string;
  cta: { label: string; href: string };
  className?: string;
}) {
  return (
    <article
      className={`border border-ink/18 border-t-2 border-t-gold bg-cream px-7 py-6 rounded-[2px] ${className}`}
    >
      <p className="text-4xl font-semibold text-gold [font-variant-numeric:tabular-nums]">
        {numeral}
      </p>
      <h3 className="mt-3 text-2xl font-medium text-ink">
        {title}
        {titleNote && (
          <span className="ml-2 text-base font-normal text-ink/55">{titleNote}</span>
        )}
      </h3>
      <p className="mt-2 font-semibold text-ink">{strap}</p>
      <p className="mt-2 text-[15.5px] leading-relaxed text-ink/78">{body}</p>
      <p className="mt-3 text-sm tracking-[0.02em] text-ink/55">{meta}</p>
      <p className="mt-4">
        <a href={cta.href} className="font-medium text-accent-deep hover:underline">
          {cta.label} →
        </a>
      </p>
    </article>
  );
}

/** Treated photo placeholder (build-spec §7): navy-graded gradient + grain +
 *  a labeled slot, until real photography lands. */
export function PhotoGrade({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2px] ${className}`}
      style={{
        background:
          "linear-gradient(165deg, oklch(0.42 0.05 60), oklch(0.3 0.03 255) 62%, #101B2D)",
      }}
      role="img"
      aria-label={label}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(16,27,45,0.5), rgba(16,27,45,0.15) 55%)",
        }}
      />
      <svg aria-hidden className="absolute inset-0 h-full w-full opacity-30">
        <filter id="vq-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" />
        </filter>
        <rect width="100%" height="100%" filter="url(#vq-grain)" />
      </svg>
      <span className="absolute bottom-3 left-3 text-[11px] tracking-[0.06em] text-cream/60">
        [PHOTO: {label}]
      </span>
    </div>
  );
}
