"use client";

import type { CommentWithUserProps } from "@/types";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";

import { formatCommentDate } from "@/utils/formatCommentDate";
import CommentLikeButton from "@/components/post/comment/CommentLikeButton";
import { CommentOption } from "@/components/post/comment/CommentOption";

type Props = {
  comment: CommentWithUserProps;
};

export default function CommentReply({ comment }: Props) {
  const [totalCommentLikes, setTotalCommentLikes] = useState(comment.totalLikes);
  const [isLikedByUser, _setIsLikedByUser] = useState(comment.isLikedByUser);
  const loggedInUser = useUser();

  const isCommentCreator = loggedInUser?.user?.id === comment.userId;

  return (
    <div className="mx-4 flex w-full items-center gap-4">
      <div className="flex w-full flex-col gap-2">
        <div className="relative flex items-center gap-3">
          <Image
            src={comment.user.imageUrl}
            alt={comment.user.username}
            width={22}
            height={22}
            className="size-7 rounded-full"
          />

          <div className="flex w-full justify-between">
            <div className="flex flex-col">
              <h4 className="text-[13px] capitalize">{comment.user.username}</h4>
              <span className="text-[13px] text-gray-500">
                {formatCommentDate(comment.createdAt)}
              </span>
            </div>
            <div className="-translate-x-6">
              {isCommentCreator && (
                <CommentOption commentId={comment.id} parentId={comment.parentId} />
              )}
            </div>
          </div>
          <div className="absolute -left-[34px] bottom-[18px] h-5 w-7 rounded-bl-lg border-b-[1px] border-l-2"></div>
        </div>
        <span className="text-[13px]">{comment.content}</span>
        <div className="flex items-center justify-between">
          <CommentLikeButton
            totalCommentLikes={totalCommentLikes}
            setTotalCommentLikes={setTotalCommentLikes}
            commentId={comment.id}
            isLikedByUser={isLikedByUser}
          />
        </div>
      </div>
    </div>
  );
}
