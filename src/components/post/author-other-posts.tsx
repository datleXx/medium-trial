"use client";

import React from "react";
import { Avatar } from "@nextui-org/react";
import { AiOutlinePlus } from "react-icons/ai";
import { api } from "~/trpc/react";
import PostCard from "./author-post-card";
import Footer from "../landing/footer";

interface AuthorInfoProps {
  authorId: string;
}

const AuthorInfo = ({ authorId }: AuthorInfoProps) => {
  const { data: user } = api.user.fetchUser.useQuery({ id: authorId });
  const { data: posts } = api.post.fetchPostbyUser.useQuery({ id: authorId });

  const slicePosts = posts?.slice(0, 4);
  const renderedPosts = slicePosts?.map((post) => {
    return (
      <div key={post.id}>
        <PostCard
          authorName={user?.name ?? "Mewmew"}
          previewTitle={post.previewTitle}
          previewSubtitle={post.previewSubtitle}
          tags={post.topics.map((topic) => topic.topic.name)}
          userImage={user?.image ?? "https://example.com/author-image.jpg"}
          image_link={post.key}
          createdAt={post.createdAt}
        />
      </div>
    );
  });
  return (
    <div className="my-8 bg-gray-100 py-5">
      <div className="mx-auto my-2 w-[50%] lg:w-[45%] lg:my-6">
        <div className="flex flex-col gap-6">
          <Avatar
            src={user?.image ?? "https://example.com/author-image.jpg"} // Replace with actual author image URL
            alt="Author Image"
            size="lg"
          />
          <div className="flex justify-between">
            <div className="flex max-w-sm flex-col">
              <h3 className="text-xl font-bold">Written by {user?.name}</h3>
              <div className="text-gray-500">
                3.6K Followers · Writer for Mind Cafe
              </div>
              <p className="text-gray-600">
                writer. martial artist. thinker. for more:{" "}
                <a
                  href="https://modernwriting.substack.com/"
                  className="text-blue-600"
                >
                  https://modernwriting.substack.com/
                </a>
              </p>
            </div>
            <div className="h-[40%]">
              <span className="cursor-pointer flex items-center bg-gray-600 text-white text-center text-sm px-4 py-2 rounded-2xl">
                Follow
              </span>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h4 className="text-lg font-semibold">More from {user?.name}</h4>
          <div className="mt-4 grid grid-cols-1 gap-11 lg:grid-cols-2 ">
            {renderedPosts}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorInfo;
