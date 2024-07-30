import { NextResponse, type NextRequest } from "next/server";

import { handleError } from "@/lib/error";
import prismaClient from "@/lib/prisma";
import { GetCommentsRequestSchema, type GetCommentsResponsePayload } from "@/services/types";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { postId } = GetCommentsRequestSchema.parse(body);

    const data = await prismaClient.comments.findMany({
      where: {
        postId,
      },
    });

    if (data) {
      const payload: GetCommentsResponsePayload = data;
      return NextResponse.json(payload, { status: 200 });
    } else {
      return NextResponse.json(
        { data: null, message: "No comments found for the specified post." },
        { status: 200 },
      );
    }
  } catch (error) {
    return handleError(error);
  }
};
