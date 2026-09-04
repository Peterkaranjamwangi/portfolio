"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, ArrowLeft, Mail, ShieldCheck } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import {
  otpRequestSchema,
  otpVerifySchema,
  type OtpRequestValues,
  type OtpVerifyValues,
} from "@/lib/validations/auth";

/** Supabase rate-limits sends; this keeps the button honest about it. */
const RESEND_SECONDS = 60;

/**
 * Passwordless sign-in: request a one-time code by email, then verify it.
 *
 * Two forms rather than one, because the fields are validated at different
 * moments — the email has to be accepted before a code exists to check.
 */
export function OtpSignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = safeRedirect(searchParams.get("redirectTo"));

  const [sentTo, setSentTo] = React.useState<string | null>(null);

  if (!sentTo) {
    return <RequestStep onSent={setSentTo} />;
  }

  return (
    <VerifyStep
      email={sentTo}
      redirectTo={redirectTo}
      onBack={() => setSentTo(null)}
      onResend={async () => {
        const supabase = createClient();
        await supabase.auth.signInWithOtp({ email: sentTo });
      }}
      router={router}
    />
  );
}

function RequestStep({ onSent }: { onSent: (email: string) => void }) {
  const [formError, setFormError] = React.useState<string | null>(null);

  const form = useForm<OtpRequestValues>({
    resolver: zodResolver(otpRequestSchema),
    mode: "onBlur",
    defaultValues: { email: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setFormError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: values.email,
      options: {
        // The account is created on first sign-in; being a *user* grants
        // nothing on its own, since /admin is gated separately on the admin
        // role. Turn this off to close sign-ups entirely.
        shouldCreateUser: true,
      },
    });

    if (error) {
      setFormError(error.message);
      return;
    }

    onSent(values.email);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        {formError && <ErrorBanner>{formError}</ErrorBanner>}

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
                  autoFocus
                  placeholder="you@example.com"
                />
              </FormControl>
              <FormDescription>
                A six-digit code arrives by email. No password to remember.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="signal"
          size="lg"
          block
          disabled={form.formState.isSubmitting}
        >
          <Mail aria-hidden="true" />
          {form.formState.isSubmitting ? "Sending…" : "Send code"}
        </Button>
      </form>
    </Form>
  );
}

function VerifyStep({
  email,
  redirectTo,
  onBack,
  onResend,
  router,
}: {
  email: string;
  redirectTo: string;
  onBack: () => void;
  onResend: () => Promise<void>;
  router: ReturnType<typeof useRouter>;
}) {
  const [formError, setFormError] = React.useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = React.useState(RESEND_SECONDS);

  React.useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const form = useForm<OtpVerifyValues>({
    resolver: zodResolver(otpVerifySchema),
    mode: "onSubmit",
    defaultValues: { email, token: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setFormError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email: values.email,
      token: values.token,
      type: "email",
    });

    if (error) {
      setFormError(error.message);
      form.setValue("token", "");
      return;
    }

    router.replace(redirectTo);
    // The session lives in cookies the server reads on the next request, so
    // the server tree has to be re-fetched for the new state to show.
    router.refresh();
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        {formError && <ErrorBanner>{formError}</ErrorBanner>}

        <p className="text-body-sm text-on-surface-variant">
          Code sent to <span className="font-medium text-on-surface">{email}</span>.
        </p>

        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Six-digit code</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  autoFocus
                  maxLength={7}
                  placeholder="123456"
                  className="font-mono text-lg tracking-[0.4em]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="signal"
          size="lg"
          block
          disabled={form.formState.isSubmitting}
        >
          <ShieldCheck aria-hidden="true" />
          {form.formState.isSubmitting ? "Verifying…" : "Verify and continue"}
        </Button>

        <div className="flex items-center justify-between gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft aria-hidden="true" />
            Change email
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={secondsLeft > 0}
            onClick={async () => {
              setSecondsLeft(RESEND_SECONDS);
              setFormError(null);
              await onResend();
            }}
          >
            {secondsLeft > 0 ? `Resend in ${secondsLeft}s` : "Resend code"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

function ErrorBanner({ children }: { children: React.ReactNode }) {
  return (
    <p
      role="alert"
      className="flex items-start gap-2 border-2 border-signal bg-signal-soft/30 p-3 text-body-sm text-signal"
    >
      <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

/**
 * Only same-site paths are honoured. A `redirectTo` of `https://evil.example`
 * would otherwise turn the sign-in page into an open redirect.
 */
function safeRedirect(value: string | null): string {
  if (!value) return "/admin/dashboard";
  if (!value.startsWith("/") || value.startsWith("//")) return "/admin/dashboard";
  return value;
}
