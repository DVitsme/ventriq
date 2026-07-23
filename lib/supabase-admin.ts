import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Server-side Supabase client on the SECRET key (sb_secret_...). The forms
 *  tables are RLS-on with zero policies and no anon grants — this client is
 *  the only door (see supabase/migrations/20260723180000_forms.sql).
 *
 *  Created per call, not at module scope: on Workers, process.env is populated
 *  per request by OpenNext, and the client is a stateless fetch wrapper anyway.
 *  `server-only` turns any client-bundle import into a build error. */
export function supabaseAdmin(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase server env missing — set SUPABASE_URL and SUPABASE_SECRET_KEY " +
        "(wrangler secret put in production, .dev.vars / .env.local locally; see .env.example).",
    );
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
