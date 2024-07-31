import { auth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

import { ERROR_CODES, ERROR_MESSAGES, handleError } from "@/lib/error";
import prismaClient from "@/lib/prisma";

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

    await prismaClient.bookmarks.deleteMany({
      where: {
        userId: user.userId,
        postId: id,
      },
    });

    return NextResponse.json(
      { data: null, message: "Bookmark removed successfully." },
      { status: 201 },
    );
  } catch (error) {
    return handleError(error);
  }
};
