"use client";

import { usePopupProvider } from "@/context/PopupProvider";

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";

import { formatNumberWithK } from "@/utils/formatNumberWithK";
import { useGetLike, useLikePost } from "@/services/post/like";
import { Icons } from "@/components/shared/Icons";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  count: number;
  postId: string;
  disabled?: boolean;
};

export default function LikeButton({ count, postId, disabled }: Props) {
  const { user } = useUser();
  const { toast } = useToast();
  const [likes, setLikes] = useState(count);
  const [_, setUserLikes] = useState(0);
  const [isLikedByUser, setIsLikedByUser] = useState(true);
  const { mutateAsync: likePostAsync } = useLikePost();
  const { mutateAsync: getLikeAsync } = useGetLike();
  const { open } = usePopupProvider();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const userId = user?.id;

  useEffect(() => {
    setLikes(count);
  }, [count]);

  useEffect(() => {
    if (!userId || disabled) return;

    getLikeAsync(postId).then(({ data }) => {
      data ? setIsLikedByUser(true) : setIsLikedByUser(false);
    });
  }, [userId, getLikeAsync, postId]);

  const like = (userLikes: number) => {
    likePostAsync({ postId, userLikes })
      .then(() => setUserLikes(0))
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
    setLikes((prevLikes) => prevLikes + 1);
    setUserLikes((prevLikes) => {
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
    <Button disabled={disabled} variant="ghost" onClick={handleClick}>
      {isLikedByUser ? <Icons.clapDark /> : <Icons.clap />}
      <span>{formatNumberWithK(likes)}</span>
    </Button>
  );
}
