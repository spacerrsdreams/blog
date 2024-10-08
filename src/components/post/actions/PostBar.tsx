"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { formatDate } from "@/utils/formatDate";
import { ROUTES } from "@/utils/routes";
import BookmarkButton from "@/components/post/actions/BookmarkButton";
import LikeButton from "@/components/post/actions/LikeButton";
import MoreActionsButton from "@/components/post/actions/MoreActionsButton";
import PostAction from "@/components/post/actions/PostAction";
import CommentSheet from "@/components/post/comment/CommentSheet";
import { usePostContext } from "@/components/post/context/PostContext";
import { Icons } from "@/components/shared/Icons";

export default function PostBar() {
  const {
    title,
    subTitle,
    author,
    createdAt,
    tag,
    viewCount,
    userTotalLikes,
    isBookmarked,
    postId,
    isLikedByUser,
    setTotalLikes,
    setIsLikedByUser,
    setUserTotalLikes,
  } = usePostContext();
  const navigate = useRouter();

  return (
    <>
      <div className="flex w-full flex-col gap-3">
        <h1 className="text-3xl font-bold sm:text-5xl">{title}</h1>
        <h3 className="text-lg text-muted-foreground sm:text-xl">{subTitle}</h3>
      </div>
      <div className="flex flex-col">
        <div className="mx-3 flex gap-4">
          {author?.imageUrl && (
            <Image
              src={author?.imageUrl}
              alt={author?.firstName || ""}
              width={48}
              height={48}
              className="size-12 rounded-full"
            />
          )}
          <div>
            <h4 className="text-lg capitalize">{author?.firstName + " " + author?.lastName}</h4>
            <div className="text-sm text-muted-foreground">
              Published in <span className="text-sm font-semibold text-black">{tag}</span> ·{" "}
              {formatDate(createdAt)}
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between border-b border-t border-border/60 py-1">
          <div className="flex items-center gap-3">
            <LikeButton />
            <CommentSheet />
            <PostAction
              Icon={<Icons.views />}
              totalCount={viewCount}
              displayClassName="flex items-center text-sm font-medium gap-[2px]"
              type="display"
            />
          </div>
          <div className="flex items-center">
            <BookmarkButton fetchBookmarkState isBookmarked={isBookmarked} postId={postId} />
            <MoreActionsButton
              isLikedByUser={isLikedByUser}
              authorId={author?.id}
              postId={postId}
              onUnlike={() => {
                setIsLikedByUser(false);
                setTotalLikes((prev) => prev - userTotalLikes);
                setUserTotalLikes(0);
              }}
              onPostDelete={() => navigate.push(ROUTES.root)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
