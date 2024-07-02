import Image from "next/image";
import Logo from "../../../../public/static/logo.png";
import { FiBookmark } from "react-icons/fi";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { HiDotsHorizontal } from "react-icons/hi";
import ProfilePostCardOptions from "./profile-post-option";
import { api } from "~/trpc/react";

interface PostCardProps {
  id: number;
  authorName: string;
  previewTitle: string;
  previewSubtitle: string;
  tags: string[];
}

const ProfilePostCard = ({
  id,
  authorName,
  previewTitle,
  previewSubtitle,
  tags,
}: PostCardProps) => {
  const renderedTags = tags.map((tag) => {
    return (
      <span key={tag} className="rounded-full bg-[#F2F3F2] p-1">
        {tag}
      </span>
    );
  });
  return (
    <div className="my-5 flex h-[10rem] max-w-[46rem] cursor-pointer items-center gap-[1rem] border-b !pr-11">
      <div className="flex flex-col">
        <div className="flex gap-[.4rem]">
          <div className="grid h-[1.4rem] w-[1.4rem] place-items-center overflow-hidden rounded-full">
            <Image
              alt="postcard"
              src={Logo}
              className="object-cover"
              width={40}
              height={40}
            />
          </div>
          <div className="font-semibold">{authorName}</div>
        </div>
        <h1 className="text-2xl font-bold">{previewTitle} </h1>
        <div className="text-[#787878]">{previewSubtitle}</div>

        <div className="flex items-center justify-between text-[#787878]">
          <div className="my-2 text-[.8rem]">
            Jun 15 • 5 min read •
            <div className="flex gap-3">{renderedTags}</div>
          </div>
          <span className="cursor-pointer">
            <FiBookmark className="h-5 w-5" />
          </span>
        </div>
      </div>
      <div>
        <Image alt="good image" src={Logo} height={100} width={100} />
      </div>
      <Popover placement="right">
        <PopoverTrigger>
          <div>
            <HiDotsHorizontal />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div>
            <ProfilePostCardOptions id={id}/>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ProfilePostCard;

// TODO: put className using inline styling, "const styles" might seem tidy but bad practice
