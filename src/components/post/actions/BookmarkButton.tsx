"use client";

import { usePopupProvider } from "@/context/PopupProvider";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";

import { ROUTES } from "@/utils/routes";
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
  onRemoveBookmark?: (postId: string) => void;
};

export default function BookmarkButton({
  postId,
  isBookmarked,
  inEditMode = false,
  fetchBookmarkState = false,
  onRemoveBookmark,
}: Props) {
  const [isChecked, setIsChecked] = useState(isBookmarked);
  const { user } = useUser();
  const { setOpenModal } = usePopupProvider();
  const { mutateAsync: bookmark } = useCreateBookmark();
  const { mutateAsync: removeBookmark } = useRemoveBookmark();
  const { mutateAsync: getBookmark } = useGetBookmarkByPostId();
  const router = useRouter();

  useEffect(() => {
    if (!fetchBookmarkState || inEditMode) return;

    getBookmark(postId).then((data) => {
      data.data ? setIsChecked(true) : setIsChecked(false);
    });
  }, [fetchBookmarkState, inEditMode]);

  const createBookmark = () => {
    if (!user) {
      setOpenModal(true, "signIn");
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
      setOpenModal(true, "signIn");
      return;
    }

    setIsChecked(false);

    removeBookmark(postId)
      .then(() => {
        onRemoveBookmark ? onRemoveBookmark(postId) : router.push(ROUTES.root);
      })
      .catch((err) => {
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
