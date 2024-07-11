import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
// sadadawdawdadadwad

export const userRouter = createTRPCRouter({
    fetchUser: protectedProcedure
    .input(
        z.object({
            id: z.string()
        })
    )
    .query(async ({ctx, input}) => {
        try {
            const user = await ctx.db.user.findFirst({
                where: {
                    id: input.id
                }
            })

            return user; 
        }
        catch (e) {
            console.log(e); 
        }
    })
    
})