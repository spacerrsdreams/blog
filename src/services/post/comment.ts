import { useMutation } from "@tanstack/react-query";

import { ROUTES } from "@/utils/routes";
import { CommentResponseSchema, type CommentRequestPayload } from "@/services/types";

export const useCreateComment = () => {
  return useMutation({
    mutationFn: async (payload: CommentRequestPayload) => {
      const res = await fetch(ROUTES.api.post.createComment, {
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
    onError: (error) => {
      console.error("Error updating user comment information:", error);
    },
  });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${ROUTES.api.post.deleteComment}?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete comment.");
      }

      return null;
    },
    onError: (error) => {
      console.error("Error deleting user comment:", error);
    },
  });
};
