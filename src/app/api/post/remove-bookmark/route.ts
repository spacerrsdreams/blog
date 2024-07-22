import { NextResponse, type NextRequest } from "next/server";

import { handleError } from "@/lib/error";
import prismaClient from "@/lib/prisma";

export const DELETE = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    await prismaClient.bookmarks.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      { data: null, message: "Bookmark removed successfully." },
      { status: 201 },
    );
  } catch (error) {
    return handleError(error);
  }
};
