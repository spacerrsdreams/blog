import type { Post } from "@/types";

import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/utils/formatDate";
import { formatNumberWithK } from "@/utils/formatNumberWithK";
import { Icons } from "@/components/shared/Icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import BookmarkButton from "./BookmarkButton";

export default async function Post({
  post: { id, tag, title, slug, subTitle, _count, authorId, createdAt, coverImageSrc },
}: {
  post: Post;
}) {
  const author = await clerkClient.users.getUser(authorId);

  return (
    <div className="flex w-full flex-col gap-2 border-b border-border/50 pb-8">
      <div className="flex w-full items-center gap-1 text-xs">
        <Link
          className="z-[10] flex cursor-pointer items-center gap-2"
          href={`/author/${author.username}`}
        >
          <Avatar className="size-6">
            <AvatarImage src={author.imageUrl} alt="author image" />
            <AvatarFallback>{author.firstName}</AvatarFallback>
          </Avatar>

          <span className="whitespace-nowrap capitalize">
            {author.firstName} {author.lastName}
          </span>
        </Link>
        <span className="text-muted-foreground">in</span>
        <h5 className="font-semibold">{tag}</h5>
      </div>
      <div className="flex items-center gap-4 sm:gap-8 md:gap-12">
        <div className="flex flex-1 flex-col gap-4">
          <Link className="flex flex-col gap-4" href={`/article/${slug}`}>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold capitalize sm:text-2xl">{title}</h3>
              <h4 className="text-sm text-muted-foreground md:text-base">
                {subTitle.length > 100 ? `${subTitle.slice(0, 100)}...` : subTitle}
              </h4>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">{formatDate(createdAt)}</span>
                <span className="ml-4 flex items-center">
                  <Icons.clap />
                  <span>{formatNumberWithK(_count.likes)}</span>
                </span>
                <span className="flex items-center">
                  <Icons.message />
                  <span>{formatNumberWithK(_count.comments)}</span>
                </span>
              </div>
              <BookmarkButton data={{ authorId: authorId, postId: id }} />
            </div>
          </Link>
        </div>
        <Link href={`/article/${slug}`}>
          <Image
            src={coverImageSrc}
            width={800}
            height={600}
            className="block h-20 w-28 rounded-[2px] bg-cover sm:h-[110px] md:w-40"
            alt="morty's mind blowers"
          />
        </Link>
      </div>
    </div>
  );
}
