import "server-only";
import { headers } from "next/headers";

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type SiteverifyResult = {
  success: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

/** Server-side check of the token Turnstile's implicit hidden input posts as
 *  "cf-turnstile-response". Fails closed on anything odd; requires the widget
 *  action to match so a token minted for one form can't clear another. */
export async function verifyTurnstile(
  token: FormDataEntryValue | null,
  action: string,
): Promise<boolean> {
  // Turnstile tokens cap at 2048 chars — anything else is not a token.
  if (typeof token !== "string" || token.length === 0 || token.length > 2048) {
    return false;
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    throw new Error(
      "TURNSTILE_SECRET_KEY is not set — `wrangler secret put TURNSTILE_SECRET_KEY` " +
        "(or .dev.vars / .env.local locally; dev always-pass keys are in .env.example).",
    );
  }

  const remoteip = (await headers()).get("cf-connecting-ip") ?? undefined;

  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        secret,
        response: token,
        remoteip,
        idempotency_key: crypto.randomUUID(),
      }),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as SiteverifyResult;
    return data.success === true && data.action === action;
  } catch {
    return false; // network hiccup at the verifier = fail closed
  }
}
