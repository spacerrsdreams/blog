import { POSTS } from "@/data/posts";
import BlogCard from "@/components/shared/BlogCard";

export default function Home() {
  return (
    <main className="mt-8 flex flex-col gap-12">
      {POSTS.map((post) => (
        <BlogCard key={post.slug} {...post} />
      ))}
    </main>
  );
}
