import { NextResponse, type NextRequest } from "next/server";

import { handleError } from "@/lib/error";
import prismaClient from "@/lib/prisma";
import { BookmarkRequestSchema, type BookmarkResponsePayload } from "@/services/types";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { postId, userId } = BookmarkRequestSchema.parse(body);

    const data = await prismaClient.bookmarks.findFirst({
      where: {
        userId,
        postId,
      },
    });

    if (data) {
      const payload: BookmarkResponsePayload = {
        data,
      };
      return NextResponse.json(payload, { status: 200 });
    } else {
      return NextResponse.json(
        { data: null, message: "No bookmark found for the specified user and post." },
        { status: 200 },
      );
    }
  } catch (error) {
    return handleError(error);
  }
};
