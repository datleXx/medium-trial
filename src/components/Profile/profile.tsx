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
    <section className="relative flex gap-[4rem]">
      <div className="mx-[9rem] mt-[9rem] flex-[2]">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold capitalize sm:text-5xl">
            {userName}
          </h2>
        </div>
        <div className="mb-[3rem] mt-[1rem] flex items-center gap-5 border-b border-gray-300 ">
          <div className={`py-[0.5rem] "border-b border-gray-500"}`}>
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
    </section>
  );
};

export default Profile;
