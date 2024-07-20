"use server";

import type { Like } from "@/types";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

export const unlikePost = async (postId: string, authorId: string) => {
  let like: Like | null = null;
  try {
    like = await prisma.likes.findFirst({
      where: {
        userId: authorId,
        postId: postId,
      },
    });
    if (like) {
      revalidatePath("/");
    }
  } catch (error) {
    console.error("Error fetching user information:", error);
    throw new Error("An error occurred while fetching user information.");
  }
  try {
    await prisma.likes.delete({
      where: {
        id: like?.id,
      },
    });
  } catch (error) {
    console.error("Error updating user information:", error);
    throw new Error("An error occurred while updating user information.");
  }
};

export const getLike = async (postId: string, authorId: string) => {
  try {
    const like = await prisma.likes.findFirst({
      where: {
        userId: authorId,
        postId: postId,
      },
    });
    return like;
  } catch (error) {
    console.error("Error fetching user information:", error);
    throw new Error("An error occurred while fetching user information.");
  }
};
