/** Forge The Future — the eight nights. Titles verbatim from the live Luma
 *  listing (ground truth: docs/findings/12). Dates are ET; sessions 6:30–8:00 PM. */
export type Night = {
  n: number; // 1–8
  date: string; // YYYY-MM-DD (ET)
  day: string; // "Mon Aug 10"
  title: string;
  subtitle: string;
};

export const NIGHTS: Night[] = [
  { n: 1, date: "2026-08-10", day: "Mon Aug 10", title: "The Weight and the Vision", subtitle: "a fireside conversation on leading from the inside out" },
  { n: 2, date: "2026-08-11", day: "Tue Aug 11", title: "The Art of Desire", subtitle: "building a brand that commands the room" },
  { n: 3, date: "2026-08-12", day: "Wed Aug 12", title: "Renowned", subtitle: "the art of influence, press & becoming a movement" },
  { n: 4, date: "2026-08-13", day: "Thu Aug 13", title: "The Rainmaker's Craft", subtitle: "turning passion into profit" },
  { n: 5, date: "2026-08-17", day: "Mon Aug 17", title: "The Modern Advantage", subtitle: "tech, AI & doing more with less" },
  { n: 6, date: "2026-08-18", day: "Tue Aug 18", title: "Capital & Command", subtitle: "mastering business finances and funding" },
  { n: 7, date: "2026-08-19", day: "Wed Aug 19", title: "The Endgame", subtitle: "preparing for an exit before you need one" },
  { n: 8, date: "2026-08-20", day: "Thu Aug 20", title: "The End of the Beginning", subtitle: "the real cost & reward of building" },
];

export const LUMA_URL = "https://luma.com/lp9z8iav";
export const SESSION_START_ET = { hour: 18, minute: 30 }; // 6:30 PM
export const SESSION_END_ET = { hour: 20, minute: 0 }; // 8:00 PM
