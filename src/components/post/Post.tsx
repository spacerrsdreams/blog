import type { UserBasicInfoT } from "@/types";

import { type Value } from "react-quill";

import PostBar from "@/components/post/actions/PostBar";
import ArticleContent from "@/components/post/article/ArticleContent";
import ArticleCover from "@/components/post/article/ArticleCover";
import { PostProvider } from "@/components/post/context/PostContext";

type Props = {
  content: Value;
  coverImageSrc?: string;
  slug?: string;
  title: string;
  subTitle: string;
  author: UserBasicInfoT;
  tag: string;
  createdAt: Date;
  totalLikes: number;
  userTotalLikes: number;
  totalComments: number;
  isLikedByUser?: boolean;
  isBookmarked?: boolean;
  disableActions?: boolean;
  articleId: string;
  viewCount: number;
  handleRemoveImage?: () => void;
};

export default function Post({
  articleId,
  title,
  slug,
  viewCount,
  subTitle,
  author,
  tag,
  content,
  coverImageSrc,
  createdAt,
  totalComments,
  totalLikes,
  isLikedByUser,
  disableActions = false,
  isBookmarked,
  userTotalLikes,
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
        <PostProvider
          data={{
            title,
            subTitle,
            tag,
            postId: articleId,
            createdAt,
            author,
            totalLikes,
            userTotalLikes,
            totalComments,
            isLikedByUser,
            isBookmarked,
            viewCount,
            disableActions,
          }}
        >
          <PostBar slug={slug as string} />
        </PostProvider>
        <ArticleContent postContent={content} />
      </div>
    </article>
  );
}
