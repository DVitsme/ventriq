import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase-admin";

/** Double-opt-in landing for The Founder Digest (Phase 3 forms).
 *  /confirm?token=<uuid> → status 'confirmed' + confirmed_at, mirror the
 *  contact into the Resend audience, land on /?confirmed=1.
 *  Invalid or unknown token → /?confirmed=0. Clicking twice stays true:
 *  an already-confirmed row redirects straight to /?confirmed=1. */
export async function GET(request: NextRequest) {
  const home = (flag: 0 | 1) =>
    NextResponse.redirect(new URL(`/?confirmed=${flag}`, request.url), 302);

  const token = request.nextUrl.searchParams.get("token");
  // Cheap shape check before touching the DB (also avoids a Postgres cast
  // error — confirm_token is a uuid column).
  if (!z.uuid().safeParse(token).success) return home(0);

  const db = supabaseAdmin();
  const found = await db
    .from("newsletter_signups")
    .select("id, email, status")
    .eq("confirm_token", token)
    .maybeSingle();
  if (found.error || !found.data) return home(0);

  const { id, email, status } = found.data;
  if (status === "confirmed") return home(1);

  // 'pending' confirms; 'unsubscribed' + a fresh confirm click (they signed
  // up again — submitNewsletter re-sends the invite) also re-confirms.
  const updated = await db
    .from("newsletter_signups")
    .update({ status: "confirmed", confirmed_at: new Date().toISOString() })
    .eq("id", id);
  if (updated.error) {
    console.error("newsletter confirm update failed", updated.error);
    return home(0);
  }

  // Mirror into the Resend audience. Our table already holds the truth, so a
  // failure here logs for later sync instead of breaking the reader's click.
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (!apiKey || !audienceId) {
      console.error(
        "RESEND_API_KEY / RESEND_AUDIENCE_ID missing — contact not mirrored to Resend",
      );
    } else {
      const contact = await new Resend(apiKey).contacts.create({
        email,
        unsubscribed: false,
        audienceId,
      });
      if (contact.error) {
        console.error("resend contacts.create failed", contact.error);
      } else if (contact.data?.id) {
        await db
          .from("newsletter_signups")
          .update({ resend_contact_id: contact.data.id })
          .eq("id", id);
      }
    }
  } catch (error) {
    console.error("resend contact mirror failed", error);
  }

  return home(1);
}
