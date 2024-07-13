import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../public/static/logo.png";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { Avatar } from "@nextui-org/react";
import { FaHandsClapping } from "react-icons/fa6";
import { BiSolidMessageRounded } from "react-icons/bi";
import { api } from "~/trpc/react";
import { Tooltip } from "react-tooltip";
import { CiCircleMinus } from "react-icons/ci";

interface PostCardProps {
  authorName: string;
  previewTitle: string;
  previewSubtitle: string;
  tags: string[];
  userImage: string;
  image_link: string;
  createdAt: Date;
  like: number, 
  numComment: number
}

const PostCard = ({
  authorName,
  previewTitle,
  previewSubtitle,
  tags,
  userImage,
  image_link,
  createdAt,
  like, 
  numComment
}: PostCardProps) => {
  const dateString = String(createdAt);
  const dateParts = dateString.split(" ");
  const monthDay = `${dateParts[1]} ${dateParts[2]}`;

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
    const fetchImage = async () => {
      try {
        const response = await mutateAsync({ key: image_link });
        if (response) {
          setImageUrl(response.link);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
  
    void fetchImage();
  }, [image_link, mutateAsync]);

  return (
    <div className="flex w-full cursor-pointer items-center justify-between border-b">
      <div className="mb-6 mt-6 flex w-full max-w-md flex-col gap-3">
        <div className="flex gap-[1rem]">
          <div className="grid h-[1.1rem] w-[1.1rem] place-items-center overflow-hidden rounded-full">
            <Image
              alt="postcard"
              src={userImage}
              className="object-cover"
              width={30}
              height={30}
            />
          </div>
          <div className="font-sans text-xs">{authorName}</div>
        </div>
        <div className="w-full">
          <h1 className="text-2xl font-bold">{previewTitle} </h1>
          <div className="text-[#787878]">{previewSubtitle}</div>
        </div>

        <div className="flex w-full items-center justify-between text-[#787878] ">
          <div className="my-2 flex items-center gap-[1rem] text-[.8rem] ">
            <span>{monthDay}</span>
            <div
              className="flex items-center gap-1"
              data-tooltip-id="claps-tooltip"
              data-tooltip-content={`${like} claps`}
            >
              <FaHandsClapping size={20} />
              <div>{like}</div>
            </div>
            <div
              className="flex items-center gap-1"
              data-tooltip-id="comments-tooltip"
              data-tooltip-content={`${numComment} Comments` }
            >
              <BiSolidMessageRounded size={20} />
              <div>{numComment}</div>
            </div>
          </div>
          <div className="flex gap-3">
            <span
              className="cursor-pointer"
              data-tooltip-id="less-tooltip"
              data-tooltip-content="Show less like this"
            >
              <CiCircleMinus size={20} />
            </span>
            <span
              className="cursor-pointer"
              data-tooltip-id="save-tooltip"
              data-tooltip-content="Save"
            >
              <MdOutlineBookmarkAdd size={20} />
            </span>
          </div>
        </div>
      </div>
      <div className="w-[30%]">
        {imageUrl ? (
          <Image alt="good image" src={imageUrl} width={300} height={300} />
        ) : (
          <Image alt="loading image" src={Logo} width={300} height={300} />
        )}
      </div>
      <Tooltip id="claps-tooltip" />
      <Tooltip id="comments-tooltip" />
      <Tooltip id="save-tooltip" />
      <Tooltip id="less-tooltip" />
    </div>
  );
};

export default PostCard;
