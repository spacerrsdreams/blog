import { auth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

import { ERROR_CODES, ERROR_MESSAGES, handleError } from "@/lib/error";
import { database } from "@/lib/prisma";

export const GET = async (_req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }

  const user = auth();

  if (!user.userId) {
    return NextResponse.json({ data: null }, { status: 200 });
  }
  try {
    const isBookmarked = await database.bookmarks.findFirst({
      where: {
        userId: user.userId,
        postId: id,
      },
    });

    if (!isBookmarked) {
      return NextResponse.json({ data: null }, { status: 200 });
    }

    return NextResponse.json({ data: isBookmarked }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
};

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

    await database.bookmarks.deleteMany({
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
