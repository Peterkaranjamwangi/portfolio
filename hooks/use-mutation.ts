"use client";

import * as React from "react";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

import { ApiError } from "@/lib/api-client";
import { toast } from "@/lib/toast";

export interface UseMutationOptions<TData, TFormValues extends FieldValues> {
  /** Raised as a toast when the mutation resolves. */
  successMessage?: string;
  /**
   * When given, `details` from a 400 are written back onto the matching form
   * fields instead of being flattened into one banner — server validation then
   * lands next to the input that caused it, exactly like client validation.
   */
  setFormError?: UseFormSetError<TFormValues>;
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
}

export interface UseMutationResult<TInput, TData> {
  mutate: (input: TInput) => Promise<TData | null>;
  isPending: boolean;
  error: Error | null;
  reset: () => void;
}

export function useMutation<
  TInput,
  TData,
  TFormValues extends FieldValues = FieldValues,
>(
  mutationFn: (input: TInput) => Promise<TData>,
  options: UseMutationOptions<TData, TFormValues> = {},
): UseMutationResult<TInput, TData> {
  const [isPending, setIsPending] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  // The mutation function and options are re-created by the caller on every
  // render, and the function closes over live state (the current selection, in
  // the estimator's case). Refs keep `mutate` stable without letting it fire a
  // stale closure from the first render.
  const mutationFnRef = React.useRef(mutationFn);
  mutationFnRef.current = mutationFn;

  const optionsRef = React.useRef(options);
  optionsRef.current = options;

  // Guards against a resolve landing after the form has unmounted, which would
  // be a setState on a dead component.
  const mountedRef = React.useRef(true);
  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const mutate = React.useCallback(async (input: TInput) => {
    const { successMessage, setFormError, onSuccess, onError } = optionsRef.current;

    setIsPending(true);
    setError(null);

    try {
      const data = await mutationFnRef.current(input);
      if (!mountedRef.current) return data;

      if (successMessage) toast.success(successMessage);
      onSuccess?.(data);
      return data;
    } catch (err) {
      const failure = err instanceof Error ? err : new Error("Something went wrong");
      if (!mountedRef.current) return null;

      const fieldErrors =
        err instanceof ApiError && setFormError ? err.fieldErrors : [];

      for (const fieldError of fieldErrors) {
        setFormError?.(fieldError.field as Path<TFormValues>, {
          type: "server",
          message: fieldError.message,
        });
      }

      // Field errors are already visible beside their inputs; a toast repeating
      // them would say the same thing twice.
      if (fieldErrors.length === 0) toast.error(failure.message);

      setError(failure);
      onError?.(failure);
      return null;
    } finally {
      if (mountedRef.current) setIsPending(false);
    }
  }, []);

  const reset = React.useCallback(() => setError(null), []);

  return { mutate, isPending, error, reset };
}
