import { getUserByUserId } from "@/server/user";
import type { CommentT } from "@/types";

import Image from "next/image";

import { formatCommentDate } from "@/utils/formatCommentDate";

import { CommentOption } from "./CommentOption";

type dataPropsType = {
  data: {
    comment: CommentT;
  };
};
export default async function Comment({ data }: dataPropsType) {
  const user = await getUserByUserId(data.comment.userId);
  return (
    <div className="mx-3 flex items-center gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Image
            src={user.imageUrl}
            alt={user.username || ""}
            width={24}
            height={24}
            className="size-8 rounded-full"
          />
          <div className="flex flex-col">
            <h4 className="text-sm capitalize">{user.username}</h4>
            <span className="text-sm text-gray-500">
              {formatCommentDate(data.comment.createdAt)}
            </span>
          </div>
          <CommentOption />
        </div>
        <span className="text-sm">{data.comment.content}</span>
      </div>
    </div>
  );
}
