/* eslint-disable import/named */
"use client";

import type { BookmarkedPost } from "@/types";
import { v4 as uuidv4 } from "uuid";

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";

import { useGetBookmarksByAuthor } from "@/services/post/bookmark";
import NotFound from "@/components/post/NotFound";
import PostPreview from "@/components/post/PostPreview";
import { Skeleton } from "@/components/ui/skeleton";

const POST_LOADING_LIMIT = 10;
export default function Bookmarks() {
  const loader = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [allPosts, setAllPosts] = useState<BookmarkedPost[]>([]);
  const [initialCallIsLoading, setInitialCallIsLoading] = useState(true);
  const { isPending, mutateAsync: fetchBookmarksByAuthor, error } = useGetBookmarksByAuthor();
  const [dynamicScroll, setDynamicScroll] = useState({ from: 0, to: POST_LOADING_LIMIT });
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    setAllPosts([]);
    setHasMore(true);
    fetchBookmarksByAuthor({ from: 0, to: POST_LOADING_LIMIT, id: user.id }).then((data) => {
      setAllPosts(data);
      setHasMore(data.length > 0);
      setInitialCallIsLoading(false);
    });
  }, [user]);

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
        {!isPending && (
          <h1 className="border-b border-border/50 pb-3 text-3xl font-bold sm:text-4xl">
            My Bookmarks
          </h1>
        )}
        {allPosts?.map((data) => (
          <PostPreview
            key={uuidv4()}
            postId={data.post.id}
            currentFeed="all"
            slug={data.post.slug}
            tag={data.post.tag}
            title={data.post.title}
            subTitle={data.post.subTitle}
            isLikedByUser={data.post.isLikedByUser}
            totalComments={data.post._count.comments}
            userTotalLikes={data.post.likes?.[0]?.likeCount || 0}
            totalLikes={data.post.likeCount}
            author={data.post.author}
            viewCount={data.post.viewCount}
            createdAt={data.post.createdAt}
            coverImageSrc={data.post.coverImageSrc}
            isBookmarked={true}
            onPostDelete={onPostDelete}
            onRemoveBookmark={onRemoveBookmark}
          />
        ))}
      </div>

      {!error && allPosts.length > 0 && <div ref={loader} />}

      {!isPending && allPosts.length === 0 && <NotFound />}

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
