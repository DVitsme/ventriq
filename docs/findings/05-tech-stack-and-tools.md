# 05 — Tech Stack, Tools & Accounts

> **⚠️ Superseded in part by meeting 2 (Jul 10)** — see `meetings/07-10-2026-meeting-2-outcomes.md`: **Eventbrite → Luma** (PWYW tickets, API, free SMS reminders); accounts now LIVE in Derrick's 1Password vault (GoDaddy + ventriq.io, Supabase, Resend, new Ventriq Google Workspace [trial bills ~Jul 24], Luma, Stripe [confirm owning entity]); **no Stripe donations for now** ("donate" banned until filings); FAH is a paid membership (Skool TBC).

## Website scope decision ✅

Build a **marketing site**, **not** the all-in-one portal — yet. [transcript]

Justin wants "everything in one" in a "perfect world," but was explicit that **for the MVP he does not need it all there.** The strategy: **lean on existing, already-built third-party tools** now, and build custom software (portal, simulator) later. *"These tools are already made. I can make those work as I build out the other software on the back end."* [transcript]

## Third-party tools (Justin owns these; the site links/embeds out to them)

| Tool | Job | Notes |
|---|---|---|
| **Eventbrite** | Event promo & ticketing | For the Summit. Already in use. [transcript] |
| **Skool** | Community | Founders After Hours digital home "for now." [transcript] |
| **Stripe** | Donations + payments | Justin's default; Derrick endorses it (scales well — *"start there… you start with PayPal and switch to Stripe, now everything's ugly"*). Nonprofit status → a **"donate" path** likely needed: *"if you got value from this summit, feel free to donate."* [transcript] |
| **Calendly** | Scheduling | Already on IAMJS (`calendly.com/jshaw-iamjs`) for discovery/advisory calls; likely carries over. [research] |

## Accounts to set up (Justin signs up → sends credentials to Derrick)

Derrick is providing the stack; Justin creates the accounts and hands over credentials. [transcript]

- **Email service** — free up to **~3,000 emails/month**, then ~**$20/month**. *(Pricing matches **Resend**; Derrick to confirm the actual vendor.)* Derrick sends the signup link. [transcript + inference]
- **Database** — free tier to start; scales with usage/queries. *(Supabase/Neon-class; Derrick to confirm.)* Derrick sends the signup link. [transcript + inference]
- **Domain: `Ventriq.io`** — Justin to **purchase**. `.com` is taken; chose **`.io` over `.ai`** because AI connotations are polarizing. Send domain credentials to Derrick. [transcript]
- **Google Workspace** ("Google Suite") — Justin signs up, sends credentials. **Then Derrick sets up Google My Business** (via Google Places) and the Google integrations. [transcript]

## Credentials handoff

Derrick will **send Justin a secure link** to collect all usernames/passwords in one place. Justin's cue: *"when you get those… done and get the username and password set up, let me know."* [transcript]

## Explicitly out of scope for the MVP (Phase 2+)

- The **all-in-one portal** — single login for playbacks, scheduling → Zoom links, and records. [transcript]
- The **gamified founder-simulator** software product. [transcript]
- Full e-commerce / member dashboards / native course delivery — handled by Eventbrite + Skool + Stripe for now. [inference]

See [`07-website-brief.md`](07-website-brief.md) for how these tools wire into the site.
