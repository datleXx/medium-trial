import { Avatar } from "@nextui-org/react";
import { MdFormatBold } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import { PiHandsClappingThin } from "react-icons/pi";
import { BiMessageRounded } from "react-icons/bi";
import { Tooltip } from "react-tooltip";

interface ResponseCardProps {
  userImage: string;
  text: string;
  createdAt: Date;
  userName: string;
}

const ResponseCard = ({
  userImage,
  text,
  createdAt,
  userName,
}: ResponseCardProps) => {
  return (
    <div className="border-t pt-4">
      <div className="mb-4 flex gap-3">
        <Avatar
          src={
            userImage ??
            "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
          }
          alt="user avatar"
          size="sm"
        />
        <div className="w-full"> {/* Make this div full width */}
          <div className="font-semibold">{userName}</div>
          <div className="text-sm text-gray-500">
            {formatDistanceToNow(createdAt)}
          </div>
          <div className="mt-2">
            <p>{text}</p>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
            <div className="flex gap-3">
              <div className="flex items-center gap-1 cursor-pointer">
                <PiHandsClappingThin size={22} />
                <span>68</span>
              </div>
              <div className="flex gap-1 items-center cursor-pointer">
                <BiMessageRounded size={20} />
                <button className="">Hide replies</button>
              </div>
            </div>
            <button className="hover:underline">Reply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseCard;
