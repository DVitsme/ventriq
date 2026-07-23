"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { submitChapter, type FormState } from "@/app/actions/forms";
import { chapterSchema, type ChapterInput } from "@/lib/schemas";
import { track } from "@/lib/analytics";
import { TurnstileField } from "./turnstile-field";

const initialState: FormState = { status: "idle" };

const inputClass =
  "mt-1.5 w-full rounded-[2px] border border-ink/30 bg-transparent px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink/40";
const labelClass = "block text-sm font-medium text-ink/70";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 border-l-2 border-accent pl-2 text-[13px] text-ink/85">
      {message}
    </p>
  );
}

/** Chapter interest — mounts INSIDE the dashed "Your city" card on
 *  /founders-after-hours (cream ground; the card supplies its own heading and
 *  body, this replaces the "Raise your hand →" placeholder link). RHF + zod
 *  client-side, useActionState server-side; posts without JS too. */
export function ChapterForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const [state, formAction, pending] = useActionState(submitChapter, initialState);
  const [utm, setUtm] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChapterInput>({
    resolver: zodResolver(chapterSchema),
    defaultValues: { name: "", email: "", city: "" },
  });

  useEffect(() => {
    setUtm(window.location.search);
  }, []);

  useEffect(() => {
    // Turnstile tokens are single-use — reset after every server round-trip.
    if (state.status !== "idle") turnstileRef.current?.reset();
    if (state.status === "success") track("generate_lead", { form_id: "chapter" });
  }, [state]);

  const errorFor = (name: keyof ChapterInput) =>
    errors[name]?.message ?? state.fieldErrors?.[name]?.[0];

  return (
    <div className="mt-5">
      {state.status !== "success" && (
        <form
          ref={formRef}
          action={formAction}
          noValidate
          onSubmit={handleSubmit(() =>
            startTransition(() => formAction(new FormData(formRef.current!))),
          )}
        >
          <div>
            <label htmlFor="chapter-name" className={labelClass}>
              Your name
            </label>
            <input
              id="chapter-name"
              autoComplete="name"
              aria-invalid={errorFor("name") ? true : undefined}
              aria-describedby={
                errorFor("name") ? "chapter-name-error" : undefined
              }
              className={inputClass}
              {...register("name")}
            />
            <FieldError id="chapter-name-error" message={errorFor("name")} />
          </div>

          <div className="mt-4">
            <label htmlFor="chapter-email" className={labelClass}>
              Your email
            </label>
            <input
              id="chapter-email"
              type="email"
              autoComplete="email"
              aria-invalid={errorFor("email") ? true : undefined}
              aria-describedby={
                errorFor("email") ? "chapter-email-error" : undefined
              }
              className={inputClass}
              {...register("email")}
            />
            <FieldError id="chapter-email-error" message={errorFor("email")} />
          </div>

          <div className="mt-4">
            <label htmlFor="chapter-city" className={labelClass}>
              Your city
            </label>
            <input
              id="chapter-city"
              autoComplete="address-level2"
              aria-invalid={errorFor("city") ? true : undefined}
              aria-describedby={
                errorFor("city") ? "chapter-city-error" : undefined
              }
              className={inputClass}
              {...register("city")}
            />
            <FieldError id="chapter-city-error" message={errorFor("city")} />
          </div>

          <input type="hidden" name="utm" value={utm} readOnly />

          <div className="mt-4">
            <TurnstileField action="chapter" instanceRef={turnstileRef} onCream />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="mt-4 rounded-[2px] bg-gold px-6 py-[15px] font-semibold leading-none text-ink hover:bg-gold-hover disabled:cursor-default disabled:opacity-60"
          >
            {pending ? "Sending…" : "Raise your hand"}
          </button>
        </form>
      )}

      <p
        aria-live="polite"
        role="status"
        className={
          state.status === "success"
            ? "border-l-2 border-gold pl-3 text-[15.5px] font-medium text-ink"
            : state.status === "error" && state.message
              ? "mt-4 border-l-2 border-accent pl-2 text-[13.5px] text-ink/85"
              : "sr-only"
        }
      >
        {state.message ?? ""}
      </p>
    </div>
  );
}
