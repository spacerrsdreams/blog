import { useMutation } from "@tanstack/react-query";

import request from "@/utils/request";
import { ROUTES } from "@/utils/routes";
import { type BookmarkRequestPayload } from "@/services/types";

export const useCreateBookmark = () => {
  return useMutation({
    mutationFn: async (payload: BookmarkRequestPayload) => {
      return request({
        url: ROUTES.api.post.bookmark(),
        method: "POST",
        data: payload,
      });
    },
  });
};

export const useGetBookmarkByPostId = () => {
  return useMutation({
    mutationFn: async (postId: string): Promise<{ data: object | null }> => {
      return request({
        url: ROUTES.api.post.bookmark(postId),
      });
    },
  });
};

export const useRemoveBookmark = () => {
  return useMutation({
    mutationFn: async (postId: string) => {
      return request({
        url: ROUTES.api.post.bookmark(postId),
        method: "DELETE",
      });
    },
  });
};
