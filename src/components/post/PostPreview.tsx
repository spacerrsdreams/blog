import type { UserBasicInfoT } from "@/types";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import MoreActionsButton from "@/components/post/actions/MoreActionsButton";
import type { PostPreviewEngagementBarProps } from "@/components/post/actions/PostPreviewEngagementBar";
import PostEngagementBar from "@/components/post/actions/PostPreviewEngagementBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type Props = PostPreviewEngagementBarProps & {
  slug: string;
  tag: string;
  title: string;
  subTitle: string;
  coverImageSrc: string | undefined;
  currentFeed: string;
  author: UserBasicInfoT;
};

export default function PostPreview({
  tag,
  title,
  postId,
  slug,
  subTitle,
  author,
  createdAt,
  coverImageSrc,
  currentFeed,
  isBookmarked,
  isLikedByUser,
  totalComments,
  totalLikes,
  userTotalLikes,
  viewCount,
  onPostDelete,
  onRemoveBookmark,
}: Props) {
  const [_postIsLikedByUser, setIsLikedByUser] = useState(isLikedByUser);
  const [_totalPostLikes, setTotalPostLikes] = useState(totalLikes);

  const onUnlike = () => {
    setTotalPostLikes((prev) => prev - userTotalLikes);
    setIsLikedByUser(false);
  };
  return (
    <div className="flex w-full flex-col gap-2 border-b border-border/50 pb-8">
      <div className="flex w-full items-center justify-between text-xs">
        <div className="flex items-center gap-1">
          <Link
            className="z-[10] flex cursor-pointer items-center gap-2"
            href={`/author/${author.username}`}
          >
            <Avatar className="size-6">
              <AvatarImage src={author.imageUrl} alt="author image" />
              <AvatarFallback>{author.firstName}</AvatarFallback>
            </Avatar>

            <span className="whitespace-nowrap capitalize">
              {author.firstName} {author.lastName}
            </span>
          </Link>
          <span className="text-muted-foreground">in</span>
          {currentFeed !== tag ? (
            <Link href={`/?feed=${tag}`}>
              <h5 className="font-semibold capitalize underline">{tag}</h5>
            </Link>
          ) : (
            <h5 className="font-semibold capitalize">{tag}</h5>
          )}
        </div>
        <MoreActionsButton
          className="block h-6 sm:hidden"
          isLikedByUser={isLikedByUser}
          authorId={author.id}
          postId={postId}
          onPostDelete={onPostDelete}
          onUnlike={onUnlike}
        />
      </div>
      <div className="flex items-center gap-4 sm:gap-8 md:gap-12">
        <div className="flex flex-1 flex-col gap-4">
          <Link className="flex flex-col gap-4" href={`/article/${slug}`}>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold capitalize sm:text-2xl">{title}</h3>
              <h4 className="text-sm text-muted-foreground md:text-base">
                {subTitle.length > 100 ? `${subTitle.slice(0, 100)}...` : subTitle}
              </h4>
            </div>
            <PostEngagementBar
              postId={postId}
              slug={slug}
              isBookmarked={isBookmarked}
              isLikedByUser={isLikedByUser}
              totalComments={totalComments}
              totalLikes={totalLikes}
              userTotalLikes={userTotalLikes}
              createdAt={createdAt}
              author={author}
              viewCount={viewCount}
              onPostDelete={onPostDelete}
              onRemoveBookmark={onRemoveBookmark}
            />
          </Link>
        </div>
        {coverImageSrc && (
          <Link href={`/article/${slug}`}>
            <Image
              src={coverImageSrc}
              width={800}
              height={600}
              className="block h-20 w-28 rounded-[2px] bg-cover sm:h-[110px] md:w-40"
              alt="morty's mind blowers"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
