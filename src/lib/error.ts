import { z } from "zod";

import { NextResponse } from "next/server";

export const handleError = (error: unknown) => {
  if (error instanceof z.ZodError) {
    const formattedErrors = error.errors
      .map((e) => {
        const path = e.path.join(".");
        return `${path}: ${e.message}`;
      })
      .join("... - ");

    return NextResponse.json(
      { error: `Invalid request data: ${formattedErrors}` },
      { status: 400 },
    );
  }

  return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
};

export const ERROR_CODES = {
  USER_IS_NOT_AUTHENTICATED: "USER_IS_NOT_AUTHENTICATED",
  AUTHOR_NOT_FOUND: "AUTHOR_NOT_FOUND",
  POST_AUTHOR_NOT_FOUND: "POST_AUTHOR_NOT_FOUND",
  POST_NOT_FOUND: "POST_NOT_FOUND",
};

export const ERROR_MESSAGES = {
  [ERROR_CODES.AUTHOR_NOT_FOUND]: "Author not found",
  [ERROR_CODES.POST_AUTHOR_NOT_FOUND]: "Post author not found",
  [ERROR_CODES.POST_NOT_FOUND]: "Post not found",
  [ERROR_CODES.USER_IS_NOT_AUTHENTICATED]: "Please sign in to like this post",
};
