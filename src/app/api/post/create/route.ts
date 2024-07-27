import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { ROUTES } from "@/utils/routes";
import { handleError } from "@/lib/error";
import prismaClient from "@/lib/prisma";
import { CreateArticleRequestSchema } from "@/services/types";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const data = CreateArticleRequestSchema.parse(body);

    const post = await prismaClient.posts.create({
      data: {
        authorId: userId,
        slug: data.title.toLowerCase().replace(/ /g, "-"),
        title: data.title,
        subTitle: data.subTitle,
        tag: data.tag,
        content: data.postContent,
        coverImageSrc: "",
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
    return handleError(err);
  }
};
