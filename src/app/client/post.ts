import { unlikePost } from "@/server/post";

import { useMutation } from "@tanstack/react-query";

type PostAuthorParams = {
  postId: string;
  authId: string;
};

export function useUnLikePost() {
  return useMutation({
    mutationFn: ({ postId, authId }: PostAuthorParams) => unlikePost(postId, authId),
    onError: (error) => {
      console.error("Error updating user like information:", error);
    },
  });
}
