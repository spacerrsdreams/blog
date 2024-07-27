import Image from "next/image";
import { type Value } from "react-quill";

import { formatDate } from "@/utils/formatDate";
import ArticleContent from "@/components/shared/article/ArticleContent";
import CommentSheet from "@/components/shared/CommentSheet";
import LikeButton from "@/components/shared/LikeButton";

type Props = {
  userId: string;
  articleId: string;
  title: string;
  subTitle: string;
  authorImageUrl: string | undefined;
  authorFullName: string;
  tag: string;
  content: Value;
  coverImageSrc: string | undefined;
  createdAt: Date;
  likesLength: number;
  commentsLength: number;
  disableActions?: boolean;
};

export default function Article({
  userId,
  articleId,
  title,
  subTitle,
  authorImageUrl,
  authorFullName,
  tag,
  content,
  coverImageSrc,
  createdAt,
  likesLength,
  commentsLength,
  disableActions = false,
}: Props) {
  return (
    <article className="flex size-full flex-col gap-10 px-20">
      {coverImageSrc && (
        <div className="relative mt-10 flex w-full flex-col items-center justify-center gap-2">
          <Image
            src={coverImageSrc}
            alt={title}
            className="h-[600px] w-full bg-cover"
            width={800}
            height={800}
          />
          <p className="text-xs text-muted-foreground">
            სურათი შეიქმნა <span className="font-bold text-black">Adult Swim</span> -ის მიერ.
          </p>
        </div>
      )}

      <div className="mx-6 flex flex-col justify-center gap-8 self-center">
        <div className="flex w-full flex-col gap-3">
          <h1 className="text-5xl font-bold">{title}</h1>
          <h3 className="text-xl text-muted-foreground">{subTitle}</h3>
        </div>
        <div className="flex flex-col">
          <div className="mx-3 flex gap-4">
            {authorImageUrl && (
              <Image
                src={authorImageUrl}
                alt={authorFullName}
                width={48}
                height={48}
                className="size-12 rounded-full"
              />
            )}

            <div className="">
              <h4 className="text-lg capitalize">{authorFullName}</h4>
              <div className="text-sm text-muted-foreground">
                Published in <span className="text-sm font-semibold text-black">{tag}</span> ·{" "}
                {formatDate(createdAt)}
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center border-b border-t border-border/60 py-1">
            <LikeButton
              disabled={disableActions}
              count={likesLength}
              postId={articleId}
              userId={userId}
            />
            <CommentSheet
              userId={userId}
              postId={articleId}
              commentsCount={commentsLength}
              disabled={disableActions}
            />
          </div>
        </div>
        <ArticleContent postContent={content} />
      </div>
    </article>
  );
}
