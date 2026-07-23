"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Wordmark } from "./wordmark";
import { LumaRegisterButton } from "./luma-register-button";
import type { NavCta } from "@/lib/calendar";

const LINKS = [
  { href: "/summit", label: "The Summit" },
  { href: "/founders-after-hours", label: "Founders After Hours" },
  { href: "/mastermind", label: "The Mastermind" },
  { href: "/about", label: "About" },
];

/** 78px desktop / 60px mobile; ONE time-aware button (single-button nav is a
 *  declared system decision). Server passes the CTA phase. */
export function Nav({ cta }: { cta: NavCta }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const ctaEl =
    cta === "summit" ? (
      <LumaRegisterButton ctaLocation="nav" className="text-[15px]">
        Register for the Summit
      </LumaRegisterButton>
    ) : cta === "mastermind" ? (
      <a href="/mastermind" className="rounded-[2px] bg-gold px-6 py-[15px] text-[15px] font-semibold leading-none text-ink hover:bg-gold-hover">
        Apply for the Mastermind
      </a>
    ) : (
      <a href="/founders-after-hours" className="rounded-[2px] bg-gold px-6 py-[15px] text-[15px] font-semibold leading-none text-ink hover:bg-gold-hover">
        Join Founders After Hours
      </a>
    );

  return (
    <header className="border-b border-cream/10 bg-midnight">
      <nav className="mx-auto flex h-[60px] max-w-[1440px] items-center justify-between px-5 md:h-[78px] md:px-20">
        <a href="/" aria-label="Ventriq home" className="text-cream">
          <Wordmark className="h-6 w-auto md:h-[30px]" />
        </a>
        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className={`text-[15px] hover:text-cream ${
                  pathname === l.href ? "text-gold" : "text-cream/85"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden lg:block">{ctaEl}</div>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 flex-col items-end justify-center gap-1.5 lg:hidden"
        >
          <span className="h-px w-6 bg-cream" />
          <span className="h-px w-6 bg-cream" />
          <span className="h-px w-4 bg-cream" />
        </button>
      </nav>
      {open && (
        <div className="border-t border-cream/10 px-5 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col gap-4 py-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`text-lg ${pathname === l.href ? "text-gold" : "text-cream/85"}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          {ctaEl}
        </div>
      )}
    </header>
  );
}
