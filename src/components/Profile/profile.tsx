"use client";

import ProfileHome from "./Activities/profile-home";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Profile = () => {
  const session = useSession();
  let userName;
  let userId;
  let userImage;
  if (!session || !session.data?.user) {
  } else {
    userName = session.data.user.name;
    userId = session.data.user.id;
    userImage = session.data.user.image;
  }
  return (
    <div>
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
                <h2 className="text-3xl font-bold capitalize sm:text-5xl">
                  {userName}
                </h2>
                <div className="mb-[3rem] mt-[1rem] flex items-center gap-5 border-b border-gray-300 ">
                  <div className={`"border-b border-gray-500"} py-[0.5rem]`}>
                    <button>Home</button>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <ProfileHome />
                </div>
              </div>
              {/* Right div */}
              <div className="sticky top-4 mx-auto hidden h-[calc(100vh-4rem)] w-[30%] overflow-y-auto border-l-small md:block">
                <div className="mx-7 max-w-md">
                  <div className="flex flex-col items-start gap-3 py-2">
                    <Image
                      className="rounded-full"
                      alt="userImg"
                      width={100}
                      height={100}
                      src={
                        userImage ??
                        "https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                      }
                    />
                    <h1 className="text-md font-sans font-medium">
                      {userName}
                    </h1>
                    <button className="text-sm text-green-600 hover:text-green-700">
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <section className="relative flex gap-[4rem]">
        <div className="mx-[9rem] mt-[9rem] flex-[2]">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold capitalize sm:text-5xl">
              {userName}
            </h2>
          </div>
          <div className="mb-[3rem] mt-[1rem] flex items-center gap-5 border-b border-gray-300 ">
            <div className={`"border-b border-gray-500"} py-[0.5rem]`}>
              <button>Home</button>
            </div>
          </div>
          <ProfileHome />
        </div>

        <div className="z-10 flex-[1] border-l border-gray-300 p-[2rem]">
          <Image
            src={
              session?.data?.user?.image ??
              "https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
            }
            alt="user image"
            width={80}
            height={80}
            className="rounded-full"
          />
          <h2 className="mt-3 font-semibold">{userName}</h2>
          <button className="mt-5 text-sm text-green-600 hover:text-green-700">
            Edit this Profile
          </button>
        </div>
      </section> */}
    </div>
  );
};

export default Profile;
