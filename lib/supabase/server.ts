import "server-only";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import {
  requireServiceRoleKey,
  requireSupabaseEnv,
} from "@/lib/supabase/env";

/**
 * Supabase client for server components, route handlers and server actions.
 *
 * It reads and writes the session cookies, which is what keeps a signed-in user
 * signed in across requests.
 */
export async function createClient() {
  const { url, anonKey } = requireSupabaseEnv();
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Server components cannot set cookies. That is fine: the proxy
          // refreshes the session on every request, so the only thing lost here
          // is a duplicate write.
        }
      },
    },
  });
}

/**
 * Service-role client — bypasses row-level security.
 *
 * Only for work the app has already authorised itself, such as writing to the
 * storage bucket after checking that the caller is an admin. Never hand this
 * client a value that came from a request without validating it first.
 */
export function createAdminClient() {
  const { url } = requireSupabaseEnv();

  return createSupabaseClient(url, requireServiceRoleKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
