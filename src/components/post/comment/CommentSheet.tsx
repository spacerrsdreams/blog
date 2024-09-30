"use client";

import CommentSheetHeader from "@/components/post/comment/CommentSheetHeader";
import CommentSheetTrigger from "@/components/post/comment/CommentSheetTrigger";
import { usePostContext } from "@/components/post/context/PostContext";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import CommentForm from "./CommentForm";
import { CommentModal } from "./CommentModal";
import { CommentProvider } from "./CommentProvider";
import CommentSection from "./CommentSection";

export default function CommentSheet() {
  const { totalComments, postId, author } = usePostContext();
  return (
    <CommentProvider>
      <Sheet>
        <CommentSheetTrigger initialCount={totalComments} />
        <SheetContent className="w-full overflow-x-scroll md:w-[24rem]">
          <CommentSheetHeader />
          <CommentForm postId={postId} postAuthor={author.id} />
          <CommentSection postId={postId} />
          <div className="flex w-full justify-center text-center">
            <CommentModal />
          </div>
        </SheetContent>
      </Sheet>
    </CommentProvider>
  );
}
