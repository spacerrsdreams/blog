"use client";

import type { CommentWithUserProps } from "@/types";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";

import { formatCommentDate } from "@/utils/formatCommentDate";
import CommentLikeButton from "@/components/post/comment/CommentLikeButton";
import { useCommentProvider } from "@/components/post/comment/CommentProvider";
import CommentReplyForm from "@/components/post/comment/CommentReplyForm";
import CommentReplySection from "@/components/post/comment/CommentReplySection";

import { CommentOption } from "./CommentOption";

type Props = {
  comment: CommentWithUserProps;
};

export default function Comment({ comment }: Props) {
  const {
    inReply,
    setInReply,
    setCurrentCommentInfo,
    currentCommentInfo,
    viewReply,
    setViewReply,
    comments,
    deletedCommentId,
  } = useCommentProvider();

  const [totalCommentLikes, setTotalCommentLikes] = useState(comment.totalLikes);
  const [isLikedByUser, _setIsLikedByUser] = useState(comment.isLikedByUser);
  const [hasReply, setHasReply] = useState(false);
  const loggedInUser = useUser();
  const isCommentCreator = loggedInUser?.user?.id === comment.userId;
  const threadId = currentCommentInfo.parentId
    ? currentCommentInfo.parentId
    : currentCommentInfo.rootId;

  useEffect(() => {
    setHasReply(comments.some((data) => data.parentId === comment.id));
  }, [deletedCommentId, comments.length]);

  return (
    <div
      className={`flex w-full items-center gap-4 ${viewReply && comment.id === threadId && hasReply ? "border-l-[1px]" : ""} pl-4`}
    >
      <div className="flex w-full flex-col gap-3">
        <div className="flex items-center gap-3">
          <Image
            src={comment.user.imageUrl}
            alt={comment.user.username}
            width={24}
            height={24}
            className="size-8 rounded-full"
          />

          <div className="flex w-full justify-between">
            <div className="flex flex-col">
              <h4 className="text-sm capitalize">{comment.user.username}</h4>
              <span className="text-sm text-gray-500">{formatCommentDate(comment.createdAt)}</span>
            </div>
            <div className="-translate-x-6">
              {isCommentCreator && <CommentOption commentId={comment.id} />}
            </div>
          </div>
        </div>
        <span className="text-sm">{comment.content}</span>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CommentLikeButton
              totalCommentLikes={totalCommentLikes}
              setTotalCommentLikes={setTotalCommentLikes}
              commentId={comment.id}
              isLikedByUser={isLikedByUser}
            />
            {hasReply && (
              <span
                className="text-sm hover:cursor-pointer hover:underline"
                onClick={() => {
                  viewReply && comment.id === currentCommentInfo.rootId
                    ? setViewReply(false)
                    : setViewReply(true);
                  setCurrentCommentInfo({ rootId: comment.id });
                }}
              >
                {viewReply && comment.id === currentCommentInfo.rootId
                  ? "Hide Replies"
                  : "View Replies"}
              </span>
            )}
          </div>
          <span
            className="mr-7 text-sm hover:cursor-pointer hover:underline"
            onClick={() => {
              setCurrentCommentInfo({ rootId: comment.id });
              setInReply(true);
            }}
          >
            Reply
          </span>
        </div>
        {inReply && comment.id === currentCommentInfo.rootId && (
          <CommentReplyForm
            postId={comment.postId}
            commentId={comment.id}
            setHasReply={setHasReply}
          />
        )}
        {viewReply && comment.id === threadId && <CommentReplySection commentId={comment.id} />}
      </div>
    </div>
  );
}
