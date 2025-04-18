-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "background_url" TEXT,
ADD COLUMN     "online_status" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "user_status" TEXT;
