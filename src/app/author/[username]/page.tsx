import { getUserByUserName } from "@/server/user";

import prisma from "@/lib/prisma";
import Post from "@/components/shared/Post";

export default async function Page({ params }: { params: { username: string } }) {
  const { id: authorid } = await getUserByUserName(params.username);
  const posts = await prisma.posts.findMany({
    include: {
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
    where: {
      authorId: authorid,
    },
  });

  return (
    <div className="mt-8 flex flex-col gap-12">
      {posts?.map((post) => <Post key={post.slug} post={post} />)}
    </div>
  );
}
