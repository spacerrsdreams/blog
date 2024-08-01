"use client";

import type { PostT } from "@/types";
import { uuid } from "uuidv4";

import { useEffect, useRef, useState } from "react";

import { useGetArticles } from "@/services/post/article";
import Post from "@/components/shared/Post";

export default function Home() {
  const { isPending, mutateAsync: fetchArticles } = useGetArticles();
  const [pagination, setPagination] = useState({ from: 0, to: 10 });
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
            to: prev.to + 10,
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
    <div className="mt-8 flex flex-col gap-12">
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
      <div ref={loader} />
    </div>
  );
}
