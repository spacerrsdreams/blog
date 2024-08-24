import { useMutation } from "@tanstack/react-query";

import request from "@/utils/request";
import { ROUTES } from "@/utils/routes";
import type { Highlight } from "@/services/types";

export const useGetTrending = () => {
  return useMutation({
    mutationKey: ["trending/get"],
    mutationFn: async (): Promise<Highlight[]> => {
      return request({
        url: ROUTES.api.post.trends,
        method: "GET",
      });
    },
  });
};
