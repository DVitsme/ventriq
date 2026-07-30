# Patterns — reusable motion & verification recipes

Derrick, Jul 30: *"This is a pattern we will use again in different ways —
save your research, thought process, and bug finds & fixes… to review and
teach yourself."* This folder is that. Each file is one pattern: the ask,
the reasoning, what broke, the exact recipe that shipped, and the laws it
proved. Written for a future session (or a future model) to pick up and
apply without re-deriving anything.

- `countdown-tick.md` — a per-second countdown that provably renders:
  boundary timers, keyed-span rolls, the NumberFlow disqualification, the
  three failure axes (value ≠ paint ≠ viewport), chip/2.2.2 wiring, and
  the probe pathology that almost sent the fix in the wrong direction.
- `stat-count-up.md` — choreographed stat count-ups (staggered finishes,
  readable first steps, the stat that must never move).
