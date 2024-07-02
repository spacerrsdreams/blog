import { POSTS } from "@/data/posts";
import UserHighlight from "@/components/shared/highlights/UserHighlight";

export default function Highlights() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-8">
        <h4 className="text-sm font-semibold">Trending Now</h4>
        <div className="flex flex-col gap-6">
          <UserHighlight post={POSTS[0]} />
          <UserHighlight post={POSTS[1]} />
          <UserHighlight post={POSTS[2]} />
        </div>
      </div>
      <div className="flex size-48 items-center justify-center rounded-sm bg-purple-400">
        <span className="text-center capitalize text-white">Your cool commercial here</span>
      </div>
    </div>
  );
}
