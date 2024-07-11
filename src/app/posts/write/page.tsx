"use client";

import { useState, useRef, useEffect } from "react";
import { Blog } from "~/Context/context";
import { LiaTimesSolid } from "react-icons/lia";
import { InputTags } from "react-bootstrap-tagsinput";
import "react-bootstrap-tagsinput/dist/index.css";
import dynamic from 'next/dynamic';
import { useRouter, usePathname } from "next/navigation";
import { api } from "~/trpc/react";
import Logo from "public/static/logo.png";
import Image from "next/image";
import Link from "next/link";
import { IoMdNotificationsOutline } from "react-icons/io";
import DropDownMenu from "~/components/home/dropdown";
import { Popover, PopoverTrigger, PopoverContent, Avatar } from "@nextui-org/react";
import { useSession } from "next-auth/react";

// Dynamic import of Editor component
const Editor = dynamic(() => import('~/components/write/editor'), { ssr: false });

function readFile(file: File) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result);
    };
    fr.onerror = reject;
    fr.readAsBinaryString(file);
  });
}

const Write = () => {
  const [content, setContent] = useState("");
  const { publishState, setPublishState } = Blog();
  const imageref = useRef<HTMLInputElement | null>(null);
  const [previewImage, setUrl] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewSubtitle, setPreviewSubtitle] = useState("");
  const [file, setFile] = useState<File>();

  const pathName = usePathname();
  const id_arr = pathName.split("/");
  const id = parseInt(id_arr[id_arr.length - 2]!);

  const session = useSession();
  let userImage: React.ReactNode;

  if (session.data?.user) {
    userImage = <Avatar size="sm" src={session.data.user.image ?? ""} />;
  } else {
    userImage = <div>User Image</div>;
  }

  const router = useRouter();

  const handleClick = () => {
    if (imageref.current) {
      imageref.current.click();
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubtitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreviewSubtitle(event.target.value);
  };

  const handlePreviewTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreviewTitle(event.target.value);
  };

  const mutation = api.post.createPost.useMutation();

  const submitPost = async () => {
    try {
      if (file) {
        const blob = (await readFile(file)) as string;
        const base64data = btoa(blob);
        const fileData = { name: file.name, size: file.size, type: file.type };
        await mutation.mutateAsync({
          content,
          topics,
          previewImage,
          title,
          previewTitle,
          previewSubtitle,
          file: base64data,
          fileMetaData: fileData,
        });
      } else {
        alert("No preview Image selected!");
      }

      router.push(`/homepage`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    try {
      await submitPost();
      setPublishState("default");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Function to handle click events on the preview image
      const handleClick = () => {
        if (imageref.current) {
          imageref.current.click();
        }
      };

      // Attach event listeners or any other document-dependent code here
      const previewImageElement = document.querySelector('.preview-image');
      if (previewImageElement) {
        previewImageElement.addEventListener('click', handleClick);
      }

      // Cleanup function to remove event listeners
      return () => {
        if (previewImageElement) {
          previewImageElement.removeEventListener('click', handleClick);
        }
      };
    }
  }, []);

  return (
    <div>
      <div className="flex justify-between gap-10 p-2">
        <div className="flex-start flex items-center mx-auto">
          <Link href="/homepage">
            <Image
              onClick={() => setPublishState("default")}
              alt="medium-logo"
              src={Logo}
              width={200}
              height={40}
            />
          </Link>
          <div className="text-sm">Draft in {session.data?.user.name}</div>
        </div>
        <div className="flex cursor-pointer items-center gap-1 px-2 text-sm font-light text-gray-500 sm:gap-7 mx-auto">
          <button
            onClick={() => setPublishState("publish")}
            className=" !rounded-full !bg-green-700 !px-2 !py-1 !text-white"
          >
            Publish
          </button>

          <div className="hidden md:block">
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
          className="w-full font-serif text-5xl font-extralight outline-none"
          name="title"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />
        <Editor value={content} onChange={setContent} />
        <div className={publishState === "publish" ? "" : "hidden"}>
          <section className="absolute inset-0 z-30 bg-white">
            <div className="my-[2rem]">
              <span className="absolute right-[1rem] top-[3rem] cursor-pointer text-2xl md:right-[5rem]">
                <LiaTimesSolid onClick={() => setPublishState("write")} />
              </span>
              <div className="mt-[8rem] flex flex-col gap-10 md:flex-row">
                <div className="mx-[6rem] flex-1">
                  <h1 className="!font-mediumSerif !text-2xl !font-bold">
                    Story Preview
                  </h1>
                  <div
                    style={{ backgroundImage: `url(${previewImage})` }}
                    onClick={handleClick}
                    className="my-3 grid h-[200px] w-full place-items-center bg-gray-100 bg-cover object-cover text-center text-sm font-light text-[#787878] preview-image"
                  >
                    {!previewImage && (
                      <>
                        Include a high-quality image in your story to <br />{" "}
                        make it more inviting to readers.
                      </>
                    )}
                  </div>
                  <input
                    onChange={(e) => {
                      if (e.target.files) {
                        const file_obj = e.target.files[0];
                        if (file_obj) {
                          setFile(file_obj);
                          setUrl(URL.createObjectURL(file_obj as Blob));
                        }
                      }
                    }}
                    ref={imageref}
                    type="file"
                    hidden
                  />
                  <input
                    name="previewTitle"
                    type="text"
                    placeholder="Write a preview title"
                    className="w-full border-b border-gray-300 py-2 font-serif font-bold outline-none"
                    value={previewTitle}
                    onChange={handlePreviewTitleChange}
                  />
                  <input
                    name="previewSubtitle"
                    type="text"
                    placeholder="Write a preview subtitle ..."
                    className="mt-3 w-full border-b border-gray-300 py-2 text-xs font-thin outline-none"
                    value={previewSubtitle}
                    onChange={handleSubtitleChange}
                  />

                  <p className="mt-5 text-xs text-[#787878]">
                    <span className="font-bold">Note:</span> Changes here will
                    affect how your story appears in public places like Medium’s
                    homepage and in subscribers’ inboxes — not the contents of
                    the story itself.
                  </p>
                </div>
                <div className="mb-5 flex flex-1 flex-col gap-4 md:mb-0">
                  <h3 className="text-xl">
                    Publishing to: <b className="capitalize">Xuan Dat</b>
                  </h3>
                  <p className="text-sm">
                    Add or change topics (up to 5) so readers know what your
                    story is about
                  </p>
                  <InputTags
                    className="w-[90%] border p-2 font-serif text-sm"
                    placeholder="Add a topic ..."
                    values={topics}
                    onTags={(value) => setTopics(value.values)}
                  />
                  <p className="text-sm text-[#787870]">
                    <span className="cursor-pointer underline">Learn more</span>{" "}
                    about what happens to your post when you publish.
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleSubmit}
                      className=" w-fit rounded-full bg-green-700 p-2 text-sm text-white"
                    >
                      Publish Now
                    </button>
                    <p className="ml-3 cursor-pointer text-sm text-[#787870]">
                      {" "}
                      Schedule for later{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Write;
