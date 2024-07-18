"use client";

import type { CommentT } from "@/types";

import Image from "next/image";

import { formatCommentDate } from "@/utils/formatCommentDate";

type dataPropsType = {
  data: {
    name: string | null;
    image: string;
    authId: string;
    postId: string;
    comment: CommentT;
  };
};
export default function Comment({ data }: dataPropsType) {
  console.log(data.comment);
  return (
    <div className="mx-3 flex items-center gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Image
            src={data.image}
            alt={data.name || ""}
            width={24}
            height={24}
            className="size-8 rounded-full"
          />
          <div className="flex flex-col">
            <h4 className="text-sm capitalize">{data.name}</h4>
            <span className="text-sm text-gray-500">
              {formatCommentDate(data.comment.createdAt)}
            </span>
          </div>
        </div>
        <span className="text-sm">{data.comment.content}</span>
      </div>
    </div>
  );
}
