import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { ROUTES } from "@/utils/routes";
import { handleError } from "@/lib/error";
import prismaClient from "@/lib/prisma";
import { LikeRequestSchema } from "@/services/types";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { postId, userId } = LikeRequestSchema.parse(body);
    const like = await prismaClient.likes.create({
      data: {
        userId,
        postId,
      },
    });
    if (like) {
      revalidatePath(ROUTES.root, "page");
      revalidatePath(ROUTES.articleSlug, "page");
      return NextResponse.json({ message: "Post liked successfully." }, { status: 201 });
    } else {
      return NextResponse.json(
        { error: "An error occurred while liking the post." },
        { status: 500 },
      );
    }
  } catch (error) {
    return handleError(error);
  }
};
