"use client";

import CommentSheetHeader from "@/components/post/comment/CommentSheetHeader";
import CommentSheetTrigger from "@/components/post/comment/CommentSheetTrigger";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import CommentForm from "./CommentForm";
import { CommentModal } from "./CommentModal";
import { CommentProvider } from "./CommentProvider";
import CommentSection from "./CommentSection";

type Props = {
  postId: string;
  commentsCount: number;
  disabled?: boolean;
};

export default function CommentSheet({ postId, commentsCount }: Props) {
  return (
    <CommentProvider>
      <Sheet>
        <CommentSheetTrigger initialCount={commentsCount} />
        <SheetContent className="w-full overflow-x-scroll md:w-[24rem]">
          <CommentSheetHeader initialCount={commentsCount} />
          <CommentForm postId={postId} />
          <CommentSection postId={postId} />
          <div className="flex w-full justify-center text-center">
            <CommentModal />
          </div>
        </SheetContent>
      </Sheet>
    </CommentProvider>
  );
}
