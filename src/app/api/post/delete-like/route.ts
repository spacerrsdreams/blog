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

    await prismaClient.likes.deleteMany({
      where: {
        userId,
        postId,
      },
    });

    revalidatePath(ROUTES.root);
    return NextResponse.json({ message: "Post unliked successfully." }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
};
