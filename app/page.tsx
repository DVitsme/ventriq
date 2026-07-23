import type { Metadata } from "next";
import { Eyebrow } from "@/components/primitives";
import { LumaRegisterButton } from "@/components/luma-register-button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Ventriq — capital, programming & council for founders" },
  alternates: { canonical: "/" },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://ventriq.io/#org",
      name: "Ventriq",
      url: "https://ventriq.io",
      description:
        "A Baltimore-rooted nonprofit equipping founders with capital, programming, and council.",
      email: "jshaw@ventriq.io",
      areaServed: "US",
      sameAs: [
        "https://www.instagram.com/ventriqofficial",
        "https://luma.com/user/Ventriqofficial",
        "https://www.iamjs.io",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://ventriq.io/#website",
      url: "https://ventriq.io",
      name: "Ventriq",
      publisher: { "@id": "https://ventriq.io/#org" },
    },
  ],
};

export default function Home() {
  return (
    <main className="mx-auto max-w-[960px] px-5 py-20 md:px-20 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <Eyebrow>ven-treek · a nonprofit for founders</Eyebrow>
      <h1 className="mt-6 max-w-[21ch] text-4xl font-medium leading-[1.08] tracking-[-0.015em] md:text-6xl">
        The resources are out there. They&rsquo;re just camouflaged.
      </h1>
      <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-cream/85">
        Ventriq points the way in: capital, programming, and council for small
        business owners, startups, and nonprofits doing the real work — every
        serious founder welcome, with a focus on the builders the old models
        overlook.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-6">
        <LumaRegisterButton ctaLocation="home-hero">
          Register for the Summit
        </LumaRegisterButton>
        <a href="/summit" className="text-accent hover:underline">
          Forge The Future · Aug 10–20 →
        </a>
      </div>
    </main>
  );
}
