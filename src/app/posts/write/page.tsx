import HomeHeader from "~/components/home/header_home";
import Write from "~/components/write/write";
import HomeLayout from "~/layout/homelayout";
import { api } from "~/trpc/server";

export default async function Home() {
  
  return (
    <div>
      <HomeHeader /> 
      <Write /> 
    </div>
  );
}
