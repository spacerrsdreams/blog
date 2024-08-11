import type { BookmarkedPost } from "@/types";

import { useMutation } from "@tanstack/react-query";

import { ROUTES } from "@/utils/routes";
import { BookmarkResponseSchema, type BookmarkRequestPayload } from "@/services/types";

export const useCreateBookmark = () => {
  return useMutation({
    mutationFn: async (payload: BookmarkRequestPayload) => {
      const res = await fetch(ROUTES.api.post.bookmark(), {
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
  });
};

export const useGetBookmark = () => {
  return useMutation({
    mutationFn: async (postId: string): Promise<{ data: object | null }> => {
      const res = await fetch(ROUTES.api.post.bookmark(postId));

      if (!res.ok) {
        throw new Error("Failed to get bookmark.");
      }

      return BookmarkResponseSchema.parse(await res.json());
    },
  });
};
export const useGetBookmarksByAuthor = () => {
  return useMutation({
    mutationKey: ["bookmarks/get"],
    mutationFn: async (payload: {
      from: number;
      to: number;
      id: string;
    }): Promise<BookmarkedPost[]> => {
      const res = await fetch(ROUTES.api.post.getBookmarksByAuthor(payload));

      if (!res.ok) {
        console.error(res);
        throw new Error("Failed to fetch comments");
      }

      return res.json();
    },
  });
};

export const useRemoveBookmark = () => {
  return useMutation({
    mutationFn: async (postId: string) => {
      const res = await fetch(ROUTES.api.post.bookmark(postId), {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to remove comment.");
      }

      return null;
    },
  });
};
