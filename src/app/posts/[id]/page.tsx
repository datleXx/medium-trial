import { db } from "~/db";
import { notFound } from "next/navigation";
import { Avatar } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import Logo from "public/static/author.jpg";
import HomeHeader from "~/components/home/header_home";
import { HiDotsHorizontal } from "react-icons/hi";
import ProfilePostCardOptions from "~/components/Profile/postcard/profile-post-option";

interface PostShowPageProps {
  params: {
    id: string;
  };
}

export default async function PostShowPage(props: PostShowPageProps) {
  // await new Promise((r) => setTimeout(r,2000));
  const id = parseInt(props.params.id);
  const post = await db.article.findFirst({
    where: { id: id },
  });

  if (!post) {
    return notFound();
  }
  console.log(post.body);

  return (
    <>
      <HomeHeader />
      <section className="mx-auto w-[90%] py-[3rem] md:w-[80%] lg:w-[60%]">
        <div className="flex justify-between">
          <h2 className="text-4xl font-extrabold capitalize">{post.title}</h2>
          <Popover placement="right">
            <PopoverTrigger>
              <div>
                <HiDotsHorizontal />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div>
                <ProfilePostCardOptions id={id} />
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center gap-2 border-b py-[2rem]">
          <Avatar src={Logo.src} alt="userImg" />
          <div>
            <div className="capitalize">Xuan Dat</div>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: post.body }}
          className="my-5"
        ></div>
      </section>
    </>
  );
}
