import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const searchRouter = createTRPCRouter({
  searchAllPosts: protectedProcedure
    .input(
      z.object({
        query: z.string().min(1, "Search query must be at least 1 character"),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const searchedPosts = await ctx.db.article.findMany({
          where: {
            OR: [
              { previewTitle: { contains: input.query, mode: "insensitive" } },
              {
                previewSubtitle: { contains: input.query, mode: "insensitive" },
              },
              { body: { contains: input.query, mode: "insensitive" } },
            ],
          },
          include: {
            topics: {
              include: {
                topic: true,
              },
            },
            createdBy: true,
            comments: true
          },
        });
        return searchedPosts
      } catch (e) {
        console.log(e);
      }
    }),
});
