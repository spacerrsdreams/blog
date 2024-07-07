import { clerkClient } from "@clerk/nextjs/server";

export const getUserByUsername = async (username: string) => {
  const authors = await clerkClient.users.getUserList({
    username: [username],
  });

  return authors.data[0];
};
