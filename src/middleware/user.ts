"use server";

import prisma from "@/lib/prisma";

export const syncUserIdWithDatabase = async (userId: string | null) => {
  if (!userId) return;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      await prisma.user.create({
        data: {
          id: userId,
        },
      });
    }
  } catch (e) {
    throw new Error("Something went wrong while fetching user");
  }
};
