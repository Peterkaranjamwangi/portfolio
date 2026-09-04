"use client";

import { createBrowserClient } from "@supabase/ssr";

import { requireSupabaseEnv } from "@/lib/supabase/env";

/**
 * The browser Supabase client.
 *
 * Created per call rather than as a module singleton: `createBrowserClient`
 * already memoises the underlying connection, and a fresh call is what keeps
 * the client from being constructed during a server render.
 */
export function createClient() {
  const { url, anonKey } = requireSupabaseEnv();
  return createBrowserClient(url, anonKey);
}
