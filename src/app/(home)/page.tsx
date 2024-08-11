"use client";

import { TAGS, type TagsT } from "@/constants/tags";
import type { PostT } from "@/types";
// eslint-disable-next-line import/named
import { v4 as uuidv4 } from "uuid";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useGetArticles } from "@/services/post/article";
import Post from "@/components/post/Post";
import { Skeleton } from "@/components/ui/skeleton";

const POST_LOADING_LIMIT = 10;

export default function Home() {
  const loader = useRef(null);
  const searchParams = useSearchParams();
  const [hasMore, setHasMore] = useState(true);
  const [allPosts, setAllPosts] = useState<PostT[]>([]);
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

  const onUnlike = (postId: string, userLikeCount: number) => {
    setAllPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLikedByUser: false,
              likeCount: post.likeCount - userLikeCount,
            }
          : post,
      ),
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-12">
        {allPosts.map((post) => (
          <Post
            key={uuidv4()}
            id={post.id}
            likes={post.likes}
            currentFeed={feedToFetch || ""}
            slug={post.slug}
            tag={post.tag}
            title={post.title}
            subTitle={post.subTitle}
            likeCount={post.likeCount}
            _count={post._count}
            author={post.author}
            createdAt={post.createdAt}
            coverImageSrc={post.coverImageSrc}
            isBookmarked={post.isBookmarked}
            isLikedByUser={post.isLikedByUser}
            onPostDelete={onPostDelete}
            onUnlike={onUnlike}
          />
        ))}
      </div>

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
