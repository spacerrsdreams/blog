import { useMutation } from "@tanstack/react-query";

import { ROUTES } from "@/utils/routes";

export const useFollow = () => {
  return useMutation({
    mutationFn: async (payload: { followingUserId: string }): Promise<{ data: object | null }> => {
      const response = await fetch(ROUTES.api.user.followers(), {
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

export const useUnfollow = () => {
  return useMutation({
    mutationFn: async (authorId: string) => {
      const response = await fetch(ROUTES.api.user.followers(authorId), {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to unfollow user");
      }

      return response.json();
    },
  });
};

export const useGetFollowerIfExists = () => {
  return useMutation({
    mutationFn: async (authorId: string) => {
      const response = await fetch(ROUTES.api.user.followers(authorId));

      if (!response.ok) {
        throw new Error("Failed to get follower");
      }

      return response.json();
    },
  });
};
