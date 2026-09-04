import * as React from "react";

import { cn } from "@/lib/utils";
import { SectionIndex } from "@/components/swiss";

/**
 * The shell both auth screens sit in — the "PM. / MANAGE" panel from the
 * States canvas. Keeping it here means sign-in and sign-up cannot drift apart.
 */
export function AuthCard({
  title,
  description,
  children,
  footer,
  className,
}: {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-4 py-12 font-display text-on-surface">
      <div className={cn("w-full max-w-md space-y-6", className)}>
        <div className="space-y-3">
          <p className="font-display text-2xl font-bold tracking-tight">PM.</p>
          <SectionIndex index="00" label="Manage" />
        </div>

        <div className="space-y-5 border-2 border-ink bg-surface-container p-6 brutal-shadow">
          <div className="space-y-1">
            <h1 className="font-display text-[clamp(1.5rem,5vw,2rem)] leading-none font-bold tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="text-body-sm text-on-surface-variant">{description}</p>
            )}
          </div>

          {children}
        </div>

        {footer && (
          <p className="text-center text-body-sm text-on-surface-variant">{footer}</p>
        )}
      </div>
    </main>
  );
}
