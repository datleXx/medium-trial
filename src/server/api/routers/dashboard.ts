import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
// sadadawdawdadadwad

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
                        }, 
                        createdBy: true
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

    fetchTopicPosts: protectedProcedure
    .input(
        z.object({
            name: z.string()
        })
    )
    .query(async ({ctx, input}) => {
        try {
            const topicPosts = await ctx.db.article.findMany({
                where: {
                    topics: {
                        some: {
                            topic: {
                                name: input.name
                            }
                        }
                    }
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

            return topicPosts; 
        }
        catch (e) {
            console.log("Error loading topic posts:",e); 
        }
    })

    
})