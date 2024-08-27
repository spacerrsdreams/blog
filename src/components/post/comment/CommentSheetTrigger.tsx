"use client";

import { useEffect } from "react";

import PostAction from "@/components/post/actions/PostAction";
import { useCommentProvider } from "@/components/post/comment/CommentProvider";
import { Icons } from "@/components/shared/Icons";
import { SheetTrigger } from "@/components/ui/sheet";

type Props = {
  initialCount: number;
};

export default function CommentSheetTrigger({ initialCount }: Props) {
  const { commentsCount, setCommentsCount } = useCommentProvider();
  useEffect(() => {
    setCommentsCount(initialCount);
  }, []);

  return (
    <SheetTrigger asChild>
      <span>
        <PostAction type="action" totalCount={commentsCount} Icon={<Icons.message />} />
      </span>
    </SheetTrigger>
  );
}
