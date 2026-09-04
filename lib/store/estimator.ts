"use client";

import * as React from "react";

import {
  MAX_CUSTOM_FEATURES,
  SUMMARY_STEP,
  TOTAL_WIZARD_STEPS,
} from "@/constants/pricing";

/**
 * Wizard state for the estimator, persisted so an abandoned visit resumes.
 *
 * This is a hand-rolled external store rather than Zustand: the API below is
 * all the wizard needs, and `useSyncExternalStore` gives the same
 * subscribe-and-render behaviour without adding a dependency to a project that
 * does not otherwise have one.
 */

export interface CustomFeatureDraft {
  title: string;
  description: string;
}

export interface EstimatorState {
  step: number;
  industrySlug: string | null;
  projectTypeSlug: string | null;
  featureSlugs: string[];
  customFeatures: CustomFeatureDraft[];
  submittedEstimateId: string | null;
}

const STORAGE_KEY = "pm.estimator.draft.v1";

/** A draft older than this is a different project, not a resumed one. */
const DRAFT_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const INITIAL_STATE: EstimatorState = {
  step: 1,
  industrySlug: null,
  projectTypeSlug: null,
  featureSlugs: [],
  customFeatures: [],
  submittedEstimateId: null,
};

let state: EstimatorState = INITIAL_STATE;
let hydrated = false;

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): EstimatorState {
  return state;
}

/**
 * The server has no draft, so it always renders the empty wizard. Hydration
 * from storage happens in an effect afterwards, which is what keeps the first
 * client render identical to the server's.
 */
function getServerSnapshot(): EstimatorState {
  return INITIAL_STATE;
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ savedAt: Date.now(), state }),
    );
  } catch {
    // Private mode or a full quota. Losing the draft is survivable; throwing
    // in the middle of a click is not.
  }
}

function setState(patch: Partial<EstimatorState>) {
  state = { ...state, ...patch };
  persist();
  emit();
}

function hydrateFromStorage() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;

  let restored: EstimatorState | null = null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { savedAt?: number; state?: unknown };
      const fresh =
        typeof parsed.savedAt === "number" &&
        Date.now() - parsed.savedAt < DRAFT_TTL_MS;
      if (fresh) restored = coerceState(parsed.state);
    }
  } catch {
    restored = null;
  }

  if (!restored) return;

  state = restored;
  emit();
}

/**
 * Storage is user-writable, and the shape may also be from an older release.
 * Anything that does not look right falls back to the empty value for that
 * field rather than failing the whole restore.
 */
function coerceState(value: unknown): EstimatorState | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;

  const customFeatures = Array.isArray(raw.customFeatures)
    ? raw.customFeatures
        .filter((f): f is Record<string, unknown> => Boolean(f) && typeof f === "object")
        .slice(0, MAX_CUSTOM_FEATURES)
        .map((f) => ({
          title: typeof f.title === "string" ? f.title : "",
          description: typeof f.description === "string" ? f.description : "",
        }))
    : [];

  const restored: EstimatorState = {
    step: typeof raw.step === "number" ? clampStep(raw.step) : 1,
    industrySlug: typeof raw.industrySlug === "string" ? raw.industrySlug : null,
    projectTypeSlug:
      typeof raw.projectTypeSlug === "string" ? raw.projectTypeSlug : null,
    featureSlugs: Array.isArray(raw.featureSlugs)
      ? raw.featureSlugs.filter((s): s is string => typeof s === "string")
      : [],
    customFeatures,
    submittedEstimateId:
      typeof raw.submittedEstimateId === "string" ? raw.submittedEstimateId : null,
  };

  return restored;
}

function clampStep(step: number): number {
  if (!Number.isFinite(step)) return 1;
  return Math.min(Math.max(Math.trunc(step), 1), SUMMARY_STEP);
}

/**
 * How far the wizard may be jumped to. Steps 3 and 4 have nothing to show
 * without a project type, and the summary has nothing to price, so both gate
 * on the two choices that actually feed the engine.
 */
function maxReachableStep(): number {
  if (!state.industrySlug) return 1;
  if (!state.projectTypeSlug) return 2;
  return SUMMARY_STEP;
}

/**
 * Actions are defined once at module scope so their identities are stable
 * across renders — they can be passed to `onClick` without re-rendering the
 * children that receive them.
 */
const actions = {
  maxReachableStep,

  setStep(step: number) {
    setState({ step: Math.min(clampStep(step), maxReachableStep()) });
  },

  setIndustry(industrySlug: string) {
    setState({ industrySlug });
  },

  setProjectType(projectTypeSlug: string) {
    // Module slugs are scoped to a project type, so keeping the old selection
    // would silently carry across modules that no longer exist.
    setState({ projectTypeSlug, featureSlugs: [] });
  },

  toggleFeature(slug: string) {
    setState({
      featureSlugs: state.featureSlugs.includes(slug)
        ? state.featureSlugs.filter((s) => s !== slug)
        : [...state.featureSlugs, slug],
    });
  },

  addCustomFeature() {
    if (state.customFeatures.length >= MAX_CUSTOM_FEATURES) return;
    setState({
      customFeatures: [...state.customFeatures, { title: "", description: "" }],
    });
  },

  updateCustomFeature(index: number, patch: Partial<CustomFeatureDraft>) {
    setState({
      customFeatures: state.customFeatures.map((feature, i) =>
        i === index ? { ...feature, ...patch } : feature,
      ),
    });
  },

  removeCustomFeature(index: number) {
    setState({
      customFeatures: state.customFeatures.filter((_, i) => i !== index),
    });
  },

  next() {
    const target = Math.min(state.step + 1, SUMMARY_STEP);
    setState({ step: Math.min(target, maxReachableStep()) });
  },

  back() {
    setState({ step: Math.max(state.step - 1, 1) });
  },

  markSubmitted(estimateId: string) {
    setState({ submittedEstimateId: estimateId, step: SUMMARY_STEP });
  },

  reset() {
    state = { ...INITIAL_STATE };
    persist();
    emit();
  },
};

export type EstimatorStore = EstimatorState & typeof actions;

export function useEstimatorStore(): EstimatorStore {
  const snapshot = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  React.useEffect(() => {
    hydrateFromStorage();
  }, []);

  return React.useMemo(() => ({ ...snapshot, ...actions }), [snapshot]);
}

export { TOTAL_WIZARD_STEPS };
