import React, { useState, useEffect } from "react";
import { api } from "~/trpc/react"; 
import PostCard from "../postcard/profile-post-card";

const ProfileHome = () => {
  const { data: authoredPosts } = api.profile.fetchAllAuthoredPosts.useQuery();
  const { mutateAsync } = api.user.downloadFile.useMutation();
  const [authorImages, setAuthorImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchAuthorImages = async () => {
      if (authoredPosts) {
        const imageFetchPromises = authoredPosts.map(async (post) => {
          if (post.createdBy.image_key) {
            const imgObj = await mutateAsync({ key: post.createdBy.image_key });
            if (imgObj) {
              return { [post.createdBy.id]: imgObj.link };
            }
          }
          return { [post.createdBy.id]: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" };
        });

        const images = await Promise.all(imageFetchPromises);
        const imagesObject = images.reduce((acc, image) => ({ ...acc, ...image }), {});
        setAuthorImages(imagesObject);
      }
    };

    void fetchAuthorImages();
  }, [authoredPosts, mutateAsync]);

  const renderedAuthoredPosts = authoredPosts?.map((post) => {
    return (
      <PostCard
        key={post.id}
        id={post.id}
        authorName={post.name}
        previewTitle={post.previewTitle}
        previewSubtitle={post.previewSubtitle}
        image_link={post.key}
        userImage={authorImages[post.createdBy.id] ?? ""}
        tags={post.topics.map((topic) => topic.topic.name)}
      />
    );
  });

  return <div>{renderedAuthoredPosts}</div>;
};

export default ProfileHome;
