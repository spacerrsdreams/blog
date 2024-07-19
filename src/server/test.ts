"use server";

import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";

export const getUserData = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("User ID is required");
    }

    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { id: userId },
      });
    }

    return user;
  } catch (error) {
    console.error("Error fetching or creating user:", error);
    throw new Error("An error occurred while fetching or creating the user.");
  }
};
