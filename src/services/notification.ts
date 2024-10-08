import { type NotificationPayload } from "@/types";

import { useMutation } from "@tanstack/react-query";

import request from "@/utils/request";
import { ROUTES } from "@/utils/routes";

export const useGetNotifications = () => {
  return useMutation({
    mutationKey: ["notifications/get"],
    mutationFn: async (payload: { from: number; to: number }): Promise<NotificationPayload[]> => {
      return request({
        url: ROUTES.api.notification.getNotifications(payload),
        method: "GET",
      });
    },
  });
};

export const UpdateNotificationStatus = () => {
  return useMutation({
    mutationFn: async (id: string | undefined) => {
      return request({
        url: ROUTES.api.notification.updateNotificationStatus(id),
        method: "PATCH",
        data: { id },
      });
    },
  });
};
