import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import HomePage from "../../components/home/homepage";

export default async function homePage() {
  // const session = await getServerAuthSession();


  return (
    <div>
      <HomePage/>
      
    </div>
  );
}


//  TODO: read next js file structure, routing file structure, recommended: https://www.youtube.com/watch?v=Vm7qM1wmXwE
