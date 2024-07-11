import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";
import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { api } from "~/trpc/react";
import { PrismaClient } from "@prisma/client";

// set AWS credential blog bucket

const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.AWS_BUCKET_NAME;

// create s3 client

const s3Client = new S3Client({
  region: region!,
  credentials: {
    accessKeyId: accessKeyId!,
    secretAccessKey: secretAccessKey!,
  },
});

// upload object function

async function uploadObject(
  bucketName: string,
  key: string,
  fileStream: Buffer,
  type: string,
) {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileStream,
    ContentType: type,
  };
  // upload to s3
  const uploadCommand = new PutObjectCommand(params);
  try {
    await s3Client.send(uploadCommand);
  } catch (e) {
    console.error(e);
  }
}

// Function to delete an object from S3
async function deleteObject(bucketName: string, key: string) {
  const params = {
    Bucket: bucketName,
    Key: key,
  };
  const deleteCommand = new DeleteObjectCommand(params);
  try {
    await s3Client.send(deleteCommand);
    return { success: true };
  } catch (e) {
    console.error(e);
    throw new Error("Failed to delete object from S3");
  }
}

//   download object
async function createPresignedUrl(bucketName: string, key: string) {
  const expiryMinutes = 15;
  const input = {
    Bucket: bucketName,
    Key: key,
  };
  const command = new GetObjectCommand(input);
  return await getSignedUrl(s3Client, command, {
    expiresIn: 60 * expiryMinutes,
  });
}

export const postRouter = createTRPCRouter({
  createPost: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        topics: z.array(z.string()),
        previewImage: z.string(),
        title: z.string(),
        previewTitle: z.string(),
        previewSubtitle: z.string(),
        file: z.string(),
        fileMetaData: z.object({
          name: z.string(),
          size: z.number(),
          type: z.string(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const data = Buffer.from(input.file, "base64");
        const key = ctx.session.user.id + "/" + input.fileMetaData.name;
        await uploadObject(bucketName!, key, data, input.fileMetaData.type);

        const topicConnections = await Promise.all(
          input.topics.map(async (topic) => {
            let findTopic = await ctx.db.topic.findFirst({
              where: {
                name: topic,
              },
            });

            if (findTopic) {
              return {
                topic: {
                  connect: { id: findTopic.id },
                },
              };
            } else {
              findTopic = await ctx.db.topic.create({
                data: {
                  name: topic,
                },
              });
              return {
                topic: {
                  connect: { id: findTopic.id },
                },
              };
            }
          }),
        );

        console.log(topicConnections);
        const userName = ctx.session.user.name;
        const userId = ctx.session.user.id;
        await ctx.db.article.create({
          data: {
            name: userName ?? "Anonymous",
            title: input.title,
            previewTitle: input.previewTitle,
            previewSubtitle: input.previewSubtitle,
            previewImage: input.previewImage,
            body: input.content,
            key: key,
            topics: {
              create: topicConnections,
            },
            createdBy: {
              connect: {
                id: userId,
              },
            },
          },
        });
      } catch (e) {
        console.log(e);
      }
    }),

  // get signed url
  downloadFile: protectedProcedure
    .input(
      z.object({
        key: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      if (input.key !== null) {
        const url = await createPresignedUrl(bucketName!, input.key);
        return {
          link: url,
        };
      }
    }),

  deletePost: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        key: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        console.log(input.key);
        await ctx.db.article.delete({
          where: { id: input.id },
        });
        //delete object from S3 bucket
        if (input.key) {
          await deleteObject(bucketName!, input.key);
        }

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
          include: {
            topics: {
              include: {
                topic: true,
              },
            },
            createdBy: true,
          },
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

  fetchPostbyUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const posts = await ctx.db.article.findMany({
          where: {
            createdById: input.id,
          },
          include: {
            topics: {
              include: {
                topic: true,
              },
            },
          },
        });

        return posts;
      } catch (e) {
        console.log(e);
      }
    }),

  fetchAllComments: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const comments = await ctx.db.comment.findMany({
          where: {
            postId: input.id,
          },
          include: {
            user: true,
            post: true,
          },
        });
        return comments;
      }
      catch (e) {
        console.log(e); 
      }
    }),
});
