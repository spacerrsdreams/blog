import { useMutation } from "@tanstack/react-query";

import { ROUTES } from "@/utils/routes";
import { BookmarkResponseSchema, type BookmarkRequestPayload } from "@/services/types";

export const useGetBookmark = () => {
  return useMutation({
    mutationFn: async (payload: BookmarkRequestPayload) => {
      const res = await fetch(ROUTES.api.post.getBookmark, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch user bookmark information");
      }

      return BookmarkResponseSchema.parse(await res.json());
    },
    onError: (error) => {
      console.error("Error fetching user bookmark information:", error);
    },
  });
};

export const useCreateBookmark = () => {
  return useMutation({
    mutationFn: async (payload: BookmarkRequestPayload) => {
      const res = await fetch(ROUTES.api.post.createBookmark, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to create comment.");
      }

      return BookmarkResponseSchema.parse(await res.json());
    },
    onError: (error) => {
      console.error("Error updating user comment information:", error);
    },
  });
};

export const useRemoveBookmark = () => {
  return useMutation({
    mutationFn: async (payload: BookmarkRequestPayload) => {
      const res = await fetch(ROUTES.api.post.removeBookmark, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to remove comment.");
      }

      return null;
    },
    onError: (error) => {
      console.error("Error updating user comment information:", error);
    },
  });
};
