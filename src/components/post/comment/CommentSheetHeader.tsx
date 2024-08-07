"use client";

import { useEffect } from "react";

import { useCommentProvider } from "@/components/post/comment/CommentProvider";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";

type Props = {
  initialCount: number;
};

export default function CommentSheetHeader({ initialCount }: Props) {
  const { commentsCount, setCommentsCount } = useCommentProvider();

  useEffect(() => {
    setCommentsCount(initialCount);
  }, []);

  return (
    <SheetHeader>
      <SheetTitle>{`Comments(${commentsCount})`}</SheetTitle>
    </SheetHeader>
  );
}
