import { formatNumberWithK } from "@/utils/formatNumberWithK";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import CommentEditor from "./CommentEditor";
import CommentSection from "./CommentSection";
import { Icons } from "./Icons";

type PropsType = {
  authorId: string;
  postId: string;
  commentsCount: number;
};

export default async function CommentSheet({ authorId, postId, commentsCount }: PropsType) {
  return (
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
        <CommentEditor data={{ authId: authorId, postId: postId }} />
        <CommentSection data={{ postId: postId }} />
      </SheetContent>
    </Sheet>
  );
}
