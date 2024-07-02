"use client";

import "react-quill/dist/quill.bubble.css";
import { useState, useEffect } from "react";
import "react-bootstrap-tagsinput/dist/index.css";
import ReactQuill from "react-quill";
import parse from "html-react-parser";
import { api } from "~/trpc/react";
import { useRouter, usePathname } from "next/navigation";
import Logo from "public/static/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "~/Context/context";
import { LiaEditSolid } from "react-icons/lia";
import { IoMdNotificationsOutline } from "react-icons/io";
import DropDownMenu from "~/components/home/dropdown";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Avatar,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

const Edit = () => {
  const pathName = usePathname();
  const id_arr = pathName.split("/");
  const id = parseInt(id_arr[id_arr.length - 2]!);
  const mutation = api.post.updatePost.useMutation();

  const router = useRouter();

  const { data: fetchedPost, isLoading: queryLoading } =
    api.post.fetchOnePost.useQuery({ id });
  const value_body = fetchedPost?.body;
  const title_body = fetchedPost?.title;
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const { publishState, setPublishState } = Blog();
  const session = useSession();
  let userImage: React.ReactNode;

  if (session.data?.user) {
    userImage = <Avatar src={session.data.user.image ?? ""} />;
  } else {
    userImage = <div>User Image</div>;
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  useEffect(() => {
    if (fetchedPost && !queryLoading) {
      setContent(value_body ?? "");
      setTitle(title_body ?? "");
    }
  }, [fetchedPost, queryLoading]);

  const updatePost = async () => {
    try {
      await mutation.mutateAsync({ title, id, content });
      router.push(`/posts/${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleEdit = async () => {
    try {
      setPublishState("default");
      await updatePost();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="flex justify-between gap-10 border-b p-5">
        <div className="flex-start flex items-center">
          <Link href="/homepage">
            <Image
              onClick={() => setPublishState("default")}
              alt="medium-logo"
              src={Logo}
              width={200}
              height={40}
            />
          </Link>
        </div>
        <div className="flex cursor-pointer items-center gap-3 space-x-5 text-sm font-light text-gray-500 sm:gap-7">
          {publishState === "write" ? (
            <button
              onClick={() => setPublishState("publish")}
              className=" !rounded-full !bg-green-700 !px-2 !py-1 !text-white"
            >
              Publish
            </button>
          ) : publishState === "publish" ? (
            <button className=" !rounded-full !bg-green-700 !px-2 !py-1 !text-white">
              Publish
            </button>
          ) : publishState === "edit" ? (
            <button
              onClick={handleEdit}
              className=" !rounded-full !bg-green-700 !px-2 !py-1 !text-white"
            >
              Save
            </button>
          ) : (
            <Link
              href="/posts/write"
              className="hidden items-center gap-1 md:flex"
              onClick={() => setPublishState("write")}
            >
              <span className="text-3xl">
                <LiaEditSolid />
              </span>
              <span className="mt-2 text-sm">Write</span>
            </Link>
          )}
          <div className="hover:font-semibold">
            <IoMdNotificationsOutline className="cursor-pointer text-3xl" />
          </div>
          <Popover placement="bottom">
            <PopoverTrigger className="relative flex items-center">
              {userImage}
            </PopoverTrigger>
            <PopoverContent>
              <div>
                <DropDownMenu />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <section className="mx-auto w-[90%] py-[3rem] md:w-[80%] lg:w-[60%]">
        <input
          type="text"
          placeholder="Title"
          className="w-full font-mono text-5xl font-bold outline-none"
          name="title"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />
        <ReactQuill
          theme="bubble"
          value={content}
          onChange={setContent}
          placeholder="Tell Your Story ..."
          className="write my-5"
          id="body"
        />
      </section>
    </div>
  );
};

export default Edit;
