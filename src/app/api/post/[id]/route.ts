import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { ROUTES } from "@/utils/routes";
import { ERROR_CODES, ERROR_MESSAGES, handleError } from "@/lib/error";
import prismaClient from "@/lib/prisma";

export const DELETE = async (_req: NextRequest, { params }: { params: { id: string } }) => {
  const user = auth();

  try {
    if (!user.userId) {
      return handleError(ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED]);
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "post id is required" }, { status: 400 });
    }

    await prismaClient.posts.delete({
      where: {
        id,
        authorId: user.userId,
      },
    });

    revalidatePath(ROUTES.articleSlug, "page");
    return NextResponse.json({ message: "Comment removed successfully." }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
};
