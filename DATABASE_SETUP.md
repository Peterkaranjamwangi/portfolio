# Database Setup Guide

This guide will help you set up the PostgreSQL database for the portfolio dashboard.

## Prerequisites

- PostgreSQL installed locally or access to a PostgreSQL database (e.g., Supabase, Railway, Neon)
- Node.js and npm installed

## Setup Steps

### 1. Create Environment File

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

### 2. Configure Database URL

Edit `.env` and update the `DATABASE_URL` with your PostgreSQL connection string:

```env
# Local PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_db"

# Or use a cloud provider like Supabase
DATABASE_URL="postgresql://user:password@db.xxx.supabase.co:5432/postgres"
```

### 3. Install Dependencies

Make sure all dependencies are installed:

```bash
npm install
```

### 4. Generate Prisma Client

Generate the Prisma Client based on your schema:

```bash
npx prisma generate
```

### 5. Create Database Tables

Run the Prisma migration to create all tables:

```bash
npx prisma db push
```

Or create a new migration:

```bash
npx prisma migrate dev --name init
```

### 6. Seed the Database (Optional)

Populate the database with sample blog posts:

```bash
npm run seed
```

This will create:
- 3 users (Alice, Bob, Charlie)
- 6 categories (Next.js, React, JavaScript, etc.)
- 5 tags (Web Development, Backend, Frontend, etc.)
- 10 blog posts

### 7. Verify Setup

Open Prisma Studio to view your data:

```bash
npx prisma studio
```

This will open a browser window at `http://localhost:5555` where you can view and edit your database.

## Database Schema

### Models

1. **User**
   - id, name, email, password, role
   - Relations: posts

2. **Post**
   - id, title, subtitle, content, slug, image, status, publishedAt
   - Relations: author, categories, tags

3. **Category**
   - id, name
   - Relations: posts

4. **Tag**
   - id, name
   - Relations: posts

### Enums

- **UserRole**: USER, ADMIN, EDITOR
- **PostStatus**: DRAFT, PUBLISHED, ARCHIVED

## API Endpoints

### Posts

- `GET /api/posts` - Get all posts (with optional filters)
  - Query params: `status`, `category`, `tag`, `limit`
- `POST /api/posts` - Create a new post
- `GET /api/posts/[id]` - Get a single post
- `PATCH /api/posts/[id]` - Update a post
- `DELETE /api/posts/[id]` - Delete a post

### Contact

- `POST /api/contact` - Submit contact form

## Troubleshooting

### Connection Issues

If you can't connect to the database:

1. Check your `DATABASE_URL` is correct
2. Ensure PostgreSQL is running
3. Verify firewall settings (for cloud databases)

### Migration Issues

If migrations fail:

```bash
# Reset the database (WARNING: deletes all data)
npx prisma migrate reset

# Or force push the schema
npx prisma db push --force-reset
```

### Prisma Client Issues

If Prisma Client is not working:

```bash
# Regenerate the client
npx prisma generate

# Clear the cache
rm -rf node_modules/.prisma
npm install
```

## Production Deployment

### Vercel

1. Add `DATABASE_URL` to environment variables in Vercel dashboard
2. Add build command: `npx prisma generate && npm run build`
3. Deploy

### Other Platforms

Ensure you run `prisma generate` before building:

```json
{
  "scripts": {
    "build": "prisma generate && next build"
  }
}
```

## Useful Commands

```bash
# View database schema
npx prisma db pull

# Format schema file
npx prisma format

# Validate schema
npx prisma validate

# View migrations status
npx prisma migrate status

# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations in production
npx prisma migrate deploy
```

## Need Help?

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
