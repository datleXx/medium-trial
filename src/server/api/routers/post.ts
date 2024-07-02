import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  deletePost: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.article.delete({
          where: { id: input.id },
        });

        revalidatePath("/homepage");
        revalidatePath(`/posts/${input.id}`);
        revalidatePath(`/profile/${ctx.session.user.id}`);
      } catch (e) {
        console.log(e);
      }
    }),
  fetchOnePost: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const fetchedPost = await ctx.db.article.findFirst({
          where: { id: input.id },
        });

        revalidatePath("/homepage");

        return fetchedPost;
      } catch (e) {
        console.log(e);
      }
    }),
  updatePost: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.article.update({
          where: { id: input.id },
          data: {
            title: input.title,
            body: input.content,
          },
        });
        revalidatePath(`/posts/${input.id}`);
        revalidatePath(`/homepage`);
        revalidatePath(`/profile/${ctx.session.user.id}`);
      } catch {}
    }),
});
