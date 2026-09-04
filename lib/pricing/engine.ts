import "server-only";

import {
  getFeature,
  getIndustry,
  getProjectType,
} from "@/constants/catalogue";
import {
  CURRENCY_CODE,
  CUSTOM_FEATURE_UNIT_KES,
  RANGE_HIGH_FACTOR,
  RANGE_LOW_FACTOR,
  WEEKS_PER_CUSTOM_FEATURE,
  WEEKS_PER_FEATURE,
} from "@/constants/pricing";
import {
  isBillableCustomFeature,
  type EstimateBreakdown,
  type EstimateLineItem,
  type SelectionInput,
} from "@/lib/validations/estimate";

export class PricingError extends Error {
  constructor(
    message: string,
    readonly field: string,
  ) {
    super(message);
    this.name = "PricingError";
  }
}

/**
 * Turns a selection into a price.
 *
 * `server-only` above is the point of the whole module: costs are read from the
 * catalogue here and never taken from the request, so a visitor editing the
 * payload can change *what* they asked for but not what it costs.
 */
export function priceSelection(selection: SelectionInput): EstimateBreakdown {
  const industry = getIndustry(selection.industrySlug);
  if (!industry) {
    throw new PricingError("That industry is not in the catalogue", "industrySlug");
  }

  const projectType = getProjectType(selection.projectTypeSlug);
  if (!projectType) {
    throw new PricingError(
      "That project type is not in the catalogue",
      "projectTypeSlug",
    );
  }

  // Unknown slugs are dropped rather than rejected: a persisted draft can
  // easily name a module that was renamed since, and failing the whole quote
  // over it would strand the visitor on a broken step.
  const features = Array.from(new Set(selection.featureSlugs))
    .map((slug) => getFeature(projectType.slug, slug))
    .filter((feature): feature is NonNullable<typeof feature> => Boolean(feature));

  const billableCustom = selection.customFeatures.filter(isBillableCustomFeature);

  const lineItems: EstimateLineItem[] = [
    {
      slug: `base:${projectType.slug}`,
      label: projectType.label,
      note: `Base · ${projectType.baseWeeks} weeks`,
      costKes: projectType.baseCostKes,
    },
    ...features.map((feature) => ({
      slug: `feature:${feature.slug}`,
      label: feature.label,
      note: feature.category,
      costKes: feature.costKes,
    })),
    ...billableCustom.map((custom, index) => ({
      slug: `custom:${index}`,
      label: custom.title.trim(),
      note: "Custom spec",
      costKes: CUSTOM_FEATURE_UNIT_KES,
    })),
  ];

  const featuresCostKes = features.reduce((sum, f) => sum + f.costKes, 0);
  const customCostKes = billableCustom.length * CUSTOM_FEATURE_UNIT_KES;

  // The multiplier applies to the whole basket, not just the base: a healthcare
  // audit log costs more to build than a retail one for the same reasons.
  const rawSubtotal =
    (projectType.baseCostKes + featuresCostKes + customCostKes) *
    industry.multiplier;

  // Rounded to the nearest thousand shillings — a quote reading "KSh 618,000"
  // is a figure; "KSh 617,999.04" is a receipt for something already built.
  const subtotalKes = roundToNearest(rawSubtotal, 1_000);

  const estimatedWeeks =
    projectType.baseWeeks +
    features.length * WEEKS_PER_FEATURE +
    billableCustom.length * WEEKS_PER_CUSTOM_FEATURE;

  return {
    currency: CURRENCY_CODE,

    industrySlug: industry.slug,
    industryLabel: industry.label,
    industryMultiplier: industry.multiplier,

    projectTypeSlug: projectType.slug,
    projectTypeLabel: projectType.label,

    lineItems,

    baseCostKes: projectType.baseCostKes,
    featuresCostKes,
    customCostKes,

    subtotalKes,
    rangeLowKes: roundToNearest(subtotalKes * RANGE_LOW_FACTOR, 1_000),
    rangeHighKes: roundToNearest(subtotalKes * RANGE_HIGH_FACTOR, 1_000),
    estimatedWeeks: Math.round(estimatedWeeks * 2) / 2,

    featureCount: features.length,
    customCount: billableCustom.length,
  };
}

function roundToNearest(value: number, step: number): number {
  return Math.round(value / step) * step;
}
