import PostCard from "../PostCard";

const Posts = () => {
    return (
        <div className="flex justify-center">
            <div className="max-w-7xl flex-1">
                <div className="my-5 flex flex-col gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
                    <PostCard/>
                    <PostCard/>
                    <PostCard/>
                    <PostCard/>
                    <PostCard/>
                    <PostCard/>
                </div>
            </div>
        </div>
    )
}

export default Posts; 