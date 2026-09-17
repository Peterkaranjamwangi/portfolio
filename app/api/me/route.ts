import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/user";

/**
 * GET /api/me — the signed-in user as this application knows them.
 *
 * Returns our row, not the Supabase identity: the role is the part the UI
 * needs, and it lives here. Deliberately narrow — no timestamps, no
 * supabaseUserId — because this is the one user endpoint the browser can read
 * and it should carry nothing a page does not render.
 */
export async function GET() {
  const current = await getCurrentUser();

  if (!current) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const { dbUser } = current;

  return NextResponse.json({
    user: {
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      role: dbUser.role,
    },
  });
}
