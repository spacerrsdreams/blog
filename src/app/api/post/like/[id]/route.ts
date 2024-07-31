import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { ROUTES } from "@/utils/routes";
import { ERROR_CODES, ERROR_MESSAGES, handleError } from "@/lib/error";
import prismaClient from "@/lib/prisma";
import type { LikeResponsePayload } from "@/services/types";

export const GET = async (_req: NextRequest, { params }: { params: { id: string } }) => {
  const user = auth();

  if (!user.userId) {
    return handleError(ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED]);
  }

  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    const data = await prismaClient.likes.findFirst({
      where: {
        userId: user.userId,
        postId: id,
      },
    });

    if (data) {
      const payload: LikeResponsePayload = {
        data,
      };
      return NextResponse.json(payload, { status: 200 });
    } else {
      return NextResponse.json(
        { data: null, message: "No like found for the specified user and post." },
        { status: 200 },
      );
    }
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

    await prismaClient.likes.deleteMany({
      where: {
        userId: user.userId,
        postId: id,
      },
    });

    revalidatePath(ROUTES.root);
    return NextResponse.json({ message: "Post unliked successfully." }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
};
