/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { TAGS, type TagsT } from "@/constants/tags";
import { v4 as uuidv4 } from "uuid";

import { useEffect, useState } from "react";

import { siteConfig } from "@/config/siteConfig";
import { useGetSuggestions } from "@/services/post/suggestion";
import { type ArticleT } from "@/services/types";
import SuggestionPreview from "@/components/post/PostPreview";

type Props = {
  feed: string;
};
export default function Suggestions({ feed }: Props) {
  const { mutateAsync: getSuggestions } = useGetSuggestions();
  const [posts, setPosts] = useState<ArticleT[]>([]);
  const feedToFetch = TAGS.includes(feed as TagsT) ? feed : "all";

  useEffect(() => {
    getSuggestions(feedToFetch).then((data) => {
      setPosts(data);
    });
  }, []);

  return (
    <div className="mt-10 px-4 md:px-20">
      <h2 className="mx-2 mb-2 text-xl font-medium md:mx-6">{`Suggested From ${siteConfig.name}`}</h2>
      <div className="mx-2 grid grid-cols-1 gap-6 border-t pt-4 md:mx-6 md:grid-cols-2">
        {posts.map((post) => (
          <SuggestionPreview
            key={uuidv4()}
            postId={post.id}
            userTotalLikes={post?.likes?.[0]?.likeCount || 0}
            totalComments={post._count.comments}
            totalLikes={post.likeCount}
            currentFeed={feedToFetch || ""}
            viewCount={post.viewCount}
            tag={post.tag}
            title={post.title}
            subTitle={post.subTitle}
            author={post.author}
            createdAt={post.createdAt}
            coverImageSrc={post.coverImageSrc}
            isBookmarked={post.isBookmarked}
            isLikedByUser={post.isLikedByUser}
          />
        ))}
      </div>
    </div>
  );
}
