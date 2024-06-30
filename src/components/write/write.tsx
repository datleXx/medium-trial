"use client";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useEffect, useState } from "react";
import { Blog } from "~/Context/context";
import { useRef } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { InputTags } from "react-bootstrap-tagsinput";
import "react-bootstrap-tagsinput/dist/index.css";
import { api } from "~/trpc/react";

import * as actions from "~/actions";

const Write = () => {
  const [content, setContent] = useState("");
  const { publishState, setPublishState } = Blog();
  const imageref = useRef<HTMLInputElement | null>(null);
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleClick = () => {
    if (imageref.current) {
      imageref.current.click();
    }
  };

//   const createPost = api.write.createPost.useMutation();
//   const createPostAction = (
//     content: string,
//     topics: string[],
//     previewImage: string,
//     formData: FormData,
//   ) => {
//     createPost.mutateAsync({
//         content, 
//         topics, 
//         previewImage, 
//         formData
//     });
//   };

//   const createPostFormAction = createPostAction.bind(null, content, tags, url)
  const createPostAction = actions.createPost.bind(null, content, tags, url)

  return (
    <form action={createPostAction}>
      <section className="mx-auto w-[90%] py-[3rem] md:w-[80%] lg:w-[60%]">
        <input
          type="text"
          placeholder="Title"
          className="w-full font-mono text-5xl font-bold outline-none"
          name="title"
          id="title"
        />
        <ReactQuill
          theme="bubble"
          value={content}
          onChange={setContent}
          placeholder="Tell Your Story ..."
          className="write my-5"
          id="body"
        />
        <div className={publishState ? "" : "hidden"}>
          <section className="absolute inset-0 z-30 bg-white">
            <div className="my-[2rem]">
              <span className="absolute right-[1rem] top-[3rem] cursor-pointer text-2xl md:right-[5rem]">
                <LiaTimesSolid onClick={() => setPublishState(false)} />
              </span>
              <div className="mt-[8rem] flex flex-col gap-10 md:flex-row">
                <div className="mx-[6rem] flex-1">
                  <h1 className="!font-mediumSerif !text-2xl !font-bold">
                    Story Preview
                  </h1>
                  <div
                    style={{ backgroundImage: `url(${url})` }}
                    onClick={handleClick}
                    className="my-3 grid h-[200px] w-full place-items-center bg-gray-100 bg-cover object-cover text-center text-sm font-light text-[#787878]"
                  >
                    {!url && (
                      <>
                        Include a high-quality image in your story to <br />{" "}
                        make it more inviting to readers.
                      </>
                    )}
                  </div>
                  <input
                    onChange={(e) => {
                      if (e.target.files) {
                        const file = e.target.files[0];
                        if (file) {
                          setUrl(URL.createObjectURL(file));
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
                  />
                  <input
                    name="previewSubtitle"
                    type="text"
                    placeholder="Write a preview subtitle ..."
                    className="mt-3 w-full border-b border-gray-300 py-2 text-xs font-thin outline-none"
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
                    values={tags}
                    onTags={(value) => setTags(value.values)}
                  />
                  <p className="text-sm text-[#787870]">
                    <span className="cursor-pointer underline">Learn more</span>{" "}
                    about what happens to your post when you publish.
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
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
    </form>
  );
};

export default Write;
