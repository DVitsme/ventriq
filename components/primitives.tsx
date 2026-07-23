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
