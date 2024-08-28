"use client";

import type { UserBasicInfoT } from "@/types";

import { useState } from "react";

import { formatDate } from "@/utils/formatDate";
import BookmarkButton from "@/components/post/actions/BookmarkButton";
import MoreActionsButton from "@/components/post/actions/MoreActionsButton";
import PostAction from "@/components/post/actions/PostAction";
import { Icons } from "@/components/shared/Icons";

export type PostPreviewEngagementBarProps = {
  postId: string;
  slug: string;
  viewCount: number;
  isBookmarked: boolean;
  isLikedByUser: boolean;
  totalComments: number;
  totalLikes: number;
  createdAt: Date;
  author: UserBasicInfoT;
  userTotalLikes: number;
  onPostDelete?: (postId: string) => void;
  onRemoveBookmark?: (postId: string) => void;
};

export default function PostPreviewEngagementBar({
  postId,
  slug,
  isBookmarked,
  isLikedByUser,
  totalComments,
  totalLikes,
  userTotalLikes,
  createdAt,
  author,
  viewCount,
  onPostDelete,
  onRemoveBookmark,
}: PostPreviewEngagementBarProps) {
  const [postIsLikedByUser, setIsLikedByUser] = useState(isLikedByUser);
  const [totalPostLikes, setTotalPostLikes] = useState(totalLikes);

  const onUnlike = () => {
    setTotalPostLikes((prev) => prev - userTotalLikes);
    setIsLikedByUser(false);
  };

  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-2 text-xs">
        <span className="w-max text-muted-foreground">{formatDate(new Date(createdAt))}</span>

        <PostAction
          Icon={<Icons.clap />}
          IconDark={<Icons.clapDark />}
          isSelected={postIsLikedByUser}
          totalCount={totalPostLikes}
          displayClassName="flex items-center"
          type="display"
        />
        <PostAction
          Icon={<Icons.message />}
          totalCount={totalComments}
          displayClassName="flex items-center"
          type="display"
        />
        <PostAction
          Icon={<Icons.views className="pl-2" />}
          totalCount={viewCount}
          displayClassName="flex items-center gap-[2px]"
          type="display"
        />
      </div>
      <div className="flex items-center">
        <BookmarkButton
          isBookmarked={isBookmarked}
          postId={postId}
          onRemoveBookmark={onRemoveBookmark}
        />

        <MoreActionsButton
          className="hidden sm:block"
          isLikedByUser={postIsLikedByUser}
          slug={slug}
          authorId={author.id}
          postId={postId}
          onPostDelete={onPostDelete}
          onUnlike={onUnlike}
        />
      </div>
    </div>
  );
}
