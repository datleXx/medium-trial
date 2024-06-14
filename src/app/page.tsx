import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import Header from "~/app/components/header";
import Banner from "~/app/components/banner";
import PostCard from "~/app/components/PostCard";

const styles = {
  postsList: `flex flex-col gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3`,
}

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();
  const styles = {
    postsList: `flex flex-col gap-3 p-2 sm:grid-cols-2 md:gap-6 md: p-6 lg:grid-cols-3`,
    container: `max-w-7xl flex-1`,
    main:`flex justify-center`,
    wrapper:`mx-auto`
  }

  return (
    <div className={styles.wrapper}>
      <Header/>
      <Banner/>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.postsList}>
            <PostCard/>
            <PostCard/>
            <PostCard/>
          </div>
        </div>
      </div>
    </div>
  );
}

