-- Phase 3 forms backend: newsletter (double opt-in), contact, chapter interest.
--
-- Access model (research-locked, Jul 2026): RLS is ON with ZERO policies and
-- all anon/authenticated grants revoked. These tables must stay UNEXPOSED to
-- the Data API — the only door is the server-side Supabase client using the
-- sb_secret_ key (lib/supabase-admin.ts) from server actions / route handlers.
-- Do NOT add policies or re-grant to anon/authenticated.

create extension if not exists citext with schema extensions;

-- ---------------------------------------------------------------------------
-- newsletter_signups — The Founder Digest, double opt-in.
-- status: pending (awaiting confirm click) → confirmed (in the Resend
-- audience) → unsubscribed (kept for suppression; re-signup re-invites).
-- ---------------------------------------------------------------------------
create table public.newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  email extensions.citext not null unique,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'unsubscribed')),
  confirm_token uuid not null default gen_random_uuid(),
  confirmed_at timestamptz,
  resend_contact_id text,
  source text,
  ga_client_id text,
  ga_session_id text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  ip_hash text,
  created_at timestamptz not null default now()
);

-- /confirm looks rows up by token.
create unique index newsletter_signups_confirm_token_idx
  on public.newsletter_signups (confirm_token);

-- ---------------------------------------------------------------------------
-- contact_messages — the /contact form. Also mirrored to jshaw@ventriq.io via
-- Resend at submit time; this table is the durable copy.
-- ---------------------------------------------------------------------------
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email extensions.citext not null,
  subject text not null check (subject in
    ('summit', 'founders-after-hours', 'mastermind', 'sponsorship', 'press', 'other')),
  message text not null check (char_length(message) between 10 and 5000),
  ga_client_id text,
  ga_session_id text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  ip_hash text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- chapter_interest — "Raise your hand" on Founders After Hours (your-city card).
-- ---------------------------------------------------------------------------
create table public.chapter_interest (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email extensions.citext not null,
  city text not null check (char_length(city) between 2 and 120),
  ga_client_id text,
  ga_session_id text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  ip_hash text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Lock the doors: RLS on, zero policies, no anon/authenticated grants.
-- (Supabase default privileges grant to anon + authenticated on new public
-- tables — revoke explicitly so the Data API is a dead end even if exposed.)
-- ---------------------------------------------------------------------------
alter table public.newsletter_signups enable row level security;
alter table public.contact_messages enable row level security;
alter table public.chapter_interest enable row level security;

revoke all on table public.newsletter_signups from anon, authenticated;
revoke all on table public.contact_messages from anon, authenticated;
revoke all on table public.chapter_interest from anon, authenticated;

comment on table public.newsletter_signups is
  'Founder Digest double-opt-in list. RLS on, zero policies, anon/authenticated revoked — keep UNEXPOSED to the Data API; server actions using the secret key are the only door.';
comment on table public.contact_messages is
  'Contact-form submissions. RLS on, zero policies, anon/authenticated revoked — keep UNEXPOSED to the Data API; server actions using the secret key are the only door.';
comment on table public.chapter_interest is
  'Founders After Hours chapter interest (Raise your hand). RLS on, zero policies, anon/authenticated revoked — keep UNEXPOSED to the Data API; server actions using the secret key are the only door.';
