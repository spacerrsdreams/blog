import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { ROUTES } from "@/utils/routes";
import { ERROR_CODES, ERROR_MESSAGES, handleError } from "@/lib/error";
import prismaClient from "@/lib/prisma";
import { BookmarkRequestSchema } from "@/services/types";

export const POST = async (req: NextRequest) => {
  const user = auth();

  try {
    const body = await req.json();
    const { postId, userId } = BookmarkRequestSchema.parse(body);

    if (user.userId !== userId) {
      return handleError(ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED]);
    }
    const bookmark = await prismaClient.bookmarks.create({
      data: {
        userId,
        postId,
      },
    });
    if (bookmark) {
      revalidatePath(ROUTES.root);
      return NextResponse.json(
        { data: bookmark, message: "Post bookmarked successfully." },
        { status: 201 },
      );
    } else {
      return NextResponse.json(
        { error: "An error occurred while bookmarking the post." },
        { status: 500 },
      );
    }
  } catch (error) {
    return handleError(error);
  }
};
