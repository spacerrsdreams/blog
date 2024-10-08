import type { TagsT } from "@/constants/tags";
import type { Prisma } from "@prisma/client";

// eslint-disable-next-line import/named

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { ROUTES } from "@/utils/routes";
import { ERROR_CODES, ERROR_MESSAGES, handleError } from "@/lib/error";
import { database } from "@/lib/prisma";
import { CreateArticleRequestSchema, EditArticleRequestSchema } from "@/services/types";

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
    const totalPosts = await database.posts.count({
      where: filter,
    });

    // Fetch posts with the applied filter and pagination
    const posts = await database.posts.findMany({
      skip: from,
      take: to - from,
      include: {
        _count: {
          select: {
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
          likes: {
            where: {
              userId: userId || "",
            },
            select: {
              likeCount: true,
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
      isLikedByUser: post?.likes?.length > 0,
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

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return handleError(ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED]);
    }

    const body = await req.json();
    const data = CreateArticleRequestSchema.parse(body);

    const post = await database.$transaction(async (transaction) => {
      const newPost = await transaction.posts.create({
        data: {
          authorId: userId,
          title: data.title,
          subTitle: data.subTitle,
          tag: data.tag,
          content: data.postContent,
          coverImageSrc: data.coverImageSrc || "",
        },
      });

      const followers = await transaction.followers.findMany({
        where: { followingId: userId },
        select: { followerId: true },
      });

      const notifications = followers.map((follower) => {
        return transaction.notifications.create({
          data: {
            userId: userId,
            postId: newPost.id,
            addresseeId: follower.followerId,
            type: "POST",
          },
        });
      });

      await Promise.all(notifications);

      return newPost;
    });

    if (post) {
      revalidatePath(ROUTES.root);
      return NextResponse.json(
        { data: post, message: "Article published and followers notified successfully." },
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

export const PUT = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return handleError(ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED]);
    }

    const body = await req.json();
    const data = EditArticleRequestSchema.parse(body);

    const post = await database.posts.update({
      where: {
        id: data.id,
      },
      data: {
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
        { data: post, message: "Article edited successfully." },
        { status: 201 },
      );
    } else {
      return NextResponse.json(
        { error: "An error occurred while editing the article." },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error(err);
    return handleError(err);
  }
};
