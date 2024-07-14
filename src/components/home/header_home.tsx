"use client";

import { useRouter } from "next/navigation";
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
import { AiOutlineSearch } from "react-icons/ai";
import { api } from "~/trpc/react";

const HomeHeader = () => {
  const { publishState, setPublishState } = Blog();
  const session = useSession();
  const [scrollY, setScrollY] = useState(0);
  const [hideHeader, setHideHeader] = useState(false);
  const [userImage, setUserImage] = useState<string | null>(null);
  const router = useRouter();
  const { mutateAsync: fetchImage } = api.user.downloadFile.useMutation();
  const { data: user } = api.user.fetchUser.useQuery({
    id: session.data?.user.id ?? "",
  });

  useEffect(() => {
    const fetchUserProfileImage = async () => {
      if (user?.image_key) {
        try {
          const imageObject = await fetchImage({ key: user.image_key });
          if (imageObject) {
            setUserImage(imageObject.link);
          } else {
            setUserImage(
              "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
            );
          }
        } catch (error) {
          console.error("Error fetching user image:", error);
          setUserImage(
            "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
          );
        }
      } else {
        setUserImage(
          "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        );
      }
    };

    if (session.data?.user) {
      void fetchUserProfileImage();
    }
  }, [session.data?.user, fetchImage]);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;
      setHideHeader(currentScrollY > scrollY);
      setScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  const handleSearchSubmit = (formData: FormData) => {
    const searchQuery = formData.get("search")?.toString().trim() ?? "";
    if (searchQuery) {
      router.push(`/homepage/search?query=${searchQuery}`);
    }
  };

  return (
    <div>
      <div
        className={`transition-transform duration-300 ${hideHeader ? "-translate-y-full" : "translate-y-0"} fixed left-0 right-0 top-0 z-50 bg-white`}
      >
        <div className="flex items-center justify-between gap-10 border-b p-2">
          <div className="flex items-center gap-2">
            <Link href="/homepage">
              <Image
                onClick={() => setPublishState("default")}
                alt="medium-logo"
                src={Logo}
                width={150}
                height={40}
              />
            </Link>

            <div className="flex flex-grow items-center justify-center gap-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleSearchSubmit(formData);
                }}
                className="relative w-full max-w-xs"
              >
                <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500" />
                <input
                  name="search"
                  type="text"
                  placeholder="Search"
                  className="w-full rounded-full bg-gray-100 py-2 pl-10 pr-4 text-sm font-extralight text-gray-700  placeholder-gray-500 focus:border-gray-300 focus:outline-none"
                />
              </form>
            </div>
          </div>
          <div className="mr-5 flex items-center gap-7">
            {publishState === "edit" ? (
              <button
                onClick={() => setPublishState("edit")}
                className="rounded-full bg-green-700 px-2 py-1 text-white"
              >
                Save
              </button>
            ) : (
              <Link
                href="/posts/write"
                className="flex items-center gap-1"
                onClick={() => setPublishState("write")}
              >
                <span className="text-3xl">
                  <LiaEditSolid />
                </span>
                <span className="mt-2 text-sm">Write</span>
              </Link>
            )}
            <div className="hidden md:block">
              <IoMdNotificationsOutline className="cursor-pointer text-3xl" />
            </div>
            <Popover placement="bottom">
              <PopoverTrigger className="relative flex items-center">
                <Avatar
                  size="sm"
                  src={
                    userImage ??
                    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                  }
                />
              </PopoverTrigger>
              <PopoverContent>
                <div>
                  <DropDownMenu />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
