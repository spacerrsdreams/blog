import type { NotificationPayload } from "@/types";

import { auth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

import { ERROR_CODES, ERROR_MESSAGES, handleError } from "@/lib/error";
import { database } from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const from = parseInt(searchParams.get("from") || "0");
  const to = parseInt(searchParams.get("to") || "20");

  try {
    const { userId } = auth();
    if (!userId) {
      return handleError(ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED]);
    }

    const data = await database.notifications.findMany({
      skip: from,
      take: to - from,
      where: {
        addresseeId: userId,
      },
      include: {
        user: {
          select: {
            username: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (data) {
      const payload: NotificationPayload[] = data;
      return NextResponse.json(payload, { status: 200 });
    } else {
      return NextResponse.json(
        { data: null, message: "No user found for the specified id." },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
};
