import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const SIGN_IN_PATH = "/sign-in";

/**
 * Refreshes the Supabase session on every request and guards `/admin`.
 *
 * The refresh has to happen here rather than in a layout: server components
 * cannot write cookies, so without a middleware pass an expired access token is
 * never renewed and the user is silently signed out mid-session.
 */
export default async function proxy(request: NextRequest) {
  // Must be the same response object the cookies are written onto — building a
  // fresh one later would drop the refreshed session.
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Without configuration there is no session to refresh and no way to check
  // one. Public pages still render; `/admin` is sent to sign-in rather than
  // being served to an unauthenticated visitor.
  if (!url || !anonKey) {
    return isProtected(request) ? redirectToSignIn(request) : response;
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // Do not remove: this call is what performs the refresh.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isProtected(request) && !user) {
    return redirectToSignIn(request);
  }

  // A signed-in user landing on the sign-in page wants the dashboard.
  if (user && request.nextUrl.pathname.startsWith(SIGN_IN_PATH)) {
    const target = request.nextUrl.clone();
    target.pathname = "/admin/dashboard";
    target.search = "";
    return NextResponse.redirect(target);
  }

  return response;
}

function isProtected(request: NextRequest): boolean {
  const { pathname } = request.nextUrl;
  // `/admin/login` would otherwise redirect to sign-in forever.
  if (pathname.startsWith("/admin/login")) return false;
  return pathname.startsWith("/admin");
}

function redirectToSignIn(request: NextRequest) {
  const target = request.nextUrl.clone();
  target.pathname = SIGN_IN_PATH;
  // Carries the visitor back to where they were headed after signing in.
  target.searchParams.set("redirectTo", request.nextUrl.pathname);
  return NextResponse.redirect(target);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
