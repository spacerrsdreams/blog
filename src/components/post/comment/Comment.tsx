"use client";

import type { CommentT } from "@/types";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";

import { formatCommentDate } from "@/utils/formatCommentDate";

import { CommentOption } from "./CommentOption";

type Props = {
  comment: CommentT;
};
export default function Comment({ comment }: Props) {
  const loggedInUser = useUser();

  const isCommentCreator = loggedInUser?.user?.id === comment.userId;
  return (
    <div className="mx-3 flex w-full items-center gap-4">
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
      </div>
    </div>
  );
}
