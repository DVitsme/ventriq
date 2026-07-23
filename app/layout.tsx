import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
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
    "A nonprofit backing small business owners, startups, and nonprofit builders — the Forge The Future summit Aug 10–20, a working founder community, and a 90-day mastermind. Rooted in Baltimore.",
  openGraph: {
    siteName: "Ventriq",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={spaceGrotesk.className}>
      <body className="bg-midnight text-cream antialiased">{children}</body>
      {process.env.NODE_ENV === "production" && (
        <GoogleAnalytics gaId="G-T0FTLZC27P" />
      )}
    </html>
  );
}
