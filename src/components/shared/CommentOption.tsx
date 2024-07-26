"use client";

import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCommentProvider } from "./CommentProvider";
import { Icons } from "./Icons";

type Props = {
  commentId: string;
};

export function CommentOption({ commentId }: Props) {
  const [position, setPosition] = useState("bottom");
  const { setShowModal, setCommentId, setInEdit } = useCommentProvider();

  const handleChange = (value: string) => {
    setPosition;
    setCommentId(commentId);
    value === "delete" ? setShowModal(true) : setInEdit(true);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <Icons.commentOption />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={position} onValueChange={handleChange}>
          <DropdownMenuRadioItem className="cursor-pointer" value="edit">
            Edit this comment
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="cursor-pointer" value="delete">
            Delete
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
