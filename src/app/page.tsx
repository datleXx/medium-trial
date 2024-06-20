import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import Landing from "../components/landing/landing";
import HomeHeader from "../components/home/header_home";
import HomePage from "../components/home/homepage";
import EmailLogin from "~/components/auth/emailLogin";

export default async function LandingPage() {
  const hello = await api.post.hello({ text: "from tRPC" });
  // const session = await getServerAuthSession();


  return (
    <div>
      <Landing />
    </div>
  );
}


//  TODO: read next js file structure, routing file structure, recommended: https://www.youtube.com/watch?v=Vm7qM1wmXwE
