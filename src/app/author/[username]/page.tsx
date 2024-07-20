import prisma from "@/lib/prisma";
import Post from "@/components/shared/Post";

export default async function Page({ params }: { params: { username: string } }) {
  const userData = await prisma.users.findUnique({
    where: {
      username: params.username,
    },
    include: {
      posts: {
        include: {
          _count: {
            select: {
              likes: true,
              comments: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="mt-8 flex flex-col gap-12">
      {userData?.posts?.map((post) => <Post key={post.slug} post={post} />)}
    </div>
  );
}
