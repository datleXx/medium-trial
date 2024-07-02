"use client";

import Logo from "public/static/logo.png";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Blog } from "~/Context/context";
import { LiaEditSolid } from "react-icons/lia";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import DropDownMenu from "./dropdown";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Avatar,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

const HomeHeader = () => {
  const { publishState, setPublishState } = Blog();
  const session = useSession();
  let userImage: React.ReactNode;

  if (session.data?.user) {
    userImage = <Avatar src={session.data.user.image ?? ""} />;
  } else {
    userImage = <div>User Image</div>;
  }
  return (
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
          <button
            className=" !rounded-full !bg-green-700 !px-2 !py-1 !text-white"
          >
            Publish
          </button>
        ) : publishState === "edit" ? (
          <button
            onClick={() => setPublishState("edit")}
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
  );
};

export default HomeHeader;
