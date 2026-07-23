import { NextRequest, NextResponse } from "next/server";
import { LUMA_URL } from "@/lib/agenda";

/** First-party attribution redirects (roadmap A9). The navigation IS the
 *  event: unblockable by ad blockers, stamps UTMs so nobody hand-types them.
 *  Channel comes from ?s= (see docs/utm-registry.md). GA4 reporting reads
 *  these from Luma's per-registration utm_source; server logging lands in
 *  Workers Logs (observability is on). */

const DESTINATIONS: Record<string, { url: string; campaign?: string }> = {
  summit: { url: LUMA_URL, campaign: "forge-the-future-2026" },
  ig: { url: "https://ventriq.io/", campaign: "brand" },
};

const CHANNELS: Record<string, { source: string; medium: string }> = {
  ig: { source: "ig-bio", medium: "social" },
  "ig-story": { source: "ig-story", medium: "social" },
  li: { source: "linkedin", medium: "social" },
  speak: { source: "speaking", medium: "qr" },
  email: { source: "newsletter", medium: "email" },
  site: { source: "ventriq-site", medium: "referral" },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const dest = DESTINATIONS[slug];
  if (!dest) return NextResponse.redirect("https://ventriq.io/", 302);

  const s = request.nextUrl.searchParams.get("s") ?? "site";
  // hbcu-<school> and speaker-<name> pass through as-is
  const channel =
    CHANNELS[s] ??
    (s.startsWith("hbcu-") || s.startsWith("speaker-")
      ? { source: s, medium: "partner" }
      : { source: s, medium: "referral" });

  const url = new URL(dest.url);
  url.searchParams.set("utm_source", channel.source);
  url.searchParams.set("utm_medium", channel.medium);
  if (dest.campaign) url.searchParams.set("utm_campaign", dest.campaign);

  console.log(
    JSON.stringify({ kind: "go-redirect", slug, source: channel.source, ua: request.headers.get("user-agent")?.slice(0, 80) }),
  );
  return NextResponse.redirect(url.toString(), 302);
}
