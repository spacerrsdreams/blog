import { useMutation } from "@tanstack/react-query";

import request from "@/utils/request";
import { ROUTES } from "@/utils/routes";
import { type ReportStoryRequestPayload } from "@/services/types";

export const useSendEmail = () => {
  return useMutation({
    mutationFn: async (payload: ReportStoryRequestPayload) => {
      return request({
        url: ROUTES.api.email.sendEmail,
        method: "POST",
        data: payload,
      });
    },
  });
};
