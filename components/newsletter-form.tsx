"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { submitNewsletter, type FormState } from "@/app/actions/forms";
import { VALIDATION } from "@/lib/schemas";
import { track } from "@/lib/analytics";
import { TurnstileField } from "./turnstile-field";

const initialState: FormState = { status: "idle" };

/** The Founder Digest block for the midnight footer (copy LAW 00-global.md).
 *  Brings its own small-caps heading to match the footer's other columns —
 *  mount it as a column, don't add a second heading around it.
 *  Progressive enhancement: the same <form action> posts without JS. */
export function NewsletterForm({ source = "footer" }: { source?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const [state, formAction, pending] = useActionState(
    submitNewsletter,
    initialState,
  );
  const [localError, setLocalError] = useState<string | null>(null);
  const [utm, setUtm] = useState("");

  // Attribution hidden field — the page's query string, set after mount so
  // server and client HTML match.
  useEffect(() => {
    setUtm(window.location.search);
  }, []);

  useEffect(() => {
    // Turnstile tokens are single-use — reset after every server round-trip.
    if (state.status !== "idle") turnstileRef.current?.reset();
    if (state.status === "success") track("sign_up", { method: "newsletter" });
  }, [state]);

  const fieldError = localError ?? state.fieldErrors?.email?.[0];
  const formError = state.status === "error" ? state.message : undefined;

  return (
    <div>
      <h2 className="text-sm tracking-[0.14em] text-cream/55 [font-variant:small-caps]">
        the founder digest
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-cream/60">
        One useful email a week — what&rsquo;s working, what&rsquo;s funding,
        what&rsquo;s next.
      </p>

      {state.status !== "success" && (
        <form
          ref={formRef}
          action={formAction}
          noValidate
          className="mt-4"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            // Don't spend a Turnstile token (or a rate-limit slot) on an
            // obviously empty field.
            if (!String(data.get("email") ?? "").trim()) {
              setLocalError(VALIDATION.required);
              return;
            }
            setLocalError(null);
            startTransition(() => formAction(data));
          }}
        >
          <label htmlFor="digest-email" className="sr-only">
            Your email
          </label>
          <input
            id="digest-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Your email"
            aria-invalid={fieldError ? true : undefined}
            aria-describedby={fieldError ? "digest-email-error" : undefined}
            className="w-full rounded-[2px] border border-cream/30 bg-cream/10 px-3.5 py-2.5 text-[15px] text-cream placeholder:text-cream/45"
          />
          {fieldError && (
            <p
              id="digest-email-error"
              className="mt-1.5 border-l-2 border-accent pl-2 text-[13px] text-cream/90"
            >
              {fieldError}
            </p>
          )}
          <input type="hidden" name="source" value={source} readOnly />
          <input type="hidden" name="utm" value={utm} readOnly />
          <div className="mt-3">
            <TurnstileField action="newsletter" instanceRef={turnstileRef} />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="mt-3 rounded-[2px] bg-gold px-5 py-[11px] text-[15px] font-semibold leading-none text-ink hover:bg-gold-hover disabled:cursor-default disabled:opacity-60"
          >
            {pending ? "Sending…" : "Send it to me"}
          </button>
        </form>
      )}

      <p
        aria-live="polite"
        role="status"
        className={
          state.status === "success"
            ? "mt-4 text-[15px] font-medium text-gold"
            : formError
              ? "mt-3 border-l-2 border-accent pl-2 text-[13px] text-cream/90"
              : "mt-0"
        }
      >
        {state.status === "success" ? state.message : (formError ?? "")}
      </p>

      <p className="mt-3 text-[13px] text-cream/50">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
