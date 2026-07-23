/** Central registry of unresolved content/legal placeholders (build-spec §9).
 *  Render via <RedlineChip>. Resolve ONLY with real values from Justin —
 *  never invent. `null` = still open (chip shows); a string = resolved. */
export const PLACEHOLDERS = {
  EMAIL: "jshaw@ventriq.io", // resolved Jul 23
  SKOOL_URL: null, // [PLATFORM — Skool TBC]
  ANNOUNCE_DATE: null,
  APP_OPEN_DATE: null,
  APP_DEADLINE: null,
  DECISION_DATE: null,
  COHORT_DATES: null,
  INVESTMENT: null, // $[INVESTMENT] + variant A/B
  FAH_INPERSON_PRICE: null, // $[89–99]
  POLICY_CANCEL: null,
  HRPB_LINK: null,
  BALTIMORE_FOUNDING_DATE: null,
  CHAPTER_FORM: null, // [FORM/EMAIL]
  EIN: null, // + NO deductibility language until determination letter
  TITHE_WORDING: null,
  TESTIMONIAL_PERMISSIONS: null,
  COUNSEL_REVIEW_AUDIENCE: null,
  MAILING_ADDRESS: null, // email footers (registered agent OK)
} as const;

export const EMAIL = PLACEHOLDERS.EMAIL;
