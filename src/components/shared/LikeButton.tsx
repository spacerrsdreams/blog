"use client";

import { getLike } from "@/server/post";

import { useEffect, useState } from "react";

import { formatNumberWithK } from "@/utils/formatNumberWithK";
import { useLikePost, useUnLikePost } from "@/app/client/post";
import { Button } from "@/components/ui/button";

import { Icons } from "./Icons";

type propsType = {
  data: {
    count: number;
    authorId: string;
    postId: string;
  };
};

export default function LikeButton(postInfo: propsType) {
  const [likes, setLikes] = useState(postInfo.data.count);
  const [isLiked, setIsLiked] = useState(false);
  const { mutateAsync: likePostAsync } = useLikePost();
  const { mutateAsync: unlikePostAsync } = useUnLikePost();

  useEffect(() => {
    getLike(postInfo.data.postId, postInfo.data.authorId).then((data) => {
      if (data) setIsLiked(true);
    });
  }, []);

  const handleClick = async () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);

      try {
        await unlikePostAsync({
          postId: postInfo.data.postId,
          authId: postInfo.data.authorId,
        });
      } catch (error) {
        setLikes(likes + 1);
        setIsLiked(true);
      }
    } else {
      setLikes(likes + 1);
      setIsLiked(true);

      try {
        await likePostAsync({
          postId: postInfo.data.postId,
          authId: postInfo.data.authorId,
        });
      } catch (error) {
        setLikes(likes - 1);
        setIsLiked(false);
      }
    }
  };

  return (
    <Button variant="ghost" onClick={handleClick}>
      {isLiked ? <Icons.clapDark /> : <Icons.clap />}
      <span>{formatNumberWithK(likes)}</span>
    </Button>
  );
}
