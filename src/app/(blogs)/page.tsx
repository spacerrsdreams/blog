import prismaClient from "@/lib/prisma";
import Image from "@/components/Image";
import Post from "@/components/shared/Post";

export default async function Home() {
  const posts = await prismaClient.posts.findMany({
    include: {
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });

  console.log("HIT");

  return (
    <div className="mt-8 flex flex-col gap-12">
      {posts?.map((post) => <Post key={post.slug} post={post} />)}
      <Image />
    </div>
  );
}
