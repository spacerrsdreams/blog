import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { ROUTES } from "@/utils/routes";
import { ERROR_CODES, ERROR_MESSAGES, handleError } from "@/lib/error";
import prismaClient from "@/lib/prisma";
import { LikeRequestSchema } from "@/services/types";

export const DELETE = async (req: NextRequest) => {
  const user = auth();

  try {
    const body = await req.json();
    const { postId, userId } = LikeRequestSchema.parse(body);

    if (user.userId !== userId) {
      return handleError(ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED]);
    }

    await prismaClient.likes.deleteMany({
      where: {
        userId,
        postId,
      },
    });

    revalidatePath(ROUTES.root);
    return NextResponse.json({ message: "Post unliked successfully." }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
};
