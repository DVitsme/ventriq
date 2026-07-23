"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { submitContact, type FormState } from "@/app/actions/forms";
import {
  contactSchema,
  CONTACT_SUBJECT_VALUES,
  CONTACT_SUBJECT_LABELS,
  type ContactInput,
  type ContactSubject,
} from "@/lib/schemas";
import { track } from "@/lib/analytics";
import { EMAIL } from "@/content/placeholders";
import { TurnstileField } from "./turnstile-field";

const initialState: FormState = { status: "idle" };

const inputClass =
  "mt-1.5 w-full rounded-[2px] border border-cream/30 bg-cream/10 px-3.5 py-2.5 text-[15px] text-cream placeholder:text-cream/40";
// Solid ground on the select so the dropdown list inherits midnight, not alpha.
const selectClass =
  "mt-1.5 w-full rounded-[2px] border border-cream/30 bg-midnight px-3.5 py-2.5 text-[15px] text-cream";
const labelClass = "block text-sm font-medium text-cream/75";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 border-l-2 border-accent pl-2 text-[13px] text-cream/90">
      {message}
    </p>
  );
}

/** Contact form card (midnight ground, /contact). RHF + zod client-side,
 *  useActionState server-side; the same <form action> posts without JS.
 *  Labels and strings are LAW (00-global.md §Forms, 07-contact.md).
 *  `defaultTopic` lets CTAs land pre-routed (e.g. sponsor links → sponsorship). */
export function ContactForm({ defaultTopic }: { defaultTopic?: ContactSubject }) {
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const [utm, setUtm] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: defaultTopic, message: "" },
  });

  useEffect(() => {
    setUtm(window.location.search);
  }, []);

  useEffect(() => {
    // Turnstile tokens are single-use — reset after every server round-trip.
    if (state.status !== "idle") turnstileRef.current?.reset();
    if (state.status === "success") track("generate_lead", { form_id: "contact" });
  }, [state]);

  const errorFor = (name: keyof ContactInput) =>
    errors[name]?.message ?? state.fieldErrors?.[name]?.[0];

  return (
    <section className="rounded-[2px] border border-cream/20 border-t-2 border-t-gold px-7 py-6">
      {state.status === "success" ? (
        <div>
          <h2 className="text-2xl font-medium text-cream">Got it.</h2>
          <p className="mt-2 max-w-[52ch] text-[15.5px] leading-relaxed text-cream/85">
            A real person reads every one — expect a reply within two business
            days.
          </p>
          <p className="mt-4 text-[15.5px] leading-relaxed text-cream/85">
            While you&rsquo;re here: the Summit is free and the
            community&rsquo;s open.
          </p>
          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            <a href="/summit" className="font-medium text-gold hover:underline">
              Register for the Summit →
            </a>
            <a
              href="/founders-after-hours"
              className="font-medium text-gold hover:underline"
            >
              Join Founders After Hours →
            </a>
          </p>
        </div>
      ) : (
        <form
          ref={formRef}
          action={formAction}
          noValidate
          onSubmit={handleSubmit(() =>
            startTransition(() => formAction(new FormData(formRef.current!))),
          )}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className={labelClass}>
                Your name
              </label>
              <input
                id="contact-name"
                autoComplete="name"
                aria-invalid={errorFor("name") ? true : undefined}
                aria-describedby={
                  errorFor("name") ? "contact-name-error" : undefined
                }
                className={inputClass}
                {...register("name")}
              />
              <FieldError id="contact-name-error" message={errorFor("name")} />
            </div>
            <div>
              <label htmlFor="contact-email" className={labelClass}>
                Your email
              </label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                aria-invalid={errorFor("email") ? true : undefined}
                aria-describedby={
                  errorFor("email") ? "contact-email-error" : undefined
                }
                className={inputClass}
                {...register("email")}
              />
              <FieldError id="contact-email-error" message={errorFor("email")} />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="contact-subject" className={labelClass}>
              What&rsquo;s this about?
            </label>
            <select
              id="contact-subject"
              aria-invalid={errorFor("subject") ? true : undefined}
              aria-describedby={
                errorFor("subject") ? "contact-subject-error" : undefined
              }
              className={selectClass}
              {...register("subject")}
            >
              <option value="" disabled>
                Pick one
              </option>
              {CONTACT_SUBJECT_VALUES.map((value) => (
                <option key={value} value={value}>
                  {CONTACT_SUBJECT_LABELS[value]}
                </option>
              ))}
            </select>
            <FieldError
              id="contact-subject-error"
              message={errorFor("subject")}
            />
          </div>

          <div className="mt-5">
            <label htmlFor="contact-message" className={labelClass}>
              Your message
            </label>
            <textarea
              id="contact-message"
              rows={6}
              aria-invalid={errorFor("message") ? true : undefined}
              aria-describedby={
                errorFor("message") ? "contact-message-error" : undefined
              }
              className={inputClass}
              {...register("message")}
            />
            <FieldError
              id="contact-message-error"
              message={errorFor("message")}
            />
          </div>

          <input type="hidden" name="utm" value={utm} readOnly />

          <div className="mt-5">
            <TurnstileField action="contact" instanceRef={turnstileRef} />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="mt-5 rounded-[2px] bg-gold px-6 py-[15px] font-semibold leading-none text-ink hover:bg-gold-hover disabled:cursor-default disabled:opacity-60"
          >
            {pending ? "Sending…" : "Send it"}
          </button>

          <p className="mt-4 text-sm text-cream/60">
            Prefer email?{" "}
            <a href={`mailto:${EMAIL}`} className="text-cream/85 hover:text-cream">
              {EMAIL}
            </a>
          </p>
        </form>
      )}

      <p
        aria-live="polite"
        role="status"
        className={
          state.status === "error" && state.message
            ? "mt-4 border-l-2 border-accent pl-2 text-[13.5px] text-cream/90"
            : "sr-only"
        }
      >
        {state.message ?? ""}
      </p>
    </section>
  );
}
