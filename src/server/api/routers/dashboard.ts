import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const dashboardRouter = createTRPCRouter({
    fetchAllPosts: protectedProcedure.query(
        async ({ ctx }) => {
            try {
                const allPosts = await ctx.db.article.findMany({
                    include: {
                        topics: {
                            include: {
                                topic: true
                            }
                        }
                    }
                });
                return allPosts;  
            } catch (e) {
                console.log(e); 
            }
        }
    ), 
    fetchAllTopics: protectedProcedure.query(
        async ({ ctx }) => {
            try {
                const allTopics = await ctx.db.topic.findMany();
                return allTopics;  
            } catch (e) {
                console.log(e); 
            }
        }
    ), 

    
})