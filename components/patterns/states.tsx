import * as React from "react";
import { AlertTriangle, CheckCircle2, Inbox, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * The four states every asynchronous surface owes the visitor: nothing yet,
 * working, broken, done. Defining them once is what stops "no results" reading
 * as a bug on one page and as a shrug on the next.
 *
 * Each says what happened and what to do about it — never just "Error".
 */

interface StateAction {
  label: string;
  onClick: () => void;
}

/* ------------------------------------------------------------------ empty */

export function EmptyState({
  title,
  description,
  action,
  secondaryAction,
  icon,
  compact = false,
  className,
}: {
  title: string;
  description?: React.ReactNode;
  action?: StateAction;
  secondaryAction?: StateAction;
  icon?: React.ReactNode;
  /** Inline variant for use inside a step or card, rather than a whole page. */
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 border-2 border-dashed border-outline bg-surface-container text-center",
        compact ? "px-4 py-8" : "px-6 py-14",
        className,
      )}
    >
      <span className="flex size-14 items-center justify-center bg-beacon/10 text-beacon">
        {icon ?? <Inbox className="size-6" aria-hidden="true" />}
      </span>

      <h3 className="font-display text-headline-md leading-tight">{title}</h3>

      {description && (
        <p className="max-w-prose text-body-sm text-on-surface-variant">
          {description}
        </p>
      )}

      {(action || secondaryAction) && (
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          {action && (
            <Button variant="signal" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="surface" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- loading */

export function LoadingState({
  label = "Loading",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      // `status` + `polite` announces the wait once, without stealing focus.
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-center justify-center gap-3 border-2 border-outline bg-surface-container px-6 py-12",
        className,
      )}
    >
      <Loader2
        className="size-5 animate-spin text-beacon motion-reduce:animate-none"
        aria-hidden="true"
      />
      <span className="font-mono text-label-sm uppercase tracking-widest text-on-surface-variant">
        {label}…
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ error */

export function ErrorState({
  title = "Something broke on my end",
  description = "Reload in a moment. If it keeps happening, message me on WhatsApp.",
  action,
  detail,
  className,
}: {
  title?: string;
  description?: React.ReactNode;
  action?: StateAction;
  /** Technical reference — status code, request id — for a bug report. */
  detail?: string;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center gap-3 border-2 border-signal bg-surface-container px-6 py-12 text-center",
        className,
      )}
    >
      <span className="flex size-14 items-center justify-center bg-signal/10 text-signal">
        <AlertTriangle className="size-6" aria-hidden="true" />
      </span>

      <h3 className="font-display text-headline-md leading-tight">{title}</h3>

      <p className="max-w-prose text-body-sm text-on-surface-variant">
        {description}
      </p>

      {action && (
        <Button variant="signal" className="mt-2" onClick={action.onClick}>
          {action.label}
        </Button>
      )}

      {detail && (
        <p className="font-mono text-label-xs uppercase tracking-widest text-on-surface-variant">
          {detail}
        </p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- success */

export function SuccessState({
  title,
  description,
  actions,
  className,
}: {
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center gap-4 border-2 border-ink bg-surface-container px-6 py-14 text-center brutal-shadow",
        className,
      )}
    >
      <span className="flex size-14 items-center justify-center bg-beacon/10 text-beacon">
        <CheckCircle2 className="size-7" aria-hidden="true" />
      </span>

      <h2 className="font-display text-[clamp(1.5rem,5vw,2.25rem)] leading-none font-bold tracking-tight">
        {title}
      </h2>

      {description && (
        <p className="max-w-prose text-body-md text-on-surface-variant">
          {description}
        </p>
      )}

      {actions && <div className="mt-2 flex flex-col gap-2 sm:flex-row">{actions}</div>}
    </div>
  );
}

/* -------------------------------------------------------------- skeletons */

export function FormSkeleton({ fields = 4 }: { fields?: number }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading form"
      className="space-y-6 border-2 border-outline bg-surface-container p-4 sm:p-6"
    >
      {Array.from({ length: fields }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-11 w-full" />
        </div>
      ))}
      <Skeleton className="h-12 w-full sm:w-48" />
    </div>
  );
}

export function ListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="space-y-3"
    >
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="flex items-start justify-between gap-4 border-2 border-outline bg-surface-container p-4"
        >
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-3 w-3/5" />
          </div>
          <Skeleton className="h-4 w-20 shrink-0" />
        </div>
      ))}
    </div>
  );
}
