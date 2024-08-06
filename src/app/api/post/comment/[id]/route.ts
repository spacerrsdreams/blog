import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { ROUTES } from "@/utils/routes";
import { ERROR_CODES, ERROR_MESSAGES, handleError } from "@/lib/error";
import prismaClient from "@/lib/prisma";
import type { GetCommentsResponsePayload } from "@/services/types";

export const GET = async (_req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    const data = await prismaClient.comments.findMany({
      where: {
        postId: id,
      },
    });

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

export const DELETE = async (_req: NextRequest, { params }: { params: { id: string } }) => {
  const user = auth();

  try {
    if (!user.userId) {
      return handleError(ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED]);
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    await prismaClient.comments.delete({
      where: {
        id,
      },
    });

    revalidatePath(ROUTES.articleSlug, "page");
    return NextResponse.json({ message: "Comment removed successfully." }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
};

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }

  const user = auth();

  if (!user.userId) {
    return handleError(ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED]);
  }
  try {
    const body = await req.json();
    const { content } = body;

    const comment = await prismaClient.comments.update({
      where: {
        id: id,
      },
      data: {
        content,
      },
    });

    return NextResponse.json(
      { data: comment, message: "Comment edited successfully." },
      { status: 201 },
    );
  } catch (error) {
    return handleError(error);
  }
};
