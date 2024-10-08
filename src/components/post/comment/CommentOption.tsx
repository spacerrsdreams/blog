"use client";

import { useState } from "react";

import { Icons } from "@/components/shared/Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCommentProvider } from "./CommentProvider";

type Props = {
  commentId: string;
  parentId?: string;
};

export function CommentOption({ commentId, parentId }: Props) {
  const [position, setPosition] = useState("bottom");

  const { setShowModal, setInEdit, setCurrentCommentInfo } = useCommentProvider();

  const handleDelete = () => {
    setPosition;
    setShowModal(true);
    setCurrentCommentInfo({ rootId: commentId, parentId });
  };
  const handleEdit = () => {
    setPosition;
    setCurrentCommentInfo({ rootId: commentId, parentId });
    setInEdit(true);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <Icons.commentOption />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={(val) => {
            val === "delete" ? handleDelete() : handleEdit();
          }}
        >
          <DropdownMenuRadioItem className="cursor-pointer p-4" value="edit">
            <div className="flex items-center gap-5 font-medium">
              <Icons.edit />
              <span className="text-[13px] opacity-60">Edit this comment</span>
            </div>
          </DropdownMenuRadioItem>
          <div className="w-full border-[0.5px] border-gray-300"></div>

          <DropdownMenuRadioItem className="cursor-pointer p-4" value="delete">
            <div className="flex items-center gap-5">
              <Icons.trash />
              <span className="text-[13px] font-medium opacity-60">Delete</span>
            </div>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
