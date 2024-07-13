import { Skeleton } from "@nextui-org/react";
import { FiBookmark } from "react-icons/fi";

export default function PostSkeleton() {
  return (
    <div className="flex w-full cursor-pointer items-center justify-between border-b">
      <div className="mb-6 mt-6 flex w-full max-w-md flex-col gap-3">
        <div className="flex gap-[1rem]">
          <div className="grid h-[1.1rem] w-[1.1rem] place-items-center overflow-hidden rounded-full">
            <Skeleton className="h-[30px] w-[30px]" />
          </div>
          <Skeleton className="h-[20px] w-[90px]" />
        </div>
        <div className="w-full flex flex-col gap-4">
          <Skeleton className="h-[20px] w-[300px]" />
          <Skeleton className="h-[20px] w-[200px]" />
        </div>

        <div className="flex w-full items-center justify-between text-[#787878] ">
          <div className="my-2 flex items-center gap-[1rem] text-[.8rem] ">
            <Skeleton className="h-[30px] w-[30px]" />
            <div>
              <Skeleton className="h-[30px] w-[30px]" />
            </div>
            <div>
              <Skeleton className="h-[30px] w-[30px]" />
            </div>
          </div>
          <div className="flex gap-3">
            <span>
              <Skeleton className="h-[30px] w-[30px]" />
            </span>
            <span>
              <Skeleton className="h-[30px] w-[30px]" />
            </span>
          </div>
        </div>
      </div>
      <div className="w-[30%]">
        <Skeleton className="h-[100px] w-[150px]" />
      </div>
    </div>
  );
}
