"use client";

import { usePopupProvider } from "@/context/PopupProvider";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import type { MouseEvent } from "react";

import { useCreateBookmark, useRemoveBookmark } from "@/services/post/bookmark";
import { Icons } from "@/components/shared/Icons";
import { Button } from "@/components/ui/button";

type Props = {
  postId: string;
  isBookmarked: boolean;
};

export default function BookmarkButton({ postId, isBookmarked }: Props) {
  const [isChecked, setIsChecked] = useState(isBookmarked);
  const { user } = useUser();
  const { open } = usePopupProvider();
  const { mutateAsync: createBookmarkAsync } = useCreateBookmark();
  const { mutateAsync: removeBookmarkAsync } = useRemoveBookmark();

  const createBookmark = () => {
    if (!user) {
      open(true);
      return;
    }

    setIsChecked(true);

    createBookmarkAsync({
      postId,
    }).catch((err) => {
      console.error(err);
      setIsChecked(false);
    });
  };

  const removeBookmark = () => {
    if (!user) {
      open(true);
      return;
    }

    setIsChecked(false);

    removeBookmarkAsync(postId).catch((err) => {
      console.error(err);
      setIsChecked(true);
    });
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    isChecked ? removeBookmark() : createBookmark();
  };

  return (
    <Button variant="ghost" onClick={handleClick}>
      {isChecked ? <Icons.bookmarkDark /> : <Icons.bookmark />}
    </Button>
  );
}
