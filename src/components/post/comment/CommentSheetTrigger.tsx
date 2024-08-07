"use client";

import { useEffect } from "react";

import { formatNumberWithK } from "@/utils/formatNumberWithK";
import { useCommentProvider } from "@/components/post/comment/CommentProvider";
import { Icons } from "@/components/shared/Icons";
import { Button } from "@/components/ui/button";
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
      <Button variant="ghost" className="flex items-center">
        <Icons.message />
        <span>{formatNumberWithK(commentsCount)}</span>
      </Button>
    </SheetTrigger>
  );
}
