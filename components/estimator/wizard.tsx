"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight, Check, Flag, Plus, Trash2 } from "lucide-react";

import { cn, formatKes } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import { EstimateRail } from "@/components/estimator/estimate-rail";
import { SuccessState, EmptyState, FormSkeleton } from "@/components/patterns/states";
import { SectionIndex } from "@/components/swiss";
import { useEstimatorStore } from "@/lib/store/estimator";
import { useResource } from "@/hooks/use-resource";
import {
  INDUSTRIES,
  projectTypesForIndustry,
  featuresForProjectType,
  groupFeaturesByCategory,
} from "@/constants/catalogue";
import {
  ESTIMATOR_STEPS,
  TOTAL_WIZARD_STEPS,
  CUSTOM_FEATURE_UNIT_KES,
  MAX_CUSTOM_FEATURES,
} from "@/constants/pricing";
import { estimateService, type PricedEstimate } from "@/services";

/**
 * The contact form is the only part of the wizard that needs react-hook-form
 * and the zod resolver, and it is not reachable until step 5. Deferring it
 * keeps that weight off the first four steps — which is where visitors who
 * bounce spend all of their time.
 */
const LeadForm = dynamic(
  () => import("@/components/estimator/lead-form").then((m) => m.LeadForm),
  { loading: () => <FormSkeleton fields={5} /> },
);

/**
 * Price generator wizard.
 *
 * Four steps plus a summary. State lives in the persisted estimator store, so
 * an abandoned visit resumes; the *price* is never computed here — every change
 * posts the selection to /api/estimate/price and renders what the server says.
 * That is what makes the figure tamper-proof and repriceable without a deploy.
 */
