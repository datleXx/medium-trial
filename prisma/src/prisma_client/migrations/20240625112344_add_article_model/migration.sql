-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "createdAt" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "previewTitle" TEXT NOT NULL,
    "previewSubtitle" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "previewImage" TEXT NOT NULL,
    "topic" TEXT[],
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Article_id_idx" ON "Article"("id");
