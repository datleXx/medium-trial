import { revalidatePath } from "next/cache";
import { z } from "zod";
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
// sadadawdawdadadwad

// set AWS credential blog bucket

const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
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

export const userRouter = createTRPCRouter({
  fetchUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const user = await ctx.db.user.findFirst({
          where: {
            id: input.id,
          },
        });

        return user;
      } catch (e) {
        console.log(e);
      }
    }),
  updateUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        username: z.string(),
        pronoun: z.string(),
        shortbio: z.string(),
        image_key: z.string(),
        image_metadata: z.object({
          name: z.string(),
          type: z.string(),
          size: z.number(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const data = Buffer.from(input.image_key, "base64");
        const key =
          `pfimg_${input.id}/` + input.image_metadata.name;
        await uploadObject(bucketName!, key, data, input.image_metadata.type);
        await ctx.db.user.update({
          where: {
            id: input.id,
          },
          data: {
            username: input.username,
            pronoun: input.pronoun,
            shortbio: input.shortbio,
            image_key: key,
          },
        });
        revalidatePath(`/profile/${input.id}`);
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
});
