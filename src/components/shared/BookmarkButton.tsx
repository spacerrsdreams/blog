"use client";

import { RedirectToSignIn } from "@clerk/nextjs";
import { useState } from "react";

import { ERROR_CODES, ERROR_MESSAGES } from "@/lib/error";
import { useCreateBookmark, useRemoveBookmark } from "@/services/post/bookmark";
import { useToast } from "@/components/ui/use-toast";

import { Icons } from "./Icons";

type Props = {
  userId: string | null | undefined;
  postId: string;
};

export default function BookmarkButton({ userId, postId }: Props) {
  const { toast } = useToast();
  const [isChecked, setIsChecked] = useState(false);
  const [bookmarkId, _] = useState("");
  const { mutateAsync: createBookmarkAsync } = useCreateBookmark();
  const { mutateAsync: removeBookmarkAsync } = useRemoveBookmark();

  // useEffect(() => {
  //   getBookmark(postInfo.data.postId, postInfo.data.authorId).then((data) => {
  //     if (data) setIsChecked(true);
  //   });
  // }, []);

  const createBookmark = () => {
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

  const removeBookmark = () => {
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

    removeBookmarkAsync(bookmarkId).catch(() => {
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
