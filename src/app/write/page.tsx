import HomeHeader from "~/components/home/header_home";
import Write from "~/components/write/write";
import HomeLayout from "~/layout/homelayout";
import { api } from "~/trpc/server";

export default async function homePage() {
  const hello = await api.post.hello({ text: "from tRPC" });
  // const session = await getServerAuthSession();

  return (
    <div>
      <HomeHeader /> 
      <Write /> 
    </div>
  );
}
