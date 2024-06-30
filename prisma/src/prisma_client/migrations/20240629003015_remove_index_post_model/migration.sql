/*
  Warnings:

  - You are about to drop the column `createdBy` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `topic` on the `Article` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "createdBy",
DROP COLUMN "topic",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostsOnTopics" (
    "postId" INTEGER NOT NULL,
    "topicId" INTEGER NOT NULL,

    CONSTRAINT "PostsOnTopics_pkey" PRIMARY KEY ("postId","topicId")
);

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostsOnTopics" ADD CONSTRAINT "PostsOnTopics_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostsOnTopics" ADD CONSTRAINT "PostsOnTopics_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
