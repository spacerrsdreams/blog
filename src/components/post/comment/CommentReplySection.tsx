"use client";

import { useEffect, useRef, useState } from "react";

import { useGetComments } from "@/services/post/comment";
import NotFound from "@/components/post/comment/NotFound";

import CommentEditor from "./CommentEditor";
import { useCommentProvider } from "./CommentProvider";
import CommentReply from "./CommentReply";
import { CommentSkeleton } from "./CommentSkeleton";

type Props = {
  postId: string;
};
const POST_LOADING_LIMIT = 10;
export default function CommentSection({ postId }: Props) {
  const { mutateAsync: fetchComments, isPending, error } = useGetComments();
  const { inEdit, currentCommentId, setComments, setCommentsReplies, commentsReplies } =
    useCommentProvider();
  const loader = useRef(null);
  const [dynamicScroll, setDynamicScroll] = useState({ from: 0, to: POST_LOADING_LIMIT });
  const [initialCallIsLoading, setInitialCallIsLoading] = useState(true);

  const [hasMore, setHasMore] = useState(true);
  console.log(commentsReplies);

  useEffect(() => {
    setCommentsReplies([]);
    setHasMore(true);
    fetchComments({ from: 0, to: POST_LOADING_LIMIT, id: postId }).then((newReplies) => {
      setCommentsReplies(newReplies);
      setHasMore(newReplies.length > 0);
      setInitialCallIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (hasMore && !isPending && !initialCallIsLoading) {
      fetchComments({ ...dynamicScroll, id: postId }).then((newReplies) => {
        setComments((prevReplies) => [...prevReplies, ...newReplies]);
        setHasMore(newReplies.length > 0);
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
  return (
    <>
      <div className="mt-8 flex flex-col gap-6 overflow-y-auto">
        {commentsReplies?.map((reply) => {
          console.log(reply);
          if (reply.parentId === null) return;
          return (
            <div key={reply.id}>
              {inEdit && reply.id === currentCommentId ? (
                <CommentEditor content={reply.content} />
              ) : (
                <CommentReply comment={reply} />
              )}
              <div className="mt-4 w-full border-[0.5px] border-gray-300"></div>
            </div>
          );
        })}
      </div>
      {!error && commentsReplies.length > 0 && <div ref={loader} />}
      {!isPending && commentsReplies.length === 0 && <NotFound />}

      {isPending && (
        <div className="flex flex-col gap-12">
          {Array.from({ length: POST_LOADING_LIMIT }).map((_, idx) => (
            <CommentSkeleton key={idx} />
          ))}
        </div>
      )}
    </>
  );
}
