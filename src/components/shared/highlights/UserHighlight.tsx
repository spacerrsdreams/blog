import type { Post } from "@/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  post: Post;
};

export default function UserHighlight({ post }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <Avatar className="size-6">
          <AvatarImage src={post.coverImageSrc} alt="author image" />
          <AvatarFallback>{post.avatarFallback}</AvatarFallback>
        </Avatar>
        <span className="text-xs font-bold capitalize">{post.authorName}</span>
      </div>
      <h3 className="font-bold capitalize lg:text-xl">{post.title}</h3>
    </div>
  );
}
