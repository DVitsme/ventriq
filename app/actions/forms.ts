"use server";

import { z } from "zod";
import { Resend } from "resend";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { readAttribution, type Attribution } from "@/lib/attribution";
import { verifyTurnstile } from "@/lib/turnstile";
import {
  confirmEmail,
  contactNotification,
  chapterNotification,
} from "@/lib/emails";
import {
  newsletterSchema,
  contactSchema,
  chapterSchema,
  CONTACT_SUBJECT_LABELS,
} from "@/lib/schemas";
import { EMAIL } from "@/content/placeholders";

/** Shape shared by useActionState on all three forms. `fieldErrors` comes
 *  straight from z.flattenError; `message` carries form-level strings
 *  (success lines, turnstile, rate limit — LAW, copy-source/00-global.md). */
export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<string, string[]>>;
};

const MSG = {
  turnstile: "That quick check didn't clear — refresh and try once more.",
  rateLimited: "Too many tries — give it a minute.",
  generic: "Something went sideways on our end. Give it another try in a minute.",
  newsletterPending: "Almost in — check your inbox to confirm.",
  newsletterConfirmed: "You're on the list. First Digest lands this week.",
  contactSuccess:
    "Got it. A real person reads every one — expect a reply within two business days.",
  chapterSuccess: "Hand raised — we'll be in touch when your city stirs.",
} as const;

const FROM = "Ventriq <jshaw@ventriq.io>";
const NOTIFY_TO = EMAIL; // jshaw@ventriq.io — content/placeholders.ts, resolved Jul 23

// Shape of the Workers rate-limit binding (wrangler.jsonc "ratelimits";
// `pnpm cf-typegen` adds the real type to CloudflareEnv after deploy config).
type RateLimiter = {
  limit: (options: { key: string }) => Promise<{ success: boolean }>;
};

/** Research-locked gate order: Turnstile first, then the Workers rate-limit
 *  binding keyed on the hashed IP. Returns an error FormState, or null to
 *  proceed. The binding is absent under plain `next dev` — fail open there
 *  (production always has it). */
async function gate(
  formData: FormData,
  action: "newsletter" | "contact" | "chapter",
  ipHash: string | null,
): Promise<FormState | null> {
  const human = await verifyTurnstile(
    formData.get("cf-turnstile-response"),
    action,
  );
  if (!human) return { status: "error", message: MSG.turnstile };

  const { env } = getCloudflareContext();
  const limiter = (env as unknown as { FORM_RATE_LIMITER?: RateLimiter })
    .FORM_RATE_LIMITER;
  if (limiter) {
    const { success } = await limiter.limit({ key: ipHash ?? "no-ip" });
    if (!success) return { status: "error", message: MSG.rateLimited };
  }
  return null;
}

const field = (formData: FormData, name: string): string => {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
};

const optionalField = (formData: FormData, name: string): string | undefined => {
  const value = formData.get(name);
  return typeof value === "string" && value.trim() ? value : undefined;
};

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set (see .env.example).");
  return new Resend(key);
}

/** Attribution columns for inserts; explicit utm values (newsletter hidden
 *  fields, if a caller ever passes them) win over cookie/referer inference. */
function attributionColumns(
  attr: Attribution,
  utmOverride?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  },
) {
  return {
    ga_client_id: attr.ga_client_id,
    ga_session_id: attr.ga_session_id,
    utm_source: utmOverride?.utm_source ?? attr.utm_source,
    utm_medium: utmOverride?.utm_medium ?? attr.utm_medium,
    utm_campaign: utmOverride?.utm_campaign ?? attr.utm_campaign,
    ip_hash: attr.ip_hash,
  };
}

/** The Founder Digest — double opt-in. Insert as 'pending', send the confirm
 *  email; app/confirm/route.ts flips the row and mirrors into Resend. */
