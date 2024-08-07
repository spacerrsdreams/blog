import { auth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

import { ERROR_CODES, ERROR_MESSAGES, handleError } from "@/lib/error";
import prismaClient from "@/lib/prisma";
import { CommentRequestSchema, type GetCommentsResponsePayload } from "@/services/types";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id") || "";
    const from = parseInt(searchParams.get("from") || "0");
    const to = parseInt(searchParams.get("to") || "20");

    if (id === "") {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    const data = await prismaClient.comments.findMany({
      skip: from,
      take: to - from,
      where: {
        postId: id,
      },
      include: {
        user: true,
      },
    });
    console.log(data);

    if (data) {
      const payload: GetCommentsResponsePayload = data;
      return NextResponse.json(payload, { status: 200 });
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
    const { postId, content } = CommentRequestSchema.parse(body);

    const comment = await prismaClient.comments.create({
      data: {
        content,
        userId: user.userId,
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
