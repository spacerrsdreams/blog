"use client";

import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";

export type CommentContextType = {
  showModal: boolean;
  inEdit: boolean;
  commentId: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setInEdit: Dispatch<SetStateAction<boolean>>;
  setCommentId: Dispatch<SetStateAction<string>>;
};

export const CommentContext = createContext<CommentContextType>({
  setShowModal: () => {},
  setInEdit: () => {},
  setCommentId: () => {},
  commentId: "",
  showModal: false,
  inEdit: false,
});

export const CommentProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [inEdit, setInEdit] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<string>("");

  const value = {
    showModal,
    commentId,
    inEdit,
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
