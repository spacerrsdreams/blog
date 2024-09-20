"use client";

import { usePopupProvider } from "@/context/PopupProvider";

import { useUser } from "@clerk/nextjs";
import { useRef, useState } from "react";

import { useLikePost } from "@/services/post/like";
import PostAction from "@/components/post/actions/PostAction";
import { usePostContext } from "@/components/post/context/PostContext";
import { Icons } from "@/components/shared/Icons";
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
    author,
  } = usePostContext();
  const { user } = useUser();
  const { toast } = useToast();
  const { setOpenModal } = usePopupProvider();
  const { mutateAsync: likePost } = useLikePost();
  const [_, setLocalUserTotalLikes] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const userId = user?.id;

  const like = (userLikes: number) => {
    likePost({ postId, userLikes, authorId: author.id })
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
      setOpenModal(true, "signIn");
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
    <PostAction
      type="action"
      disableActions={disableActions}
      totalCount={totalLikes}
      isSelected={isLikedByUser}
      Icon={<Icons.clap className="fill-gray-500 hover:fill-black" />}
      IconDark={<Icons.clapDark />}
      onClickFn={handleClick}
    />
  );
}
