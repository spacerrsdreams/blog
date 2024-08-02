"use client";

import { usePopupProvider } from "@/context/PopupProvider";
import debounce from "debounce";

import { useUser } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";

import { formatNumberWithK } from "@/utils/formatNumberWithK";
import { useGetLike, useLikePost } from "@/services/post/like";
import { Icons } from "@/components/shared/Icons";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import styles from "./likeButton.module.css";

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
  const { open } = usePopupProvider();
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

  const handleClick = () => {
    if (!userId) {
      open(true);
      return;
    }
    setLikes((prevLikes) => prevLikes + 1);
    setIsLiked(true);
    like();

    // Add animation class
    const likeButton = document.getElementById(`like-button-${postId}`);
    likeButton!.classList.add(styles.animate);
    setTimeout(() => {
      likeButton!.classList.remove(styles.animate);
    }, 1000);
  };

  return (
    <Button
      id={`like-button-${postId}`}
      className={styles.likeButton} // Add the CSS module class
      disabled={disabled}
      variant="ghost"
      onClick={handleClick}
    >
      {isLiked ? <Icons.clapDark /> : <Icons.clap />}
      <span>{formatNumberWithK(likes)}</span>
    </Button>
  );
}
