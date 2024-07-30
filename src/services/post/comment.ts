import { useMutation } from "@tanstack/react-query";

import { ROUTES } from "@/utils/routes";
import {
  CommentResponseSchema,
  GetCommentsResponseSchema,
  type CommentRequestPayload,
  type DeleteCommentRequestPayload,
  type EditCommentRequestPayload,
  type GetCommentRequestPayload,
} from "@/services/types";
import { toast } from "@/components/ui/use-toast";

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
    mutationFn: async (payload: DeleteCommentRequestPayload) => {
      const res = await fetch(ROUTES.api.post.removeComment, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to delete comment.");
      }

      return null;
    },
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Success",
        description: "Comment deleted successfully",
      });
    },
    onError: (error) => {
      console.error("Error deleting user comment:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not delete comment",
      });
    },
  });
};

export const useEditComment = () => {
  return useMutation({
    mutationFn: async (payload: EditCommentRequestPayload) => {
      const res = await fetch(ROUTES.api.post.editComment, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to edit comment.");
      }

      return null;
    },
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Success",
        description: "Comment edited successfully",
      });
    },
    onError: (error) => {
      console.error("Error editing user comment:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not edit comment",
      });
    },
  });
};

export const useGetComments = () => {
  return useMutation({
    mutationFn: async (payload: GetCommentRequestPayload) => {
      const res = await fetch(ROUTES.api.post.getComments, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch user bookmark information");
      }

      return GetCommentsResponseSchema.parse(await res.json());
    },
    onError: (error) => {
      console.error("Error fetching user bookmark information:", error);
    },
  });
};
