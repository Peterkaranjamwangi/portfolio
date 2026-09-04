"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataField } from "@/components/swiss";
import { LoadingState } from "@/components/patterns/states";
import { useMutation } from "@/hooks/use-mutation";
import { useEstimatorStore } from "@/lib/store/estimator";
import {
  isBillableCustomFeature,
  leadSchema,
  type EstimateBreakdown,
  type LeadFormValues,
  type LeadInput,
} from "@/lib/validations/estimate";
import { formatKes, formatWeeks } from "@/lib/utils";
import { estimateService } from "@/services";

/**
 * Estimate summary + lead capture.
 *
 * The summary is read-only and rendered from the *server's* breakdown, so what
 * the visitor confirms is exactly what gets persisted. Submitting posts the
 * selection — not the price — and the server reprices before writing the row.
 */
export function LeadForm({
  breakdown,
  onSubmitted,
}: {
  breakdown: EstimateBreakdown | null;
  onSubmitted: (estimateId: string) => void;
}) {
  const { industrySlug, projectTypeSlug, featureSlugs, customFeatures } =
    useEstimatorStore();

  // Three generics: field values (input), context, transformed values (output).
  const form = useForm<LeadFormValues, unknown, LeadInput>({
    resolver: zodResolver(leadSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      country: "KE",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation<LeadInput, { estimateId: string }, LeadFormValues>(
    (lead) =>
      estimateService.submit({
        // The wizard cannot reach this step without both, so the assertions
        // narrow what the store types as nullable rather than inventing values.
        industrySlug: industrySlug!,
        projectTypeSlug: projectTypeSlug!,
        featureSlugs,
        customFeatures: customFeatures.filter(isBillableCustomFeature),
        lead,
      }),
    {
      successMessage: "Brief sent — I'll reply within one business day.",
      setFormError: form.setError,
      onSuccess: (data) => onSubmitted(data.estimateId),
    },
  );

  if (!breakdown) {
    return <LoadingState label="Pricing your selection" />;
  }

  const billableCustom = customFeatures.filter(isBillableCustomFeature);

  return (
    <div className="space-y-8">
      {/* --------------------------------------------------- The summary */}
      <section className="border-2 border-ink bg-surface-container brutal-shadow">
        <h2 className="border-b-2 border-ink p-4 font-display text-headline-md leading-none">
          Your estimate
        </h2>

        <dl className="grid grid-cols-2 gap-4 p-4">
          <DataField label="Industry" value={breakdown.industryLabel} />
          <DataField label="Project type" value={breakdown.projectTypeLabel} />
          <DataField label="Modules selected" value={breakdown.featureCount} />
          <DataField label="Custom specs" value={billableCustom.length} />
        </dl>

        <Separator />

        <dl className="space-y-2 p-4">
          {[
            { label: "Base infrastructure", value: breakdown.baseCostKes },
            { label: "Modules", value: breakdown.featuresCostKes },
            { label: "Custom specs", value: breakdown.customCostKes },
          ].map((line) => (
            <div key={line.label} className="flex items-center justify-between gap-4">
              <dt className="font-mono text-label-sm uppercase tracking-wider text-on-surface-variant">
                {line.label}
              </dt>
              <dd data-numeric="" className="font-mono text-label-sm tabular-nums">
                {formatKes(line.value)}
              </dd>
            </div>
          ))}

          {breakdown.industryMultiplier !== 1 && (
            <div className="flex items-center justify-between gap-4 border-t border-dashed border-outline pt-2">
              <dt className="font-mono text-label-sm uppercase tracking-wider text-on-surface-variant">
                {breakdown.industryLabel} complexity
              </dt>
              <dd data-numeric="" className="font-mono text-label-sm tabular-nums">
                ×{breakdown.industryMultiplier.toFixed(2)}
              </dd>
            </div>
          )}
        </dl>

        <div className="surface-inverse m-4 mt-0 space-y-2 bg-ink p-4 text-on-ink">
          <p className="font-mono text-label-xs uppercase tracking-widest opacity-70">
            Expected range
          </p>
          <p
            data-numeric=""
            className="font-display text-[clamp(1.5rem,5vw,2.25rem)] leading-none font-bold tracking-tight"
          >
            {formatKes(breakdown.rangeLowKes)} – {formatKes(breakdown.rangeHighKes)}
          </p>
          <p className="font-mono text-label-xs uppercase tracking-widest opacity-70">
            Around {formatWeeks(breakdown.estimatedWeeks)} of delivery · excludes VAT
          </p>
        </div>
      </section>

      {/* ------------------------------------------------- Contact form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => mutate(values))}
          noValidate
          className="space-y-6"
        >
          <div className="space-y-5 border-2 border-ink bg-surface-container p-4 sm:p-6">
            <div className="space-y-1">
              <h2 className="font-display text-headline-md leading-none">Send me the brief</h2>
              <p className="text-body-sm text-on-surface-variant">
                I reply within one business day with a discovery call slot and a scoped proposal.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="name" placeholder="Amina Otieno" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="amina@company.co.ke"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="0712 345 678"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="organization" placeholder="Acme Ltd" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anything else? (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="Deadlines, existing systems we would integrate with, constraints I should know about."
                    />
                  </FormControl>
                  <FormDescription>
                    Context here shortens the discovery call considerably.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" variant="signal" size="lg" block="responsive" disabled={isPending}>
            <Send aria-hidden="true" />
            {isPending ? "Sending…" : "Send my brief"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
