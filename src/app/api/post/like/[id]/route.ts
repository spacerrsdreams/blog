import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { ROUTES } from "@/utils/routes";
import { ERROR_CODES, ERROR_MESSAGES, handleError } from "@/lib/error";
import { database } from "@/lib/prisma";

export const DELETE = async (_req: NextRequest, { params }: { params: { id: string } }) => {
  const user = auth();

  if (!user.userId) {
    return handleError(ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED]);
  }
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    const likes = await database.likes.findUnique({
      where: {
        userId_postId: {
          postId: id,
          userId: user.userId,
        },
      },
    });

    if (!likes) {
      return NextResponse.json(
        { message: "No like found for the specified user and post." },
        { status: 404 },
      );
    }

    await database.$transaction(async (transaction) => {
      await transaction.likes.delete({
        where: {
          id: likes.id,
        },
      });

      await transaction.posts.update({
        where: {
          id,
        },
        data: {
          likeCount: {
            decrement: likes.likeCount,
          },
        },
      });
    });

    revalidatePath(ROUTES.root);
    revalidatePath(ROUTES.articleSlug);
    return NextResponse.json({ message: "Post unliked successfully." }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
};
