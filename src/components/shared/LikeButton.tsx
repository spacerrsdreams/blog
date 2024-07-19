/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { getLike } from "@/server/post";

import { useEffect, useState } from "react";

import { formatNumberWithK } from "@/utils/formatNumberWithK";
import { useLikePost, useUnLikePost } from "@/app/client/post";

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
  const likePostData = useLikePost();
  const unLikePostData = useUnLikePost();

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
        await unLikePostData.mutateAsync({
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
        await likePostData.mutateAsync({
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
    <span className="flex items-center">
      <>
        {isLiked ? <Icons.clapDark onClick={handleClick} /> : <Icons.clap onClick={handleClick} />}
        <span>{formatNumberWithK(likes)}</span>
      </>
    </span>
  );
}
