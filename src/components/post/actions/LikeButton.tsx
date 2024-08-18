"use client";

import { usePopupProvider } from "@/context/PopupProvider";

import { useUser } from "@clerk/nextjs";
import { useRef, useState } from "react";

import { formatNumberWithK } from "@/utils/formatNumberWithK";
import { useLikePost } from "@/services/post/like";
import { usePostContext } from "@/components/post/context/PostContext";
import { Icons } from "@/components/shared/Icons";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function LikeButton() {
  const {
    totalLikes,
    postId,
    isLikedByUser,
    disableActions,
    setTotalLikes,
    setUserTotalLikes,
    setIsLikedByUser,
  } = usePostContext();
  const { user } = useUser();
  const { toast } = useToast();
  const { open } = usePopupProvider();
  const { mutateAsync: likePost } = useLikePost();
  const [_, setLocalUserTotalLikes] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const userId = user?.id;

  const like = (userLikes: number) => {
    likePost({ postId, userLikes })
      .then(() => setLocalUserTotalLikes(0))
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to like the post",
        });
      });
  };

  const handleClick = () => {
    if (!userId) {
      open(true);
      return;
    }

    setIsLikedByUser(true);
    setTotalLikes((prevLikes) => prevLikes + 1);
    setUserTotalLikes((prevLikes) => prevLikes + 1);
    setLocalUserTotalLikes((prevLikes) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        like(prevLikes + 1);
      }, 500);

      return prevLikes + 1;
    });
  };

  return (
    <Button disabled={disableActions} variant="ghost" onClick={handleClick}>
      {isLikedByUser ? <Icons.clapDark /> : <Icons.clap />}
      <span>{formatNumberWithK(totalLikes)}</span>
    </Button>
  );
}
