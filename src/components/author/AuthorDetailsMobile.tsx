import Image from "next/image";

import { database } from "@/lib/prisma";

type Props = {
  profileImageSrc: string;
  authorName: string;
  authorId: string;
};

export default async function AuthorDetailsMobile({
  profileImageSrc,
  authorName,
  authorId,
}: Props) {
  const posts = await database.posts.findMany({
    where: {
      authorId,
    },
  });
  return (
    <div className="flex gap-3">
      <Image
        src={profileImageSrc}
        width={500}
        height={500}
        className="size-12 rounded-full"
        alt="author"
      />
      <div className="space-y-2">
        <h1 className="font-semibold">{authorName}</h1>
        <p className="mt-2 text-sm">Created {posts.length} Posts</p>
      </div>
    </div>
  );
}
