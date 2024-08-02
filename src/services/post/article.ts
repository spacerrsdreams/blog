import type { PostT } from "@/types";

import { useMutation } from "@tanstack/react-query";

import { ROUTES } from "@/utils/routes";
import type { CreateArticleRequestPayload } from "@/services/types";

export const useCreateArticle = () => {
  return useMutation({
    mutationFn: async (payload: CreateArticleRequestPayload) => {
      const res = await fetch(ROUTES.api.post.create, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error(res);
        throw new Error("Failed to create article");
      }

      return res.json();
    },
  });
};

export const useGetArticles = () => {
  return useMutation({
    mutationKey: ["articles/get"],
    mutationFn: async (payload: {
      from: number;
      to: number;
      feed: string;
    }): Promise<{ data: PostT[]; totalPosts: string }> => {
      const res = await fetch(
        `${ROUTES.api.post.get}?from=${payload.from}&to=${payload.to}&feed=${payload.feed}`,
      );

      if (!res.ok) {
        console.error(res);
        throw new Error("Failed to fetch articles");
      }

      return res.json();
    },
  });
};
