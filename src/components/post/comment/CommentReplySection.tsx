"use client";

import { useEffect, useRef, useState } from "react";

import { useGetCommentReplies } from "@/services/post/reply";
import CommentEditor from "@/components/post/comment/CommentEditor";

import { useCommentProvider } from "./CommentProvider";
import CommentReply from "./CommentReply";
import { CommentSkeleton } from "./CommentSkeleton";

type Props = {
  commentId: string;
};
const POST_LOADING_LIMIT = 10;
export default function CommentReplySection({ commentId }: Props) {
  const { mutateAsync: fetchComments, isPending, error } = useGetCommentReplies();
  const { setComments, setCommentsReplies, commentsReplies, currentCommentInfo, inEdit } =
    useCommentProvider();
  const loader = useRef(null);
  const [dynamicScroll, setDynamicScroll] = useState({ from: 0, to: POST_LOADING_LIMIT });
  const [initialCallIsLoading, setInitialCallIsLoading] = useState(true);

  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setCommentsReplies([]);
    setHasMore(true);
    fetchComments({ from: 0, to: POST_LOADING_LIMIT, id: commentId }).then((newReplies) => {
      setCommentsReplies(newReplies);
      setHasMore(newReplies.length > 0);
      setInitialCallIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (hasMore && !isPending && !initialCallIsLoading) {
      fetchComments({ ...dynamicScroll, id: commentId }).then((newReplies) => {
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
      <div className="flex flex-col">
        {commentsReplies?.map((reply) => {
          return (
            <div key={reply.id}>
              {inEdit && reply.id === currentCommentInfo.rootId ? (
                <CommentEditor content={reply.content} />
              ) : (
                <CommentReply key={reply.id} comment={reply} />
              )}
            </div>
          );
        })}
      </div>

      {!error && commentsReplies.length > 0 && <div ref={loader} />}

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
