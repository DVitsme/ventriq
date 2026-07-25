/** Form validation strings — LAW from docs/build-handoff/copy-source/00-global.md
 *  §Forms. They live apart from lib/schemas.ts on purpose: schemas imports zod
 *  at module scope, and the footer's NewsletterForm (in the root layout) only
 *  needs these three strings — importing them through schemas was shipping all
 *  of zod v4 in the site-wide client bundle. */
export const VALIDATION = {
  required: "We need this one.",
  badEmail: "That email doesn't look right — one more look?",
  messageShort: "Give us a sentence or two more to work with.",
} as const;
