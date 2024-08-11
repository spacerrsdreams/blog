import { useMutation } from "@tanstack/react-query";

import request from "@/utils/request";
import { ROUTES } from "@/utils/routes";
import { type LikeRequestPayload } from "@/services/types";

export const useGetLike = () => {
  return useMutation({
    mutationFn: async (postId: string) => {
      return request({
        url: ROUTES.api.post.like(postId),
      });
    },
  });
};

export const useLikePost = () => {
  return useMutation({
    mutationFn: async (payload: LikeRequestPayload) => {
      return request({
        url: ROUTES.api.post.like(payload.postId),
        method: "POST",
        data: payload,
      });
    },
  });
};

export const useRemoveLike = () => {
  return useMutation({
    mutationFn: async (postId: string) => {
      return request({
        url: ROUTES.api.post.like(postId),
        method: "DELETE",
      });
    },
  });
};
