import type { User } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

/**
 * Server-side authorisation helpers, backed by Supabase Auth.
 *
 * Both use `getUser()` rather than `getSession()`: `getUser()` verifies the JWT
 * with Supabase, while a session read only decodes whatever is in the cookie.
 * For an authorisation decision that difference is the whole point.
 */

export interface AuthorizedResult {
  authorized: true;
  user: User;
  userId: string;
}

export interface UnauthorizedResult {
  authorized: false;
  response: NextResponse;
}

export type AuthResult = AuthorizedResult | UnauthorizedResult;

/** Requires any signed-in user. Use in API routes that write data. */
export async function requireAuth(): Promise<AuthResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Unauthorized - Authentication required" },
        { status: 401 },
      ),
    };
  }

  return { authorized: true, user, userId: user.id };
}

/**
 * Requires an admin.
 *
 * Admin comes from `app_metadata.role`, which only the service-role key can
 * write — unlike `user_metadata`, which a signed-in user can set on themselves
 * and would therefore be a self-service promotion to admin. `ADMIN_EMAILS` is
 * the bootstrap path for the first account, before any role has been assigned.
 */
export async function requireAdmin(): Promise<AuthResult> {
  const result = await requireAuth();
  if (!result.authorized) return result;

  if (!isAdmin(result.user)) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 },
      ),
    };
  }

  return result;
}

export function isAdmin(user: User | null | undefined): boolean {
  if (!user) return false;

  if (user.app_metadata?.role === "admin") return true;

  const email = user.email?.trim().toLowerCase();
  return Boolean(email) && adminEmails().includes(email!);
}

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
}
