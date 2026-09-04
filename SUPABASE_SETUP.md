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

In **Authentication → Providers → Email**, make sure *Email OTP* is enabled.
If the email template still sends a magic link, edit it to include `{{ .Token }}`
so the code itself is delivered.

Being signed in grants nothing on its own. `/admin` additionally requires
admin rights, which come from either:

- `app_metadata.role = "admin"` on the user (preferred — only the service-role
  key can write `app_metadata`, so a user cannot promote themselves), or
- their email appearing in `ADMIN_EMAILS` (the bootstrap path for the first
  account).

To promote an account once it exists:

```sql
update auth.users
set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'::jsonb
where email = 'you@example.com';
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
| `clerkMiddleware` in `proxy.ts` | Supabase session refresh + `/admin` guard |
| `auth()` from `@clerk/nextjs/server` | `requireAuth()` / `requireAdmin()` in `lib/auth.ts` |
| `<SignIn />` / `<SignUp />` | `/sign-in`, a passwordless OTP form |
| `<UserButton />`, `<SignOutButton />` | `useUser()` hook, `POST /auth/sign-out` |
