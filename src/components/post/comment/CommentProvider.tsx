"use client";

import type { CommentT } from "@/types";

import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";

export type CommentContextType = {
  showModal: boolean;
  inEdit: boolean;
  commentId: string;
  comments: CommentT[];
  commentsCount: number;
  setCommentsCount: Dispatch<SetStateAction<number>>;
  setComments: Dispatch<SetStateAction<CommentT[]>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setInEdit: Dispatch<SetStateAction<boolean>>;
  setCommentId: Dispatch<SetStateAction<string>>;
};

export const CommentContext = createContext<CommentContextType>({
  setShowModal: () => {},
  setInEdit: () => {},
  setCommentId: () => {},
  setComments: () => {},
  setCommentsCount: () => {},
  commentsCount: 0,
  comments: [],
  commentId: "",
  showModal: false,
  inEdit: false,
});

export const CommentProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [inEdit, setInEdit] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<string>("");
  const [comments, setComments] = useState<CommentT[]>([]);
  const [commentsCount, setCommentsCount] = useState(0);

  const value = {
    showModal,
    commentId,
    inEdit,
    comments,
    commentsCount,
    setCommentsCount,
    setComments,
    setInEdit,
    setCommentId,
    setShowModal,
  };

  return <CommentContext.Provider value={value}>{children}</CommentContext.Provider>;
};

export const useCommentProvider = () => {
  const context = useContext(CommentContext);

  if (context === undefined) {
    throw new Error("useCommentProvider must be used within a CommentProvider");
  }

  return context;
};
