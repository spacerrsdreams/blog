import { auth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

import { ERROR_CODES, ERROR_MESSAGES, handleError } from "@/lib/error";
import { database } from "@/lib/prisma";
import { CommentRequestSchema } from "@/services/types";

export const GET = async (req: NextRequest) => {
  const { userId } = auth();
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id") || "";
    const from = parseInt(searchParams.get("from") || "0");
    const to = parseInt(searchParams.get("to") || "20");

    if (id === "") {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    const data = await database.comments.findMany({
      skip: from,
      take: to - from,
      where: {
        postId: id,
      },
      include: {
        user: {
          select: {
            imageUrl: true,
            username: true,
          },
        },
        commentLikes: true,
      },
    });

    if (data) {
      const payloadWithLikeStatus = data.map((comment) => ({
        ...comment,
        isLikedByUser: comment.commentLikes.find((like) => like.userId === userId),
        totalLikes: comment.commentLikes.length,
      }));

      return NextResponse.json(payloadWithLikeStatus, { status: 200 });
    } else {
      return NextResponse.json(
        { data: null, message: "No user found for the specified id." },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
};

export const POST = async (req: NextRequest) => {
  const user = auth();

  if (!user.userId) {
    return handleError(ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED]);
  }
  try {
    const body = await req.json();
    const { postId, content, parentId } = CommentRequestSchema.parse(body);

    const comment = await database.comments.create({
      data: {
        content,
        userId: user.userId,
        postId,
        parentId: parentId ?? null,
      },
    });

    return NextResponse.json(
      { data: comment, message: "Comment added successfully." },
      { status: 201 },
    );
  } catch (error) {
    return handleError(error);
  }
};
