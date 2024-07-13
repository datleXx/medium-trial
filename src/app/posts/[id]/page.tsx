"use client";

import { notFound } from "next/navigation";
import { Avatar } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import Image from "next/image";
import Logo from "public/static/author.jpg";
import HomeHeader from "~/components/home/header_home";
import ProfilePostCardOptions from "~/components/Profile/postcard/profile-post-option";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import { PiHandsClappingThin } from "react-icons/pi";
import { BiMessageRounded } from "react-icons/bi";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { GoPlay } from "react-icons/go";
import { IoShareOutline } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { Tooltip } from "react-tooltip";
import DropDownMenu from "~/components/home/dropdown";
import PopoverTriggerWrapper from "~/components/home/popover-wrapper";
import ResponseTab from "~/components/post/response";
import AuthorInfo from "~/components/post/author-other-posts";
import Footer from "~/components/landing/footer";
import PostContentSkeleton from "~/components/post/post-content-skeleton";

interface PostShowPageProps {
  params: {
    id: string;
  };
}

export default function PostShowPage(props: PostShowPageProps) {
  const id = parseInt(props.params.id);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isResponseTabOpen, setIsResponseTabOpen] = useState(false);
  const [clap, setClap] = useState<number>(0); 
  const [numComment, setNumComment] = useState<number>(0);



  const openResponseTab = () => setIsResponseTabOpen(true);
  const closeResponseTab = () => setIsResponseTabOpen(false);

  // Use the query hook to fetch the post data
  const { data: post, isLoading, isError } = api.post.fetchOnePost.useQuery({ id });
  const dateString = String(post?.createdAt);
  const dateParts = dateString.split(" ");
  const monthDay = `${dateParts[1]} ${dateParts[2]},${dateParts[3]}`;
  // Use the mutation hook to get the image URL
  const { mutateAsync } = api.post.downloadFile.useMutation();
  const mutationLike = api.post.updateLike.useMutation();

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (post && post.key) {
        try {
          const imageObject = await mutateAsync({ key: post.key });
          if (imageObject) {
            setImageUrl(imageObject.link);
          }
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    };

    if (post) {
      setNumComment(post.comments.length);
      setClap(post.like ?? 0); // Ensure clap is initialized correctly
      void fetchImageUrl();
    }
  }, [post, mutateAsync]);

  const handleClapClick = async () => {
    if (post) {
      const newClapCount = clap + 1;
      setClap(newClapCount); // Update UI immediately

      try {
        await mutationLike.mutateAsync({ id: post.id, like: newClapCount });
      } catch (e) {
        console.log(e);
        // If there is an error, revert the clap count
        setClap(clap);
      }
    }
  };

  if (isLoading) {
    return (
      <>
        <HomeHeader />
        <div className="relative top-[3.3rem]">
          <div className="flex h-[4rem] items-center bg-gradient-to-r from-yellow-100 to-yellow-300 py-2 text-black">
            <div className="container mx-auto text-center">
              <span>Be part of a better internet. </span>
              <a href="#" className="font-semibold underline">
                Get 20% off membership for a limited time
              </a>
            </div>
          </div>
          <PostContentSkeleton />
        </div>
      </>
    );
  }

  if (isError || !post) {
    notFound();
    return null;
  }

  return (
    <>
      <HomeHeader />
      <div className="relative top-[3.3rem]">
        <div className="flex h-[4rem] items-center bg-gradient-to-r from-yellow-100 to-yellow-300 py-2 text-black">
          <div className="container mx-auto text-center">
            <span>Be part of a better internet. </span>
            <a href="#" className="font-semibold underline">
              Get 20% off membership for a limited time
            </a>
          </div>
        </div>
        <section className="mx-auto w-[90%] py-[3rem] md:w-[80%] lg:w-[45%]">
          <div className="flex justify-between">
            <h2 className="text-4xl font-extrabold capitalize">{post.title}</h2>
          </div>
          <div className="my-3 flex items-center gap-4 py-2">
            <Avatar
              src={
                post.createdBy.image ??
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt="userImg"
            />
            <div>
              <div className="capitalize">{post.createdBy.name}</div>
              <div className="my-2 flex items-center gap-2 text-[.8rem] text-[#787878]">
                <span>•</span>
                <span>5 min read</span>
                <span>•</span>
                <span>{monthDay}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between border-b border-t py-3">
            <div className="flex gap-6">
              <div
                className="flex items-center gap-1 cursor-pointer"
                data-tooltip-id="blog-tooltip"
                data-tooltip-content="Clap"
                onClick={handleClapClick}
              >
                <PiHandsClappingThin size={20} />
                <span>{clap}</span>
              </div>
              <div
                className="flex cursor-pointer items-center gap-1"
                data-tooltip-id="blog-tooltip"
                data-tooltip-content="Respond"
                onClick={openResponseTab}
              >
                <BiMessageRounded size={20} />
                <span>{numComment}</span>
              </div>
            </div>
            <div className="flex gap-6">
              <div
                className=""
                data-tooltip-id="blog-tooltip"
                data-tooltip-content="Save"
              >
                <MdOutlineBookmarkAdd size={20} />
              </div>
              <div data-tooltip-id="blog-tooltip" data-tooltip-content="Listen">
                <GoPlay size={20} />
              </div>
              <div data-tooltip-id="blog-tooltip" data-tooltip-content="Share">
                <IoShareOutline size={20} />
              </div>
              <div data-tooltip-id="blog-tooltip" data-tooltip-content="More">
                <Popover placement="bottom">
                  <PopoverTrigger>
                    <PopoverTriggerWrapper />
                  </PopoverTrigger>
                  <PopoverContent>
                    <DropDownMenu />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="my-9">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Post Image"
                width={800}
                height={600}
                className="h-auto w-full object-contain"
              />
            )}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: post.body }}
            className="my-5"
          ></div>
        </section>

        <Tooltip id="blog-tooltip" />
      </div>
      <AuthorInfo authorId={post.createdById} />
      <ResponseTab
        isOpen={isResponseTabOpen}
        onClose={closeResponseTab}
        userName={post.createdBy.username ?? post.createdBy.name ?? "You"}
        postId={post.id}
        userId={post.createdBy.id}
      />
      <Footer />
    </>
  );
}
