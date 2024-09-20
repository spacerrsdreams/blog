import { auth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

import { ERROR_CODES, ERROR_MESSAGES, handleError } from "@/lib/error";
import { database } from "@/lib/prisma";

export const POST = async (_req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }
  try {
    const { userId } = auth();
    if (!userId) {
      return handleError(ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED]);
    }
    const currentComment = await database.comments.findUnique({
      where: {
        id,
      },
    });
    if (!currentComment) {
      return NextResponse.json({ data: null }, { status: 200 });
    }
    const createCommentLike = database.commentLikes.create({
      data: {
        commentId: id,
        userId,
      },
    });

    await database.$transaction(async (transaction) => {
      Promise.all([currentComment, createCommentLike]);

      if (userId !== currentComment.userId) {
        await transaction.notifications.create({
          data: {
            userId,
            postId: currentComment.postId,
            addresseeId: currentComment.userId,
            type: "COMMENT_LIKE",
          },
        });
      }
    });

    return NextResponse.json({ message: "Post liked successfully." }, { status: 201 });
  } catch (error) {
    console.error("Error occurred:", error);
    return handleError(error);
  }
};

export const DELETE = async (_req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }
  try {
    const { userId } = auth();

    if (!userId) {
      return handleError(ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED]);
    }

    const commentLike = await database.commentLikes.findUnique({
      where: {
        userId_commentId: {
          commentId: id,
          userId: userId,
        },
      },
    });

    if (!commentLike) {
      return NextResponse.json(
        { message: "No like found for the specified user and comment." },
        { status: 404 },
      );
    }

    await database.commentLikes.delete({
      where: {
        id: commentLike.id,
      },
    });

    return NextResponse.json({ message: "comment unliked successfully." }, { status: 201 });
  } catch (error) {
    console.error("Error occurred:", error);
    return handleError(error);
  }
};
