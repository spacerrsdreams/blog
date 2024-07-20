import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";

import { formatDate } from "@/utils/formatDate";
import prisma from "@/lib/prisma";
import CommentSheet from "@/components/shared/CommentSheet";
import LikeButton from "@/components/shared/LikeButton";

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await prisma.posts.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      likes: true,
      comments: true,
    },
  });

  if (!post) {
    console.error("Post not found");
    throw new Error("Post not found");
  }

  const author = await clerkClient.users.getUser(post.authorId);

  if (!author) {
    console.error("Author not found");
    throw new Error("Author not found");
  }
  return (
    <div className="flex size-full flex-col gap-10 px-20">
      <div className="mt-10 flex w-full flex-col items-center justify-center gap-2">
        <Image
          src={post.coverImageSrc}
          alt={post.title}
          className="h-[600px] w-full bg-cover"
          width={800}
          height={800}
        />
        <p className="text-xs text-muted-foreground">
          სურათი შექიმნა <span className="font-bold text-black">Adult Swim</span> -ის მხარდაჭერით.
        </p>
      </div>
      <div className="mx-6 flex flex-col justify-center gap-8 self-center">
        <div className="flex w-full max-w-[680px] flex-col gap-3">
          <h1 className="text-5xl font-bold">{post.title}</h1>
          <h3 className="text-xl text-muted-foreground">{post.subTitle}</h3>
        </div>
        <div className="flex flex-col">
          <div className="mx-3 flex gap-4">
            <Image
              src={author.imageUrl}
              alt={author.fullName || ""}
              width={48}
              height={48}
              className="size-12 rounded-full"
            />
            <div className="">
              <h4 className="text-lg capitalize">{author.fullName}</h4>
              <div className="text-sm text-muted-foreground">
                Published in <span className="text-sm font-semibold text-black">{post.tag}</span> ·{" "}
                {formatDate(post.createdAt)}
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center border-b border-t border-border/60 py-1">
            <LikeButton
              data={{ count: post?.likes?.length, authorId: post?.authorId, postId: post?.id }}
            />
            <CommentSheet
              {...{ authorId: post.authorId, postId: post.id, commentsCount: post.comments.length }}
            />
          </div>
        </div>
        <div className="mb-20">blablalbbal</div>
      </div>
    </div>
  );
}
