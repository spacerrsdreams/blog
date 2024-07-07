import prisma from "@/app/lib/prisma";
import Post from "@/components/shared/Post";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: {
      likes: true,
      comments: true,
    },
  });

  return (
    <div className="mt-8 flex flex-col gap-12">
      {posts.map((post) => (
        <Post key={post.slug} post={post} />
      ))}
    </div>
  );
}
