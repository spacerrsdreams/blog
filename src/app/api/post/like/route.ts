import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { ROUTES } from "@/utils/routes";
import { ERROR_CODES, ERROR_MESSAGES, handleError } from "@/lib/error";
import { database } from "@/lib/prisma";
import { LikeRequestSchema } from "@/services/types";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return handleError(ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED]);
    }

    const body = await req.json();
    const { postId, userLikes } = LikeRequestSchema.parse(body);

    await database.posts.update({
      where: { id: postId },
      data: {
        likeCount: {
          increment: userLikes,
        },
      },
    });

    await database.likes.upsert({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
      update: {
        likeCount: {
          increment: userLikes,
        },
      },
      create: {
        userId,
        postId,
        likeCount: userLikes,
      },
    });

    revalidatePath(ROUTES.root, "page");
    revalidatePath(ROUTES.articleSlug, "page");
    return NextResponse.json({ message: "Post liked successfully." }, { status: 201 });
  } catch (error) {
    console.error("Error occurred:", error); // Log the error for debugging
    return handleError(error);
  }
};
