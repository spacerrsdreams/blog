"use client";

import { useCommentProvider } from "@/components/post/comment/CommentProvider";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";

export default function CommentSheetHeader() {
  const { commentsCount } = useCommentProvider();

  return (
    <SheetHeader>
      <SheetTitle>{`Comments(${commentsCount})`}</SheetTitle>
    </SheetHeader>
  );
}
