import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { ROUTES } from "@/utils/routes";
import { ERROR_CODES, ERROR_MESSAGES, handleError } from "@/lib/error";
import prismaClient from "@/lib/prisma";
import { LikeRequestSchema } from "@/services/types";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return handleError(ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED]);
    }

    const body = await req.json();
    const { postId } = LikeRequestSchema.parse(body);
    const like = await prismaClient.likes.create({
      data: {
        postId,
        userId,
      },
    });
    if (like) {
      revalidatePath(ROUTES.root, "page");
      revalidatePath(ROUTES.articleSlug, "page");
      return NextResponse.json({ message: "Post liked successfully." }, { status: 201 });
    } else {
      return NextResponse.json(
        { error: "An error occurred while liking the post." },
        { status: 500 },
      );
    }
  } catch (error) {
    return handleError(error);
  }
};
