"use client";

import { AlertTriangle, CheckCircle2, Info, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { dismiss, useToasts, type ToastTone } from "@/lib/toast";

const TONE_ICON: Record<ToastTone, typeof Info> = {
  success: CheckCircle2,
  error: AlertTriangle,
  info: Info,
};

/**
 * Renders whatever `lib/toast` is holding. Mounted by the surfaces that raise
 * toasts rather than in the root layout, so pages that never call `toast()` do
 * not ship the listener.
 */
export function Toaster() {
  const toasts = useToasts();

  if (toasts.length === 0) return null;

  return (
    <div
      // `polite` so a confirmation waits its turn; an assertive region here
      // would cut across whatever the visitor is reading.
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-2 p-4 sm:inset-x-auto sm:right-0 sm:top-0 sm:items-end"
    >
      {toasts.map((toast) => {
        const Icon = TONE_ICON[toast.tone];

        return (
          <div
            key={toast.id}
            role={toast.tone === "error" ? "alert" : "status"}
            className={cn(
              "pointer-events-auto flex w-full max-w-sm items-start gap-3 border-2 border-ink bg-surface-container p-3 brutal-shadow",
              toast.tone === "error" && "border-signal",
            )}
          >
            <Icon
              aria-hidden="true"
              className={cn(
                "mt-0.5 size-4 shrink-0",
                toast.tone === "error" ? "text-signal" : "text-beacon",
              )}
            />
            <p className="min-w-0 flex-1 text-body-sm">{toast.message}</p>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss notification"
              className="shrink-0 text-on-surface-variant transition-colors hover:text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
