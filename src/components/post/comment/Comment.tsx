"use client";

import type { CommentWithUserProps } from "@/types";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";

import { formatCommentDate } from "@/utils/formatCommentDate";
import CommentLikeButton from "@/components/post/comment/CommentLikeButton";
import { useCommentProvider } from "@/components/post/comment/CommentProvider";
import CommentReply from "@/components/post/comment/CommentReply";
import CommentReplyForm from "@/components/post/comment/CommentReplyForm";

import { CommentOption } from "./CommentOption";

type Props = {
  comment: CommentWithUserProps;
};

export default function Comment({ comment }: Props) {
  const {
    inReply,
    setInReply,
    setCurrentCommentId,
    currentCommentId,
    comments,
    viewReply,
    setViewReply,
  } = useCommentProvider();
  const [totalCommentLikes, setTotalCommentLikes] = useState(comment.totalLikes);
  const [isLikedByUser, _setIsLikedByUser] = useState(comment.isLikedByUser);
  const loggedInUser = useUser();

  const isCommentCreator = loggedInUser?.user?.id === comment.userId;
  return (
    <div
      className={`flex w-full items-center gap-4 ${viewReply && comment.id === currentCommentId ? "border-l-[1px]" : ""} pl-4`}
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
            <span
              className="text-sm hover:cursor-pointer hover:underline"
              onClick={() => {
                setViewReply(!viewReply);
                setCurrentCommentId(comment.id);
              }}
            >
              {viewReply && comment.id === currentCommentId ? "Hide Replies" : "View Replies"}
            </span>
          </div>
          <span
            className="mr-7 text-sm hover:cursor-pointer hover:underline"
            onClick={() => {
              setCurrentCommentId(comment.id);
              setInReply(true);
            }}
          >
            Reply
          </span>
        </div>
        {inReply && comment.id === currentCommentId && <CommentReplyForm postId={comment.postId} />}
        {viewReply && comment.id === currentCommentId && (
          <div className="flex flex-col">
            {comments
              .filter((reply) => reply.parentId === comment.id)
              .map((reply) => (
                <CommentReply key={reply.id} comment={reply} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
