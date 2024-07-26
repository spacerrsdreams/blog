import { useMutation } from "@tanstack/react-query";

import { ROUTES } from "@/utils/routes";
import { type CreateArticleRequestPayload } from "@/services/types";

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
