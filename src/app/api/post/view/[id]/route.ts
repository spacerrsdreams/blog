import { auth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

import { handleError } from "@/lib/error";
import { database } from "@/lib/prisma";

export const PATCH = async (_req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }

  const user = auth();

  if (!user.userId) {
    return NextResponse.json({ data: null }, { status: 200 });
  }
  try {
    const post = await database.posts.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      return NextResponse.json({ data: null }, { status: 200 });
    }
    await database.posts.update({
      where: {
        id: post.id,
      },
      data: { viewCount: { increment: 1 } },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return handleError(error);
  }
};
