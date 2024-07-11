"use client";

import Link from "next/link";
import PostCard from "../PostCard";
import { db } from "~/db";
import Image from "next/image";
import { api } from "~/trpc/react";
import PostSkeleton from "./post-skeleton";
import TopicBar from "./topic_scroll";
import { useState } from "react";

export function Posts() {
  const { data: allPosts, isLoading } = api.dashboard.fetchAllPosts.useQuery();
  const [tag, setTag] = useState("");
  const staffPickedPosts = allPosts?.slice(0, 3);
  const renderedPosts = allPosts?.map((article) => {
    console.log(new Date(article.createdAt).toLocaleString())
    return (
      <Link key={article.id} href={"/posts/" + article.id}>
        <PostCard
          key={article.id}
          authorName={article.name}
          previewTitle={article.previewTitle}
          previewSubtitle={article.previewSubtitle}
          tags={article.topics.map((topic) => topic.topic.name)}
          userImage={
            article.createdBy.image ??
            "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
          }
          image_link={article.key ?? ""}
          createdAt={article.createdAt}
        />
      </Link>
    );
  });


  const { data: recommendedTopic } = api.dashboard.fetchAllTopics.useQuery();
  const renderedRecommendedTopics = recommendedTopic?.map((topic) => {
    return (
      <div
        key={topic.id}
        className="m-1 inline-block cursor-pointer rounded-full border bg-gray-100 px-3 py-2 text-center text-sm"
      >
        {topic.name}
      </div>
    );
  });

  const renderedStaffPickedPosts = staffPickedPosts?.map((post) => {
    return (
      <Link href={"/posts/" + post.id} key={post.id}>
        <div className="flex flex-col gap-2">
          <div className="flex gap-5">
            <div className="grid h-[1.4rem] w-[1.4rem] place-items-center overflow-hidden rounded-full">
              <Image
                alt="postcard"
                src={
                  post.createdBy.image ??
                  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                className="object-cover"
                width={80}
                height={80}
              />
            </div>
            <div className="font-sans text-xs font-semibold">{post.name}</div>
          </div>
          <div className="text-md font-sans font-bold">{post.previewTitle}</div>
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
    <div className="relative top-[3.3rem]">
      {/* Gradient membership advertising bar */}
      <div className="flex h-[4rem] items-center bg-gradient-to-r from-yellow-100 to-yellow-300 py-2 text-black">
        <div className="container mx-auto text-center">
          <span>Be part of a better internet. </span>
          <a href="#" className="font-semibold underline">
            Get 20% off membership for a limited time
          </a>
        </div>
      </div>

      {/* Posts list / Staff pick / Recommendations */}
      <div className="container mx-auto">
        <div className="mx-3 my-5 max-w-screen-xl xl:mx-auto">
          <div className="flex w-full justify-between">
            {/* Left div */}
            <div className="mx-auto my-5 flex w-full flex-col gap-7 p-3 md:w-[58%]">
              <TopicBar hover="For you"/>
              <div className="flex flex-col gap-3">{renderedPosts}</div>
            </div>
            {/* Right div */}
            <div className="sticky top-4 mx-auto hidden h-[calc(100vh-4rem)] w-[30%] overflow-y-auto border-l-small md:block">
              <div className="mx-7 max-w-md">
                <div className="py-2">
                  <h1 className="text-md mb-3 font-sans font-medium">
                    Staff Pick
                  </h1>
                  <div className="my-6 flex flex-col gap-7 px-4">
                    {renderedStaffPickedPosts}
                  </div>
                  <button className="px-4 text-sm text-green-600 hover:text-green-700">
                    See the full list
                  </button>
                </div>
                <div className="my-5 py-2">
                  <h1 className="text-md font-sans font-medium">
                    Recommended Topics
                  </h1>
                  <div className="my-3 w-[80%] px-6">
                    {renderedRecommendedTopics}
                  </div>
                  <button className="px-4 text-sm text-green-600 hover:text-green-700">
                    See more topics
                  </button>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
