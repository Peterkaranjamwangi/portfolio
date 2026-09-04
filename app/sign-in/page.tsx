import * as React from "react";
import type { Metadata } from "next";

import { AuthCard } from "@/components/auth/auth-card";
import { OtpSignInForm } from "@/components/auth/otp-sign-in-form";
import { FormSkeleton } from "@/components/patterns/states";

export const metadata: Metadata = {
  title: "Sign in — Peter Mwangi",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <AuthCard
      title="Sign in"
      description="Manage projects, services and estimates."
      footer="Admin access is granted separately once an account exists."
    >
      {/*
        The form reads `redirectTo` from the query string via useSearchParams,
        which needs a Suspense boundary or the whole route opts out of static
        rendering.
      */}
      <React.Suspense fallback={<FormSkeleton fields={1} />}>
        <OtpSignInForm />
      </React.Suspense>
    </AuthCard>
  );
}
