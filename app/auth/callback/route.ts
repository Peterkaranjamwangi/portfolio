import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";

/**
 * GET /auth/callback — completes an email confirmation or magic link.
 *
 * Supabase sends the browser here with a one-time `code`; exchanging it sets
 * the session cookies, after which the visitor continues to wherever they were
 * headed.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = safeRedirect(searchParams.get("next"));

  if (!code) {
    return NextResponse.redirect(`${origin}/sign-in?error=missing_code`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/sign-in?error=invalid_code`);
  }

  return NextResponse.redirect(`${origin}${next}`);
}

/** Same-site paths only — an absolute `next` would be an open redirect. */
function safeRedirect(value: string | null): string {
  if (!value) return "/admin/dashboard";
  if (!value.startsWith("/") || value.startsWith("//")) return "/admin/dashboard";
  return value;
}
