import { NextResponse, type NextRequest } from "next/server";

import { handleError } from "@/lib/error";
import prismaClient from "@/lib/prisma";
import { BookmarkRequestSchema } from "@/services/types";

export const DELETE = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { postId, userId } = BookmarkRequestSchema.parse(body);

    await prismaClient.bookmarks.deleteMany({
      where: {
        userId,
        postId,
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
