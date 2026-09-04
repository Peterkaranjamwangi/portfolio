import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { EstimatorWizard } from "@/components/estimator/wizard";

export const metadata: Metadata = {
  title: "Get an instant estimate — Peter Mwangi",
  description:
    "Price your web platform, Android app, online store or professional website in four steps. Transparent module pricing in Kenyan shillings, with a scoped proposal within one business day.",
};

export default function EstimatePage() {
  return (
    // The site's root layout paints a photographic background; the estimator is
    // a working surface, so it lays an opaque one over it edge to edge.
    <div className="min-h-screen bg-surface font-display text-on-surface">
      <header className="border-b-2 border-ink">
        <div className="mx-auto flex max-w-(--container-page) items-center justify-between gap-4 px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-label-xs uppercase tracking-widest text-on-surface-variant transition-colors hover:text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Peter Mwangi
          </Link>

          <p className="font-mono text-label-xs uppercase tracking-widest text-beacon">
            Instant estimate
          </p>
        </div>
      </header>

      <EstimatorWizard />
    </div>
  );
}
