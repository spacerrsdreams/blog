import { useMutation } from "@tanstack/react-query";

import request from "@/utils/request";
import { ROUTES } from "@/utils/routes";
import { type ArticleT } from "@/services/types";

export const useGetSuggestions = () => {
  return useMutation({
    mutationKey: ["suggestions/get"],
    mutationFn: async (payload: string): Promise<ArticleT[]> => {
      return request({
        url: ROUTES.api.post.getSuggestions(payload),
        method: "GET",
      });
    },
  });
};
