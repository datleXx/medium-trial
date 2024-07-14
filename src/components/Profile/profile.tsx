"use client";

import { useEffect, useState } from "react";
import ProfileHome from "./Activities/profile-home";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ProfileEditModal from "./profile-edit";
import { api } from "~/trpc/react";

const Profile: React.FC = () => {
  const session = useSession();
  const [isModalVisible, setModalVisible] = useState(false);
  const [userImg, setUserImg] = useState('');

  const userId = session.data?.user.id ?? "";
  const userImage =
    session.data?.user.image ??
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
  const { data: user } = api.user.fetchUser.useQuery({ id: userId });
  const { mutateAsync } = api.user.downloadFile.useMutation();
  const userName = user?.username ?? user?.name ?? "";

  const handleEditProfile = () => {
    setModalVisible(true);
  };
  useEffect(() => {
    const fetchImage = async () => {
      if (user?.image_key) {
        console.log(user.image_key);
        const img = await mutateAsync({ key: user.image_key });
        console.log(img);
        if (img) {
          setUserImg(img.link);
        }
      }
    };
  
    void fetchImage();
  }, [user, mutateAsync]);

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
                        userImg ?? userImage ??
                        "https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                      }
                    />
                    <h1 className="text-md font-sans font-medium">
                      {userName}
                    </h1>
                    <button
                      onClick={handleEditProfile}
                      className="text-sm text-green-600 hover:text-green-700"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProfileEditModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        id={userId ?? ""}
      />
    </div>
  );
};

export default Profile;
