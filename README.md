# Portfolio

A modern portfolio website built with Next.js 15, featuring a secure admin panel for content management.

## Features

- **Portfolio Display** - Showcase projects, skills, services, and blog posts
- **Admin Panel** - Full CRUD management for all content
- **Authentication** - Clerk-powered secure admin access
- **Dark Mode** - Built-in theme support
- **Responsive** - Mobile-friendly design
- **Docker Ready** - Production deployment with Docker

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** Clerk
- **Styling:** Tailwind CSS
- **Validation:** Zod
- **Animations:** Framer Motion

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Clerk account ([clerk.com](https://clerk.com))

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Environment Variables

Edit `.env` with your credentials:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_db"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/admin/dashboard
```

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed sample data
npm run seed
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

Access admin panel at [http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard).

## Project Structure

```
portfolio/
├── app/
│   ├── (dashboard)/      # Public portfolio pages
│   ├── admin/dashboard/  # Admin panel pages
│   ├── api/              # API routes
│   ├── sign-in/          # Authentication pages
│   └── sign-up/
├── components/           # Reusable components
├── hooks/                # Custom React hooks
├── lib/
│   ├── auth.ts           # Authentication helpers
│   ├── prisma.ts         # Database client
│   ├── sanitize.ts       # XSS protection
│   └── validations/      # Zod schemas
└── prisma/               # Database schema
```

## Admin Panel

Manage all content at `/admin/dashboard`:

- **Projects** - Portfolio projects with technologies
- **Skills** - Technical and soft skills
- **Services** - Services offered
- **Technologies** - Tech stack with proficiency
- **Blog** - Blog posts with categories

## Security

- **Authentication** - All admin routes protected via Clerk middleware
- **API Protection** - Mutations require authentication
- **Input Validation** - Zod schemas validate all inputs
- **XSS Protection** - DOMPurify sanitizes user content
- **SQL Injection** - Prisma ORM uses parameterized queries

## Deployment

### Docker (Recommended)

```bash
# Production
docker-compose up --build -d

# Run migrations
docker-compose exec app npx prisma migrate deploy
```

See [DOCKER_GUIDE.md](./DOCKER_GUIDE.md) for detailed Docker deployment instructions.

### Vercel

```bash
npm run build
vercel deploy
```

Set environment variables in Vercel dashboard.

## Documentation

| Document | Description |
|----------|-------------|
| [AUTHENTICATION.md](./AUTHENTICATION.md) | Clerk setup guide |
| [ADMIN_PANEL.md](./ADMIN_PANEL.md) | Admin panel documentation |
| [DATABASE_SETUP.md](./DATABASE_SETUP.md) | Database configuration |
| [DOCKER_GUIDE.md](./DOCKER_GUIDE.md) | Docker deployment |
| [VALIDATION_GUIDE.md](./VALIDATION_GUIDE.md) | Zod validation patterns |

## Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run seed       # Seed database
npm run lint       # Run ESLint
```

## License

MIT
