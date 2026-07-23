import "server-only";
import { cookies, headers } from "next/headers";

/** Attribution stamped onto every form insert (roadmap: close the loop between
 *  GA4 sessions and rows in Supabase). Everything here is best-effort — every
 *  field accepts null and a missing cookie never blocks a submission. */
export type Attribution = {
  ga_client_id: string | null;
  ga_session_id: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  ip_hash: string | null;
};

/** GA4 stream cookie for gaId G-T0FTLZC27P (app/layout.tsx). */
const GA_SESSION_COOKIE = "_ga_T0FTLZC27P";

type UtmParams = Partial<
  Record<"utm_source" | "utm_medium" | "utm_campaign", string>
>;

/** Reads attribution from the request (Next 16: cookies()/headers() are async).
 *  `utmField` is the raw value of the forms' hidden "utm" input (the page's
 *  location.search, set client-side); the referer query string is the no-JS
 *  fallback. */
export async function readAttribution(
  utmField?: string | null,
): Promise<Attribution> {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);

  // _ga = "GA1.1.1194286772.1719234567" → client id "1194286772.1719234567"
  const ga = cookieStore.get("_ga")?.value;
  const ga_client_id = ga ? ga.split(".").slice(2).join(".") || null : null;

  // _ga_<STREAM> (GS2 format) = "GS2.1.s1746476000$o5$g1$..." → "1746476000"
  const gaSession = cookieStore.get(GA_SESSION_COOKIE)?.value;
  const ga_session_id = gaSession
    ? (gaSession.match(/GS\d\.\d\.s?(\d+)/)?.[1] ?? null)
    : null;

  const fromField = parseUtmParams(utmField ?? null);
  const fromReferer = parseUtmParams(headerStore.get("referer"));

  const ip = headerStore.get("cf-connecting-ip");
  const ip_hash = ip ? await sha256Hex(ip) : null;

  return {
    ga_client_id,
    ga_session_id,
    utm_source: fromField.utm_source ?? fromReferer.utm_source ?? null,
    utm_medium: fromField.utm_medium ?? fromReferer.utm_medium ?? null,
    utm_campaign: fromField.utm_campaign ?? fromReferer.utm_campaign ?? null,
    ip_hash,
  };
}

/** Accepts "?utm_source=x", "utm_source=x", or a full URL (the referer). */
function parseUtmParams(raw: string | null): UtmParams {
  if (!raw) return {};
  let params: URLSearchParams;
  try {
    params = raw.includes("://")
      ? new URL(raw).searchParams
      : new URLSearchParams(raw.startsWith("?") ? raw.slice(1) : raw);
  } catch {
    return {};
  }
  const pick = (key: string) => {
    const value = params.get(key)?.trim();
    return value ? value.slice(0, 255) : undefined;
  };
  return {
    utm_source: pick("utm_source"),
    utm_medium: pick("utm_medium"),
    utm_campaign: pick("utm_campaign"),
  };
}

/** SHA-256 hex via Web Crypto (Workers-native — no node:crypto import). */
export async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input),
  );
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
