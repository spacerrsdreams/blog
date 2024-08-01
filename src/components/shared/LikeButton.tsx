"use client";

import debounce from "debounce";

import { RedirectToSignIn, useUser } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";

import { formatNumberWithK } from "@/utils/formatNumberWithK";
import { ERROR_CODES, ERROR_MESSAGES } from "@/lib/error";
import { useGetLike, useLikePost } from "@/services/post/like";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { Icons } from "./Icons";

type Props = {
  count: number;
  postId: string;
  disabled?: boolean;
};

export default function LikeButton({ count, postId, disabled }: Props) {
  const { user } = useUser();
  const { toast } = useToast();
  const [likes, setLikes] = useState(count);
  const [isLiked, setIsLiked] = useState(false);
  const { mutateAsync: likePostAsync } = useLikePost();
  const { mutateAsync: getLikeAsync } = useGetLike();
  const userId = user?.id;

  useEffect(() => {
    setLikes(count);
  }, [count]);

  useEffect(() => {
    if (!userId || disabled) return;

    getLikeAsync(postId).then(({ data }) => {
      data && setIsLiked(true);
    });
  }, [userId, getLikeAsync, postId]);

  const like = useCallback(
    debounce(() => {
      if (!userId) {
        toast({
          variant: "destructive",
          title: "Unauthorized",
          description: ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED],
          action: <RedirectToSignIn />,
        });

        return;
      }

      likePostAsync({ postId }).catch(() => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to like the post",
        });
      });
    }, 300),
    [userId, postId],
  );

  return (
    <Button
      disabled={disabled}
      variant="ghost"
      onClick={() => {
        setLikes((prevLikes) => prevLikes + 1);
        setIsLiked(true);
        like();
      }}
    >
      {isLiked ? <Icons.clapDark /> : <Icons.clap />}
      <span>{formatNumberWithK(likes)}</span>
    </Button>
  );
}
