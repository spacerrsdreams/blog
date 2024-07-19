import { addComment, deleteComment } from "@/server/comment";

import { useMutation } from "@tanstack/react-query";

type PostAuthorParams = {
  postId: string;
  authId: string;
};
type AddCommentParams = {
  postId: string;
  authId: string;
  content: string;
};

export function useAddComment() {
  return useMutation({
    mutationFn: ({ postId, authId, content }: AddCommentParams) =>
      addComment(postId, authId, content),
    onError: (error) => {
      console.error("Error updating user comment information:", error);
    },
  });
}

export function useDeleteComment() {
  return useMutation({
    mutationFn: ({ postId, authId }: PostAuthorParams) => deleteComment(postId, authId),
    onError: (error) => {
      console.error("Error updating user comment information:", error);
    },
  });
}
