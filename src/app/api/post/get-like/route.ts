import { NextResponse, type NextRequest } from "next/server";

import { handleError } from "@/lib/error";
import prismaClient from "@/lib/prisma";
import { LikeRequestSchema } from "@/services/types";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { postId, userId } = LikeRequestSchema.parse(body);

    const data = await prismaClient.likes.findFirst({
      where: {
        userId,
        postId,
      },
    });
    if (data) {
      return NextResponse.json({ data }, { status: 200 });
    } else {
      return NextResponse.json(
        { data: null, message: "No like found for the specified user and post." },
        { status: 404 },
      );
    }
  } catch (error) {
    return handleError(error);
  }
};
