import { Prisma } from "@prisma/client";

export const topPostsByAuthorsQuery: Prisma.Sql = Prisma.sql`
SELECT DISTINCT ON (p."authorId") p.*, u.first_name, u.last_name, u.image_url
FROM posts p
INNER JOIN users u ON u.id = p."authorId"
ORDER BY p."authorId", p."likeCount" DESC
LIMIT 3;
`;
