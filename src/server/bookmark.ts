"use server";

import type { Bookmark } from "@/types";

import prisma from "@/lib/prisma";

export const makeBookmark = async (postId: string, authId: string) => {
  try {
    await prisma.bookmark.create({
      data: {
        createdAt: new Date(),
        modifiedAt: new Date(),
        userId: authId,
        postId: postId,
      },
    });
  } catch (error) {
    console.error("Error updating user information:", error);
    throw new Error("An error occurred while updating user information.");
  }
};

export const removeBookmark = async (postId: string, authorId: string) => {
  let bookmark: Bookmark | null = null;
  try {
    bookmark = await prisma.bookmark.findFirst({
      where: {
        userId: authorId,
        postId: postId,
      },
    });
  } catch (error) {
    console.error("Error fetching user information:", error);
    throw new Error("An error occurred while fetching user information.");
  }
  try {
    await prisma.bookmark.delete({
      where: {
        id: bookmark?.id,
      },
    });
  } catch (error) {
    console.error("Error updating user information:", error);
    throw new Error("An error occurred while updating user information.");
  }
};

export const getBookmark = async (postId: string, authorId: string) => {
  try {
    const bookmark = await prisma.bookmark.findFirst({
      where: {
        userId: authorId,
        postId: postId,
      },
    });
    return bookmark;
  } catch (error) {
    console.error("Error fetching user information:", error);
    throw new Error("An error occurred while fetching user information.");
  }
};
