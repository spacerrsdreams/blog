import { useMutation } from "@tanstack/react-query";

import { ROUTES } from "@/utils/routes";
import { LikeResponseSchema, type LikeRequestPayload } from "@/services/types";

export const useGetLike = () => {
  return useMutation({
    mutationFn: async (payload: LikeRequestPayload) => {
      const res = await fetch(ROUTES.api.post.getLike, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch user like information");
      }

      return LikeResponseSchema.parse(await res.json());
    },
    onError: (error) => {
      console.error("Error fetching user like information:", error);
    },
  });
};

export const useLikePost = () => {
  return useMutation({
    mutationFn: async (payload: LikeRequestPayload) => {
      const res = await fetch(ROUTES.api.post.like, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to like post");
      }

      return res;
    },
    onError: (error) => {
      console.error("Error updating user like information:", error);
    },
  });
};

export const useUnlikePost = () => {
  return useMutation({
    mutationFn: async (payload: LikeRequestPayload) => {
      const res = await fetch(ROUTES.api.post.deleteLike, {
        method: "DELETE",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to unlike post");
      }

      return res;
    },
    onError: (error) => {
      console.error("Error updating user like information:", error);
    },
  });
};
