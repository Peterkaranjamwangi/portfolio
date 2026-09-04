"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";

import { cn, formatKes, formatWeeks } from "@/lib/utils";
import { useCountUp } from "@/hooks/use-count-up";
import { Skeleton } from "@/components/ui/skeleton";
import type { EstimateBreakdown } from "@/lib/validations/estimate";

/**
 * The live estimate rail.
 *
 * A sticky right-hand column on desktop; a sticky *bottom* bar on mobile that
 * expands on tap — the running total is the single thing a visitor most wants
 * to see, and burying it below four screens of feature cards would hide it.
 *
 * The total counts up over 400ms and snaps under prefers-reduced-motion.
 */
export function EstimateRail({
  breakdown,
  isLoading,
  error,
  degraded,
}: {
  breakdown: EstimateBreakdown | null;
  isLoading: boolean;
  error?: string | null;
  /** Priced from the static catalogue because a live rate lookup failed. */
  degraded?: boolean;
}) {
  const [expanded, setExpanded] = React.useState(false);

  const total = breakdown?.subtotalKes ?? 0;
  const animatedTotal = useCountUp(total);

  return (
    <>
      {/* ------------------------------------------------ Desktop rail */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 border-2 border-ink bg-surface-container brutal-shadow">
          <RailBody
            breakdown={breakdown}
            isLoading={isLoading}
            error={error}
            degraded={degraded}
            animatedTotal={animatedTotal}
          />
        </div>
      </aside>

      {/* -------------------------------------------- Mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-ink bg-surface-container pb-safe lg:hidden">
        {expanded && (
          <div className="max-h-[50dvh] overflow-y-auto border-b-2 border-ink">
            <RailBody
              breakdown={breakdown}
              isLoading={isLoading}
              error={error}
              degraded={degraded}
              animatedTotal={animatedTotal}
              hideTotal
            />
          </div>
        )}

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="flex w-full items-center justify-between gap-3 bg-ink px-4 py-3 text-left text-on-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-on-ink"
        >
          <span>
            <span className="block font-mono text-label-xs uppercase tracking-widest opacity-70">
              Live estimate
            </span>
            <span data-numeric="" className="block font-display text-headline-md leading-none">
              {/* No breakdown means nothing has been priced — "KSh 0" would
                  read as a quote of zero rather than "not yet calculated". */}
              {breakdown ? formatKes(animatedTotal) : "—"}
            </span>
          </span>
          <span className="font-mono text-label-xs uppercase tracking-widest underline underline-offset-4">
            {expanded ? "Hide" : "Breakdown"}
          </span>
        </button>
      </div>
    </>
  );
}

function RailBody({
  breakdown,
  isLoading,
  error,
  degraded,
  animatedTotal,
  hideTotal = false,
}: {
  breakdown: EstimateBreakdown | null;
  isLoading: boolean;
  error?: string | null;
  degraded?: boolean;
  animatedTotal: number;
  hideTotal?: boolean;
}) {
  return (
    <div>
      <h2 className="border-b-2 border-ink p-4 font-display text-headline-md leading-none">
        Live estimate
      </h2>

      {error && (
        <p
          role="alert"
          className="flex items-start gap-2 border-b-2 border-signal bg-signal-soft/30 p-3 text-body-sm text-signal"
        >
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      {degraded && !error && (
        <p className="border-b-2 border-outline bg-surface-container-high p-3 font-mono text-label-xs uppercase tracking-wider text-on-surface-variant">
          Showing indicative pricing — live rates could not be confirmed.
        </p>
      )}

      {/* ------------------------------------------------- Line items */}
      <div className="p-4">
        {isLoading && !breakdown ? (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex justify-between gap-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        ) : !breakdown ? (
          <p className="font-mono text-label-sm uppercase tracking-wider text-on-surface-variant">
            Choose an industry and project type to see a figure.
          </p>
        ) : (
          <ul className="divide-y divide-dashed divide-outline">
            {breakdown.lineItems.map((item) => (
              <li key={item.slug} className="flex items-start justify-between gap-4 py-2.5">
                <span className="min-w-0">
                  <span className="block font-mono text-label-sm uppercase tracking-wider">
                    {item.label}
                  </span>
                  {item.note && (
                    <span className="block font-mono text-label-xs uppercase tracking-widest text-on-surface-variant">
                      {item.note}
                    </span>
                  )}
                </span>
                <span data-numeric="" className="shrink-0 font-mono text-label-sm tabular-nums">
                  {formatKes(item.costKes)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ----------------------------------------------------- Total */}
      {breakdown && !hideTotal && (
        <div className="surface-inverse m-4 mt-0 space-y-3 bg-ink p-4 text-on-ink">
          {breakdown.industryMultiplier !== 1 && (
            <p className="flex items-center justify-between font-mono text-label-xs uppercase tracking-widest opacity-70">
              <span>{breakdown.industryLabel} complexity</span>
              <span data-numeric="">×{breakdown.industryMultiplier.toFixed(2)}</span>
            </p>
          )}

          <div>
            <p className="font-mono text-label-xs uppercase tracking-widest opacity-70">
              Total estimate
            </p>
            <p
              data-numeric=""
              className={cn(
                "font-display text-[clamp(1.75rem,6vw,2.5rem)] leading-none font-bold tracking-tight tabular-nums",
              )}
            >
              {formatKes(animatedTotal)}
            </p>
          </div>

          <div className="space-y-1 border-t border-on-ink/30 pt-3">
            <p className="flex items-center justify-between font-mono text-label-xs uppercase tracking-widest opacity-70">
              <span>Likely range</span>
              <span data-numeric="">
                {formatKes(breakdown.rangeLowKes, { symbol: false })} –{" "}
                {formatKes(breakdown.rangeHighKes, { symbol: false })}
              </span>
            </p>
            <p className="flex items-center justify-between font-mono text-label-xs uppercase tracking-widest opacity-70">
              <span>Estimated effort</span>
              <span data-numeric="">{formatWeeks(breakdown.estimatedWeeks)}</span>
            </p>
          </div>

          <p className="border-t border-on-ink/30 pt-3 font-mono text-label-xs leading-relaxed tracking-wide opacity-60">
            Excludes VAT and third-party licensing. The range is what we expect to confirm at
            the discovery call.
          </p>
        </div>
      )}
    </div>
  );
}
