import { formatNumberWithK } from "@/utils/formatNumberWithK";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import CommentCreator from "./CommentCreator";
import { CommentModal } from "./CommentModal";
import { CommentProvider } from "./CommentProvider";
import CommentSection from "./CommentSection";
import { Icons } from "./Icons";

type Props = {
  postId: string;
  commentsCount: number;
};

export default async function CommentSheet({ postId, commentsCount }: Props) {
  return (
    <CommentProvider>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="flex items-center">
            <Icons.message />
            <span>{formatNumberWithK(commentsCount)}</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-x-scroll">
          <SheetHeader>
            <SheetTitle>{`Comments(${commentsCount})`}</SheetTitle>
          </SheetHeader>
          <CommentCreator postId={postId} />
          <CommentSection data={{ postId: postId }} />
          <div className="flex w-full justify-center text-center">
            <CommentModal />
          </div>
        </SheetContent>
      </Sheet>
    </CommentProvider>
  );
}
