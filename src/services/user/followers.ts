import { useMutation } from "@tanstack/react-query";

import request from "@/utils/request";
import { ROUTES } from "@/utils/routes";

export const useFollow = () => {
  return useMutation({
    mutationFn: async (payload: { followingUserId: string }): Promise<{ data: object | null }> => {
      return request({
        url: ROUTES.api.user.followers(),
        method: "POST",
        data: payload,
      });
    },
  });
};

export const useUnfollow = () => {
  return useMutation({
    mutationFn: async (authorId: string) => {
      return request({
        url: ROUTES.api.user.followers(authorId),
        method: "DELETE",
      });
    },
  });
};

export const useGetFollowerIfExists = () => {
  return useMutation({
    mutationFn: async (authorId: string) => {
      return request({
        url: ROUTES.api.user.followers(authorId),
      });
    },
  });
};
