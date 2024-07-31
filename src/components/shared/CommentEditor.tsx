"use client";

import { useState, type ChangeEvent } from "react";

import { useEditComment } from "@/services/post/comment";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useCommentProvider } from "./CommentProvider";

type Props = {
  content: string;
};
export default function CommentEditor({ content }: Props) {
  const [newContent, setNewContent] = useState("");
  const { setInEdit, commentId } = useCommentProvider();
  const { mutateAsync: editCommentAsync, isPending } = useEditComment();

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewContent(event.target.value);
  };
  const handleSubmit = () => {
    editCommentAsync({ commentId, content: newContent });
  };

  return (
    <div className="flex flex-col gap-4 rounded-md border-[1px] shadow-lg outline-none">
      <Textarea
        className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        onChange={handleChange}
        defaultValue={content}
      />
      <div className="flex justify-end gap-2 p-3">
        <Button
          onClick={() => {
            setInEdit(false);
          }}
          variant="ghost"
        >
          Cancel
        </Button>
        <Button
          className="w-[90px] rounded-2xl bg-purple-500 hover:bg-purple-600"
          disabled={isPending}
          loading={isPending}
          onClick={handleSubmit}
          variant="default"
        >
          Respond
        </Button>
      </div>
    </div>
  );
}
