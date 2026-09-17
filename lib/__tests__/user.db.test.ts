import { afterAll, beforeEach, describe, expect, it } from "vitest";
import type { User as AuthUser } from "@supabase/supabase-js";

import { prisma } from "@/lib/prisma";
import { linkUser } from "@/lib/user";

/**
 * Database-backed tests for the Supabase ↔ User link.
 *
 * These need a real Postgres, so they are skipped unless TEST_DATABASE_URL is
 * set (see README). The linking rules are the kind of thing a unit test with a
 * mocked client would assert into existence rather than verify — the unique
 * constraints and the adopt-by-email path only mean anything against a real
 * schema.
 */
// vitest.config.mts copies TEST_DATABASE_URL into DATABASE_URL before Prisma
// is imported; this only decides whether to run.
const describeDb = process.env.TEST_DATABASE_URL ? describe : describe.skip;

function authUser(overrides: Partial<AuthUser> = {}): AuthUser {
  return {
    id: crypto.randomUUID(),
    email: `${crypto.randomUUID().slice(0, 8)}@example.com`,
    app_metadata: {},
    user_metadata: {},
    aud: "authenticated",
    created_at: new Date().toISOString(),
    ...overrides,
  } as AuthUser;
}

describeDb("linkUser", () => {
  beforeEach(async () => {
    delete process.env.ADMIN_EMAILS;
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("creates a row for an identity it has never seen", async () => {
    const auth = authUser({ email: "new@example.com" });
    const user = await linkUser(auth);

    expect(user.supabaseUserId).toBe(auth.id);
    expect(user.email).toBe("new@example.com");
    expect(user.role).toBe("USER");
    expect(user.lastSignInAt).toBeInstanceOf(Date);
  });

  it("adopts an existing row with the same email instead of duplicating", async () => {
    // The seeded author who signs in for the first time.
    const seeded = await prisma.user.create({
      data: { name: "Charlie Davis", email: "charlie@example.com", role: "ADMIN" },
    });

    const linked = await linkUser(authUser({ email: "charlie@example.com" }));

    expect(linked.id).toBe(seeded.id);
    expect(linked.role).toBe("ADMIN");
    expect(await prisma.user.count()).toBe(1);
  });

  it("keeps a linked author's posts attached to the same row", async () => {
    const author = await prisma.user.create({
      data: { name: "Writer", email: "writer@example.com" },
    });
    await prisma.post.create({
      data: {
        title: "A post",
        content: "…",
        slug: "a-post",
        authorId: author.id,
      },
    });

    const linked = await linkUser(authUser({ email: "writer@example.com" }));

    const posts = await prisma.post.findMany({ where: { authorId: linked.id } });
    expect(posts).toHaveLength(1);
  });

  it("is idempotent — signing in twice does not make a second row", async () => {
    const auth = authUser({ email: "repeat@example.com" });
    const first = await linkUser(auth);
    const second = await linkUser(auth);

    expect(second.id).toBe(first.id);
    expect(await prisma.user.count()).toBe(1);
  });

  it("normalises the email so a case change is the same person", async () => {
    const id = crypto.randomUUID();
    await linkUser(authUser({ id, email: "Mixed@Example.com" }));
    const again = await linkUser(authUser({ id, email: "mixed@example.com" }));

    expect(again.email).toBe("mixed@example.com");
    expect(await prisma.user.count()).toBe(1);
  });

  it("grants ADMIN on first sign-in to a bootstrap email", async () => {
    process.env.ADMIN_EMAILS = "owner@example.com";
    const user = await linkUser(authUser({ email: "owner@example.com" }));
    expect(user.role).toBe("ADMIN");
  });

  it("does not grant ADMIN to anyone else", async () => {
    process.env.ADMIN_EMAILS = "owner@example.com";
    const user = await linkUser(authUser({ email: "someone@example.com" }));
    expect(user.role).toBe("USER");
  });

  it("never demotes an admin who has dropped off the bootstrap list", async () => {
    const auth = authUser({ email: "owner@example.com" });
    process.env.ADMIN_EMAILS = "owner@example.com";
    await linkUser(auth);

    delete process.env.ADMIN_EMAILS;
    const again = await linkUser(auth);
    expect(again.role).toBe("ADMIN");
  });

  it("refuses an identity with no email, which cannot author anything", async () => {
    await expect(linkUser(authUser({ email: undefined }))).rejects.toThrow(/no email/i);
  });
});
