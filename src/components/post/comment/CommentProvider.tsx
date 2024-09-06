"use client";

import type { CommentWithUserProps } from "@/types";

import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";

export type CommentContextType = {
  showModal: boolean;
  inEdit: boolean;
  inReply: boolean;
  viewReply: boolean;
  currentCommentId: string;
  comments: CommentWithUserProps[];
  commentsReplies: CommentWithUserProps[];
  commentsCount: number;
  setCommentsCount: Dispatch<SetStateAction<number>>;
  setComments: Dispatch<SetStateAction<CommentWithUserProps[]>>;
  setCommentsReplies: Dispatch<SetStateAction<CommentWithUserProps[]>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setInEdit: Dispatch<SetStateAction<boolean>>;
  setInReply: Dispatch<SetStateAction<boolean>>;
  setViewReply: Dispatch<SetStateAction<boolean>>;
  setCurrentCommentId: Dispatch<SetStateAction<string>>;
};

export const CommentContext = createContext<CommentContextType>({
  setShowModal: () => {},
  setInEdit: () => {},
  setInReply: () => {},
  setViewReply: () => {},
  setCurrentCommentId: () => {},
  setComments: () => {},
  setCommentsReplies: () => {},
  setCommentsCount: () => {},
  commentsCount: 0,
  comments: [],
  commentsReplies: [],
  currentCommentId: "",
  showModal: false,
  inEdit: false,
  inReply: false,
  viewReply: false,
});

export const CommentProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [inEdit, setInEdit] = useState<boolean>(false);
  const [inReply, setInReply] = useState<boolean>(false);
  const [viewReply, setViewReply] = useState<boolean>(false);
  const [currentCommentId, setCurrentCommentId] = useState<string>("");
  const [comments, setComments] = useState<CommentWithUserProps[]>([]);
  const [commentsReplies, setCommentsReplies] = useState<CommentWithUserProps[]>([]);

  const [commentsCount, setCommentsCount] = useState(0);

  const value = {
    showModal,
    currentCommentId,
    inEdit,
    inReply,
    viewReply,
    comments,
    commentsReplies,
    commentsCount,
    setCommentsCount,
    setComments,
    setCommentsReplies,
    setInEdit,
    setInReply,
    setViewReply,
    setCurrentCommentId,
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
