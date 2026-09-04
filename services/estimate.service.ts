import { apiPost } from "@/lib/api-client";
import type {
  EstimateBreakdown,
  LeadInput,
  SelectionInput,
} from "@/lib/validations/estimate";

/**
 * Everything the estimator asks of the server.
 *
 * The wizard never builds a URL or a payload of its own: knowing that a price
 * is a POST to /api/estimate/price, and that submitting sends the *selection*
 * rather than the price, is this module's job alone.
 */

/** A draft selection: the wizard prices before every field is filled in. */
export type PriceRequest = {
  industrySlug: string | null;
  projectTypeSlug: string | null;
  featureSlugs: string[];
  customFeatures: { title: string; description: string }[];
};

/** `degraded` means the figure came from the static catalogue fallback. */
export type PricedEstimate = EstimateBreakdown & { degraded?: boolean };

export interface SubmitEstimateRequest extends SelectionInput {
  lead: LeadInput;
}

export const estimateService = {
  /**
   * Prices a selection. The signal matters here: the wizard reprices on every
   * keystroke in a custom spec, and each new request supersedes the last.
   */
  price(selection: PriceRequest, signal?: AbortSignal): Promise<PricedEstimate> {
    return apiPost<PricedEstimate>("/api/estimate/price", selection, signal);
  },

  /** Submits the brief. The server reprices before it writes the row. */
  submit(payload: SubmitEstimateRequest): Promise<{ estimateId: string }> {
    return apiPost<{ estimateId: string }>("/api/estimate", payload);
  },
};
