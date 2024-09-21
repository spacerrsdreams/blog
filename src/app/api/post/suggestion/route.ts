import { type TagsT } from "@/constants/tags";

import { NextResponse, type NextRequest } from "next/server";

import { handleError } from "@/lib/error";
import { database } from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const tag = searchParams.get("feed") as TagsT;

  try {
    const data = await database.posts.findMany({
      skip: 0,
      take: 6,
      where: {
        tag,
      },

      include: {
        author: true,
        _count: true,
      },
      orderBy: {
        likeCount: "desc",
      },
    });

    if (data) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { data: null, message: "No post found for the specified tag." },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
};
