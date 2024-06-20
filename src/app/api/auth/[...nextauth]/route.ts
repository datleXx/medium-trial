import { Prisma } from "@prisma/client";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

import { authOptions } from "~/server/auth";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ]
})


export { handler as GET, handler as POST };
