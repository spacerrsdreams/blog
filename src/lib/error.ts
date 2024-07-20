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

  console.error("An error occurred while fetching the like data.", error);
  return NextResponse.json(
    { error: "An error occurred while fetching the like data." },
    { status: 500 },
  );
};
