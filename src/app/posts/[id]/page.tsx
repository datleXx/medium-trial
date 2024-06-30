import { db } from "~/db";
import { notFound } from "next/navigation";
import {
    Avatar
} from '@nextui-org/react'; 
import Logo from 'public/static/author.jpg';
import HomeHeader from "~/components/home/header_home";

interface PostShowPageProps {
    params: {
        id: string
    }
}


export default async function PostShowPage(props: PostShowPageProps) {
    // await new Promise((r) => setTimeout(r,2000)); 

    const post = await db.article.findFirst({
        where: { id: parseInt(props.params.id) }
    }); 

    if (!post) {
        return notFound(); 
    }
    console.log(post.body)

    return (
    <>

        <HomeHeader /> 
        <section className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]">
            <h2 className="text-4xl font-extrabold capitalize">{post.title}</h2>
            <div className="flex items-center gap-2 py-[2rem] border-b">
                <Avatar  
                    src={Logo.src}
                    alt="userImg"
                />
                <div>
                    <div className="capitalize">Xuan Dat</div>
                </div>
            </div>
            <div dangerouslySetInnerHTML={ {__html:post.body}} className="my-5">
            </div>


        </section>


    </>
    ); 
}