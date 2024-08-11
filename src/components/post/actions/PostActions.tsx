"use client";

import type { UserBasicInfoT } from "@/types";

import { useState } from "react";

import { formatDate } from "@/utils/formatDate";
import { formatNumberWithK } from "@/utils/formatNumberWithK";
import BookmarkButton from "@/components/post/actions/BookmarkButton";
import MoreActionsButton from "@/components/post/actions/MoreActionsButton";
import { Icons } from "@/components/shared/Icons";

export type PostActionsProps = {
  postId: string;
  isBookmarked: boolean;
  isLikedByUser: boolean;
  totalComments: number;
  totalLikes: number;
  createdAt: Date;
  author: UserBasicInfoT;
  userTotalLikes: number;
  onPostDelete?: (postId: string) => void;
};

export default function PostActions({
  postId,
  isBookmarked,
  isLikedByUser,
  totalComments,
  totalLikes,
  userTotalLikes,
  createdAt,
  author,
  onPostDelete,
}: PostActionsProps) {
  const [postIsLikedByUser, setIsLikedByUser] = useState(isLikedByUser);
  const [totalPostLikes, setTotalPostLikes] = useState(totalLikes);

  const onUnlike = () => {
    setTotalPostLikes((prev) => prev - userTotalLikes);
    setIsLikedByUser(false);
  };

  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-2 text-xs">
        <span className="text-muted-foreground">{formatDate(new Date(createdAt))}</span>
        <span className="ml-4 flex items-center">
          {postIsLikedByUser ? <Icons.clapDark /> : <Icons.clap />}
          <span>{formatNumberWithK(totalPostLikes)}</span>
        </span>
        <span className="flex items-center">
          <Icons.message />
          <span>{formatNumberWithK(totalComments)}</span>
        </span>
      </div>
      <div className="flex items-center">
        <BookmarkButton isBookmarked={isBookmarked} postId={postId} />
        <MoreActionsButton
          isLikedByUser={postIsLikedByUser}
          authorId={author.id}
          postId={postId}
          onPostDelete={onPostDelete}
          onUnlike={onUnlike}
        />
      </div>
    </div>
  );
}
