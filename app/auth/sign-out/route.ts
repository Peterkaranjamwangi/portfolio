import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";

/**
 * POST /auth/sign-out — ends the session.
 *
 * POST rather than GET on purpose: a link prefetcher or an <img> pointed at a
 * GET sign-out would log the user out without them asking.
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  await supabase.auth.signOut();

  return NextResponse.redirect(new URL("/sign-in", request.nextUrl.origin), {
    // 303 so the browser follows with GET rather than repeating the POST.
    status: 303,
  });
}
