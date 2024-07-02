import Image from "next/image";

import { CONTRIBUTORS } from "@/data/contributors";

export default function ContributorDetails({ authorSlug }: { authorSlug: string }) {
  const author = CONTRIBUTORS.find((contributor) => contributor.authorSlug === authorSlug);

  return (
    <div className="flex flex-col gap-2">
      <Image
        src={author?.avatarSrc || ""}
        alt={author?.authorName || ""}
        width="800"
        height="800"
        className="size-20 rounded-full object-contain"
      />
      <h2 className="font-bold">{author?.authorName}</h2>
      <span className="text-muted-foreground">Created 32 Posts</span>
      <p className="text-sm text-muted-foreground">
        Scientist | Inventor | Grandfather | Drunk | Mad Scientist | Genius | Cynic | Sociopath |
        Narcissist | Anarchist | Father | Husband | Rick
      </p>
    </div>
  );
}
