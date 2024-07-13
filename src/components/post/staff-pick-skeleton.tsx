import { Skeleton } from "@nextui-org/react";
import { FiBookmark } from "react-icons/fi";
import Image from "next/image";

export default function StaffPickSkeleton() {
  return (
    <div className="flex flex-col gap-2">
          <div className="flex gap-5">
            <div className="grid h-[1.4rem] w-[1.4rem] place-items-center overflow-hidden rounded-full">
              <Skeleton className="w-[30px] h-[30px]"/>
            </div>
            <div className="font-sans text-xs font-semibold">
                <Skeleton className="w-[50px] h-[13px]"/>
            </div>
          </div>
          <div className="text-md font-sans font-bold">
            <Skeleton className="w-[200px] h-[20px]"/>
          </div>
        </div>
  );
}
