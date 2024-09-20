import { auth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

import { ERROR_CODES, ERROR_MESSAGES, handleError } from "@/lib/error";
import { database } from "@/lib/prisma";

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }

  const user = auth();

  if (!user.userId) {
    return handleError(ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED]);
  }

  try {
    await database.notifications.update({
      where: {
        id,
      },
      data: {
        read: true,
      },
    });

    return NextResponse.json(
      { data: null, message: "Notifications updated successfully." },
      { status: 201 },
    );
  } catch (error) {
    return handleError(error);
  }
};
