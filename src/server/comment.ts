"use server";

import type { CommentT } from "@/types";

import prisma from "@/lib/prisma";

export const addComment = async (postId: string, authId: string, content: string) => {
  try {
    await prisma.comments.create({
      data: {
        content,
        userId: authId,
        postId: postId,
      },
    });
  } catch (error) {
    console.error("Error updating user information:", error);
    throw new Error("An error occurred while updating user information.");
  }
};

export const deleteComment = async (postId: string, authorId: string) => {
  let comment: CommentT | null = null;
  try {
    comment = await prisma.comments.findFirst({
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
    await prisma.bookmarks.delete({
      where: {
        id: comment?.id,
      },
    });
  } catch (error) {
    console.error("Error updating user information:", error);
    throw new Error("An error occurred while updating user information.");
  }
};

export const getComment = async (postId: string, authorId: string) => {
  try {
    const comment = await prisma.bookmarks.findFirst({
      where: {
        userId: authorId,
        postId: postId,
      },
    });
    return comment;
  } catch (error) {
    console.error("Error fetching user information:", error);
    throw new Error("An error occurred while fetching user information.");
  }
};
