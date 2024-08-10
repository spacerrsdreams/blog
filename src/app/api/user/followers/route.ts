import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { database } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { followingUserId } = await req.json();

    if (!userId || !followingUserId) {
      return NextResponse.json(
        { message: "followerId and followingId are required" },
        { status: 400 },
      );
    }

    if (userId === followingUserId) {
      return NextResponse.json({ message: "You cannot follow yourself" }, { status: 400 });
    }

    const existingFollow = await database.followers.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: followingUserId,
        },
      },
    });

    if (existingFollow) {
      return NextResponse.json({ message: "User is already following" }, { status: 400 });
    }

    const newFollow = await database.followers.create({
      data: {
        followerId: userId,
        followingId: followingUserId,
      },
    });

    return NextResponse.json(newFollow, { status: 201 });
  } catch (error) {
    console.error("Error adding follower:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
