/* eslint-disable import/named */
"use client";

import type { BookmarkedPost } from "@/types";
import { v4 as uuidv4 } from "uuid";

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";

import { useGetBookmarksByAuthor } from "@/services/post/bookmark";
import Post from "@/components/post/Post";
import { Skeleton } from "@/components/ui/skeleton";

const POST_LOADING_LIMIT = 10;

export default function Home() {
  const { user } = useUser();
  const { isPending, mutateAsync: fetchBookmarksByAuthor, error } = useGetBookmarksByAuthor();
  const [dynamicScroll, setDynamicScroll] = useState({ from: 0, to: POST_LOADING_LIMIT });
  const [allPosts, setAllPosts] = useState<BookmarkedPost[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  const [initialCallIsLoading, setInitialCallIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setAllPosts([]);
    setHasMore(true);
    fetchBookmarksByAuthor({ from: 0, to: POST_LOADING_LIMIT, id: user.id }).then((data) => {
      setAllPosts(data);
      setHasMore(data.length > 0);
      setInitialCallIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!user) return;

    if (hasMore && !isPending && !initialCallIsLoading) {
      fetchBookmarksByAuthor({ ...dynamicScroll, id: user.id }).then((data) => {
        setAllPosts((prevPosts) => [...prevPosts, ...data]);
        setHasMore(data.length > 0);
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
    setAllPosts((prevPosts) => prevPosts.filter((post) => post.postId !== postId));
  };
  const onRemoveBookmark = (postId: string) => {
    setAllPosts((prevPosts) => prevPosts.filter((post) => post.postId !== postId));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-12">
        {allPosts.map((data) => (
          <Post
            key={uuidv4()}
            id={data.post.id}
            currentFeed="all"
            slug={data.post.slug}
            tag={data.post.tag}
            title={data.post.title}
            subTitle={data.post.subTitle}
            _count={data.post._count}
            author={data.post.author}
            createdAt={data.post.createdAt}
            coverImageSrc={data.post.coverImageSrc}
            isBookmarked={true}
            onPostDelete={onPostDelete}
            onRemoveBookmark={onRemoveBookmark}
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
