"use client";

import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import Context from "~/Context/context";
import { SessionProvider } from "next-auth/react";
import Providers from "./providers";
import { NextUIProvider } from "@nextui-org/react";
import { Metadata } from "~/components/meta-data";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <Metadata title="Medium-clone" description="Trial Project" href="/favicon.ico" />
      <body>
        <TRPCReactProvider>
          <SessionProvider>
            <NextUIProvider>
              <Providers>
                <Context>{children}</Context>
              </Providers>
            </NextUIProvider>
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

// TODO: ensure that favicon is correct as the medium site, change the site metadata
