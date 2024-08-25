import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import type { Value } from "react-quill";

import { siteConfig } from "@/config/siteConfig";
import { database } from "@/lib/prisma";
import NotFound from "@/components/post/article/NotFound";
import Post from "@/components/post/Post";

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
  const { userId } = auth();
  const { slug } = params;

  const post = await database.posts.findUnique({
    where: {
      slug: slug,
    },

    include: {
      likes: {
        where: {
          userId: userId || "",
        },
        select: {
          likeCount: true,
        },
      },
      bookmarks: {
        where: {
          userId: userId || "",
        },
        select: {
          id: true,
        },
      },
      author: true,
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  if (!post) {
    return <NotFound />;
  }

  return (
    <div className="flex w-full justify-center py-2">
      <div className="w-full max-w-full py-2 md:max-w-[860px]">
        <Post
          author={post.author}
          slug={post.slug}
          articleId={post.id}
          view={post.view}
          title={post.title}
          subTitle={post.subTitle}
          tag={post.tag}
          content={post.content as Value}
          coverImageSrc={post.coverImageSrc}
          createdAt={post.createdAt}
          totalLikes={post.likeCount}
          userTotalLikes={post.likes[0]?.likeCount}
          totalComments={post._count.comments}
          isLikedByUser={post.likes.length > 0}
          isBookmarked={post.bookmarks.length > 0}
        />
      </div>
    </div>
  );
}
