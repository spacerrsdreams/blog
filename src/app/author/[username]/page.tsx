import { getUserByUsername } from "@/server/user";

import prisma from "@/app/lib/prisma";
import Post from "@/components/shared/Post";

export default async function Page({ params }: { params: { username: string } }) {
  const { id: authorid } = await getUserByUsername(params.username);
  const posts = await prisma.post.findMany({
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
