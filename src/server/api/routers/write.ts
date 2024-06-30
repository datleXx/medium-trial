import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const writeRouter = createTRPCRouter({
//   createPost: protectedProcedure
//     .input(
//       z.object({
//         content: z.string(),
//         topics: z.array(z.string()),
//         previewImage: z.string(),
//         formData: z.any(),
//       }),
//     )
//     .mutation(async ({ ctx, input }) => {
//       const { content, topics, previewImage, formData } = input;

//       const title = formData.get("title") as string;
//       const previewTitle = formData.get("previewTitle") as string;
//       const previewSubtitle = formData.get("previewSubtitle") as string;

//       const session = ctx.session;
//       if (!session || !session.user) {
//         throw new Error("You haven't signed in yet.");
//       }

//       const topicConnections = await Promise.all(
//         topics.map(async (topic) => {
//           let findTopic = await ctx.db.topic.findFirst({
//             where: { name: topic },
//           });

//           if (!findTopic) {
//             findTopic = await ctx.db.topic.create({
//               data: { name: topic },
//             });
//           }

//           return {
//             topic: {
//               connect: { id: findTopic.id },
//             },
//           };
//         }),
//       );

//       try {
//         const post = await ctx.db.article.create({
//           data: {
//             name: session.user.name ?? "Anonymous",
//             title,
//             previewTitle,
//             previewSubtitle,
//             body: content,
//             previewImage,
//             topics: {
//               create: topicConnections,
//             },
//             createdBy: {
//               connect: { id: session.user.id },
//             },
//           },
//         });

//         return post;
//       } catch (e) {
//         console.error(e);
//         throw new Error("Failed to create post");
//       }
//     }),
});
