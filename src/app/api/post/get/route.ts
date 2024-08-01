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

    const totalPosts = await prismaClient.posts.count();
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
