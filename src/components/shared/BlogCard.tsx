import type { Post } from "@/types";

import Image from "next/image";
import Link from "next/link";

import { Icons } from "@/components/shared/Icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function BlogCard({
  authorName,
  avatarSrc,
  avatarFallback,
  tag,
  title,
  slug,
  subTitle,
  date,
  totalLikes,
  totalComments,
  coverImageSrc,
}: Post) {
  return (
    <Link href={`posts/${slug}`}>
      <div className="flex w-full border-b border-border/50 pb-8">
        <div className="flex items-center gap-8 sm:gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-1 text-xs">
              <Link href={`/contributor/${authorName.toLowerCase().replace(" ", "-")}`}>
                <Avatar className="z-20 size-6">
                  <AvatarImage src={avatarSrc} alt="author image" />
                  <AvatarFallback>{avatarFallback}</AvatarFallback>
                </Avatar>
              </Link>

              <span className="capitalize">{authorName}</span>
              <span className="text-muted-foreground">in</span>
              <h5 className="font-semibold">{tag}</h5>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold capitalize sm:text-2xl">{title}</h3>
              <h4 className="text-sm text-muted-foreground md:text-base">
                {subTitle.length > 100 ? `${subTitle.slice(0, 100)}...` : subTitle}
              </h4>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">{date}</span>
                <span className="ml-4 flex items-center">
                  <Icons.clap />
                  <span>
                    {totalLikes > 1000 ? `${(totalLikes / 1000).toFixed(1)}k` : totalLikes}
                  </span>
                </span>
                <span className="flex items-center">
                  <Icons.message />
                  <span>
                    {totalComments > 1000 ? `${(totalComments / 1000).toFixed(1)}k` : totalComments}
                  </span>
                </span>
              </div>
              <div className="flex items-center">
                <Icons.bookmark />
              </div>
            </div>
          </div>
          <div className="mt-4 flex min-w-[130px] md:min-w-[160px]">
            <Image
              src={coverImageSrc}
              width={800}
              height={600}
              className="block h-[110px] w-full rounded-[2px] bg-cover"
              alt="morty's mind blowers"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
