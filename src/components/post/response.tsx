// ResponseTab.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Avatar } from "@nextui-org/react";
import { MdFormatBold, MdFormatItalic } from "react-icons/md";
import ResponseCard from "./response-card";
import { api } from "~/trpc/react";


interface Comment {
    id: number;
    text: string;
    user: {
      id: string;
      name: string | null;
      image: string | null;
    };
    postId: number;
    createdAt: Date;
    userId: string;
  }

interface ResponseTabProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  postId: number;
  userId: string;
}

const ResponseTab: React.FC<ResponseTabProps> = ({
  isOpen,
  onClose,
  userName,
  postId,
  userId,
}) => {
  const [value, setValue] = useState("");
  const [commentsState, setComments] = useState<Comment[]>([]);

  const { data: comments } = api.post.fetchAllComments.useQuery({ id: postId });
  const mutation = api.comment.createComment.useMutation();

  useEffect(() => {
    if (comments) {
      const commentsArray: Comment[] = comments.map((comment) => ({
        id: comment.id,
        text: comment.text,
        user: {
          id: comment.user.id,
          name: comment.user.name ?? "Unknown",
          image: comment.user.image ?? "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        },
        postId: comment.postId,
        createdAt: new Date(comment.createdAt),
        userId: comment.userId,
      }));
      setComments(commentsArray);
    }
  }, [comments]);

  const renderedComments = commentsState?.map((comment) => (
    <ResponseCard
      key={comment.id}
      userImage={
        comment.user.image ??
        "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
      }
      text={comment.text}
      userName={comment.user.name ?? "Unknown"}
      createdAt={comment.createdAt}
    />
  ));

  const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async () => {

    setValue("");

    const newComment: Comment = {
      id: Math.random(), // Temporary ID for optimistic update
      text: value,
      user: {
        id: userId,
        name: userName,
        image:
          "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
      },
      postId,
      createdAt: new Date(),
      userId,
    };

    // Optimistic update
    setComments((prevComments) => [newComment, ...prevComments]);

    // Send the mutation
    await mutation.mutateAsync({
      text: value,
      userId,
      postId,
    });
  };

  // Prevent background scrolling when ResponseTab is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-5"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-96 transform bg-white shadow-lg transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } overflow-y-auto`} // Add overflow-y-auto for scrolling
      >
        <div className="flex justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Responses</h2>
          <button onClick={onClose} className="text-lg font-semibold">
            ×
          </button>
        </div>
        <div className="p-4">
          <div className="mb-4 flex items-center">
            <Avatar
              src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              alt="user avatar"
              size="lg"
            />
            <div className="ml-2">
              <div className="font-semibold">{userName}</div>
              <div className="mt-1">
                <textarea
                  value={value}
                  onChange={handleValueChange}
                  placeholder="What are your thoughts?"
                  className="h-24 w-full resize-none rounded border p-2"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex space-x-2 text-gray-500">
              <MdFormatBold className="cursor-pointer text-2xl" />
              <MdFormatItalic className="cursor-pointer text-2xl" />
            </div>
            <div className="flex space-x-4">
              <button className="text-xs text-gray-500" onClick={onClose}>Cancel</button>
              <button
                onClick={handleSubmit}
                className="rounded-full bg-green-600 px-[0.5rem] py-2 text-xs text-white"
              >
                Respond
              </button>
            </div>
          </div>
          <div className="mb-4">
            <input type="checkbox" id="publishToProfile" className="mr-2" />
            <label htmlFor="publishToProfile" className="text-sm">
              Also publish to my profile
            </label>
          </div>
          <div>{renderedComments}</div>
        </div>
      </div>
    </div>
  );
};

export default ResponseTab;
