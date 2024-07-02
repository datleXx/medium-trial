"use client";

import Link from "next/link";
import { Blog } from "~/Context/context";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

interface ProfilePostCardOptionsProps {
  id: number;
}
const ProfilePostCardOptions = ({ id }: ProfilePostCardOptionsProps) => {
  const { publishState, setPublishState } = Blog();
  const mutation = api.post.deletePost.useMutation();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await mutation.mutateAsync({ id });
      router.push("/homepage");
      // Optionally handle success, e.g., show a success message or update UI
    } catch (error) {
      console.error("Failed to delete post:", error);
      // Handle error, e.g., show an error message or handle differently
    }
  };

  return (
    <div className=" bg-white">
      <div className="border-b p-2">
        <Link href={`/posts/${id}/edit`} className="cursor-pointer">
          <span onClick={() => setPublishState("edit")}>Edit Story</span>
        </Link>
      </div>
      <div className="p-2">
        <button onClick={handleDelete} className="cursor-pointer text-red-400">
          Delete Story
        </button>
      </div>
    </div>
  );
};

export default ProfilePostCardOptions;
