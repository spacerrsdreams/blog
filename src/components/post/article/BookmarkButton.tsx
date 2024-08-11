"use client";

import { usePopupProvider } from "@/context/PopupProvider";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";

import {
  useCreateBookmark,
  useGetBookmarkByPostId,
  useRemoveBookmark,
} from "@/services/post/bookmark";
import { Icons } from "@/components/shared/Icons";
import { Button } from "@/components/ui/button";

type Props = {
  postId: string;
  isBookmarked?: boolean;
  inEditMode?: boolean;
  fetchBookmarkState?: boolean;
};

export default function BookmarkButton({
  postId,
  isBookmarked,
  inEditMode = false,
  fetchBookmarkState = false,
}: Props) {
  const [isChecked, setIsChecked] = useState(isBookmarked);
  const { user } = useUser();
  const { open } = usePopupProvider();
  const { mutateAsync: bookmark } = useCreateBookmark();
  const { mutateAsync: removeBookmark } = useRemoveBookmark();
  const { mutateAsync: getBookmark } = useGetBookmarkByPostId();

  useEffect(() => {
    if (!fetchBookmarkState || inEditMode) return;

    console.log("HIT");
    getBookmark(postId).then((data) => {
      data.data ? setIsChecked(true) : setIsChecked(false);
    });
  }, [fetchBookmarkState]);

  const createBookmark = () => {
    if (!user) {
      open(true);
      return;
    }

    setIsChecked(true);

    bookmark({
      postId,
    }).catch((err) => {
      console.error(err);
      setIsChecked(false);
    });
  };

  const deleteBookmark = () => {
    if (!user) {
      open(true);
      return;
    }

    setIsChecked(false);

    removeBookmark(postId).catch((err) => {
      console.error(err);
      setIsChecked(true);
    });
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    isChecked ? deleteBookmark() : createBookmark();
  };

  return (
    <Button variant="ghost" onClick={handleClick}>
      {isChecked ? <Icons.bookmarkDark /> : <Icons.bookmark />}
    </Button>
  );
}
