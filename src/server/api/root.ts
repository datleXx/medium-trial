import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { dashboardRouter } from "./routers/dashboard";
import { writeRouter } from "./routers/write";
import { profileRouter } from "./routers/profile";
import { postRouter } from "./routers/post";
import { topicRouter } from "./routers/topic";
import { searchRouter } from "./routers/search";
import { userRouter } from "./routers/author";
import { commentRouter } from "./routers/comment";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  dashboard: dashboardRouter, 
  write: writeRouter, 
  profile: profileRouter, 
  post: postRouter, 
  topic: topicRouter,
  search: searchRouter, 
  user: userRouter, 
  comment: commentRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
