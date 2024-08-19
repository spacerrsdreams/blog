import { useMutation } from "@tanstack/react-query";

import request from "@/utils/request";
import { ROUTES } from "@/utils/routes";
import { type LikeRequestPayload } from "@/services/types";

export const useGetLike = () => {
  return useMutation({
    mutationFn: async (postId: string) => {
      return request({
        url: ROUTES.api.post.like(postId, true),
        method: "GET",
      });
    },
  });
};

export const useLikePost = () => {
  return useMutation({
    mutationFn: async (payload: LikeRequestPayload) => {
      return request({
        method: "POST",
        url: ROUTES.api.post.like(),
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