export async function submitNewsletter(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const attribution = await readAttribution(optionalField(formData, "utm"));
    const gated = await gate(formData, "newsletter", attribution.ip_hash);
    if (gated) return gated;

    const parsed = newsletterSchema.safeParse({
      email: field(formData, "email"),
      source: optionalField(formData, "source"),
      utm_source: optionalField(formData, "utm_source"),
      utm_medium: optionalField(formData, "utm_medium"),
      utm_campaign: optionalField(formData, "utm_campaign"),
    });
    if (!parsed.success) {
      return {
        status: "error",
        fieldErrors: z.flattenError(parsed.error).fieldErrors,
      };
    }

    const db = supabaseAdmin();
    const inserted = await db
      .from("newsletter_signups")
      .insert({
        email: parsed.data.email,
        source: parsed.data.source ?? null,
        ...attributionColumns(attribution, parsed.data),
      })
      .select("status, confirm_token")
      .single();

    let confirmToken: string;
    if (inserted.error) {
      // 23505 = email already on file. Never a dead end: confirmed folks get
      // the confirmed line; pending/unsubscribed get a fresh confirm email.
      if (inserted.error.code !== "23505") {
        console.error("newsletter insert failed", inserted.error);
        return { status: "error", message: MSG.generic };
      }
      const existing = await db
        .from("newsletter_signups")
        .select("status, confirm_token")
        .eq("email", parsed.data.email)
        .single();
      if (existing.error || !existing.data) {
        console.error("newsletter dupe lookup failed", existing.error);
        return { status: "error", message: MSG.generic };
      }
      if (existing.data.status === "confirmed") {
        return { status: "success", message: MSG.newsletterConfirmed };
      }
      confirmToken = existing.data.confirm_token;
    } else {
      confirmToken = inserted.data.confirm_token;
    }

    const base = process.env.NEXT_PUBLIC_SITE_URL || "https://ventriq.io";
    const email = confirmEmail(`${base}/confirm?token=${confirmToken}`);
    const sent = await getResend().emails.send({
      from: FROM,
      to: parsed.data.email,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });
    if (sent.error) {
      console.error("newsletter confirm email failed", sent.error);
      return { status: "error", message: MSG.generic };
    }

    return { status: "success", message: MSG.newsletterPending };
  } catch (error) {
    console.error("submitNewsletter failed", error);
    return { status: "error", message: MSG.generic };
  }
}

/** Contact form → contact_messages + notification to jshaw@ventriq.io. */
export async function submitContact(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const attribution = await readAttribution(optionalField(formData, "utm"));
    const gated = await gate(formData, "contact", attribution.ip_hash);
    if (gated) return gated;

    const parsed = contactSchema.safeParse({
      name: field(formData, "name"),
      email: field(formData, "email"),
      subject: field(formData, "subject"),
      message: field(formData, "message"),
    });
    if (!parsed.success) {
      return {
        status: "error",
        fieldErrors: z.flattenError(parsed.error).fieldErrors,
      };
    }

    const { error } = await supabaseAdmin()
      .from("contact_messages")
      .insert({ ...parsed.data, ...attributionColumns(attribution) });
    if (error) {
      console.error("contact insert failed", error);
      return { status: "error", message: MSG.generic };
    }

    // The row is saved — a notification hiccup shouldn't fail the sender.
    try {
      const note = contactNotification({
        ...parsed.data,
        subjectLabel: CONTACT_SUBJECT_LABELS[parsed.data.subject],
        attribution,
      });
      await getResend().emails.send({
        from: FROM,
        to: NOTIFY_TO,
        replyTo: parsed.data.email,
        subject: note.subject,
        text: note.text,
      });
    } catch (error) {
      console.error("contact notification email failed", error);
    }

    return { status: "success", message: MSG.contactSuccess };
  } catch (error) {
    console.error("submitContact failed", error);
    return { status: "error", message: MSG.generic };
  }
}

/** Chapter interest (FAH "your city" card) → chapter_interest + notification. */
export async function submitChapter(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const attribution = await readAttribution(optionalField(formData, "utm"));
    const gated = await gate(formData, "chapter", attribution.ip_hash);
    if (gated) return gated;

    const parsed = chapterSchema.safeParse({
      name: field(formData, "name"),
      email: field(formData, "email"),
      city: field(formData, "city"),
    });
    if (!parsed.success) {
      return {
        status: "error",
        fieldErrors: z.flattenError(parsed.error).fieldErrors,
      };
    }

    const { error } = await supabaseAdmin()
      .from("chapter_interest")
      .insert({ ...parsed.data, ...attributionColumns(attribution) });
    if (error) {
      console.error("chapter insert failed", error);
      return { status: "error", message: MSG.generic };
    }

    try {
      const note = chapterNotification({ ...parsed.data, attribution });
      await getResend().emails.send({
        from: FROM,
        to: NOTIFY_TO,
        replyTo: parsed.data.email,
        subject: note.subject,
        text: note.text,
      });
    } catch (error) {
      console.error("chapter notification email failed", error);
    }

    return { status: "success", message: MSG.chapterSuccess };
  } catch (error) {
    console.error("submitChapter failed", error);
    return { status: "error", message: MSG.generic };
  }
}
