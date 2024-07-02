import { POSTS } from "@/data/posts";
import Post from "@/components/shared/Post";

export default function Page({ params }: { params: { cotributor: string } }) {
  const authorPosts = POSTS.filter((post) => post.authorSlug === params.cotributor);

  return (
    <div className="mt-8 flex flex-col gap-12">
      {authorPosts?.map((post) => <Post key={post.slug} post={post} />)}
    </div>
  );
}
