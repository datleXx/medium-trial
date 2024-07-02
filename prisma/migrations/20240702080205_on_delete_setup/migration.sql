-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_createdById_fkey";

-- DropForeignKey
ALTER TABLE "PostsOnTopics" DROP CONSTRAINT "PostsOnTopics_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostsOnTopics" DROP CONSTRAINT "PostsOnTopics_topicId_fkey";

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostsOnTopics" ADD CONSTRAINT "PostsOnTopics_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostsOnTopics" ADD CONSTRAINT "PostsOnTopics_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
