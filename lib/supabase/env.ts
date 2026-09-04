/**
 * Supabase configuration, read once and validated loudly.
 *
 * A missing key here fails at the first call with a message naming the variable
 * rather than surfacing later as an opaque "Invalid API key" from the network
 * tab.
 */

export interface SupabaseEnv {
  url: string;
  anonKey: string;
}

export function requireSupabaseEnv(): SupabaseEnv {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  return { url, anonKey };
}

/**
 * The service-role key. Server-only: it bypasses row-level security, so it must
 * never be bundled into anything the browser downloads — which is why it has no
 * `NEXT_PUBLIC_` prefix and this function throws if called in the browser.
 */
export function requireServiceRoleKey(): string {
  if (typeof window !== "undefined") {
    throw new Error("The Supabase service-role key must never be read in the browser");
  }

  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error(
      "Supabase admin actions need SUPABASE_SERVICE_ROLE_KEY to be set.",
    );
  }

  return key;
}

/** Bucket holding project screenshots and other public portfolio media. */
export const STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "project-images";
