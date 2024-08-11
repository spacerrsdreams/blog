import type { Metadata } from "next";
import type { Value } from "react-quill";

import { siteConfig } from "@/config/siteConfig";
import { database } from "@/lib/prisma";
import Post from "@/components/post/article/Post";

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
      slug: true,
    },
  });

  return posts;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const post = await database.posts.findUnique({
    where: {
      slug: slug,
    },
    include: {
      author: true,
      _count: {
        select: {
          comments: true,
        },
      },
      likes: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="flex w-full justify-center py-2">
      <div className="w-full max-w-full py-2 md:max-w-[860px]">
        <Post
          author={post.author}
          articleId={post.id}
          title={post.title}
          subTitle={post.subTitle}
          tag={post.tag}
          content={post.content as Value}
          coverImageSrc={post.coverImageSrc}
          createdAt={post.createdAt}
          likesLength={post.likeCount}
          commentsLength={post._count.comments}
        />
      </div>
    </div>
  );
}
