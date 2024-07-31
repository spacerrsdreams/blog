"use client";

import { RedirectToSignIn, useUser } from "@clerk/nextjs";
import { useState } from "react";
import type { MouseEvent } from "react";

import { ERROR_CODES, ERROR_MESSAGES } from "@/lib/error";
import { useCreateBookmark, useRemoveBookmark } from "@/services/post/bookmark";
import { useToast } from "@/components/ui/use-toast";

import { Icons } from "./Icons";

type Props = {
  postId: string;
  isBookmarked: boolean;
};

export default function BookmarkButton({ postId, isBookmarked }: Props) {
  const { toast } = useToast();

  const [isChecked, setIsChecked] = useState(isBookmarked);
  const { user } = useUser();
  const { mutateAsync: createBookmarkAsync } = useCreateBookmark();
  const { mutateAsync: removeBookmarkAsync } = useRemoveBookmark();

  const createBookmark = (event: MouseEvent<SVGElement>) => {
    event.preventDefault();
    if (!user) {
      toast({
        variant: "destructive",
        title: "Unauthorized",
        description: ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED],
        action: <RedirectToSignIn />,
      });

      return;
    }

    setIsChecked(true);

    createBookmarkAsync({
      postId,
    }).catch(() => {
      setIsChecked(false);
    });
  };

  const removeBookmark = (event: MouseEvent<SVGElement>) => {
    event.preventDefault();

    if (!user) return;

    if (!user) {
      toast({
        variant: "destructive",
        title: "Unauthorized",
        description: ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED],
        action: <RedirectToSignIn />,
      });

      return;
    }

    setIsChecked(false);

    removeBookmarkAsync(postId).catch(() => {
      setIsChecked(true);
    });
  };

  return (
    <span className="flex items-center">
      {isChecked ? (
        <Icons.bookmarkDark onClick={removeBookmark} />
      ) : (
        <Icons.bookmark onClick={createBookmark} />
      )}
    </span>
  );
}
