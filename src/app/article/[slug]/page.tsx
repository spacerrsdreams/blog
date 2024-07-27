import { auth } from "@clerk/nextjs/server";
import { type Value } from "react-quill";

import { ERROR_CODES } from "@/lib/error";
import prisma from "@/lib/prisma";
import Article from "@/components/shared/article/Article";

export default async function Page({ params }: { params: { slug: string } }) {
  const { userId } = auth();
  const post = await prisma.posts.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      likes: true,
      comments: true,
      author: true,
    },
  });

  if (!post) {
    throw new Error(ERROR_CODES.POST_NOT_FOUND);
  }

  if (!userId) {
    throw new Error(ERROR_CODES.AUTHOR_NOT_FOUND);
  }

  return (
    <div className="flex w-full justify-center py-2">
      <div className="max-w-[680px] py-2">
        <Article
          userId={userId}
          articleId={post.id}
          title={post.title}
          subTitle={post.subTitle}
          authorImageUrl={post.author.imageUrl}
          authorFullName={`${post.author.firstName} ${post.author.lastName}`}
          tag={post.tag}
          content={post.content as Value}
          coverImageSrc={post.coverImageSrc}
          createdAt={post.createdAt}
          likesLength={post.likes.length}
          commentsLength={post.comments.length}
        />
      </div>
    </div>
  );
}
