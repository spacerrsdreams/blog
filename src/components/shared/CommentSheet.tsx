"use client";

import { formatNumberWithK } from "@/utils/formatNumberWithK";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import CommentEditor from "./CommentEditor";
import CommentSection from "./CommentSection";
import { Icons } from "./Icons";

type PropsType = {
  userId: string;
  postId: string;
  commentsCount: number;
  disabled?: boolean;
};

export default function CommentSheet({
  userId,
  postId,
  commentsCount,
  disabled = false,
}: PropsType) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button disabled={disabled} variant="ghost" className="flex items-center">
          <Icons.message />
          <span>{formatNumberWithK(commentsCount)}</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-x-scroll">
        <SheetHeader>
          <SheetTitle>{`Comments(${commentsCount})`}</SheetTitle>
        </SheetHeader>
        <CommentEditor data={{ authId: userId, postId: postId }} />
        <CommentSection data={{ postId: postId }} />
      </SheetContent>
    </Sheet>
  );
}
