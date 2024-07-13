import { Skeleton } from "@nextui-org/react";
import { FiBookmark } from "react-icons/fi";

const TopicSkeletion = () => {
  return (
    <div
      className="m-1 inline-block cursor-pointer rounded-full border bg-gray-100 px-3 py-2 text-center text-sm"
    >
        <Skeleton className="w-[30px] h-[30px]"/>
    </div>
  );
};

export default TopicSkeletion; 
