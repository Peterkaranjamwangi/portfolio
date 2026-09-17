"use client";

import * as React from "react";
import type { UserRole } from "@prisma/client";

import { apiGet, ApiError } from "@/lib/api-client";

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface UseUserResult {
  user: CurrentUser | null;
  /** True until the first check resolves — not the same as "no user". */
  loading: boolean;
  /** Display name, always the application's record of it. */
  displayName: string | null;
}

/**
 * The signed-in user as the application knows them, role included.
 *
 * Reads /api/me rather than the Supabase client directly: the role lives in
 * our own table, and only the server can be trusted to report it. A 401 here
 * is the ordinary "nobody is signed in" answer, not a failure.
 */
export function useUser(): UseUserResult {
  const [user, setUser] = React.useState<CurrentUser | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const controller = new AbortController();

    apiGet<{ user: CurrentUser | null }>("/api/me", { signal: controller.signal })
      .then((payload) => {
        setUser(payload.user);
        setLoading(false);
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        // 401 is the expected answer for a signed-out visitor.
        if (!(error instanceof ApiError) || error.status !== 401) {
          console.error("Could not load the current user:", error);
        }
        setUser(null);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { user, loading, displayName: user?.name ?? user?.email ?? null };
}
