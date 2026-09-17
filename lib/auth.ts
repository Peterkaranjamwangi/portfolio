import { UserRole, type User as DbUser } from "@prisma/client";
import type { User as AuthUser } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/user";

/**
 * Server-side authorisation.
 *
 * Supabase answers "who is this?"; this table answers "what may they do?".
 * Roles deliberately do not live in Supabase metadata — keeping them in our
 * own row means a permission change is a database write we control, and never
 * something a user could influence by editing their own profile.
 */

export interface AuthorizedResult {
  authorized: true;
  /** The Supabase identity. */
  authUser: AuthUser;
  /** Our row — the one carrying the role. */
  dbUser: DbUser;
  /** Local user id, suitable as a foreign key (e.g. Post.authorId). */
  userId: number;
}

export interface UnauthorizedResult {
  authorized: false;
  response: NextResponse;
}

export type AuthResult = AuthorizedResult | UnauthorizedResult;

/** Any signed-in user. Rarely the right check on its own — prefer a role. */
export async function requireAuth(): Promise<AuthResult> {
  const current = await getCurrentUser();

  if (!current) {
    return { authorized: false, response: unauthorized() };
  }

  return {
    authorized: true,
    authUser: current.authUser,
    dbUser: current.dbUser,
    userId: current.dbUser.id,
  };
}

/** ADMIN only. For anything that changes access, settings, or stored files. */
export function requireAdmin(): Promise<AuthResult> {
  return requireRole([UserRole.ADMIN]);
}

/** ADMIN or EDITOR. For the content an editor is expected to manage. */
export function requireEditor(): Promise<AuthResult> {
  return requireRole([UserRole.ADMIN, UserRole.EDITOR]);
}

export async function requireRole(roles: UserRole[]): Promise<AuthResult> {
  const result = await requireAuth();
  if (!result.authorized) return result;

  if (!roles.includes(result.dbUser.role)) {
    return { authorized: false, response: forbidden() };
  }

  return result;
}

export function hasRole(user: DbUser | null | undefined, roles: UserRole[]): boolean {
  return Boolean(user) && roles.includes(user!.role);
}

export function isAdmin(user: DbUser | null | undefined): boolean {
  return hasRole(user, [UserRole.ADMIN]);
}

function unauthorized() {
  return NextResponse.json(
    { error: "Unauthorized - Authentication required" },
    { status: 401 },
  );
}

function forbidden() {
  return NextResponse.json(
    { error: "Forbidden - You do not have access to this" },
    { status: 403 },
  );
}
