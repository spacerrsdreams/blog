"use client";

import { usePopupProvider } from "@/context/PopupProvider";
import type { CommentWithUser } from "@/types";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState, type ChangeEvent } from "react";

import { useCreateComment } from "@/services/post/comment";
import { useCommentProvider } from "@/components/post/comment/CommentProvider";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  postId: string;
};
export default function CommentCreator({ postId }: Props) {
  const [content, setContent] = useState("");
  const addCommentData = useCreateComment();
  const { setComments, setCommentsCount } = useCommentProvider();
  const { isSignedIn, user } = useUser();
  const { open } = usePopupProvider();

  const handleClick = async () => {
    setContent("");

    if (!isSignedIn) {
      open(true);
      return;
    }

    addCommentData.mutateAsync({ postId, content }).then((data) => {
      setCommentsCount((prevCount) => prevCount + 1);
      setComments((prevComments) => [
        ...prevComments,
        {
          ...data.data,
          user: {
            imageUrl: user.imageUrl || "",
            username: user.username || "",
          },
        } as CommentWithUser,
      ]);
    });
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
        className="my-3 h-[150px] border-0 text-base focus-visible:ring-0 focus-visible:ring-offset-0 md:text-[14px]"
      />
      <div className="flex w-full justify-end gap-2">
        <SheetClose asChild>
          <Button variant="ghost">Cancel</Button>
        </SheetClose>

        <Button
          className="w-[90px] rounded-2xl bg-purple-500 hover:bg-purple-600"
          disabled={addCommentData.isPending}
          loading={addCommentData.isPending}
          onClick={handleClick}
          variant="default"
        >
          Respond
        </Button>
      </div>
    </div>
  );
}
