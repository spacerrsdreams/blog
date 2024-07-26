import { auth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

import { ERROR_CODES, ERROR_MESSAGES, handleError } from "@/lib/error";
import prismaClient from "@/lib/prisma";
import { CommentRequestSchema } from "@/services/types";

export const POST = async (req: NextRequest) => {
  const user = auth();

  if (!user.userId) {
    return handleError(ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED]);
  }
  try {
    const body = await req.json();
    const { postId, content } = CommentRequestSchema.parse(body);

    const comment = await prismaClient.comments.create({
      data: {
        content,
        userId: user.userId,
        postId,
      },
    });

    return NextResponse.json(
      { data: comment, message: "Comment added successfully." },
      { status: 201 },
    );
  } catch (error) {
    return handleError(error);
  }
};
