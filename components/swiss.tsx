import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * The redesign's two typographic primitives.
 *
 * Both exist so the monospaced-label treatment is defined once: it is the thing
 * that makes the estimator look like the rest of the site rather than a form
 * bolted onto it.
 */

/**
 * A numbered section marker — "01 — ABOUT", "STEP 2 OF 4 · ESTIMATOR ENGINE".
 * The index is decorative structure, so it is hidden from assistive tech and
 * the label carries the meaning.
 */
export function SectionIndex({
  index,
  label,
  className,
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-baseline gap-2 font-mono text-label-xs uppercase tracking-widest text-on-surface-variant",
        className,
      )}
    >
      <span aria-hidden="true" className="text-beacon">
        {index}
      </span>
      <span aria-hidden="true" className="text-outline">
        ·
      </span>
      <span>{label}</span>
    </p>
  );
}

/** A label/value pair for summary grids. Renders as `<dt>` + `<dd>`. */
export function DataField({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0 space-y-1", className)}>
      <dt className="font-mono text-label-xs uppercase tracking-widest text-on-surface-variant">
        {label}
      </dt>
      <dd
        data-numeric=""
        className="font-display text-body-lg leading-tight break-words"
      >
        {value}
      </dd>
    </div>
  );
}
