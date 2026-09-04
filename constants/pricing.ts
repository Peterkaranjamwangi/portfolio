/**
 * Pricing knobs for the estimator.
 *
 * Everything a figure depends on lives here so the numbers can be tuned without
 * touching the engine. The engine is the only thing allowed to *apply* them,
 * and it only ever runs on the server.
 */

export const CURRENCY_CODE = "KES";

/** Flat price attached to each custom spec a visitor writes in step 4. */
export const CUSTOM_FEATURE_UNIT_KES = 40_000;

/** Beyond this the wizard stops being an estimate and becomes a scoping call. */
export const MAX_CUSTOM_FEATURES = 8;

/**
 * A custom spec is only billable once it has a real title. Anything shorter is
 * treated as a row someone is still typing into, so the rail does not jump by
 * KSh 40,000 on the first keystroke.
 */
export const MIN_CUSTOM_TITLE_LENGTH = 3;

/** Steps a visitor fills in. The summary sits after these and is not counted. */
export const TOTAL_WIZARD_STEPS = 4;

/** The summary step number, i.e. the destination past the last input step. */
export const SUMMARY_STEP = TOTAL_WIZARD_STEPS + 1;

/** The quoted range is the point estimate ±15%. */
export const RANGE_LOW_FACTOR = 0.85;
export const RANGE_HIGH_FACTOR = 1.15;

/** Schedule impact of each add-on, on top of the project type's base weeks. */
export const WEEKS_PER_FEATURE = 0.5;
export const WEEKS_PER_CUSTOM_FEATURE = 1;

export interface EstimatorStep {
  id: string;
  step: number;
  shortTitle: string;
  title: string;
  description: string;
}

export const ESTIMATOR_STEPS: readonly EstimatorStep[] = [
  {
    id: "industry",
    step: 1,
    shortTitle: "Industry",
    title: "Your industry",
    description:
      "Pricing scales with regulation and integration complexity. Pick the closest match.",
  },
  {
    id: "project-type",
    step: 2,
    shortTitle: "Project",
    title: "What are we building?",
    description:
      "Each type carries a base cost and timeline. Optional modules come next.",
  },
  {
    id: "features",
    step: 3,
    shortTitle: "Modules",
    title: "Optional modules",
    description:
      "Only add what you need now. Everything here can be phased in after launch.",
  },
  {
    id: "custom",
    step: 4,
    shortTitle: "Custom",
    title: "Custom specs",
    description: "Anything the catalogue does not cover, in your own words.",
  },
  {
    id: "summary",
    step: SUMMARY_STEP,
    shortTitle: "Summary",
    title: "Your estimate",
    description: "Confirm the figure and send me the brief.",
  },
] as const;
