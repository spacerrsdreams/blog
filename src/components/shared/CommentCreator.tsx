"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState, type ChangeEvent } from "react";

import { useCreateComment } from "@/services/post/comment";

import SignInPopup from "../popup/SignInPopup";
import { Button } from "../ui/button";
import { SheetClose } from "../ui/sheet";
import { Textarea } from "../ui/textarea";

type Props = {
  postId: string;
};
export default function CommentCreator({ postId }: Props) {
  const [content, setContent] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const addCommentData = useCreateComment();
  const { isSignedIn, user } = useUser();

  const handleClick = async () => {
    setContent("");
    if (!isSignedIn) {
      setIsPopupOpen(true);
      return;
    }

    await addCommentData.mutateAsync({ postId, content });
  };

  return (
    <div className="mt-2 rounded-md p-4 shadow-lg">
      {isSignedIn && (
        <div className="mx-3 flex items-center gap-4">
          <Image
            src={user?.imageUrl as string}
            alt={user?.username || ""}
            width={48}
            height={48}
            className="size-12 rounded-full"
          />
          <div className="">
            <h4 className="text-lg capitalize">{user?.username}</h4>
          </div>
        </div>
      )}
      <Textarea
        value={content}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setContent(e.target.value);
        }}
        placeholder="What are your thoughts?"
        className="my-3 h-[150px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <div className="flex w-full justify-end gap-2">
        <SheetClose asChild>
          <Button variant="ghost">Cancel</Button>
        </SheetClose>

        <Button
          className="rounded-2xl bg-purple-500"
          disabled={addCommentData.isPending}
          loading={addCommentData.isPending}
          onClick={handleClick}
          variant="default"
        >
          Respond
        </Button>
      </div>
      <div className="h-full">
        <SignInPopup open={isPopupOpen} setOpen={setIsPopupOpen} />
      </div>
    </div>
  );
}
