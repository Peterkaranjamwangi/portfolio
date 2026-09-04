import { z } from "zod";

import {
  MAX_CUSTOM_FEATURES,
  MIN_CUSTOM_TITLE_LENGTH,
} from "@/constants/pricing";

/* ------------------------------------------------------------- selection */

/**
 * A custom spec is accepted with an empty title on purpose: the pricing
 * endpoint is called on every keystroke while someone types one, and rejecting
 * half-written rows would blank the live total mid-sentence. The engine, not
 * the schema, decides which rows are billable.
 */
export const customFeatureSchema = z.object({
  title: z.string().max(120, "Keep the title under 120 characters"),
  description: z.string().max(600, "Keep the description under 600 characters"),
});

export const selectionSchema = z.object({
  industrySlug: z.string().min(1, "Choose an industry"),
  projectTypeSlug: z.string().min(1, "Choose a project type"),
  featureSlugs: z.array(z.string().min(1)).max(40).default([]),
  customFeatures: z.array(customFeatureSchema).max(MAX_CUSTOM_FEATURES).default([]),
});

export type SelectionInput = z.infer<typeof selectionSchema>;

/* ------------------------------------------------------------------ lead */

export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Tell me who you are")
    .max(120, "That name is too long"),
  email: z
    .string()
    .trim()
    .min(1, "An email address is required")
    .email("Enter a complete email address")
    .max(200),
  phone: z
    .string()
    .trim()
    .max(40, "That phone number is too long")
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .trim()
    .max(120, "That company name is too long")
    .optional()
    .or(z.literal("")),
  /*
   * Optional rather than defaulted: a zod `.default()` makes the schema's input
   * and output types diverge, which react-hook-form's resolver cannot bridge.
   * The form supplies "KE" and the route falls back to it.
   */
  country: z
    .string()
    .trim()
    .length(2, "Use a two-letter country code")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .max(2000, "Keep it under 2000 characters")
    .optional()
    .or(z.literal("")),
});

/** What the form fields hold while being typed. */
export type LeadFormValues = z.input<typeof leadSchema>;
/** What the schema produces once parsed — the shape the API receives. */
export type LeadInput = z.output<typeof leadSchema>;

export const estimateRequestSchema = selectionSchema.extend({
  lead: leadSchema,
});

export type EstimateRequest = z.infer<typeof estimateRequestSchema>;

/* ------------------------------------------------------------- breakdown */

export interface EstimateLineItem {
  /** Unique within a breakdown, so React keys do not collide. */
  slug: string;
  label: string;
  note?: string;
  costKes: number;
}

/**
 * The priced result. Always produced server-side: the browser renders this and
 * never derives a figure of its own, which is what keeps a quote from being
 * editable in devtools.
 */
export interface EstimateBreakdown {
  currency: string;

  industrySlug: string;
  industryLabel: string;
  industryMultiplier: number;

  projectTypeSlug: string;
  projectTypeLabel: string;

  lineItems: EstimateLineItem[];

  baseCostKes: number;
  featuresCostKes: number;
  customCostKes: number;

  /** Point estimate after the industry multiplier. */
  subtotalKes: number;
  rangeLowKes: number;
  rangeHighKes: number;
  estimatedWeeks: number;

  featureCount: number;
  customCount: number;
}

/** A custom row only counts once it names something. */
export function isBillableCustomFeature(feature: { title: string }): boolean {
  return feature.title.trim().length >= MIN_CUSTOM_TITLE_LENGTH;
}
