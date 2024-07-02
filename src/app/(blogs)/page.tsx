import { POSTS } from "@/data/posts";
import Post from "@/components/shared/Post";

export default function Home() {
  return (
    <div className="mt-8 flex flex-col gap-12">
      {POSTS.map((post) => (
        <Post key={post.slug} post={post} />
      ))}
    </div>
  );
}
