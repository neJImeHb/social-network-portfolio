-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "likes_count" TEXT NOT NULL,
    "active_count" INTEGER NOT NULL,
    "reviewed" INTEGER NOT NULL,
    "only_friends_can_see" BOOLEAN NOT NULL,
    "filenames" TEXT[],
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Likes" (
    "id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Post_author_id_idx" ON "Post"("author_id");

-- CreateIndex
CREATE INDEX "Comments_author_id_post_id_idx" ON "Comments"("author_id", "post_id");

-- CreateIndex
CREATE INDEX "Likes_author_id_post_id_idx" ON "Likes"("author_id", "post_id");
