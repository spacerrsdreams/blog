"use client";

import { TAGS, type TagsT } from "@/constants/tags";
import { v4 as uuidv4 } from "uuid";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useGetArticles } from "@/services/post/article";
import type { ArticleT } from "@/services/types";
import NotFound from "@/components/post/NotFound";
import PostPreview from "@/components/post/PostPreview";
import { Skeleton } from "@/components/ui/skeleton";

const POST_LOADING_LIMIT = 10;

export default function Home() {
  const loader = useRef(null);
  const searchParams = useSearchParams();
  const [hasMore, setHasMore] = useState(true);
  const [allPosts, setAllPosts] = useState<ArticleT[]>([]);
  const [initialCallIsLoading, setInitialCallIsLoading] = useState(true);
  const { isPending, mutateAsync: fetchArticles, error } = useGetArticles();
  const [dynamicScroll, setDynamicScroll] = useState({ from: 0, to: POST_LOADING_LIMIT });
  const feed = searchParams.get("feed");
  const feedToFetch = TAGS.includes(feed as TagsT) ? feed : "all";

  useEffect(() => {
    setAllPosts([]);
    setHasMore(true);
    fetchArticles({ from: 0, to: POST_LOADING_LIMIT, feed: feedToFetch || "all" }).then(
      (newPosts) => {
        setAllPosts(newPosts.data);
        setHasMore(newPosts.data.length > 0);
        setInitialCallIsLoading(false);
      },
    );
  }, [feed]);

  useEffect(() => {
    if (hasMore && !isPending && !initialCallIsLoading) {
      fetchArticles({ ...dynamicScroll, feed: feedToFetch || "all" }).then((newPosts) => {
        setAllPosts((prevPosts) => [...prevPosts, ...newPosts.data]);
        setHasMore(newPosts.data.length > 0);
      });
    }
  }, [dynamicScroll]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isPending && hasMore) {
          setDynamicScroll((prev) => ({
            from: prev.to,
            to: prev.to + POST_LOADING_LIMIT,
          }));
        }
      },
      { threshold: 1.0 },
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loader, isPending, hasMore]);

  const onPostDelete = (postId: string) => {
    setAllPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-12">
        {allPosts.length > 0 &&
          allPosts.map((post) => (
            <PostPreview
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
              onPostDelete={onPostDelete}
            />
          ))}
      </div>

      {!isPending && allPosts.length === 0 && <NotFound />}

      {!error && allPosts.length > 0 && <div ref={loader} />}

      {isPending && (
        <div className="flex flex-col gap-12">
          {Array.from({ length: POST_LOADING_LIMIT }).map((_, idx) => (
            <Skeleton key={idx} className="flex h-[161px] w-full border-b border-border/50 pb-8" />
          ))}
        </div>
      )}
    </div>
  );
}
