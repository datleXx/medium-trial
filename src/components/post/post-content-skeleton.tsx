import { Skeleton } from "@nextui-org/react";

const PostContentSkeleton = () => {
  return (
    <section className="mx-auto w-[90%] py-[3rem] md:w-[80%] lg:w-[45%]">
      <div className="flex justify-between">
        <h2 className="text-4xl font-extrabold capitalize">
          <Skeleton className="h-[50px] w-[700px]" />
        </h2>
      </div>
      <div className="my-3 flex items-center gap-4 py-2">
        <Skeleton className="h-[30px] w-[30px]" />
        <div>
          <Skeleton className="h-[30px] w-[80px]" />
          <div className="my-2 flex items-center gap-2 text-[.8rem] text-[#787878]">
            <span>•</span>
            <Skeleton className="h-[30px] w-[30px]" />
            <span>•</span>
            <Skeleton className="h-[30px] w-[30px]" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-b border-t py-3">
        <div className="flex gap-6">
          <div className="flex items-center gap-1">
            <Skeleton className="h-[30px] w-[30px]" />
          </div>
          <div className="flex cursor-pointer items-center gap-1">
            <Skeleton className="h-[30px] w-[30px]" />
          </div>
        </div>
        <div className="flex gap-6">
          <div>
            <Skeleton className="h-[30px] w-[30px]" />
          </div>
          <div>
            <Skeleton className="h-[30px] w-[30px]" />
          </div>
          <div>
            <Skeleton className="h-[30px] w-[30px]" />
          </div>
          <div data-tooltip-id="blog-tooltip" data-tooltip-content="More">
            <Skeleton className="h-[30px] w-[30px]" />
          </div>
        </div>
      </div>

      <div className="my-9">
        <Skeleton className="mx-auto h-[300px] w-[500px]" />
      </div>
      <div className="flex flex-col gap-5">
        <Skeleton className="h-[40px] w-[700px]" />
        <Skeleton className="h-[40px] w-[700px]" />
        <Skeleton className="h-[40px] w-[700px]" />
        <Skeleton className="h-[40px] w-[700px]" />
        <Skeleton className="h-[40px] w-[700px]" />
        <Skeleton className="h-[40px] w-[700px]" />
        <Skeleton className="h-[40px] w-[700px]" />
        <Skeleton className="h-[40px] w-[700px]" />
        <Skeleton className="h-[40px] w-[700px]" />
        <Skeleton className="h-[40px] w-[700px]" />
        <Skeleton className="h-[40px] w-[700px]" />
        <Skeleton className="h-[40px] w-[700px]" />
      </div>
    </section>
  );
};

export default PostContentSkeleton;
