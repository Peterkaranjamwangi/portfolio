import { afterEach, describe, expect, it } from "vitest";
import type { User } from "@supabase/supabase-js";

import { isAdmin } from "@/lib/auth";

/**
 * Who counts as an admin. This decides access to every write endpoint, so the
 * cases that matter most are the ones that must NOT pass.
 */
function user(overrides: Partial<User> = {}): User {
  return {
    id: "00000000-0000-0000-0000-000000000000",
    app_metadata: {},
    user_metadata: {},
    aud: "authenticated",
    created_at: "2026-01-01T00:00:00Z",
    ...overrides,
  } as User;
}

const originalAdminEmails = process.env.ADMIN_EMAILS;

afterEach(() => {
  if (originalAdminEmails === undefined) delete process.env.ADMIN_EMAILS;
  else process.env.ADMIN_EMAILS = originalAdminEmails;
});

describe("isAdmin", () => {
  it("is false without a user", () => {
    expect(isAdmin(null)).toBe(false);
    expect(isAdmin(undefined)).toBe(false);
  });

  it("is false for a signed-in user with no role", () => {
    expect(isAdmin(user({ email: "someone@example.com" }))).toBe(false);
  });

  it("accepts app_metadata.role, which only the service key can write", () => {
    expect(isAdmin(user({ app_metadata: { role: "admin" } }))).toBe(true);
  });

  it("ignores user_metadata.role, which the user can write themselves", () => {
    // The whole point of reading app_metadata: this must not be a way in.
    expect(
      isAdmin(user({ email: "nobody@example.com", user_metadata: { role: "admin" } })),
    ).toBe(false);
  });

  it("accepts an email on the bootstrap allowlist", () => {
    process.env.ADMIN_EMAILS = "owner@example.com, second@example.com";
    expect(isAdmin(user({ email: "owner@example.com" }))).toBe(true);
    expect(isAdmin(user({ email: "second@example.com" }))).toBe(true);
    expect(isAdmin(user({ email: "someone@example.com" }))).toBe(false);
  });

  it("matches allowlisted emails regardless of case", () => {
    process.env.ADMIN_EMAILS = "Owner@Example.com";
    expect(isAdmin(user({ email: "owner@EXAMPLE.com" }))).toBe(true);
  });

  it("lets nobody in when the allowlist is empty or unset", () => {
    delete process.env.ADMIN_EMAILS;
    expect(isAdmin(user({ email: "owner@example.com" }))).toBe(false);

    // An empty value must not turn into an empty string that matches.
    process.env.ADMIN_EMAILS = "";
    expect(isAdmin(user({ email: "" }))).toBe(false);
    expect(isAdmin(user({ email: undefined }))).toBe(false);
  });

  it("is not fooled by whitespace padding in the allowlist", () => {
    process.env.ADMIN_EMAILS = "  owner@example.com  ";
    expect(isAdmin(user({ email: "owner@example.com" }))).toBe(true);
  });
});
