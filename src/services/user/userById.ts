import { useMutation } from "@tanstack/react-query";

import { ROUTES } from "@/utils/routes";

import type { GetUserByIdRequestPayload } from "../types";

export const useGetUserById = () => {
  return useMutation({
    mutationFn: async (payload: GetUserByIdRequestPayload) => {
      const res = await fetch(ROUTES.api.user.getUserById(payload.userId));
      if (!res.ok) {
        throw new Error("Failed to fetch user information");
      }

      return await res.json();
    },
  });
};
