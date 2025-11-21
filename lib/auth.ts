import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * Check if the user is authenticated
 * Use this in API routes that require authentication
 */
export async function requireAuth() {
  const { userId } = auth();

  if (!userId) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'Unauthorized - Authentication required' },
        { status: 401 }
      ),
    };
  }

  return {
    authorized: true,
    userId,
  };
}

/**
 * Check if the user is an admin
 * For now, any authenticated user is considered an admin
 * You can extend this to check specific roles from Clerk metadata
 */
export async function requireAdmin() {
  const { userId, sessionClaims } = auth();

  if (!userId) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'Unauthorized - Authentication required' },
        { status: 401 }
      ),
    };
  }

  // Optional: Check for admin role in metadata
  // const isAdmin = sessionClaims?.metadata?.role === 'admin';
  // if (!isAdmin) {
  //   return {
  //     authorized: false,
  //     response: NextResponse.json(
  //       { error: 'Forbidden - Admin access required' },
  //       { status: 403 }
  //     ),
  //   };
  // }

  return {
    authorized: true,
    userId,
    sessionClaims,
  };
}
