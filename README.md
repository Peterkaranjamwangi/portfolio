# Portfolio

Peter Mwangi's portfolio and its admin panel — a Next.js app with a Postgres
database, a passwordless admin area, and a project-estimate generator.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js (App Router) + React |
| Styling | Tailwind CSS |
| Database | Postgres via Prisma |
| Auth | Supabase Auth — passwordless email OTP |
| File storage | Supabase Storage (`project-images` bucket) |

Prisma owns the schema, the migrations and every query. Supabase supplies auth
and file storage on top of the same Postgres database.

## Getting started

```bash
npm install
cp .env.example .env        # then fill in the values
npx prisma migrate deploy   # create the schema
npx prisma db seed          # optional sample content — safe to re-run
npm run dev
```

Tests are `npm test` (vitest). They cover the logic that decides who is an
admin, what may enter the storage bucket, and what the API accepts.

The app runs at http://localhost:3000. The admin panel is at `/admin/dashboard`
and requires a signed-in admin — see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
for keys, bucket policies and how to grant admin rights.

## Layout

```
app/               routes — public pages, /admin/dashboard, /api
components/        UI, admin, estimator and auth components
lib/               api client, auth helpers, Supabase clients, validation
services/          typed wrappers over the JSON API
hooks/             data fetching built on the services layer
prisma/            schema and seed
```

## Documentation

- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) — auth, storage bucket, admin rights
- [DATABASE_SETUP.md](./DATABASE_SETUP.md) — database and Prisma
- [ADMIN_PANEL.md](./ADMIN_PANEL.md) — what the admin panel does
- [VALIDATION_GUIDE.md](./VALIDATION_GUIDE.md) — validation conventions
- [DOCKER_GUIDE.md](./DOCKER_GUIDE.md) — containerised development and deploys
- [SECURITY_STATUS.md](./SECURITY_STATUS.md) — security posture and checklist
