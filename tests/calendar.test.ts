// (`pnpm add -D vitest @playwright/test @axe-core/playwright @lhci/cli`).
// It keeps `next build`'s typecheck green while the harness is dormant,
// because tsconfig.json includes `**/*.ts`.
import { describe, expect, test } from "vitest";
import {
  EVENT_END,
  EVENT_START,
  LINEUP_ANNOUNCED,
  agendaRowState,
  announcementState,
  etDateString,
  eventPhase,
  isLiveNow,
  navCta,
  nextNight,
  nightOf,
} from "../lib/calendar";
import { NIGHTS, SESSION_END_ET, SESSION_START_ET } from "../lib/agenda";

/** The committed version of the Jul 23 stress-test boundary matrix (TODO.md →
 *  "Calendar-util tests → formalize"), extended with the invariants the
 *  matrix leans on.
 *
 *  Every instant below is ET wall-clock. The whole Aug 10–20 window sits
 *  inside EDT (UTC-4, no DST transition), so a fixed -04:00 offset is exact —
 *  the same design decision lib/calendar.ts documents. */
const et = (date: string, time: string) =>
  new Date(`${date}T${time}:00-04:00`);

describe("agenda ground truth (everything else keys off these)", () => {
  test("eight nights, Mon–Thu across two weeks, dark weekend Aug 14–16", () => {
    expect(NIGHTS.map((n) => n.n)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(NIGHTS.map((n) => n.date)).toEqual([
      "2026-08-10",
      "2026-08-11",
      "2026-08-12",
      "2026-08-13",
      "2026-08-17",
      "2026-08-18",
      "2026-08-19",
      "2026-08-20",
    ]);
  });

  test("sessions run 6:30–8:00 PM ET", () => {
    expect(SESSION_START_ET).toEqual({ hour: 18, minute: 30 });
    expect(SESSION_END_ET).toEqual({ hour: 20, minute: 0 });
  });

  test("EVENT_START / EVENT_END are the exact instants", () => {
    // Aug 10 6:30 PM ET / Aug 20 8:00 PM ET, expressed in UTC.
    expect(EVENT_START.toISOString()).toBe("2026-08-10T22:30:00.000Z");
    expect(EVENT_END.toISOString()).toBe("2026-08-21T00:00:00.000Z");
  });
});

describe("etDateString — ET midnight is 04:00Z in August", () => {
  test("Aug 10 03:59Z is still Aug 9 in ET", () => {
    expect(etDateString(new Date("2026-08-10T03:59:00Z"))).toBe("2026-08-09");
  });

  test("Aug 10 04:00Z is exactly ET midnight → the new day", () => {
    expect(etDateString(new Date("2026-08-10T04:00:00Z"))).toBe("2026-08-10");
  });

  test("Aug 10 04:01Z is Aug 10 in ET", () => {
    expect(etDateString(new Date("2026-08-10T04:01:00Z"))).toBe("2026-08-10");
  });
});

describe("nightOf — session-DAY mapping (ET calendar day, not session hours)", () => {
  test.each(NIGHTS.map((n) => [n.n, n.date] as const))(
    "night %i ↔ %s (checked at noon ET)",
    (n, date) => {
      expect(nightOf(et(date, "12:00"))?.n).toBe(n);
    },
  );

  test("dark-weekend days map to no night", () => {
    for (const date of ["2026-08-14", "2026-08-15", "2026-08-16"]) {
      expect(nightOf(et(date, "12:00"))).toBeUndefined();
    }
  });

  test("flips at ET midnight, not at session end", () => {
    expect(nightOf(et("2026-08-13", "23:59"))?.n).toBe(4);
    expect(nightOf(et("2026-08-14", "00:01"))).toBeUndefined();
  });
});

describe("eventPhase — the verified boundary matrix", () => {
  test("Aug 9 noon (day before) → pre / announced per the manual flag", () => {
    // LINEUP_ANNOUNCED is the hand-flipped constant in lib/calendar.ts.
    // Asserting the pair (not a literal) keeps this suite green across the
    // flip; today the flag is false, so this is the matrix's "pre" case.
    expect(eventPhase(et("2026-08-09", "12:00"))).toBe(
      LINEUP_ANNOUNCED ? "announced" : "pre",
    );
  });

  test("opening-day rule: Aug 10 09:00 is already live-night (day counts from ET midnight)", () => {
    expect(eventPhase(et("2026-08-10", "09:00"))).toBe("live-night");
  });

  test("Aug 10 around the 6:30 PM doors: 18:29 and 18:31 are both live-night", () => {
    expect(eventPhase(et("2026-08-10", "18:29"))).toBe("live-night");
    expect(eventPhase(et("2026-08-10", "18:31"))).toBe("live-night");
  });

  test("Aug 13 23:00, hours after the session ended, is still live-night", () => {
    expect(eventPhase(et("2026-08-13", "23:00"))).toBe("live-night");
  });

  test("dark weekend: Aug 14 10:00 and Aug 16 22:00 → between", () => {
    expect(eventPhase(et("2026-08-14", "10:00"))).toBe("between");
    expect(eventPhase(et("2026-08-16", "22:00"))).toBe("between");
  });

  test("week two: Aug 17 19:00 → live-night (night 5)", () => {
    expect(eventPhase(et("2026-08-17", "19:00"))).toBe("live-night");
    expect(nightOf(et("2026-08-17", "19:00"))?.n).toBe(5);
  });

  test("final night: Aug 20 19:59 → live-night (night 8)", () => {
    expect(eventPhase(et("2026-08-20", "19:59"))).toBe("live-night");
    expect(nightOf(et("2026-08-20", "19:59"))?.n).toBe(8);
  });

  test("EVENT_END is inclusive: Aug 20 20:00:00 exactly is still live-night", () => {
    expect(eventPhase(et("2026-08-20", "20:00"))).toBe("live-night");
  });

  test("post flips a minute later: Aug 20 20:01 and Aug 21 → post", () => {
    expect(eventPhase(et("2026-08-20", "20:01"))).toBe("post");
    expect(eventPhase(et("2026-08-21", "10:00"))).toBe("post");
  });
});

describe("announcementState — the bar's three strings", () => {
  test("pre before the event", () => {
    expect(announcementState(et("2026-08-09", "12:00"))).toBe("pre");
  });

  test("during for the whole ET session day, from midnight", () => {
    expect(announcementState(et("2026-08-10", "09:00"))).toBe("during");
    expect(announcementState(et("2026-08-10", "18:29"))).toBe("during");
    expect(announcementState(et("2026-08-10", "18:31"))).toBe("during");
    expect(announcementState(et("2026-08-13", "23:00"))).toBe("during");
  });

  test("dark weekend shows the pre string (documented default)", () => {
    expect(announcementState(et("2026-08-14", "10:00"))).toBe("pre");
    expect(announcementState(et("2026-08-16", "22:00"))).toBe("pre");
  });

  test("post after the final session", () => {
    expect(announcementState(et("2026-08-20", "20:01"))).toBe("post");
  });
});

describe("navCta — the one time-aware button", () => {
  test("summit through the final second of the event", () => {
    expect(navCta(et("2026-08-09", "12:00"))).toBe("summit");
    expect(navCta(et("2026-08-20", "19:59"))).toBe("summit");
    expect(navCta(et("2026-08-20", "20:00"))).toBe("summit"); // inclusive end
  });

  test("mastermind from Aug 20 20:01 through Sept 30 (default [APP-DEADLINE])", () => {
    expect(navCta(et("2026-08-20", "20:01"))).toBe("mastermind");
    expect(navCta(et("2026-08-21", "10:00"))).toBe("mastermind");
    expect(navCta(et("2026-09-30", "23:59"))).toBe("mastermind");
  });

  test("fah from Oct 1 ET midnight", () => {
    expect(navCta(et("2026-10-01", "00:00"))).toBe("fah");
  });
});

describe("agendaRowState", () => {
  test("matrix at Aug 12 noon: nights 1–2 replay, 3 tonight, 4–8 upcoming", () => {
    const now = et("2026-08-12", "12:00");
    expect(NIGHTS.map((n) => agendaRowState(n, now))).toEqual([
      "replay",
      "replay",
      "tonight",
      "upcoming",
      "upcoming",
      "upcoming",
      "upcoming",
      "upcoming",
    ]);
  });

  test("tonight → replay at the 8:00 PM session end (end instant inclusive)", () => {
    const night3 = NIGHTS[2];
    expect(agendaRowState(night3, et("2026-08-12", "20:00"))).toBe("tonight");
    expect(agendaRowState(night3, et("2026-08-12", "20:01"))).toBe("replay");
  });
});

describe("isLiveNow — the actual 6:30–8:00 PM window (unlike the day-granular phases)", () => {
  test("boundaries on night 1", () => {
    expect(isLiveNow(et("2026-08-10", "18:29"))).toBe(false);
    expect(isLiveNow(et("2026-08-10", "18:30"))).toBe(true);
    expect(isLiveNow(et("2026-08-10", "18:31"))).toBe(true);
    expect(isLiveNow(et("2026-08-10", "20:00"))).toBe(true);
    expect(isLiveNow(et("2026-08-10", "20:01"))).toBe(false);
  });

  test("never live on a dark day", () => {
    expect(isLiveNow(et("2026-08-14", "19:00"))).toBe(false);
  });
});

describe("nextNight", () => {
  test("before the event → night 1", () => {
    expect(nextNight(et("2026-08-09", "12:00"))?.n).toBe(1);
  });

  test("after night 3 ends, same evening → night 4", () => {
    expect(nextNight(et("2026-08-12", "21:00"))?.n).toBe(4);
  });

  test("dark weekend → night 5", () => {
    expect(nextNight(et("2026-08-15", "12:00"))?.n).toBe(5);
  });

  test("after the final session → none", () => {
    expect(nextNight(et("2026-08-20", "20:01"))).toBeUndefined();
  });
});
