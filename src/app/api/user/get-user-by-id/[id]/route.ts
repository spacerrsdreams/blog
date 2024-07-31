//import type { UserPayload } from "@/types";

import type { UserPayload } from "@/types";

import { NextResponse, type NextRequest } from "next/server";

import { handleError } from "@/lib/error";
import prismaClient from "@/lib/prisma";

//import { GetUserByIdRequestSchema } from "@/services/types";

// export const POST = async (req: NextRequest) => {
//   try {
//     const body = await req.json();
//     const { userId } = GetUserByIdRequestSchema.parse(body);
//     const data = await prismaClient.users.findUnique({
//       where: {
//         id: userId,
//       },
//     });

//     if (data) {
//       const payload: UserPayload = data;
//       return NextResponse.json(payload, { status: 200 });
//     } else {
//       return NextResponse.json(
//         { data: null, message: "No user found for the specified id." },
//         { status: 200 },
//       );
//     }
//   } catch (error) {
//     console.log(error);
//     return handleError(error);
//   }
// };

export const GET = async (_req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    const data = await prismaClient.users.findUnique({
      where: {
        id,
      },
    });

    if (data) {
      const payload: UserPayload = data;
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
