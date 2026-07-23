import "server-only";
import type { Attribution } from "@/lib/attribution";

/** Phase 3 transactional email bodies — deliberately simple inline HTML/text;
 *  react-email templates replace these later. Copy follows the ventriq-voice
 *  skill (warm host, sentence case, buttons say what happens — never "Submit"). */

type EmailBody = { subject: string; html: string; text: string };

// Brand constants for inline email styles (email clients get no stylesheet).
const INK = "#0B0F16";
const CREAM = "#F1ECDF";
const MIDNIGHT = "#101B2D";
const GOLD = "#C9A24C";
const ACCENT_DEEP = "#af5026";
const INK_SOFT = "#3f4650"; // ink at reading weight on cream
const INK_FAINT = "#6b6656"; // ink/55-ish on cream, for metadata

const FONT_STACK =
  "'Space Grotesk', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/** Double-opt-in confirmation for The Founder Digest.
 *  Subject is LAW: "One click and you're on the list". */
export function confirmEmail(confirmUrl: string): EmailBody {
  const subject = "One click and you're on the list";

  const text = [
    "The Founder Digest — one useful email a week. What's working, what's funding, what's next.",
    "",
    "One click to confirm it's really you, and the first one's on its way:",
    "",
    confirmUrl,
    "",
    "Didn't sign up? Ignore this and nothing else lands.",
    "",
    "— Justin & the Ventriq team",
    "Ventriq · Baltimore, MD",
  ].join("\n");

  const html = `<div style="margin:0;padding:28px 12px;background:${MIDNIGHT};">
  <div style="max-width:520px;margin:0 auto;background:${CREAM};border-top:2px solid ${GOLD};border-radius:2px;padding:32px 28px;font-family:${FONT_STACK};color:${INK};">
    <p style="margin:0;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:${INK_FAINT};">The Founder Digest</p>
    <h1 style="margin:14px 0 0;font-size:22px;line-height:1.3;font-weight:600;color:${INK};">One click and you're on the list.</h1>
    <p style="margin:14px 0 0;font-size:15px;line-height:1.6;color:${INK};">One useful email a week — what's working, what's funding, what's next. Confirm it's really you, and the first one's on its way.</p>
    <p style="margin:24px 0 0;">
      <a href="${confirmUrl}" style="display:inline-block;background:${GOLD};color:${INK};font-weight:600;font-size:15px;line-height:1;text-decoration:none;border-radius:2px;padding:15px 24px;">Put me on the list</a>
    </p>
    <p style="margin:20px 0 0;font-size:13px;line-height:1.6;color:${INK_SOFT};">Button not working? Paste this into your browser:<br /><a href="${confirmUrl}" style="color:${ACCENT_DEEP};word-break:break-all;">${confirmUrl}</a></p>
    <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:${INK_SOFT};">Didn't sign up? Ignore this and nothing else lands.</p>
    <p style="margin:24px 0 0;font-size:14px;color:${INK};">— Justin &amp; the Ventriq team</p>
    <p style="margin:6px 0 0;font-size:12px;color:${INK_FAINT};">Ventriq · Baltimore, MD</p>
  </div>
</div>`;

  return { subject, html, text };
}

/** Internal notification: new contact message → jshaw@ventriq.io. */
export function contactNotification(input: {
  name: string;
  email: string;
  subjectLabel: string;
  message: string;
  attribution: Attribution;
}): { subject: string; text: string } {
  return {
    subject: `New contact message — ${input.subjectLabel}`,
    text: [
      `From: ${input.name} <${input.email}>`,
      `Topic: ${input.subjectLabel}`,
      "",
      input.message,
      "",
      "—",
      attributionLine(input.attribution),
      "Reply to this email and it goes straight to them (reply-to is set).",
    ].join("\n"),
  };
}

/** Internal notification: chapter interest → jshaw@ventriq.io. */
export function chapterNotification(input: {
  name: string;
  email: string;
  city: string;
  attribution: Attribution;
}): { subject: string; text: string } {
  return {
    subject: `Chapter interest — ${input.city}`,
    text: [
      `${input.name} <${input.email}> raised a hand for ${input.city}.`,
      "",
      "—",
      attributionLine(input.attribution),
      "Reply to this email and it goes straight to them (reply-to is set).",
    ].join("\n"),
  };
}

function attributionLine(attr: Attribution): string {
  const bits = [
    attr.utm_source &&
      `utm: ${attr.utm_source} / ${attr.utm_medium ?? "—"} / ${attr.utm_campaign ?? "—"}`,
    attr.ga_client_id && `ga client: ${attr.ga_client_id}`,
  ].filter(Boolean);
  return bits.length ? bits.join(" · ") : "source: direct / untagged";
}
