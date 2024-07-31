import { auth } from "@clerk/nextjs/server";

import prismaClient from "@/lib/prisma";
import Post from "@/components/shared/Post";

export default async function Home() {
  const { userId } = auth();

  const posts = await prismaClient.posts.findMany({
    include: {
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
      author: true,
      bookmarks: {
        where: {
          userId: userId || "",
        },
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
  });

  const postsWithBookmarkStatus = posts.map((post) => ({
    ...post,
    isBookmarked: post.bookmarks.length > 0,
  }));

  return (
    <div className="mt-8 flex flex-col gap-12">
      {postsWithBookmarkStatus?.map((post) => (
        <Post
          key={post.slug}
          id={post.id}
          slug={post.slug}
          tag={post.tag}
          title={post.title}
          subTitle={post.subTitle}
          _count={post._count}
          author={post.author}
          createdAt={post.createdAt}
          coverImageSrc={post.coverImageSrc}
          isBookmarked={post.isBookmarked}
        />
      ))}
    </div>
  );
}
