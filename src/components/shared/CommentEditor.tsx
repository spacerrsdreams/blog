"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState, type ChangeEvent } from "react";

import { useAddComment } from "@/app/client/comment";

import { Button } from "../ui/button";
import { SheetClose } from "../ui/sheet";
import { Textarea } from "../ui/textarea";

type propsType = {
  data: {
    authId: string;
    postId: string;
  };
};
export default function CommentEditor({ data: { authId, postId } }: propsType) {
  const [content, setContent] = useState("");
  const addCommentData = useAddComment();
  const { isSignedIn, user } = useUser();
  const handleClick = async () => {
    await addCommentData.mutateAsync({ authId, postId, content });
  };
  return (
    <div className="mt-2 rounded-md p-4 shadow-lg">
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
      <Textarea
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setContent(e.target.value);
        }}
        placeholder="What are your thoughts?"
        className="my-3 h-[150px] border-0"
      />
      <div className="flex w-full justify-end gap-2">
        <SheetClose asChild>
          <Button variant="ghost">Cancel</Button>
        </SheetClose>
        <Button
          disabled={addCommentData.isPending || !isSignedIn}
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
