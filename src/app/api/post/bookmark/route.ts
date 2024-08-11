import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { ROUTES } from "@/utils/routes";
import { ERROR_CODES, ERROR_MESSAGES, handleError } from "@/lib/error";
import { database } from "@/lib/prisma";
import { BookmarkRequestSchema } from "@/services/types";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id") || "";
    const from = parseInt(searchParams.get("from") || "0");
    const to = parseInt(searchParams.get("to") || "20");

    if (id === "") {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    const data = await database.bookmarks.findMany({
      skip: from,
      take: to - from,

      where: {
        userId: id,
      },

      include: {
        post: {
          select: {
            id: true,
            slug: true,
            tag: true,
            title: true,
            subTitle: true,
            coverImageSrc: true,
            createdAt: true,
            author: true,

            _count: {
              select: {
                likes: true,
                comments: true,
              },
            },
          },
        },
      },
    });

    if (data) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { data: null, message: "No bookmarks found for the specified user." },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return handleError(ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED]);
    }

    const body = await req.json();
    const { postId } = BookmarkRequestSchema.parse(body);
    const bookmark = await database.bookmarks.create({
      data: {
        userId,
        postId,
      },
    });

    if (bookmark) {
      revalidatePath(ROUTES.root);
      return NextResponse.json(
        { data: bookmark, message: "Post bookmarked successful." },
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
