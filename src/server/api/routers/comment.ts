import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const commentRouter = createTRPCRouter({
  createComment: protectedProcedure
    .input(
      z.object({
        text: z.string(),
        userId: z.string(),
        postId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.comment.create({
            data: {
                text: input.text, 
                user: {
                    connect: {
                        id: input.userId
                    }
                },
                post: {
                    connect: {
                        id: input.postId
                    }
                }
            }
        })
        revalidatePath(`/posts/${input.postId}`);
      } catch (e) {
        console.log(e);
      }
    }),
})