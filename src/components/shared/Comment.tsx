"use server";

import { getUserByUserId } from "@/server/user";
import type { CommentT } from "@/types";

import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

import { formatCommentDate } from "@/utils/formatCommentDate";

import { CommentOption } from "./CommentOption";

type dataPropsType = {
  data: {
    comment: CommentT;
  };
};
export default async function Comment({ data }: dataPropsType) {
  const commentAuthor = await getUserByUserId(data.comment.userId);
  const { userId } = auth();
  return (
    <div className="mx-3 flex w-full items-center gap-4">
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Image
              src={commentAuthor?.imageUrl || ""}
              alt={commentAuthor?.username || ""}
              width={24}
              height={24}
              className="size-8 rounded-full"
            />
            <div className="flex flex-col">
              <h4 className="text-sm capitalize">{commentAuthor?.username}</h4>
              <span className="text-sm text-gray-500">
                {formatCommentDate(data.comment.createdAt)}
              </span>
            </div>
          </div>
          <div className="translate-x-[-30px]">
            {userId === commentAuthor?.id && <CommentOption commentId={data.comment.id} />}
          </div>
        </div>
        <span className="text-sm">{data.comment.content}</span>
      </div>
    </div>
  );
}
