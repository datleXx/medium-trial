import HomeHeader from "../home/header_home";
import PostSkeleton from "./post-skeleton";
import StaffPickSkeleton from "./staff-pick-skeleton";
import TopicSkeletion from "./topic-skeleton";

const DashboardLoading = () => {
  return (
    <>
      <HomeHeader />
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
                <div className="flex flex-col gap-3">
                  {" "}
                  {[...Array<number>(5)].map((_, index) => (
                    <PostSkeleton key={index} />
                  ))}
                </div>
              </div>
              {/* Right div */}
              <div className="sticky top-4 mx-auto hidden h-[calc(100vh-4rem)] w-[30%] overflow-y-auto border-l-small md:block">
                <div className="mx-7 max-w-md">
                  <div className="py-2">
                    <h1 className="text-md mb-3 font-sans font-medium">
                      Staff Pick
                    </h1>
                    <div className="my-6 flex flex-col gap-7 px-4">
                      {[...Array<number>(3)].map((_, index) => (
                        <StaffPickSkeleton key={index} />
                      ))}
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
                      {[...Array<number>(15)].map((_, index) => (
                        <TopicSkeletion key={index} />
                      ))}
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
    </>
  );
};

export default DashboardLoading;
