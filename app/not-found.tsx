import { EMAIL } from "@/content/placeholders";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[960px] px-5 py-24 md:px-20 md:py-40">
      <svg
        aria-hidden
        viewBox="0 0 640 24"
        className="w-full max-w-[520px]"
        fill="none"
      >
        <line x1="0" y1="12" x2="560" y2="12" stroke="#C9A24C" strokeWidth="1" />
        <line x1="200" y1="7" x2="200" y2="17" stroke="#C9A24C" strokeWidth="1" />
        <line x1="380" y1="7" x2="380" y2="17" stroke="#C9A24C" strokeWidth="1" />
        <line x1="560" y1="2" x2="560" y2="22" stroke="#C9A24C" strokeWidth="2.5" />
      </svg>
      <h1 className="mt-10 max-w-[18ch] text-4xl font-medium leading-[1.08] tracking-[-0.015em] md:text-5xl">
        This corridor doesn&rsquo;t go anywhere.
      </h1>
      <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-cream/85">
        The site is new and still being built — if something you needed is
        missing, tell us and we&rsquo;ll fix it.
      </p>
      <p className="mt-8 flex flex-wrap gap-6 text-accent">
        <a href="/" className="hover:underline">Home</a>
        <a href="/summit" className="hover:underline">The Summit</a>
        <a href="/founders-after-hours" className="hover:underline">Founders After Hours</a>
        <a href={`mailto:${EMAIL}`} className="hover:underline">{EMAIL}</a>
      </p>
    </main>
  );
}
