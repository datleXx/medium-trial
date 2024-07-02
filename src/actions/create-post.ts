"use server";

import { db } from "~/db";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/auth";



export async function createPost(content:string, topics:string[] , previewImage:string , formData: FormData) {
    const title = formData.get('title') as string;
    const previewTitle = formData.get('previewTitle') as string; 
    const previewSubtitle = formData.get('previewSubtitle') as string; 
    const session = await getServerAuthSession(); 
    if (!session || !session.user) {
        alert("You haven't signed in yet... Redirecting?")
        redirect('/'); 
    }


    const topicConnections = await Promise.all(topics.map(async (topic) => {
        let findTopic = await db.topic.findFirst({
            where: {
                name: topic
            }
        });

        if (findTopic) {
            return {
                topic: {
                    connect: {id: findTopic.id}
                }
            }
        } else {
            findTopic = await db.topic.create({
                data: {
                    name: topic
                }
            });
            return {
                    topic: {
                        connect: {id: findTopic.id}
                    }
                }
            }
        }
    )
)

    const userName = session.user.name
    const userId = session.user.id
    const post = await db.article.create({
        data: {
            name: userName ?? "Anonymous",
            title, 
            previewTitle, 
            previewSubtitle, 
            previewImage, 
            body:content, 
            topics: {
                create: topicConnections
            },
            createdBy: {
                connect: {
                    id: userId
                }
            }
    }})

    console.log(post);
    
    redirect(`/posts/${post.id}`);

}