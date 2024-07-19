import { clerkClient } from "@clerk/nextjs/server";

export const getUserByUsername = async (username: string) => {
  const authors = await clerkClient.users.getUserList({
    username: [username],
  });

  return authors.data[0];
};

export const getUserByUserId = async (userId: string) => {
  const authors = await clerkClient.users.getUserList({
    userId: [userId],
  });

  return authors.data[0];
};
