import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import Header from "components/header";
import Banner from "components/banner";
import PostCard from "components/PostCard";

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

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
