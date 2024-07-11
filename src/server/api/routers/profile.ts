import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
// sadadawdawdadadwad

export const profileRouter = createTRPCRouter({
    fetchAllAuthoredPosts: protectedProcedure.query(
        async ({ ctx }) => {
            try {
                const authoredPosts = await ctx.db.article.findMany({
                    where: {
                        createdById: ctx.session.user.id
                    },
                    include: {
                        topics: {
                            include: {
                                topic: true
                            }
                        }, 
                        createdBy: true
                    }
                })
                return authoredPosts
            } catch (e) {
                console.log(e); 
            }
        }
    ), 
})