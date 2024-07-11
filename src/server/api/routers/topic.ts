import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const topicRouter = createTRPCRouter({
  fetchAllTopic: protectedProcedure
    .query( async ({ctx, input}) => {
      try {
        const topics = await ctx.db.topic.findMany({
        })
        
        return topics
      }
      catch (e) {

      }
    })
});
