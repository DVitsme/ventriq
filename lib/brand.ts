/** Brand constants that are scheduled to CHANGE — hoisted so the change is a
 *  one-line edit, not a sweep.
 *
 *  The membership is being renamed: "Founders After Hours" is the current
 *  public name; "The Foundry" is stamped FINAL in Justin's brand one-pager
 *  (docs/notes-from-justin/7-29/the-foundry-one-pager.pdf) and is expected to
 *  be announced from the stage on Night 1 (Aug 10) — see
 *  docs/plans/summit-aug-1/01-phase-1-research.md §6.5 (O10/O11 still open).
 *  This constant exists so that flip can happen without a find-and-replace
 *  across ~40 prose instances mid-summit. Mechanical label sites (nav,
 *  footer, buttons) read from here; prose sentences keep the literal name
 *  until the rename lands, because they need copyediting, not substitution.
 *
 *  SKOOL_URL: wired live Jul 29 (Derrick's call, group still free +
 *  IAMJS-branded). ⚠️ Renaming the group is SAFE; the "CLAIM URL" flow is
 *  what breaks this href (no redirects — old links 404). Coordinate THAT
 *  same-day. Research: docs/plans/summit-aug-1/06-phase-5-research.md §8. */

/** Jul 29, from Justin via Derrick: the official name IS "The Foundry",
 *  pricing confirmed $39/$99 (the one-pager's $45 is superseded), and the
 *  one-pager's bottom palette is for GAMIFICATION (progression ranks), not
 *  brand. This constant flips to "The Foundry" when the reveal-timing
 *  decision lands (research doc §11) — until then the public name stands. */
export const MEMBERSHIP_NAME = "Founders After Hours";

export const SKOOL_URL = "https://www.skool.com/iamjs-collective-9599/about";
