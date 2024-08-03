import type { PostT } from "@/types";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/utils/formatDate";
import { formatNumberWithK } from "@/utils/formatNumberWithK";
import { ERROR_CODES } from "@/lib/error";
import BookmarkButton from "@/components/post/article/BookmarkButton";
import MoreButton from "@/components/post/article/MoreButton";
import { Icons } from "@/components/shared/Icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Post({
  id,
  tag,
  title,
  slug,
  subTitle,
  _count,
  author,
  createdAt,
  coverImageSrc,
  currentFeed,
  isBookmarked,
}: PostT) {
  const { user } = useUser();

  if (!author) {
    throw new Error(ERROR_CODES.POST_AUTHOR_NOT_FOUND);
  }

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
        {currentFeed !== tag ? (
          <Link href={`/?feed=${tag}`}>
            <h5 className="font-semibold capitalize underline">{tag}</h5>
          </Link>
        ) : (
          <h5 className="font-semibold capitalize">{tag}</h5>
        )}
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
                <span className="text-muted-foreground">{formatDate(new Date(createdAt))}</span>
                <span className="ml-4 flex items-center">
                  <Icons.clap />
                  <span>{formatNumberWithK(_count.likes)}</span>
                </span>
                <span className="flex items-center">
                  <Icons.message />
                  <span>{formatNumberWithK(_count.comments)}</span>
                </span>
              </div>
              <div className="flex items-center">
                <BookmarkButton isBookmarked={isBookmarked} postId={id} />

                {user?.id === author?.id && <MoreButton />}
              </div>
            </div>
          </Link>
        </div>
        {coverImageSrc && (
          <Link href={`/article/${slug}`}>
            <Image
              src={coverImageSrc}
              width={800}
              height={600}
              className="block h-20 w-28 rounded-[2px] bg-cover sm:h-[110px] md:w-40"
              alt="morty's mind blowers"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
