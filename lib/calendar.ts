import { NIGHTS, SESSION_END_ET, SESSION_START_ET, type Night } from "./agenda";

/** The single source of time truth. Every state machine (Summit hero,
 *  announcement bar, nav CTA, agenda rows) reads ONLY this module.
 *
 *  All boundaries are America/New_York wall-clock (EDT, UTC-4, for the whole
 *  Aug 10–20 window — no DST transition inside it). We convert via fixed
 *  -04:00 offsets rather than a tz library: correct for this event, zero deps.
 */

export type EventPhase =
  | "pre" // before lineup announcement (State A)
  | "announced" // lineup out, before Aug 10 (State B) — flips via ANNOUNCED flag
  | "live-night" // a session night, Mon–Thu inside the range (State C)
  | "between" // Fri–Sun Aug 14–16, or daytime between sessions (State D)
  | "post"; // after Aug 20 8:00 PM ET (State E)

/** Manual flag: flip to true when Justin announces the lineup ([ANNOUNCE-DATE]). */
export const LINEUP_ANNOUNCED = false;

const ET = "-04:00";
const utc = (date: string, h: number, m: number) =>
  new Date(`${date}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00${ET}`);

export const EVENT_START = utc(NIGHTS[0].date, SESSION_START_ET.hour, SESSION_START_ET.minute);
export const EVENT_END = utc(NIGHTS[NIGHTS.length - 1].date, SESSION_END_ET.hour, SESSION_END_ET.minute);

/** The night whose session covers `now`'s ET calendar day, if any. */
export function nightOf(now: Date): Night | undefined {
  const etDay = etDateString(now);
  return NIGHTS.find((n) => n.date === etDay);
}

/** Next upcoming night strictly after now's session window. */
export function nextNight(now: Date): Night | undefined {
  return NIGHTS.find((n) => now < utc(n.date, SESSION_END_ET.hour, SESSION_END_ET.minute));
}

export function isLiveNow(now: Date): boolean {
  const night = nightOf(now);
  if (!night) return false;
  return (
    now >= utc(night.date, SESSION_START_ET.hour, SESSION_START_ET.minute) &&
    now <= utc(night.date, SESSION_END_ET.hour, SESSION_END_ET.minute)
  );
}

export function eventPhase(now: Date): EventPhase {
  if (now > EVENT_END) return "post";
  // "pre" ends at ET midnight of opening day — a session DAY is State C
  // all day (hero shows "tonight… Live in"), matching the announcement bar.
  if (etDateString(now) < NIGHTS[0].date)
    return LINEUP_ANNOUNCED ? "announced" : "pre";
  // Inside the range: session day or between?
  return nightOf(now) ? "live-night" : "between";
}

export type AgendaRowState = "upcoming" | "tonight" | "replay";
export function agendaRowState(night: Night, now: Date): AgendaRowState {
  const end = utc(night.date, SESSION_END_ET.hour, SESSION_END_ET.minute);
  if (now > end) return "replay";
  if (etDateString(now) === night.date) return "tonight";
  return "upcoming";
}

export type NavCta = "summit" | "mastermind" | "fah";
export function navCta(now: Date): NavCta {
  if (now <= EVENT_END) return "summit";
  // Aug 21 → Mastermind cohort close ([APP-DEADLINE] unknown; default Sept 30)
  if (now <= new Date(`2026-09-30T23:59:59${ET}`)) return "mastermind";
  return "fah";
}

export type AnnouncementState = "pre" | "during" | "post";
export function announcementState(now: Date): AnnouncementState {
  if (now > EVENT_END) return "post";
  if (nightOf(now)) return "during";
  return "pre"; // documented default: Fri–Sun inside the range shows pre-string
}

/** YYYY-MM-DD of `now` in ET (fixed -04:00 for this event's season). */
export function etDateString(now: Date): string {
  const shifted = new Date(now.getTime() - 4 * 3600_000);
  return shifted.toISOString().slice(0, 10);
}
