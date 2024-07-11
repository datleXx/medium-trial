import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Logo from "public/static/logo.png";
import { FiBookmark } from "react-icons/fi";
import { Avatar, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { HiDotsHorizontal } from 'react-icons/hi';
import ProfilePostCardOptions from './profile-post-option';
import { api } from "~/trpc/react";


interface PostCardProps {
  id: number; 
  authorName: string;
  previewTitle: string;
  previewSubtitle: string;
  tags: string[];
  userImage: string;
  image_link: string;
}

const PostCard = ({
  id,
  authorName,
  previewTitle,
  previewSubtitle,
  tags,
  userImage,
  image_link
}: PostCardProps) => {
  const renderedTags = tags.map((tag) => {
    return (
      <span key={tag} className="rounded-full bg-[#F2F3F2] p-1">
        {tag}
      </span>
    );
  });

  // State to store the image URL
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Use the mutation hook
  const { mutateAsync } = api.post.downloadFile.useMutation();

  useEffect(() => {
    // Function to fetch the presigned URL
    const fetchImage = async () => {
      try {
        const response = await mutateAsync({ key: image_link });
        if (response) {
          setImageUrl(response.link)
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    void fetchImage();
  }, [image_link, mutateAsync]);

  return (
    <div className="flex cursor-pointer items-center justify-between gap-[1rem] border-b w-full">
      <div className="flex flex-col gap-3 mt-6 mb-6 max-w-xs w-full">
        <div className="flex gap-[1rem]">
          <div className="grid h-[1.4rem] w-[1.4rem] place-items-center overflow-hidden rounded-full">
            <Image
              alt="postcard"
              src={userImage}
              className="object-cover"
              width={40}
              height={40}
            />
          </div>
          <div className="font-sans text-xs">{authorName}</div>
        </div>
        <div className="w-[70%]">
          <h1 className="text-2xl font-bold">{previewTitle} </h1>
          <div className="text-[#787878]">{previewSubtitle}</div>
        </div>

        <div className="flex items-center justify-between text-[#787878] w-full ">
          <div className="my-2 text-[.8rem]">
            Jun 15 • 5 min read •
            <div className="flex gap-3">{renderedTags}</div>
          </div>
          <span className="cursor-pointer">
            <FiBookmark className="h-5 w-5" />
          </span>
        </div>
      </div>
      <div className="w-[30%]">
        {imageUrl ? (
          <Image alt="good image" src={imageUrl} width={300} height={300} />
        ) : (
          <Image alt="loading image" src={Logo} width={300} height={300} />
        )}
      </div>
      <Popover placement="right">
        <PopoverTrigger>
          <div>
            <HiDotsHorizontal />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div>
            <ProfilePostCardOptions id={id} key={image_link}/>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PostCard;
