-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_createdById_fkey";

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
