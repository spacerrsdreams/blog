import Image from "next/image";

import { database } from "@/lib/prisma";

type Props = {
  profileImageSrc: string;
  authorName: string;
  authorId: string;
};

export default async function AuthorDetails({ profileImageSrc, authorName, authorId }: Props) {
  const posts = await database.posts.findMany({
    where: {
      authorId,
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <Image
        src={profileImageSrc}
        alt={authorName}
        width="800"
        height="800"
        className="size-20 rounded-full object-contain"
      />
      <h2 className="font-bold">{authorName}</h2>
      <span className="text-muted-foreground">Created {posts.length} Posts</span>
    </div>
  );
}
