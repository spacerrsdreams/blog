"use client";

import { usePopupProvider } from "@/context/PopupProvider";

import { useUser } from "@clerk/nextjs";
import { useState, type Dispatch, type SetStateAction } from "react";

import { useLikeComment, useUnlikeComment } from "@/services/post/comment";
import PostAction from "@/components/post/actions/PostAction";
import { Icons } from "@/components/shared/Icons";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  commentId: string;
  totalCommentLikes: number;
  isLikedByUser: boolean;
  setTotalCommentLikes: Dispatch<SetStateAction<number>>;
};
export default function CommentLikeButton({
  commentId,
  totalCommentLikes,
  isLikedByUser,
  setTotalCommentLikes,
}: Props) {
  const { user } = useUser();
  const { toast } = useToast();
  const { setOpenModal } = usePopupProvider();
  const { mutateAsync: likeComment } = useLikeComment();
  const { mutateAsync: unlikeComment } = useUnlikeComment();
  const [isLiked, setIsLiked] = useState(isLikedByUser);

  const userId = user?.id;
  const like = () => {
    setTotalCommentLikes((prev) => prev + 1);
    likeComment(commentId).catch(() => {
      setTotalCommentLikes((prev) => prev - 1);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to like the comment",
      });
    });
  };

  const unlike = () => {
    setTotalCommentLikes((prev) => prev - 1);
    unlikeComment(commentId).catch(() => {
      setTotalCommentLikes((prev) => prev + 1);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to unlike the comment",
      });
    });
  };

  const handleClick = () => {
    if (!userId) {
      setOpenModal(true, "signIn");
      return;
    }
    isLiked ? unlike() : like();
    setIsLiked(!isLiked);
  };

  return (
    <PostAction
      type="action"
      disableActions={false}
      isSelected={isLiked}
      totalCount={totalCommentLikes | 0}
      Icon={<Icons.clap className="fill-gray-500 hover:fill-black" />}
      IconDark={<Icons.clapDark />}
      onClickFn={handleClick}
    />
  );
}
