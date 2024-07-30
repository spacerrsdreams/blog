"use client";

import { type CommentT } from "@/types";

import { useEffect, useState } from "react";

import { useGetComments } from "@/services/post/comment";

import Comment from "./Comment";
import CommentEditor from "./CommentEditor";
import { useCommentProvider } from "./CommentProvider";

type Props = {
  postId: string;
};
export default function CommentSection({ postId }: Props) {
  const [comments, setComments] = useState<CommentT[] | null>(null);
  const { inEdit, commentId } = useCommentProvider();
  const { mutateAsync: getCommentsAsync } = useGetComments();

  useEffect(() => {
    getCommentsAsync({ postId }).then((data) => {
      setComments(data);
    });
  }, [getCommentsAsync, postId]);

  return (
    <div className="mt-8 flex flex-col gap-6 overflow-y-auto">
      {comments?.map((comment) => (
        <div key={comment.id}>
          {inEdit && comment.id === commentId ? (
            <CommentEditor content={comment.content} />
          ) : (
            <Comment comment={comment} />
          )}
          <div className="mt-4 w-full border-[0.5px] border-gray-300"></div>
        </div>
      ))}
    </div>
  );
}
