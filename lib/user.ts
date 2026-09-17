import "server-only";

import { Prisma, UserRole, type User as DbUser } from "@prisma/client";
import type { User as AuthUser } from "@supabase/supabase-js";

import { prisma } from "@/lib/prisma";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export type { DbUser };

export interface CurrentUser {
  /** The Supabase identity: session, email, provider metadata. */
  authUser: AuthUser;
  /** Our row: role, authored posts, everything the app decides on. */
  dbUser: DbUser;
}

/**
 * The signed-in user, as both halves: Supabase identity and our own record.
 *
 * Returns null when nobody is signed in. Uses `getUser()` rather than
 * `getSession()` — only `getUser()` verifies the token with Supabase, and a
 * decision about who someone is should not rest on an unverified cookie.
 *
 * Provisioning is lazy and happens here rather than in the sign-in callback,
 * so an account created straight in the Supabase dashboard, or one whose first
 * request is an API call, still ends up with a row.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  // Fail closed rather than loudly. Without configuration there is no session
  // to read, so the honest answer is "nobody is signed in" — which callers
  // turn into a 401. Letting the missing-config error escape instead made
  // every authenticated route answer 500, which reads as a server fault and
  // is a worse failure than a clean denial.
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) return null;

  const dbUser = await linkUser(authUser);
  return { authUser, dbUser };
}

/**
 * Finds or creates the application row for a Supabase identity.
 *
 * Three cases, in order:
 *
 *  1. Already linked — refresh the details Supabase owns and stamp the sign-in.
 *  2. Not linked, but a row already holds this email. That is the seeded
 *     author who has now signed in for the first time; adopt the row instead
 *     of creating a second one. Creating would fail on the unique email
 *     anyway, and would orphan their posts if it did not.
 *  3. Nobody — create the row.
 */
export async function linkUser(authUser: AuthUser): Promise<DbUser> {
  const email = normaliseEmail(authUser.email);
  const name = displayNameFor(authUser, email);
  const now = new Date();

  const linked = await prisma.user.findUnique({
    where: { supabaseUserId: authUser.id },
  });

  if (linked) {
    return prisma.user.update({
      where: { id: linked.id },
      data: {
        email,
        lastSignInAt: now,
        // Never downgrade a role here. Promotion via ADMIN_EMAILS is a
        // recovery path; demotion is a deliberate act, not a side effect of
        // signing in.
        ...(shouldBootstrapAdmin(email) && linked.role !== UserRole.ADMIN
          ? { role: UserRole.ADMIN }
          : {}),
      },
    });
  }

  try {
    return await prisma.user.upsert({
      where: { email },
      update: { supabaseUserId: authUser.id, lastSignInAt: now },
      create: {
        supabaseUserId: authUser.id,
        email,
        name,
        role: shouldBootstrapAdmin(email) ? UserRole.ADMIN : UserRole.USER,
        lastSignInAt: now,
      },
    });
  } catch (error) {
    // Two requests from the same new user can race here and one loses on the
    // unique index. The winner's row is the answer, so read it back rather
    // than failing a request that did nothing wrong.
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const existing = await prisma.user.findFirst({
        where: { OR: [{ supabaseUserId: authUser.id }, { email }] },
      });
      if (existing) return existing;
    }
    throw error;
  }
}

/**
 * Emails that are granted ADMIN the first time they sign in.
 *
 * This is a bootstrap, not the source of truth — it exists so the first
 * account, or a locked-out operator, can get in. Afterwards the role lives in
 * our table and is changed there.
 */
export function shouldBootstrapAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return bootstrapAdminEmails().includes(email.trim().toLowerCase());
}

function bootstrapAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
}

function normaliseEmail(email: string | undefined): string {
  if (!email) {
    // Supabase can issue an identity without an email (phone, anonymous).
    // Nothing in this app can attribute content to such a user.
    throw new Error("Supabase user has no email address");
  }
  return email.trim().toLowerCase();
}

/** A display name from whatever the identity actually carries. */
function displayNameFor(authUser: AuthUser, email: string): string {
  const metadataName = authUser.user_metadata?.full_name;
  if (typeof metadataName === "string" && metadataName.trim()) {
    return metadataName.trim();
  }
  return email.split("@")[0];
}
