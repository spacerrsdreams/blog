import type { CommentWithUserProps } from "@/types";

import { useMutation } from "@tanstack/react-query";

import { ROUTES } from "@/utils/routes";
import {
  CommentResponseSchema,
  type CommentRequestPayload,
  type DeleteCommentRequestPayload,
  type EditCommentRequestPayload,
} from "@/services/types";

export const useCreateComment = () => {
  return useMutation({
    mutationFn: async (payload: CommentRequestPayload) => {
      const res = await fetch(ROUTES.api.post.comment(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to create comment.");
      }

      return CommentResponseSchema.parse(await res.json());
    },
  });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: async (payload: DeleteCommentRequestPayload) => {
      const res = await fetch(ROUTES.api.post.comment(payload.commentId), {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete comment.");
      }

      return null;
    },
  });
};

export const useEditComment = () => {
  return useMutation({
    mutationFn: async (payload: EditCommentRequestPayload) => {
      const res = await fetch(ROUTES.api.post.comment(payload.commentId), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: payload.content }),
      });

      if (!res.ok) {
        throw new Error("Failed to edit comment.");
      }

      return null;
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
      const res = await fetch(ROUTES.api.post.getManyComments(payload));

      if (!res.ok) {
        console.error(res);
        throw new Error("Failed to fetch comments");
      }

      return res.json();
    },
  });
};
