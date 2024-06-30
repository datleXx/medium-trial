"use client";

import Link from "next/link";
import PostCard from "../PostCard";
import { db } from "~/db";
import Image from "next/image";
import Logo from "public/static/logo.png";
import { api } from "~/trpc/react";
import PostSkeleton from "./post-skeleton";

export function Posts() {
  const { data: allPosts, isLoading } = api.dashboard.fetchAllPosts.useQuery();
  const staffPickedPosts = allPosts?.slice(0, 3);
  const renderedPosts = allPosts?.map((article) => {
    return (
      <Link key={article.id} href={"/posts/" + article.id}>
        <PostCard
          key={article.id}
          authorName={article.name}
          previewTitle={article.previewTitle}
          previewSubtitle={article.previewSubtitle}
          tags={article.topics.map((topic) => topic.topic.name)}
        />
      </Link>
    );
  });

  const { data: recommendedTopic } = api.dashboard.fetchAllTopics.useQuery();
  const renderedRecommendedTopics = recommendedTopic?.map((topic) => {
    return (
      <div key={topic.id} className="cursor-pointer rounded-full border bg-gray-100 p-2 text-center">
        {topic.name}
      </div>
    );
  });

  const renderedStaffPickedPosts = staffPickedPosts?.map((post) => {
    return (
      <Link href={"/posts/" + post.id} key={post.id}>
        <div className="flex flex-col">
          <div className="flex gap-5">
            <div className="grid h-[1.4rem] w-[1.4rem] place-items-center overflow-hidden rounded-full">
              <Image
                alt="postcard"
                src={Logo}
                className="object-cover"
                width={80}
                height={80}
              />
            </div>
            <div className="text-sm">{post.name}</div>
          </div>
          <div className="text-lg font-bold">{post.previewTitle}</div>
        </div>
      </Link>
    );
  });
  if (isLoading) {
    return (
      <div className="mx-6 my-5 p-4">
        <div className="flex flex-1">
          <div className="flex w-[70%] flex-col gap-4 border-r-small">
            <div className="mx-5">
              {[...Array<number>(5)].map((_, index) => (
                <PostSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-6 my-5 p-4">
      <div className="flex flex-1">
        <div className="flex w-[70%] flex-col gap-4 border-r-small">
          {renderedPosts}
        </div>
        <div className="m-5">
          <div className="">
            <h1 className="font-sans text-2xl font-bold">Staff Pick</h1>
            <div className="my-5 flex flex-col gap-5 px-4">
              {renderedStaffPickedPosts}
            </div>
          </div>
          <div className="my-5 p-3">
            <h1 className="font-sans text-lg font-bold">Recommended Topics</h1>
            <div className="my-3 grid grid-cols-2 flex-wrap gap-2">
              {renderedRecommendedTopics}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
