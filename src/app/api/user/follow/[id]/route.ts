import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { database } from "@/lib/prisma";

export async function DELETE(req: Request) {
  try {
    const { userId } = auth();
    const { followingUserId } = await req.json();

    if (!userId || !followingUserId) {
      return NextResponse.json(
        { message: "followerId and followingId are required" },
        { status: 400 },
      );
    }

    const existingFollow = await database.followers.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: followingUserId,
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
          followingId: followingUserId,
        },
      },
    });

    return NextResponse.json(deletedFollow, { status: 200 });
  } catch (error) {
    console.error("Error removing follower:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
