"use client";

import * as React from "react";

export interface UseResourceOptions {
  /** When false the fetcher never runs and any previous data is cleared. */
  enabled?: boolean;
  /**
   * Waits this long after the last dependency change before fetching. The
   * estimator's price request changes on every keystroke in a custom spec, and
   * without this each one would be a round trip.
   */
  debounceMs?: number;
}

export interface UseResourceResult<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  refetch: () => void;
}

/**
 * Runs an async fetcher whenever `deps` change, with debouncing, abort on
 * supersede, and a stale-response guard.
 *
 * Previous data is deliberately kept while a new request is in flight: the
 * estimate rail should show the last figure dimmed rather than flashing empty
 * every time a checkbox moves.
 */
export function useResource<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: React.DependencyList,
  { enabled = true, debounceMs = 0 }: UseResourceOptions = {},
): UseResourceResult<T> {
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  // Starts true when a fetch is going to happen, so the first paint shows a
  // skeleton rather than an empty state that is about to be replaced.
  const [isLoading, setIsLoading] = React.useState(enabled);

  // The fetcher closes over fresh values on every render; holding it in a ref
  // keeps it out of the effect's dependency list, where it would retrigger the
  // effect endlessly.
  const fetcherRef = React.useRef(fetcher);
  fetcherRef.current = fetcher;

  const [reloadToken, setReloadToken] = React.useState(0);

  React.useEffect(() => {
    if (!enabled) {
      setData(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    let cancelled = false;

    setIsLoading(true);

    const run = async () => {
      try {
        const result = await fetcherRef.current(controller.signal);
        if (cancelled) return;
        setData(result);
        setError(null);
      } catch (err) {
        // An abort means this request was replaced, so its outcome is not the
        // visitor's problem and must not clear the figure on screen.
        if (cancelled || controller.signal.aborted) return;
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err : new Error("Something went wrong"));
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    const timer = debounceMs > 0 ? setTimeout(run, debounceMs) : null;
    if (!timer) void run();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, enabled, debounceMs, reloadToken]);

  const refetch = React.useCallback(() => setReloadToken((n) => n + 1), []);

  return { data, error, isLoading, refetch };
}
