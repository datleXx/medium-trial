import { LiaUserSolid } from "react-icons/lia";
import { MdOutlineLocalLibrary } from "react-icons/md";
import { BiSpreadsheet } from "react-icons/bi";
import { HiOutlineChartBar } from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Blog } from "~/Context/context";
import { AiOutlineSetting, AiOutlineGift, AiOutlineLogout } from "react-icons/ai";
import { BsJournalBookmark, BsStars } from "react-icons/bs";
import { FiHelpCircle, FiUserCheck } from "react-icons/fi";

const DropDownMenu = () => {
  const { publishState, setPublishState } = Blog();
  const { data: session } = useSession();
  let userId = "";
  if (session) {
    userId = session.user.id;
  }

  const handleSignOut = async () => {
    if (session) {
      await signOut({ callbackUrl: "/" });
    }
  };

  return (
    <div className="!mt-6 right-1 bg-white p-4 shadow-lg rounded-md w-64">
      <div className="flex flex-col gap-5 border-b pb-4">
        <Link onClick={() => setPublishState("default")} href={`/profile/${userId}`} className="flex items-center gap-4 cursor-pointer">
          <LiaUserSolid className="text-xl" />
          <span>Profile</span>
        </Link>
        <div className="flex items-center gap-4 cursor-pointer">
          <MdOutlineLocalLibrary className="text-xl" />
          <span>Library</span>
        </div>
        <div className="flex items-center gap-4 cursor-pointer">
          <BiSpreadsheet className="text-xl" />
          <span>Stories</span>
        </div>
        <div className="flex items-center gap-4 cursor-pointer">
          <HiOutlineChartBar className="text-xl" />
          <span>Stats</span>
        </div>
      </div>
      <div className="flex flex-col gap-5 border-b pb-4 pt-4">
        <div className="flex items-center gap-4 cursor-pointer">
          <AiOutlineSetting className="text-xl" />
          <span>Settings</span>
        </div>
        <div className="flex items-center gap-4 cursor-pointer">
          <FiHelpCircle className="text-xl" />
          <span>Help</span>
        </div>
        <div className="flex items-center gap-4 cursor-pointer">
          <BsJournalBookmark className="text-xl" />
          <span>Manage publications</span>
        </div>
      </div>
      <div className="flex flex-col gap-5 border-b pb-4 pt-4">
        <div className="flex items-center gap-4 cursor-pointer">
          <BsStars className="text-xl" />
          <span>Become a Medium member</span>
        </div>
        <div className="flex items-center gap-4 cursor-pointer">
          <FiUserCheck className="text-xl" />
          <span>Apply for author verification</span>
        </div>
        <div className="flex items-center gap-4 cursor-pointer">
          <AiOutlineGift className="text-xl" />
          <span>Gift a membership</span>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-4 cursor-pointer" onClick={handleSignOut}>
        <AiOutlineLogout className="text-xl" />
        <span>Sign Out</span>
      </div>
    </div>
  );
};

export default DropDownMenu;
