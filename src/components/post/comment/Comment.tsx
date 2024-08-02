"use client";

import { type CommentT, type UserPayload } from "@/types";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";

import { formatCommentDate } from "@/utils/formatCommentDate";
import { useGetUserById } from "@/services/user/userById";

import { CommentOption } from "./CommentOption";
import { CommentSkeleton } from "./CommentSkeleton";

type Props = {
  comment: CommentT;
};
export default function Comment({ comment }: Props) {
  const [user, setUser] = useState<UserPayload | null>(null);
  const { mutateAsync: getUserByIdAsync, isPending } = useGetUserById();
  const loggedInUser = useUser();

  useEffect(() => {
    getUserByIdAsync({ userId: comment.userId }).then((data) => {
      setUser(data);
    });
  }, [getUserByIdAsync, comment.userId]);

  return isPending ? (
    <CommentSkeleton />
  ) : (
    <div className="mx-3 flex w-full items-center gap-4">
      <div className="flex w-full flex-col gap-3">
        <div className="flex items-center gap-3">
          {user && (
            <Image
              src={user.imageUrl}
              alt={user?.username || ""}
              width={24}
              height={24}
              className="size-8 rounded-full"
            />
          )}
          <div className="flex w-full justify-between">
            <div className="flex flex-col">
              <h4 className="text-sm capitalize">{user?.username}</h4>
              <span className="text-sm text-gray-500">{formatCommentDate(comment.createdAt)}</span>
            </div>
            <div className="-translate-x-6">
              {loggedInUser.user?.id === user?.id && <CommentOption commentId={comment.id} />}
            </div>
          </div>
        </div>
        <span className="text-sm">{comment.content}</span>
      </div>
    </div>
  );
}
