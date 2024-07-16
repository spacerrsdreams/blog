import { makeBookmark, removeBookmark } from "@/server/bookmark";

import { useMutation } from "@tanstack/react-query";

type PostAuthorParams = {
  postId: string;
  authId: string;
};

export function useMakeBookmark() {
  return useMutation({
    mutationFn: ({ postId, authId }: PostAuthorParams) => makeBookmark(postId, authId),
    onError: (error) => {
      console.error("Error updating user like information:", error);
    },
  });
}

export function useRemoveBookmark() {
  return useMutation({
    mutationFn: ({ postId, authId }: PostAuthorParams) => removeBookmark(postId, authId),
    onError: (error) => {
      console.error("Error updating user like information:", error);
    },
  });
}
