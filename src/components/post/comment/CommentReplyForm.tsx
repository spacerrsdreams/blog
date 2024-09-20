"use client";

import { usePopupProvider } from "@/context/PopupProvider";
import type { CommentWithUserProps } from "@/types";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react";

import { useCreateComment } from "@/services/post/comment";
import { useCommentProvider } from "@/components/post/comment/CommentProvider";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  postId: string;
  commentId: string;
  setHasReply: Dispatch<SetStateAction<boolean>>;
};

export default function CommentReplyForm({ postId, commentId, setHasReply }: Props) {
  const [content, setContent] = useState("");
  const addCommentData = useCreateComment();
  const { setCommentsReplies, setInReply, setCommentsCount, viewReply, setViewReply, setComments } =
    useCommentProvider();
  const { isSignedIn, user } = useUser();
  const { setOpenModal } = usePopupProvider();
  const handleClick = async () => {
    setContent("");

    if (!isSignedIn) {
      setOpenModal(true, "signIn");
      return;
    }

    addCommentData.mutateAsync({ postId, content, parentId: commentId }).then((data) => {
      setCommentsCount((prevCount) => prevCount + 1);
      setCommentsReplies((prevComments) => [
        ...prevComments,
        {
          ...data.data,
          user: {
            imageUrl: user.imageUrl || "",
            username: user.username || "",
          },
        } as CommentWithUserProps,
      ]);
      setComments((prevComments) => [
        ...prevComments,
        {
          ...data.data,
          user: {
            imageUrl: user.imageUrl || "",
            username: user.username || "",
          },
        } as CommentWithUserProps,
      ]);
      setHasReply(true);
      setInReply(false);
      if (!viewReply) setViewReply(true);
    });
  };

  return (
    <div className="border-l-2">
      <div className="border-1 mx-3 mt-2 rounded-md border p-4">
        {isSignedIn && (
          <div className="mx-3 flex items-center gap-4">
            <Image
              src={user?.imageUrl as string}
              alt={user?.username || ""}
              width={48}
              height={48}
              className="size-6 rounded-full"
            />
            <div className="">
              <h4 className="text-md capitalize">{user?.username}</h4>
            </div>
          </div>
        )}
        <Textarea
          value={content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setContent(e.target.value);
          }}
          placeholder={`Replying to ${user?.username}`}
          className="my-2 h-[50px] border-0 text-base focus-visible:ring-0 focus-visible:ring-offset-0 md:text-[14px]"
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
    </div>
  );
}