export function EstimatorWizard() {
  const store = useEstimatorStore();
  const {
    step,
    industrySlug,
    projectTypeSlug,
    featureSlugs,
    customFeatures,
    submittedEstimateId,
  } = store;

  // A persisted draft may point at a step its selection no longer justifies.
  React.useEffect(() => {
    const max = store.maxReachableStep();
    if (step > max) store.setStep(max);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const canPrice = Boolean(industrySlug && projectTypeSlug);

  // Drafts are sent as-is: the pricing endpoint accepts in-progress rows and
  // the engine decides which are billable, so the rail keeps showing a total
  // while someone is still typing a custom feature's name.
  const priceSelection = React.useMemo(
    () => ({ industrySlug, projectTypeSlug, featureSlugs, customFeatures }),
    [industrySlug, projectTypeSlug, featureSlugs, customFeatures],
  );

  // The refetch key has to be a stable primitive: `priceSelection` is a new
  // object every render, so depending on it directly would refetch forever.
  const priceKey = JSON.stringify(priceSelection);

  const {
    data: breakdown,
    error: priceError,
    isLoading: isPricing,
  } = useResource<PricedEstimate>(
    (signal) => estimateService.price(priceSelection, signal),
    [priceKey],
    // Debounced because typing a custom feature title changes the body on
    // every keystroke, and each of those would otherwise be a round trip.
    { enabled: canPrice, debounceMs: 350 },
  );

  const projectTypes = industrySlug ? projectTypesForIndustry(industrySlug) : [];
  const features = projectTypeSlug ? featuresForProjectType(projectTypeSlug) : [];
  const featureGroups = groupFeaturesByCategory(features);

  const currentStep = ESTIMATOR_STEPS.find((s) => s.step === step) ?? ESTIMATOR_STEPS[0];

  const canAdvance =
    (step === 1 && Boolean(industrySlug)) ||
    (step === 2 && Boolean(projectTypeSlug)) ||
    step === 3 ||
    step === 4;

  if (submittedEstimateId) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <SuccessState
          title="Brief received"
          description={
            <>
              Your estimate is saved. I reply within one business day with a discovery call
              slot and a scoped proposal. Reference{" "}
              <span className="font-mono">{submittedEstimateId.slice(-8).toUpperCase()}</span>.
            </>
          }
          actions={
            <Button variant="surface" onClick={() => store.reset()}>
              Start another estimate
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-(--container-page) px-4 py-10 pb-40 lg:pb-16">
      {/* The only marketing surface that raises toasts, so it mounts its own. */}
      <Toaster />

      {/* ------------------------------------------------------ Step rail */}
      <StepRail step={step} onStepChange={store.setStep} maxStep={store.maxReachableStep()} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0 space-y-8">
          <header className="space-y-2">
            <SectionIndex
              index={`STEP ${Math.min(step, TOTAL_WIZARD_STEPS)} OF ${TOTAL_WIZARD_STEPS}`}
              label="Estimator engine"
            />
            <h1 className="font-display text-[clamp(2rem,8vw,3.5rem)] leading-none font-bold tracking-tight">
              {currentStep.title}
            </h1>
            <p className="max-w-prose text-body-md text-on-surface-variant">
              {currentStep.description}
            </p>
          </header>

          {/* ------------------------------------------ Step 1: industry */}
          {step === 1 && (
            <fieldset className="space-y-4">
              <legend className="sr-only">Select your industry</legend>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {INDUSTRIES.map((industry) => (
                  <SelectCard
                    key={industry.slug}
                    type="radio"
                    name="industry"
                    selected={industrySlug === industry.slug}
                    onSelect={() => store.setIndustry(industry.slug)}
                    title={industry.label}
                    meta={
                      industry.multiplier === 1
                        ? "Baseline complexity"
                        : `×${industry.multiplier.toFixed(2)} complexity`
                    }
                  />
                ))}
              </div>
            </fieldset>
          )}

          {/* --------------------------------------- Step 2: project type */}
          {step === 2 && (
            <fieldset className="space-y-4">
              <legend className="sr-only">Select a project type</legend>
              {projectTypes.length === 0 ? (
                <EmptyState
                  title="No project types"
                  description="Go back and pick a different industry."
                  compact
                />
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {projectTypes.map((type) => (
                    <SelectCard
                      key={type.slug}
                      type="radio"
                      name="projectType"
                      selected={projectTypeSlug === type.slug}
                      onSelect={() => store.setProjectType(type.slug)}
                      title={type.label}
                      body={type.description}
                      meta={`${formatKes(type.baseCostKes)} base · ${type.baseWeeks} weeks`}
                    />
                  ))}
                </div>
              )}
            </fieldset>
          )}

          {/* ------------------------------------------- Step 3: features */}
          {step === 3 && (
            <div className="space-y-8">
              {featureGroups.length === 0 ? (
                <EmptyState
                  title="No optional modules"
                  description="This project type ships complete. Continue to custom specs."
                  compact
                />
              ) : (
                featureGroups.map((group) => (
                  <fieldset key={group.category} className="space-y-3">
                    <legend className="flex w-full items-baseline justify-between gap-2 border-b-2 border-ink pb-2">
                      <span className="font-display text-headline-md leading-none">
                        {group.category}
                      </span>
                      <span className="font-mono text-label-xs uppercase tracking-widest text-on-surface-variant">
                        Select any
                      </span>
                    </legend>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {group.features.map((feature) => (
                        <SelectCard
                          key={feature.slug}
                          type="checkbox"
                          selected={featureSlugs.includes(feature.slug)}
                          onSelect={() => store.toggleFeature(feature.slug)}
                          title={feature.label}
                          body={feature.description}
                          meta={formatKes(feature.costKes)}
                        />
                      ))}
                    </div>
                  </fieldset>
                ))
              )}
            </div>
          )}

          {/* --------------------------------------------- Step 4: custom */}
          {step === 4 && (
            <div className="space-y-4">
              {customFeatures.length === 0 ? (
                <EmptyState
                  title="No custom specs yet"
                  description={`Anything the catalogue does not cover. Each adds ${formatKes(CUSTOM_FEATURE_UNIT_KES)} to the estimate; we refine the real figure at discovery.`}
                  action={{ label: "Add a custom spec", onClick: store.addCustomFeature }}
                  compact
                />
              ) : (
                <ul className="space-y-4">
                  {customFeatures.map((feature, index) => (
                    <li
                      key={index}
                      className="space-y-4 border-2 border-ink bg-surface-container p-4"
                    >
                      <div className="flex items-center justify-between gap-3 border-b border-outline pb-2">
                        <p className="font-mono text-label-sm uppercase tracking-widest">
                          Spec {String(index + 1).padStart(2, "0")}
                          <span className="ml-2 text-on-surface-variant">
                            {formatKes(CUSTOM_FEATURE_UNIT_KES)}
                          </span>
                        </p>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Remove spec ${index + 1}`}
                          onClick={() => store.removeCustomFeature(index)}
                        >
                          <Trash2 aria-hidden="true" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`custom-title-${index}`}>Feature title</Label>
                        <Input
                          id={`custom-title-${index}`}
                          value={feature.title}
                          onChange={(e) =>
                            store.updateCustomFeature(index, { title: e.target.value })
                          }
                          placeholder="Fleet telemetry ingestion"
                          maxLength={120}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`custom-desc-${index}`}>What should it do?</Label>
                        <Textarea
                          id={`custom-desc-${index}`}
                          value={feature.description}
                          onChange={(e) =>
                            store.updateCustomFeature(index, { description: e.target.value })
                          }
                          rows={3}
                          maxLength={600}
                          placeholder="Ingest GPS pings from 400 vehicles, store 90 days, expose a live map."
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {customFeatures.length > 0 && customFeatures.length < MAX_CUSTOM_FEATURES && (
                <Button variant="surface" block="responsive" onClick={store.addCustomFeature}>
                  <Plus aria-hidden="true" />
                  Add another spec
                </Button>
              )}
            </div>
          )}

          {/* ------------------------------------------- Step 5: summary */}
          {step === 5 && (
            <LeadForm
              breakdown={breakdown ?? null}
              onSubmitted={(estimateId) => store.markSubmitted(estimateId)}
            />
          )}

          {/* ----------------------------------------------- Navigation */}
          {step <= TOTAL_WIZARD_STEPS && (
            <nav className="flex flex-col gap-3 border-t-2 border-ink pt-6 sm:flex-row sm:justify-between">
              <Button
                variant="surface"
                block="responsive"
                onClick={store.back}
                disabled={step === 1}
              >
                <ArrowLeft aria-hidden="true" />
                Back
              </Button>

              <Button variant="signal" block="responsive" onClick={store.next} disabled={!canAdvance}>
                {step === TOTAL_WIZARD_STEPS ? "Review estimate" : "Continue"}
                <ArrowRight aria-hidden="true" />
              </Button>
            </nav>
          )}

          {step === 5 && (
            <Button variant="surface" block="responsive" onClick={store.back}>
              <ArrowLeft aria-hidden="true" />
              Back to custom specs
            </Button>
          )}
        </div>

        <EstimateRail
          breakdown={breakdown ?? null}
          isLoading={isPricing}
          error={priceError?.message}
          degraded={breakdown?.degraded}
        />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Step rail */

function StepRail({
  step,
  maxStep,
  onStepChange,
}: {
  step: number;
  maxStep: number;
  onStepChange: (step: number) => void;
}) {
  return (
    <nav aria-label="Estimator progress">
      <ol className="flex border-2 border-ink">
        {ESTIMATOR_STEPS.map((item, index) => {
          const isCurrent = item.step === step;
          const isDone = item.step < step;
          const reachable = item.step <= maxStep;
          const isSummary = item.step > TOTAL_WIZARD_STEPS;

          return (
            <li key={item.id} className="min-w-0 flex-1">
              <button
                type="button"
                onClick={() => reachable && onStepChange(item.step)}
                disabled={!reachable}
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "flex min-h-12 w-full items-center justify-center gap-2 px-2 py-2 transition-colors",
                  "font-mono text-label-xs uppercase tracking-widest",
                  index > 0 && "border-l-2 border-ink",
                  "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink",
                  isCurrent && "bg-signal text-on-signal",
                  isDone && "bg-ink text-on-ink",
                  !isCurrent && !isDone && "bg-surface-container text-on-surface-variant",
                  !reachable && "cursor-not-allowed opacity-40",
                )}
              >
                {isDone ? (
                  <Check className="size-3.5 shrink-0" strokeWidth={3} aria-hidden="true" />
                ) : isSummary ? (
                  // Numbering this "05" beside a "step 1 of 4" header reads as a
                  // contradiction. The summary is a destination, not a step.
                  <Flag className="size-3.5 shrink-0" aria-hidden="true" />
                ) : (
                  <span aria-hidden="true">{String(item.step).padStart(2, "0")}</span>
                )}
                {/* Labels are noise at phone widths; the number carries it. */}
                <span className="hidden truncate sm:inline">{item.shortTitle}</span>
                <span className="sr-only">{item.title}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* -------------------------------------------------------------- Select card */

function SelectCard({
  type,
  name,
  selected,
  onSelect,
  title,
  body,
  meta,
}: {
  type: "radio" | "checkbox";
  name?: string;
  selected: boolean;
  onSelect: () => void;
  title: string;
  body?: string;
  meta?: string;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer flex-col gap-2 border-2 p-4 transition-shadow",
        selected
          ? "border-signal bg-surface-container brutal-shadow-signal"
          : "border-ink bg-surface-container hover:brutal-shadow",
        "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-display text-body-lg leading-tight">{title}</span>

        {/* The real control, visually replaced by the square indicator. */}
        <input
          type={type}
          name={name}
          checked={selected}
          onChange={onSelect}
          className="sr-only"
        />
        <span
          aria-hidden="true"
          className={cn(
            "flex size-5 shrink-0 items-center justify-center border-2",
            selected ? "border-signal bg-signal text-on-signal" : "border-ink",
          )}
        >
          {selected && <Check className="size-3.5" strokeWidth={3} />}
        </span>
      </div>

      {body && <span className="text-body-sm text-on-surface-variant">{body}</span>}

      {meta && (
        <span
          data-numeric=""
          className="mt-auto border-t border-outline pt-2 font-mono text-label-xs uppercase tracking-widest text-on-surface-variant"
        >
          {meta}
        </span>
      )}
    </label>
  );
}
