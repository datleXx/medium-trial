import Link from "next/link";
import React, { useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { api } from "~/trpc/react";

interface TopicBarProps {
  hover: string;
}

const TopicBar = ({hover}:TopicBarProps) => {
  const { data: topics } = api.topic.fetchAllTopic.useQuery();
  const tags = topics?.map((topic) => {
    return topic.name;
  });
  const [selectedTopic, setSelectedTopic] = useState(hover);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex items-center border-b">
      <button onClick={scrollLeft} className="absolute left-0 z-10 p-2">
        <FaChevronLeft size={13} color="gray" />
      </button>
      <div className="relative mx-8 w-full overflow-hidden">
        <div
          id="scroll-container"
          ref={scrollContainerRef}
          className="flex gap-7 overflow-x-auto p-2 scrollbar-hide"
        >
          <Link href={"/homepage"}>
            <button
              key={"For you"}
              onClick={() => setSelectedTopic("For you")}
              className={`mx-auto whitespace-nowrap py-2 ${
                selectedTopic === "For you"
                  ? "border-b-[0.01px] border-black text-sm font-extralight text-black"
                  : "text-sm font-extralight text-gray-500 hover:text-black"
              } focus:outline-none`}
              aria-current={selectedTopic === "For you" ? "page" : undefined}
            >
              For you
            </button>
          </Link>
          {tags?.map((topic) => (
            <Link key={topic} href={`/homepage/${topic}`}>
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`mx-auto whitespace-nowrap py-2 ${
                  selectedTopic === topic
                    ? "border-b-[0.01px] border-black text-sm font-extralight text-black"
                    : "text-sm font-extralight text-gray-500 hover:text-black"
                } focus:outline-none`}
                aria-current={selectedTopic === topic ? "page" : undefined}
              >
                {topic}
              </button>
            </Link>
          ))}
        </div>
      </div>
      <button onClick={scrollRight} className="absolute right-0 z-10 p-2">
        <FaChevronRight size={13} color="gray" />
      </button>
    </div>
  );
};

export default TopicBar;
