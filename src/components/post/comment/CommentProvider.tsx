"use client";

/*
1. fetch initial comments with only hasReply and likes
2. make dynamic fetching 20 comments only without replies
3. add ability to like comment; restrict author to like its own comment
4. add ability to reply; reply should be one level
5. edit comment by comment author
6. delete comment by comment author
7. when you click view replies, fetch initial 20 replies
8. make state if there are any replies left
9. make dynamic fetching for replies
10.

*/
import type { CommentWithUserProps } from "@/types";

import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";

type currentCommentInfo = {
  rootId: string;
  parentId?: string;
};
export type CommentContextType = {
  showModal: boolean;
  inEdit: boolean;
  inReply: boolean;
  viewReply: boolean;
  currentCommentInfo: currentCommentInfo;
  comments: CommentWithUserProps[];
  commentsReplies: CommentWithUserProps[];
  commentsCount: number;
  deletedCommentId: string;
  setCommentsCount: Dispatch<SetStateAction<number>>;
  setComments: Dispatch<SetStateAction<CommentWithUserProps[]>>;
  setCommentsReplies: Dispatch<SetStateAction<CommentWithUserProps[]>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setInEdit: Dispatch<SetStateAction<boolean>>;
  setInReply: Dispatch<SetStateAction<boolean>>;
  setDeletedCommentId: Dispatch<SetStateAction<string>>;
  setViewReply: Dispatch<SetStateAction<boolean>>;
  setCurrentCommentInfo: Dispatch<SetStateAction<currentCommentInfo>>;
};

export const CommentContext = createContext<CommentContextType>({
  setShowModal: () => {},
  setInEdit: () => {},
  setInReply: () => {},
  setViewReply: () => {},
  setCurrentCommentInfo: () => {},
  setComments: () => {},
  setCommentsReplies: () => {},
  setCommentsCount: () => {},
  setDeletedCommentId: () => {},
  commentsCount: 0,
  comments: [],
  commentsReplies: [],
  currentCommentInfo: { rootId: "", parentId: "" },
  showModal: false,
  inEdit: false,
  deletedCommentId: "",
  inReply: false,
  viewReply: false,
});

export const CommentProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [inEdit, setInEdit] = useState<boolean>(false);
  const [inReply, setInReply] = useState<boolean>(false);
  const [viewReply, setViewReply] = useState<boolean>(false);
  const [deletedCommentId, setDeletedCommentId] = useState<string>("");
  const [currentCommentInfo, setCurrentCommentInfo] = useState<currentCommentInfo>({
    rootId: "",
    parentId: "",
  });

  const [comments, setComments] = useState<CommentWithUserProps[]>([]);
  const [commentsReplies, setCommentsReplies] = useState<CommentWithUserProps[]>([]);

  const [commentsCount, setCommentsCount] = useState(0);

  const value = {
    showModal,
    inEdit,
    inReply,
    viewReply,
    deletedCommentId,
    comments,
    commentsReplies,
    commentsCount,
    currentCommentInfo,
    setCurrentCommentInfo,
    setDeletedCommentId,
    setCommentsCount,
    setComments,
    setCommentsReplies,
    setInEdit,
    setInReply,
    setViewReply,
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
