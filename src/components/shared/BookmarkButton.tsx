"use client";

import { RedirectToSignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";

import { ERROR_CODES, ERROR_MESSAGES } from "@/lib/error";
import { useCreateBookmark, useGetBookmark, useRemoveBookmark } from "@/services/post/bookmark";
import { useToast } from "@/components/ui/use-toast";

import { Icons } from "./Icons";

type Props = {
  userId: string | null | undefined;
  postId: string;
};

export default function BookmarkButton({ userId, postId }: Props) {
  const { toast } = useToast();
  const [isChecked, setIsChecked] = useState(false);
  const { mutateAsync: createBookmarkAsync } = useCreateBookmark();
  const { mutateAsync: removeBookmarkAsync } = useRemoveBookmark();
  const { mutateAsync: getBookmarkAsync } = useGetBookmark();

  useEffect(() => {
    if (!userId) return;
    getBookmarkAsync(postId).then((data) => {
      if (data.data) {
        setIsChecked(true);
      }
    });
  }, [getBookmarkAsync, userId, postId]);

  const createBookmark = (event: MouseEvent<SVGElement>) => {
    event.preventDefault();
    if (!userId) {
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
      userId,
    }).catch(() => {
      setIsChecked(false);
    });
  };

  const removeBookmark = (event: MouseEvent<SVGElement>) => {
    event.preventDefault();

    if (!userId) return;

    if (!userId) {
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
