import type { Metadata } from "next";
import type { Value } from "react-quill";

import { siteConfig } from "@/config/siteConfig";
import prismaClient from "@/lib/prisma";
import Article from "@/components/shared/article/Article";

export const dynamicParams = true;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  const post = await prismaClient.posts.findUnique({
    where: {
      slug: slug,
    },
  });

  return {
    title: post?.title || siteConfig.name,
    openGraph: {
      images: [post?.coverImageSrc || "/images/rick-and-morty.jpg"],
    },
  };
}

export async function generateStaticParams() {
  const posts = await prismaClient.posts.findMany({
    select: {
      slug: true,
    },
  });

  return posts;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const post = await prismaClient.posts.findUnique({
    where: {
      slug: slug,
    },
    include: {
      author: true,
      likes: true,
      comments: true,
      bookmarks: true,
    },
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="flex w-full justify-center py-2">
      <div className="max-w-[680px] py-2">
        <Article
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
