import { likePost, unlikePost } from "@/server/post";

import { useMutation } from "@tanstack/react-query";

type LikePostParams = {
  postId: string;
  authId: string;
};

export function useLikePost() {
  return useMutation({
    mutationFn: ({ postId, authId }: LikePostParams) => likePost(postId, authId),
    onError: (error) => {
      console.error("Error updating user like information:", error);
    },
  });
}

export function useUnLikePost() {
  return useMutation({
    mutationFn: ({ postId, authId }: LikePostParams) => unlikePost(postId, authId),
    onError: (error) => {
      console.error("Error updating user like information:", error);
    },
  });
}
