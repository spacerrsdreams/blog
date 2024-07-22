import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { ROUTES } from "@/utils/routes";
import { handleError } from "@/lib/error";
import prismaClient from "@/lib/prisma";
import { BookmarkRequestSchema } from "@/services/types";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { postId, userId } = BookmarkRequestSchema.parse(body);
    const bookmark = await prismaClient.bookmarks.create({
      data: {
        userId,
        postId,
      },
    });
    if (bookmark) {
      revalidatePath(ROUTES.root);
      return NextResponse.json(
        { data: bookmark, message: "Post bookmarked successfully." },
        { status: 201 },
      );
    } else {
      return NextResponse.json(
        { error: "An error occurred while bookmarking the post." },
        { status: 500 },
      );
    }
  } catch (error) {
    return handleError(error);
  }
};
