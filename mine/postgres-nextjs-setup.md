# Complete Guide: PostgreSQL, Next.js, and Prisma Setup on Ubuntu 24.04

## Table of Contents
1. [Uninstalling Existing PostgreSQL](#uninstalling-existing-postgresql)
2. [Installing PostgreSQL](#installing-postgresql)
3. [Configuring PostgreSQL](#configuring-postgresql)
4. [Setting Up Next.js Project](#setting-up-nextjs-project)
5. [Installing and Configuring Prisma](#installing-and-configuring-prisma)
6. [Database Operations with Prisma](#database-operations-with-prisma)

## Uninstalling Existing PostgreSQL

If you have a previous PostgreSQL installation, remove it completely:

```bash
# Stop PostgreSQL service
sudo systemctl stop postgresql

# Remove PostgreSQL packages
sudo apt-get remove --purge postgresql postgresql-*
sudo apt-get autoremove --purge

# Remove configuration and data directories
sudo rm -rf /var/lib/postgresql/
sudo rm -rf /var/log/postgresql/
sudo rm -rf /etc/postgresql/
```

## Installing PostgreSQL

Install the latest PostgreSQL version:

```bash
# Update package list
sudo apt update

# Install PostgreSQL and required packages
sudo apt install postgresql postgresql-contrib

# Verify installation
psql --version

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## Configuring PostgreSQL

Set up the database and user:

```bash
# Access PostgreSQL prompt as postgres user
sudo -u postgres psql

# Create a new database
CREATE DATABASE your_database_name;

# Create a new user
CREATE USER your_username WITH PASSWORD 'your_password';

# Grant privileges to the user
GRANT ALL PRIVILEGES ON DATABASE your_database_name TO your_username;

# Make the user owner of the database
\c your_database_name
ALTER DATABASE your_database_name OWNER TO your_username;

# Exit PostgreSQL prompt
\q
```

Configure PostgreSQL to allow password authentication:

```bash
# Edit PostgreSQL configuration
sudo nano /etc/postgresql/[version]/main/pg_hba.conf

# Change the following line:
# local   all             all                                     peer
# to:
# local   all             all                                     md5

# Restart PostgreSQL
sudo systemctl restart postgresql
```

## Setting Up Next.js Project

Create and configure your Next.js project:

```bash
# Create new Next.js project
npx create-next-app@latest your-project-name
cd your-project-name

# Install required dependencies
npm install @prisma/client
```

## Installing and Configuring Prisma

Set up Prisma in your project:

```bash
# Install Prisma CLI as dev dependency
npm install prisma --save-dev

# Initialize Prisma in your project
npx prisma init
```

Configure your database connection. Edit the `.env` file:

```plaintext
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/your_database_name?schema=public"
```

Create a basic schema in `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Example model
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Database Operations with Prisma

Initialize and manage your database:

```bash
# Generate Prisma Client
npx prisma generate

# Create and apply migrations
npx prisma migrate dev --name init

# View your database in Prisma Studio
npx prisma studio
```

Create a database client utility (`lib/prisma.ts`):

```typescript
import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma
```

Example usage in an API route (`pages/api/users.ts`):

```typescript
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const user = await prisma.user.create({
        data: {
          email: req.body.email,
          name: req.body.name,
        },
      })
      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' })
    }
  } else if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users' })
    }
  }
}
```

## Important Notes

1. Always keep your database credentials secure and never commit the `.env` file to version control
2. For production deployments:
   - Use strong passwords
   - Configure proper firewall rules
   - Enable SSL for database connections
   - Set up database backups
3. Remember to handle database connection pooling for production environments

## Troubleshooting

Common issues and solutions:

1. If PostgreSQL fails to start:
```bash
sudo systemctl status postgresql
sudo journalctl -xeu postgresql
```

2. If you can't connect to the database:
```bash
# Check if PostgreSQL is listening
sudo netstat -plunt | grep postgres

# Verify PostgreSQL is running
ps aux | grep postgres
```

3. If Prisma migrations fail:
```bash
# Reset the database (WARNING: This deletes all data)
npx prisma migrate reset

# Check migration status
npx prisma migrate status
```
