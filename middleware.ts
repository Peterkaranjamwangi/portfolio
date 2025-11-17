import { authMiddleware } from "@clerk/nextjs";

/**
 * Clerk Authentication Middleware
 *
 * Protects routes based on authentication status:
 * - /admin/* routes require authentication (redirects to /sign-in)
 * - /sign-in and /sign-up are public
 * - All other routes are public (portfolio display)
 * - API routes need authentication checks in their handlers for mutations
 */
export default authMiddleware({
  // Public routes accessible without authentication
  publicRoutes: [
    "/",
    "/dashboard(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
    // API routes are public for GET requests (portfolio display)
    // Mutations (POST/PATCH/DELETE) should check auth in route handlers
    "/api/(.*)",
  ],
  // Ignored routes (webhooks, etc.)
  ignoredRoutes: [
    "/api/webhook(.*)",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
