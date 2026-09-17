# Supabase Setup

Supabase replaces Clerk for authentication and adds a storage bucket for
project images. Prisma is unchanged: it still owns the schema, the migrations
and every query — it simply points at Supabase's Postgres.

## 1. Environment

Copy `.env.example` to `.env` and fill in the four Supabase values from
**Project Settings → API**, plus the connection string from
**Project Settings → Database**:

| Variable | Where it is used |
| --- | --- |
| `DATABASE_URL` | Prisma. The Supabase Postgres connection string. |
| `NEXT_PUBLIC_SUPABASE_URL` | Browser and server clients. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser and server clients. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only — bucket writes. Never expose it. |
| `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET` | Bucket name. Defaults to `project-images`. |
| `ADMIN_EMAILS` | Comma-separated bootstrap admins. |

The service-role key bypasses row-level security. It is read through
`requireServiceRoleKey()`, which throws if anything tries to read it in the
browser.

## 2. Database

```bash
npx prisma migrate deploy   # or `npx prisma migrate dev` locally
npx prisma db seed          # optional
```

## 3. Auth

Sign-in is passwordless: the visitor enters an email, Supabase sends a
six-digit code, and `verifyOtp` exchanges it for a session. No passwords are
stored or handled anywhere in this app.

There is no self-signup — `shouldCreateUser` is `false`, so an email with no
account gets no mail. Create the first account yourself under
**Authentication → Users → Add user**, then grant it admin below.

In **Authentication → Providers → Email**, make sure *Email OTP* is enabled.
If the email template still sends a magic link, edit it to include `{{ .Token }}`
so the code itself is delivered.

### Users and roles

Supabase Auth owns identity. The application keeps its own `User` table and
joins the two on `supabaseUserId`, which holds `auth.users.id` — the same
arrangement a Clerk-backed app uses with a `clerkId` column.

The row is created lazily on the first authenticated request, so an account
made in the Supabase dashboard is picked up without any extra step. If a `User`
row already exists with that email — a seeded post author, say — it is adopted
rather than duplicated, so their posts stay attached.

**Roles live in this table, not in Supabase.** `role` is `USER`, `EDITOR` or
`ADMIN`, and it is the only thing consulted for authorisation:

| Guard | Allows | Used by |
| --- | --- | --- |
| `requireAuth()` | any signed-in user | — |
| `requireEditor()` | `EDITOR`, `ADMIN` | content routes (projects, posts, …) |
| `requireAdmin()` | `ADMIN` | `/api/uploads` |

`ADMIN_EMAILS` is a bootstrap, not the source of truth: a listed email is
granted `ADMIN` the first time it signs in, so the first account — or a
locked-out operator — can get in. Nobody is ever demoted by signing in.

The seed reads the same variable, so the admin address is never written into
the repository — set it in `.env`, which is gitignored:

```bash
ADMIN_EMAILS="you@example.com"
```

With it unset the seed creates **no** admin at all and says so. That is
deliberate: a committed `charlie@example.com` with role `ADMIN` would be a
real admin row, and seeding production with it would hand the panel to
whoever controls that mailbox.

To change a role afterwards:

```sql
update "User" set role = 'ADMIN' where email = 'you@example.com';
```

## 4. Storage bucket

Create the bucket and its policies in the SQL editor. The bucket is **public to
read** — the images are on a public portfolio — and **closed to write**: uploads
go through `/api/uploads`, which checks for an admin before it ever constructs
the service-role client.

```sql
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

-- Anyone may read.
create policy "Public read for project images"
on storage.objects for select
using (bucket_id = 'project-images');

-- Nobody may write with the anon or authenticated key. Writes arrive through
-- the server route using the service-role key, which is not subject to these
-- policies. Without this, any signed-in user could upload directly.
create policy "No client writes to project images"
on storage.objects for insert
with check (false);
```

Uploads are limited to JPEG, PNG, WebP, AVIF and GIF, at up to 5MB. The stored
filename is always derived from the upload, never taken from it, so a crafted
filename cannot become a storage path.

## 5. What changed from Clerk

| Before | Now |
| --- | --- |
| `ClerkProvider` in `app/layout.tsx` | Removed; no provider needed |
| `clerkMiddleware` in `proxy.ts` | Supabase session refresh + `/admin` guard, in `middleware.ts` |
| `auth()` from `@clerk/nextjs/server` | `requireAuth()` / `requireAdmin()` in `lib/auth.ts` |
| `<SignIn />` / `<SignUp />` | `/sign-in`, a passwordless OTP form |
| `<UserButton />`, `<SignOutButton />` | `useUser()` hook, `POST /auth/sign-out` |

> **Note on the middleware filename.** The guard lives in `middleware.ts`.
> It used to be `proxy.ts` — the name Next 16 uses — which Next 15 silently
> ignores, so the middleware was never actually running and `/admin` was not
> guarded. The API routes were still protected by `requireAdmin()`, but the
> pages themselves were reachable.
