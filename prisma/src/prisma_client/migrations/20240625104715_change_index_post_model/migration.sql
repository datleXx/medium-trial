-- DropIndex
DROP INDEX "Post_authorName_idx";

-- CreateIndex
CREATE INDEX "Post_id_idx" ON "Post"("id");
