import { describe, expect, it } from "vitest";

import { projectSchema } from "@/lib/validations/schemas";
import { otpVerifySchema } from "@/lib/validations/auth";

const validProject = {
  name: "Estien",
  shortDescription: "A thing that was built.",
  image: "/estien.png",
  link: "https://estien.vercel.app",
  status: "COMPLETED" as const,
};

describe("projectSchema image handling", () => {
  it("accepts a root-relative path, the form the seed data uses", () => {
    // This is the regression: an earlier `.url()` rejected these outright, so
    // the admin panel could not save a project alongside the seeded ones.
    expect(projectSchema.safeParse(validProject).success).toBe(true);
  });

  it("accepts an absolute https URL, the form bucket uploads take", () => {
    const parsed = projectSchema.safeParse({
      ...validProject,
      image: "https://project.supabase.co/storage/v1/object/public/x.png",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects a protocol-relative URL, which is not same-origin", () => {
    expect(
      projectSchema.safeParse({ ...validProject, image: "//evil.example/x.png" }).success,
    ).toBe(false);
  });

  it("rejects a javascript: payload", () => {
    expect(
      projectSchema.safeParse({ ...validProject, image: "javascript:alert(1)" }).success,
    ).toBe(false);
  });

  it("defaults images and platforms rather than requiring them", () => {
    const parsed = projectSchema.parse(validProject);
    expect(parsed.images).toEqual([]);
    expect(parsed.platforms).toEqual([]);
  });

  it("rejects a platform outside the known set", () => {
    expect(
      projectSchema.safeParse({ ...validProject, platforms: ["mainframe"] }).success,
    ).toBe(false);
  });
});

describe("otpVerifySchema", () => {
  const email = "someone@example.com";

  it("accepts six digits", () => {
    expect(otpVerifySchema.safeParse({ email, token: "123456" }).success).toBe(true);
  });

  it("tolerates the whitespace a pasted code brings with it", () => {
    const parsed = otpVerifySchema.parse({ email, token: " 123 456 " });
    expect(parsed.token).toBe("123456");
  });

  it("rejects the wrong length or non-digits", () => {
    for (const token of ["12345", "1234567", "12345a", ""]) {
      expect(otpVerifySchema.safeParse({ email, token }).success).toBe(false);
    }
  });

  it("lowercases the email so the allowlist comparison holds", () => {
    expect(otpVerifySchema.parse({ email: "Someone@Example.com", token: "123456" }).email)
      .toBe("someone@example.com");
  });
});
