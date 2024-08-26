import type { Metadata } from "next";
import type { Value } from "react-quill";

import { siteConfig } from "@/config/siteConfig";
import { database } from "@/lib/prisma";
import EditArticle from "@/components/post/article/EditArticle";

export const dynamicParams = true;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  const post = await database.posts.findUnique({
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
  const posts = await database.posts.findMany({
    select: {
      id: true,
    },
  });
  return posts;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const post = await database.posts.findUnique({
    where: {
      id: slug,
    },
    include: {
      author: true,
      likes: true,
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
  post;

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <EditArticle
      author={post.author}
      articleId={post.id}
      viewCount={post.viewCount}
      title={post.title}
      subTitle={post.subTitle}
      tag={post.tag}
      content={post.content as Value}
      coverImageSrc={post.coverImageSrc}
      createdAt={post.createdAt}
      likesLength={post.likes.length}
      commentsLength={post._count.comments}
    />
  );
}
