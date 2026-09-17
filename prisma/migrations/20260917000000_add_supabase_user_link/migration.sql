-- Link the application's User rows to Supabase Auth identities.
--
-- `supabaseUserId` holds auth.users.id. It is nullable because a User row may
-- exist purely as a content author who has never signed in; it is unique so a
-- single Supabase account can never map to two application users.
--
-- DESTRUCTIVE: this drops `password`. Supabase Auth owns credentials now — the
-- application never read this column — but the data cannot be recovered after
-- the migration runs. Take a backup first if the column holds anything real.

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "lastSignInAt" TIMESTAMP(3),
ADD COLUMN     "supabaseUserId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "User_supabaseUserId_key" ON "User"("supabaseUserId");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

