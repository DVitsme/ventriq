import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { DeferredGA } from "@/components/deferred-ga";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ventriq.io"),
  title: {
    default: "Ventriq — capital, programming & council for founders",
    template: "%s — Ventriq",
  },
  description:
    "Backing small business owners, startups, and nonprofit builders — the Forge The Future Summit Aug 10–20, a working founder community, and a 90-day mastermind. Rooted in Baltimore.",
  openGraph: {
    siteName: "Ventriq",
    type: "website",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

/** viewport-fit=cover so env(safe-area-inset-bottom) is non-zero on notched
 *  phones — the mobile CTA bar pads with it (research doc §5). */
export const viewport: Viewport = {
  themeColor: "#101B2D",
  viewportFit: "cover",
};

import { TopChrome } from "@/components/chrome";
import { Footer } from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={spaceGrotesk.className}>
      <body className="bg-midnight text-cream antialiased">
        <TopChrome />
        {children}
        <Footer />
      </body>
      {process.env.NODE_ENV === "production" && (
        <DeferredGA gaId="G-T0FTLZC27P" />
      )}
    </html>
  );
}
