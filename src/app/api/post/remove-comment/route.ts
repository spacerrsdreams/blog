import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { ROUTES } from "@/utils/routes";
import { ERROR_CODES, ERROR_MESSAGES, handleError } from "@/lib/error";
import prismaClient from "@/lib/prisma";
import { DeleteCommentRequestSchema } from "@/services/types";

export const DELETE = async (req: NextRequest) => {
  const user = auth();

  try {
    if (!user.userId) {
      return handleError(ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED]);
    }

    const body = await req.json();
    const { commentId } = DeleteCommentRequestSchema.parse(body);

    await prismaClient.comments.delete({
      where: {
        id: commentId,
      },
    });

    revalidatePath(ROUTES.articleSlug, "page");
    return NextResponse.json({ message: "Comment removed successfully." }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
};
