import type { UserBasicInfoT } from "@/types";

import Image from "next/image";
import { type Value } from "react-quill";

import { formatDate } from "@/utils/formatDate";
import ArticleContent from "@/components/post/article/ArticleContent";
import ArticleCover from "@/components/post/article/ArticleCover";
import BookmarkButton from "@/components/post/article/BookmarkButton";
import LikeButton from "@/components/post/article/LikeButton";
import MoreActionsButton from "@/components/post/article/MoreActionsButton";
import CommentSheet from "@/components/post/comment/CommentSheet";

type Props = {
  author: UserBasicInfoT;
  articleId: string;
  title: string;
  subTitle: string;
  tag: string;
  content: Value;
  coverImageSrc: string | undefined;
  createdAt: Date;
  likesLength: number;
  commentsLength: number;
  disableActions?: boolean;
  handleRemoveImage?: () => void;
};

export default function Article({
  articleId,
  title,
  subTitle,
  author,
  tag,
  content,
  coverImageSrc,
  createdAt,
  likesLength,
  commentsLength,
  disableActions = false,
  handleRemoveImage,
}: Props) {
  return (
    <article className="flex size-full flex-col gap-10 px-4 md:px-20">
      {coverImageSrc && (
        <ArticleCover
          src={coverImageSrc}
          alt={title}
          isEditing={disableActions}
          handleRemoveImage={handleRemoveImage}
        />
      )}
      <div className="mx-2 flex flex-col justify-center gap-8 self-center md:mx-6">
        <div className="flex w-full flex-col gap-3">
          <h1 className="text-5xl font-bold">{title}</h1>
          <h3 className="text-xl text-muted-foreground">{subTitle}</h3>
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

            <div className="">
              <h4 className="text-lg capitalize">{author?.firstName + " " + author?.lastName}</h4>
              <div className="text-sm text-muted-foreground">
                Published in <span className="text-sm font-semibold text-black">{tag}</span> ·{" "}
                {formatDate(createdAt)}
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between border-b border-t border-border/60 py-1">
            <div className="flex items-center">
              <LikeButton disabled={disableActions} count={likesLength} postId={articleId} />
              <CommentSheet
                postId={articleId}
                commentsCount={commentsLength}
                disabled={disableActions}
              />
            </div>
            <div className="flex items-center">
              <BookmarkButton isBookmarked={false} postId={articleId} />
              <MoreActionsButton isLikedByUser={null} authorId={author.id} postId={articleId} />
            </div>
          </div>
        </div>
        <ArticleContent postContent={content} />
      </div>
    </article>
  );
}
