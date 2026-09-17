import { afterEach, describe, expect, it } from "vitest";
import { UserRole, type User as DbUser } from "@prisma/client";

import { hasRole, isAdmin } from "@/lib/auth";
import { shouldBootstrapAdmin } from "@/lib/user";

/**
 * Authorisation reads our own User row, never Supabase metadata. These cover
 * the shape of that decision; the linking that produces the row is covered
 * against a real database in user.db.test.ts.
 */
function dbUser(role: UserRole): DbUser {
  return {
    id: 1,
    supabaseUserId: "00000000-0000-0000-0000-000000000000",
    name: "Someone",
    email: "someone@example.com",
    role,
    lastSignInAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

describe("isAdmin", () => {
  it("is true only for ADMIN", () => {
    expect(isAdmin(dbUser(UserRole.ADMIN))).toBe(true);
    expect(isAdmin(dbUser(UserRole.EDITOR))).toBe(false);
    expect(isAdmin(dbUser(UserRole.USER))).toBe(false);
  });

  it("is false without a user", () => {
    expect(isAdmin(null)).toBe(false);
    expect(isAdmin(undefined)).toBe(false);
  });
});

describe("hasRole", () => {
  it("lets an editor through an editor-or-admin gate", () => {
    const gate = [UserRole.ADMIN, UserRole.EDITOR];
    expect(hasRole(dbUser(UserRole.EDITOR), gate)).toBe(true);
    expect(hasRole(dbUser(UserRole.ADMIN), gate)).toBe(true);
    expect(hasRole(dbUser(UserRole.USER), gate)).toBe(false);
  });

  it("lets nobody through an empty gate", () => {
    expect(hasRole(dbUser(UserRole.ADMIN), [])).toBe(false);
  });
});

const originalAdminEmails = process.env.ADMIN_EMAILS;

afterEach(() => {
  if (originalAdminEmails === undefined) delete process.env.ADMIN_EMAILS;
  else process.env.ADMIN_EMAILS = originalAdminEmails;
});

describe("shouldBootstrapAdmin", () => {
  it("matches a listed email, ignoring case and padding", () => {
    process.env.ADMIN_EMAILS = "  Owner@Example.com , second@example.com";
    expect(shouldBootstrapAdmin("owner@EXAMPLE.com")).toBe(true);
    expect(shouldBootstrapAdmin("second@example.com")).toBe(true);
  });

  it("does not match anyone else", () => {
    process.env.ADMIN_EMAILS = "owner@example.com";
    expect(shouldBootstrapAdmin("someone@example.com")).toBe(false);
  });

  it("matches nobody when unset or empty", () => {
    delete process.env.ADMIN_EMAILS;
    expect(shouldBootstrapAdmin("owner@example.com")).toBe(false);

    // An empty list must not become an empty string that matches.
    process.env.ADMIN_EMAILS = "";
    expect(shouldBootstrapAdmin("")).toBe(false);
    expect(shouldBootstrapAdmin(null)).toBe(false);
    expect(shouldBootstrapAdmin(undefined)).toBe(false);
  });
});
