"use client";

import type { UserBasicInfoT } from "@/types";

import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";

type PostContextT = {
  title: string;
  subTitle: string;
  tag: string;
  postId: string;
  author: UserBasicInfoT;
  totalLikes: number;
  userTotalLikes: number;
  totalComments: number;
  isLikedByUser: boolean | undefined;
  isBookmarked: boolean | undefined;
  disableActions: boolean;
  viewCount: number;
  createdAt: Date;
  setTotalLikes: Dispatch<SetStateAction<number>>;
  setTotalComments: Dispatch<SetStateAction<number>>;
  setIsLikedByUser: Dispatch<SetStateAction<boolean | undefined>>;
  setIsBookmarked: Dispatch<SetStateAction<boolean | undefined>>;
  setUserTotalLikes: Dispatch<SetStateAction<number>>;
};

export const PostContext = createContext<PostContextT | null>(null);

export const PostProvider = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: Omit<
    PostContextT,
    | "setTotalLikes"
    | "setTotalComments"
    | "setIsLikedByUser"
    | "setIsBookmarked"
    | "setUserTotalLikes"
  >;
}) => {
  const [totalLikes, setTotalLikes] = useState(data.totalLikes);
  const [isLikedByUser, setIsLikedByUser] = useState(data.isLikedByUser);
  const [totalComments, setTotalComments] = useState(data.totalComments);
  const [isBookmarked, setIsBookmarked] = useState(data.isBookmarked);
  const [userTotalLikes, setUserTotalLikes] = useState(data.userTotalLikes || 0);

  const value = {
    postId: data.postId,
    author: data.author,
    disableActions: data.disableActions,
    createdAt: data.createdAt,
    viewCount: data.viewCount,
    userTotalLikes,
    totalLikes,
    isLikedByUser,
    isBookmarked,
    totalComments,
    title: data.title,
    subTitle: data.subTitle,
    tag: data.tag,
    setIsBookmarked,
    setTotalLikes,
    setTotalComments,
    setIsLikedByUser,
    setUserTotalLikes,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }

  return context;
};
