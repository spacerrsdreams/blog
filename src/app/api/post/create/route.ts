// eslint-disable-next-line import/named
import { v4 as uuidv4 } from "uuid";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { ROUTES } from "@/utils/routes";
import { ERROR_CODES, ERROR_MESSAGES, handleError } from "@/lib/error";
import prismaClient from "@/lib/prisma";
import { CreateArticleRequestSchema } from "@/services/types";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return handleError(ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED]);
    }

    const body = await req.json();
    const data = CreateArticleRequestSchema.parse(body);

    const post = await prismaClient.posts.create({
      data: {
        authorId: userId,
        slug: data.title.toLowerCase().replace(/ /g, "-") + "-" + uuidv4(),
        title: data.title,
        subTitle: data.subTitle,
        tag: data.tag,
        content: data.postContent,
        coverImageSrc: data.coverImageSrc || "",
      },
    });

    if (post) {
      revalidatePath(ROUTES.root);
      return NextResponse.json(
        { data: post, message: "Article published successfully." },
        { status: 201 },
      );
    } else {
      return NextResponse.json(
        { error: "An error occurred while publishing the article." },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error(err);
    return handleError(err);
  }
};
