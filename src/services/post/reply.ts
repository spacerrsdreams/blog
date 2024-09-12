import type { CommentWithUserProps } from "@/types";

import { useMutation } from "@tanstack/react-query";

import request from "@/utils/request";
import { ROUTES } from "@/utils/routes";

export const useGetCommentReplies = () => {
  return useMutation({
    mutationKey: ["comments/replies/get"],
    mutationFn: async (payload: {
      from: number;
      to: number;
      id: string;
    }): Promise<CommentWithUserProps[]> => {
      return request({
        url: ROUTES.api.post.getCommentReplies(payload),
        method: "GET",
      });
    },
  });
};
