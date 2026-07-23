import { z } from "zod";

/** Shared zod schemas (zod v4) — one source of truth for react-hook-form on
 *  the client and the server actions at the boundary. Validation strings are
 *  LAW from docs/build-handoff/copy-source/00-global.md §Forms. */

export const VALIDATION = {
  required: "We need this one.",
  badEmail: "That email doesn't look right — one more look?",
  messageShort: "Give us a sentence or two more to work with.",
} as const;

/** Empty gets the required line; anything present must actually be an email. */
const emailField = z
  .string(VALIDATION.required)
  .trim()
  .min(1, VALIDATION.required)
  .max(254, VALIDATION.badEmail)
  .pipe(z.email(VALIDATION.badEmail));

const nameField = z
  .string(VALIDATION.required)
  .trim()
  .min(1, VALIDATION.required)
  .max(120, "Let's keep it under 120 characters.");

/** Optional attribution metadata — never blocks a submission. */
const metaField = z.string().trim().max(255).optional().catch(undefined);

// --- Contact subject: values match the SQL check constraint; labels are the
// --- UI strings from copy-source/07-contact.md.
export const CONTACT_SUBJECT_VALUES = [
  "summit",
  "founders-after-hours",
  "mastermind",
  "sponsorship",
  "press",
  "other",
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECT_VALUES)[number];

export const CONTACT_SUBJECT_LABELS: Record<ContactSubject, string> = {
  summit: "The Summit",
  "founders-after-hours": "Founders After Hours",
  mastermind: "The Mastermind",
  sponsorship: "Sponsorship & partnerships",
  press: "Press",
  other: "Something else",
};

export const newsletterSchema = z.object({
  email: emailField,
  source: metaField,
  utm_source: metaField,
  utm_medium: metaField,
  utm_campaign: metaField,
});

export const contactSchema = z.object({
  name: nameField,
  email: emailField,
  subject: z.enum(CONTACT_SUBJECT_VALUES, { error: VALIDATION.required }),
  message: z
    .string(VALIDATION.required)
    .trim()
    .min(1, VALIDATION.required)
    .min(10, VALIDATION.messageShort)
    .max(5000, "That one's past 5,000 characters — trim it a little."),
});

export const chapterSchema = z.object({
  name: nameField,
  email: emailField,
  city: z
    .string(VALIDATION.required)
    .trim()
    .min(1, VALIDATION.required)
    .min(2, "Give us the city's full name.")
    .max(120, "Let's keep it under 120 characters."),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ChapterInput = z.infer<typeof chapterSchema>;
