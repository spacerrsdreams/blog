import { auth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

import { handleError } from "@/lib/error";
import { database } from "@/lib/prisma";

export const GET = async (_req: NextRequest, { params }: { params: { authorId: string } }) => {
  try {
    const { authorId } = params;
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!authorId) {
      return NextResponse.json({ message: "authorId is required" }, { status: 400 });
    }

    const existingFollower = await database.followers.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: authorId,
        },
      },
    });

    return NextResponse.json({ data: existingFollower }, { status: 200 });
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
};

export async function DELETE(_req: NextRequest, { params }: { params: { authorId: string } }) {
  try {
    const { userId } = auth();
    const { authorId } = params;

    if (!userId || !authorId) {
      return NextResponse.json(
        { message: "followerId and followingId are required" },
        { status: 400 },
      );
    }

    const existingFollow = await database.followers.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: authorId,
        },
      },
    });

    if (!existingFollow) {
      return NextResponse.json({ message: "Follow relationship does not exist" }, { status: 400 });
    }

    const deletedFollow = await database.followers.delete({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: authorId,
        },
      },
    });

    return NextResponse.json(deletedFollow, { status: 200 });
  } catch (error) {
    console.error("Error removing follower:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
