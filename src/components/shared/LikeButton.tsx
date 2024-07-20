"use client";

import { RedirectToSignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import { formatNumberWithK } from "@/utils/formatNumberWithK";
import { ERROR_CODES, ERROR_MESSAGES } from "@/lib/error";
import { useGetLike, useLikePost, useUnlikePost } from "@/services/post/like";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { Icons } from "./Icons";

type Props = {
  count: number;
  postId: string;
  userId: string | null | undefined;
};

export default function LikeButton({ count, postId, userId }: Props) {
  const { toast } = useToast();
  const [likes, setLikes] = useState(count);
  const [isLiked, setIsLiked] = useState(false);
  const { mutateAsync: likePostAsync } = useLikePost();
  const { mutateAsync: unlikePostAsync } = useUnlikePost();
  const { mutateAsync: getLikeAsync } = useGetLike();

  useEffect(() => {
    setLikes(count);
  }, [count]);

  useEffect(() => {
    if (!userId) return;

    getLikeAsync({ userId, postId }).then(({ data }) => {
      data && setIsLiked(true);
    });
  }, [userId, getLikeAsync, postId]);

  const like = () => {
    if (!userId) {
      toast({
        variant: "destructive",
        title: "Unauthorized",
        description: ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED],
        action: <RedirectToSignIn />,
      });

      return;
    }

    setLikes(likes + 1);
    setIsLiked(true);

    try {
      likePostAsync({
        postId,
        userId,
      });
    } catch (error) {
      setLikes(likes - 1);
      setIsLiked(false);
    }
  };

  const unLike = () => {
    if (!userId) {
      toast({
        variant: "destructive",
        title: "Unauthorized",
        description: ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED],
        action: <RedirectToSignIn />,
      });

      return;
    }

    console.log("trigger");

    setLikes(likes - 1);
    setIsLiked(false);

    try {
      unlikePostAsync({
        postId,
        userId,
      });
    } catch (error) {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  return (
    <Button variant="ghost" onClick={isLiked ? unLike : like}>
      {isLiked ? <Icons.clapDark /> : <Icons.clap />}
      <span>{formatNumberWithK(likes)}</span>
    </Button>
  );
}
