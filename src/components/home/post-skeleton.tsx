import { Skeleton } from "@nextui-org/react";
import { FiBookmark } from "react-icons/fi";

export default function PostSkeleton () {
    return (
        <div className='border-b flex max-w-[46rem] h-[10rem] items-center gap-[1rem] cursor-pointer my-5 !pr-11'>
            <div className='flex flex-col gap-1'>
                <div className='flex gap-[.4rem]'>
                    <div className='grid place-items-center rounded-full overflow-hidden h-[1.4rem] w-[1.4rem]'>
                        <Skeleton className="w-[40px] h-[40px]"/> 

                    </div>
                   <Skeleton className='font-semibold w-8 h-4'/>
                </div>
                <Skeleton className="w-[40px] h-5"/> 
                <Skeleton className="w-[60px] h-5"/> 

                <div className='flex items-center justify-between text-[#787878]'>
                    <div className='my-2 text-[.8rem]'>
                        Jun 15 • 5 min read • 
                        <div className="flex gap-3">
                            <Skeleton className="w-5 h-5"/> 
                            <Skeleton className="w-5 h-5"/> 
                            <Skeleton className="w-5 h-5"/> 
                            <Skeleton className="w-5 h-5"/> 
                        </div>
                    </div>
                    <span className='cursor-pointer'>
                        <FiBookmark className='h-5 w-5'/>
                    </span>
                </div>
            </div>
            <div className=''>
                <Skeleton className="w-[100px] h-[100px]"/> 
            </div>
        </div>
    )
}