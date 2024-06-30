'use server'

import { getServerAuthSession } from "~/auth";
import PostCard from "~/components/PostCard";
import { db } from "~/db";

const ProfileHome = async () => {
    const session = await getServerAuthSession(); 
    let userId; 
    if (!session || !session.user) {
        alert('You havent logged in yet ... ')
    } 
    else {
        userId = session.user.id
    }

    const authoredPosts = await db.article.findMany({
        where: {
            createdById: userId
        },
        include: {
            topics: {
                include: {
                    topic: true
                }
            }
        }
    })

    const renderedAuthoredPosts = authoredPosts.map((post) => {
        return (
            <PostCard 
            key={post.id} authorName={post.name} previewTitle={post.previewTitle} previewSubtitle={post.previewSubtitle} 
                    tags={post.topics.map((topic) => topic.topic.name)}            
            /> 
        )
    })
    return <div>
        {renderedAuthoredPosts}
    </div>
}

export default ProfileHome; 