import type { TagsT } from "@/constants/tags";
import type { Prisma } from "@prisma/client";

import { auth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

import { handleError } from "@/lib/error";
import prismaClient from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
  const { userId } = auth();

  try {
    const searchParams = req.nextUrl.searchParams;
    const from = parseInt(searchParams.get("from") || "0");
    const to = parseInt(searchParams.get("to") || "20");
    const tag = searchParams.get("feed") as TagsT;
    const username = searchParams.get("username");

    // Define the base filter criteria
    const filter: Prisma.PostsWhereInput = {
      ...(username && {
        author: {
          username: username,
        },
      }),
      ...(tag !== "all" && {
        tag: tag,
      }),
    };

    // Count posts with the applied filter
    const totalPosts = await prismaClient.posts.count({
      where: filter,
    });

    // Fetch posts with the applied filter and pagination
    const posts = await prismaClient.posts.findMany({
      skip: from,
      take: to - from,
      include: {
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        author: true,
        ...(userId && {
          bookmarks: {
            where: {
              userId: userId || "",
            },
            select: {
              id: true,
            },
          },
        }),
      },
      orderBy: {
        createdAt: "desc",
      },
      where: filter,
    });

    const postsWithBookmarkStatus = posts.map((post) => ({
      ...post,
      isBookmarked: post?.bookmarks?.length > 0,
    }));

    return NextResponse.json(
      {
        data: postsWithBookmarkStatus,
        total: totalPosts,
      },
      { status: 200 },
    );
  } catch (error) {
    return handleError(error);
  }
};
