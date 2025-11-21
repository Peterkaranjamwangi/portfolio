import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * Clerk Authentication Middleware (v6 API)
 *
 * Protects routes based on authentication status:
 * - /admin/* routes require authentication (redirects to /sign-in)
 * - /sign-in and /sign-up are public
 * - All other routes are public (portfolio display)
 * - API routes need authentication checks in their handlers for mutations
 */

const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
