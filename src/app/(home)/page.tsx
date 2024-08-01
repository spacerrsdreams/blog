"use client";

import type { PostT } from "@/types";
import { uuid } from "uuidv4";

import { useEffect, useRef, useState } from "react";

import { useGetArticles } from "@/services/post/article";
import Post from "@/components/shared/Post";
import { Skeleton } from "@/components/ui/skeleton";

const POST_LOADING_LIMIT = 10;

export default function Home() {
  const { isPending, mutateAsync: fetchArticles } = useGetArticles();
  const [pagination, setPagination] = useState({ from: 0, to: POST_LOADING_LIMIT });
  const [allPosts, setAllPosts] = useState<PostT[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  useEffect(() => {
    if (hasMore && !isPending) {
      fetchArticles(pagination).then((newPosts) => {
        setAllPosts((prevPosts) => [...prevPosts, ...newPosts.data]);
        setHasMore(newPosts.data.length > 0);
      });
    }
  }, [pagination]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isPending && hasMore) {
          setPagination((prev) => ({
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

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-12">
        {allPosts.map((post) => (
          <Post
            key={uuid()}
            id={post.id}
            slug={post.slug}
            tag={post.tag}
            title={post.title}
            subTitle={post.subTitle}
            _count={post._count}
            author={post.author}
            createdAt={post.createdAt}
            coverImageSrc={post.coverImageSrc}
            isBookmarked={post.isBookmarked}
          />
        ))}
      </div>

      <div ref={loader} />

      {isPending && (
        <div className="flex flex-col gap-12">
          {Array.from({ length: POST_LOADING_LIMIT }).map((_, idx) => (
            <Skeleton key={idx} className="flex h-[193px] w-full" />
          ))}
        </div>
      )}
    </div>
  );
}
