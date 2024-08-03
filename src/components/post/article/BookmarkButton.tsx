"use client";

import { usePopupProvider } from "@/context/PopupProvider";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";

import { useCreateBookmark, useGetBookmark, useRemoveBookmark } from "@/services/post/bookmark";
import { Icons } from "@/components/shared/Icons";
import { Button } from "@/components/ui/button";

type Props = {
  postId: string;
  isBookmarked?: boolean;
  fetchBookmarkState?: boolean;
};

export default function BookmarkButton({
  postId,
  isBookmarked,
  fetchBookmarkState = false,
}: Props) {
  const [isChecked, setIsChecked] = useState(isBookmarked);
  const { user } = useUser();
  const { open } = usePopupProvider();
  const { mutateAsync: createBookmarkAsync } = useCreateBookmark();
  const { mutateAsync: removeBookmarkAsync } = useRemoveBookmark();
  const { mutateAsync: getBookmarkAsync } = useGetBookmark();

  useEffect(() => {
    if (!fetchBookmarkState) return;

    getBookmarkAsync(postId).then((data) => {
      data.data ? setIsChecked(true) : setIsChecked(false);
    });
  }, [fetchBookmarkState]);

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
