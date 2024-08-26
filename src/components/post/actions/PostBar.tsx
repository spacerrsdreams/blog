"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { formatDate } from "@/utils/formatDate";
import { formatNumberWithK } from "@/utils/formatNumberWithK";
import { ROUTES } from "@/utils/routes";
import BookmarkButton from "@/components/post/actions/BookmarkButton";
import LikeButton from "@/components/post/actions/LikeButton";
import MoreActionsButton from "@/components/post/actions/MoreActionsButton";
import CommentSheet from "@/components/post/comment/CommentSheet";
import { usePostContext } from "@/components/post/context/PostContext";
import { Icons } from "@/components/shared/Icons";

type Props = {
  slug: string;
};

export default function PostBar({ slug }: Props) {
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
          <div className="flex items-center">
            <LikeButton />
            <CommentSheet />
            <span className="ml-3 flex items-center gap-1">
              <Icons.views />
              <span className="text-sm font-medium">{formatNumberWithK(viewCount)}</span>
            </span>
          </div>
          <div className="flex items-center">
            <BookmarkButton fetchBookmarkState isBookmarked={isBookmarked} postId={postId} />
            <MoreActionsButton
              isLikedByUser={isLikedByUser}
              slug={slug}
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
