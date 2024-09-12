import { auth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

import { handleError } from "@/lib/error";
import { database } from "@/lib/prisma";

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
        parentId: id,
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
        { data: null, message: "No reply found for the specified id." },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
};
