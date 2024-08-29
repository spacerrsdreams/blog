import type { CommentWithUserProps } from "@/types";

import { useMutation } from "@tanstack/react-query";

import request from "@/utils/request";
import { ROUTES } from "@/utils/routes";
import type {
  CommentRequestPayload,
  DeleteCommentRequestPayload,
  EditCommentRequestPayload,
} from "@/services/types";

export const useCreateComment = () => {
  return useMutation({
    mutationFn: async (payload: CommentRequestPayload) => {
      return request({
        url: ROUTES.api.post.comment(),
        method: "POST",
        data: payload,
      });
    },
  });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: async (payload: DeleteCommentRequestPayload) => {
      return request({
        url: ROUTES.api.post.comment(payload.commentId),
        method: "DELETE",
      });
    },
  });
};

export const useEditComment = () => {
  return useMutation({
    mutationFn: async (payload: EditCommentRequestPayload) => {
      return request({
        url: ROUTES.api.post.comment(payload.commentId),
        method: "PATCH",
        data: { content: payload.content },
      });
    },
  });
};

export const useGetComments = () => {
  return useMutation({
    mutationKey: ["comments/get"],
    mutationFn: async (payload: {
      from: number;
      to: number;
      id: string;
    }): Promise<CommentWithUserProps[]> => {
      return request({
        url: ROUTES.api.post.getManyComments(payload),
        method: "GET",
      });
    },
  });
};

export const useLikeComment = () => {
  return useMutation({
    mutationFn: async (commentId: string) => {
      return request({
        method: "POST",
        url: ROUTES.api.post.likeComment(commentId),
        data: commentId,
      });
    },
  });
};

export const useUnlikeComment = () => {
  return useMutation({
    mutationFn: async (commentId: string) => {
      return request({
        method: "DELETE",
        url: ROUTES.api.post.unlikeComment(commentId),
        data: commentId,
      });
    },
  });
};
