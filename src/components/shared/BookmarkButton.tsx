/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { getBookmark } from "@/server/bookmark";

import { useEffect, useState } from "react";

import { useMakeBookmark, useRemoveBookmark } from "@/app/client/bookmark";

import { Icons } from "./Icons";

type propsType = {
  data: {
    authorId: string;
    postId: string;
  };
};

export default function BookmarkButton(postInfo: propsType) {
  const [isChecked, setIsChecked] = useState(false);
  const makeBookmarkData = useMakeBookmark();
  const removeBookmarkData = useRemoveBookmark();

  useEffect(() => {
    getBookmark(postInfo.data.postId, postInfo.data.authorId).then((data) => {
      if (data) setIsChecked(true);
    });
  }, []);

  const handleClick = async (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    if (isChecked) {
      setIsChecked(false);

      try {
        await removeBookmarkData.mutateAsync({
          postId: postInfo.data.postId,
          authId: postInfo.data.authorId,
        });
      } catch (error) {
        setIsChecked(true);
      }
    } else {
      setIsChecked(true);

      try {
        await makeBookmarkData.mutateAsync({
          postId: postInfo.data.postId,
          authId: postInfo.data.authorId,
        });
      } catch (error) {
        setIsChecked(false);
      }
    }
  };

  return (
    <span className="flex items-center">
      {isChecked ? (
        <Icons.bookmarkDark onClick={handleClick} />
      ) : (
        <Icons.bookmark onClick={handleClick} />
      )}
    </span>
  );
}
