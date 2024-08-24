import { NextResponse, type NextRequest } from "next/server";

//import {  type GetCommentsResponsePayload } from "@/services/types";
import { handleError } from "@/lib/error";
import { database } from "@/lib/prisma";

export const GET = async (_req: NextRequest) => {
  try {
    const posts = await database.$queryRaw`
 SELECT DISTINCT ON (p."authorId") p.*,u.first_name,u.last_name,u.image_url
FROM posts p
inner join users u on u.id = p."authorId"
ORDER BY p."authorId", p."likeCount" DESC
LIMIT 3;
`;

    if (posts) {
      //   const payload: GetCommentsResponsePayload = data;
      return NextResponse.json(posts, { status: 200 });
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
