import { NextResponse, type NextRequest } from "next/server";

import { handleError } from "@/lib/error";
import prismaClient from "@/lib/prisma";
import { CommentRequestSchema } from "@/services/types";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { postId, userId, content } = CommentRequestSchema.parse(body);

    const comment = await prismaClient.comments.create({
      data: {
        content,
        userId,
        postId,
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
