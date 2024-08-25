import { useMutation } from "@tanstack/react-query";

import request from "@/utils/request";
import { ROUTES } from "@/utils/routes";

export const useIncreaseView = () => {
  return useMutation({
    mutationFn: async (payload: { id: string }) => {
      return request({
        url: ROUTES.api.post.view(payload.id),
        method: "PATCH",
      });
    },
  });
};
