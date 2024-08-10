import { useMutation } from "@tanstack/react-query";

import { ROUTES } from "@/utils/routes";

export const useCreateFollower = () => {
  return useMutation({
    mutationFn: async (payload: { followingUserId: string }) => {
      const response = await fetch(ROUTES.api.user.followers, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to follow user");
      }

      return response.json();
    },
  });
};
