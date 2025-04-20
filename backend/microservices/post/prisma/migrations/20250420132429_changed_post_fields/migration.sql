/*
  Warnings:

  - The `likes_count` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "description" DROP NOT NULL,
DROP COLUMN "likes_count",
ADD COLUMN     "likes_count" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "active_count" SET DEFAULT 0,
ALTER COLUMN "reviewed" SET DEFAULT 0;
