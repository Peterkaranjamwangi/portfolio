"use client";

import * as React from "react";
import type { User } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";

export interface UseUserResult {
  user: User | null;
  /** True until the first auth check resolves — not "no user". */
  loading: boolean;
  /** Display name from `user_metadata`, falling back to the email. */
  displayName: string | null;
}

/**
 * The signed-in Supabase user, kept current.
 *
 * `onAuthStateChange` matters as much as the initial read: without it, signing
 * out in one tab would leave the others rendering a stale user until reload.
 */
export function useUser(): UseUserResult {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const supabase = createClient();
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      setUser(data.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const displayName = React.useMemo(() => {
    if (!user) return null;
    const metadataName = user.user_metadata?.full_name;
    return typeof metadataName === "string" && metadataName.trim()
      ? metadataName
      : (user.email ?? null);
  }, [user]);

  return { user, loading, displayName };
}
