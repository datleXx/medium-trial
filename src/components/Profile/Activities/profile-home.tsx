import ProfilePostCard from "../postcard/profile-post-card";
import { api } from "~/trpc/react";

const ProfileHome = () => {
    const { data: authoredPosts } = api.profile.fetchAllAuthoredPosts.useQuery();

    const renderedAuthoredPosts = authoredPosts?.map((post) => {
        return (
            <ProfilePostCard
            key={post.id} id={post.id} authorName={post.name} previewTitle={post.previewTitle} previewSubtitle={post.previewSubtitle} 
            tags={post.topics.map((topic) => topic.topic.name)}            
            /> 
        )
    })
    return <div>
        {renderedAuthoredPosts}
    </div>
}

export default ProfileHome; 