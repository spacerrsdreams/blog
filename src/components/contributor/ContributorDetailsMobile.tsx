import type { Post } from "@/types";

import Image from "next/image";

export default function ContributorDetailsMobile({ post }: { post: Post }) {
  return (
    <div className="flex gap-3">
      <Image
        src={post.avatarSrc}
        width={500}
        height={500}
        className="size-12 rounded-full"
        alt="author"
      />
      <div className="space-y-2">
        <h1 className="font-semibold">{post.authorName}</h1>
        <p className="text-sm text-muted-foreground">
          Scientist | Inventor | Grandfather | Drunk | Mad Scientist | Genius | Cynic | Sociopath |
          Narcissist | Anarchist | Father | Husband | Rick
        </p>
        <p className="mt-2 text-sm">Posts - 32</p>
      </div>
    </div>
  );
}
