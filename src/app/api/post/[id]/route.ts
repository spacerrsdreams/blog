import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { ROUTES } from "@/utils/routes";
import { ERROR_CODES, ERROR_MESSAGES, handleError } from "@/lib/error";
import { database } from "@/lib/prisma";

export const DELETE = async (_req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "post id is required" }, { status: 400 });
    }

    const user = auth();

    if (!user.userId) {
      return handleError(ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED]);
    }
    await database.posts.delete({
      where: {
        id,
        authorId: user.userId,
      },
    });

    revalidatePath(ROUTES.articleSlug, "page");
    return NextResponse.json({ message: "Post removed successfully." }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
};
