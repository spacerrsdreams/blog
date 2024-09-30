import { database } from "@/lib/prisma";
import { type Highlight } from "@/services/types";
import UserHighlight from "@/components/highlights/UserHighlight";

export default async function Highlights() {
  const posts = await database.$queryRaw<Highlight[] | undefined>`
    SELECT DISTINCT ON (p."authorId") p.*,u.first_name,u.last_name,u.image_url
    FROM posts p
    INNER JOIN users u ON u.id = p."authorId"
    ORDER BY p."authorId", p."likeCount" DESC
    LIMIT 3;
  `;

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-8">
        <h4 className="text-sm font-semibold">Trending Now</h4>
        <div className="flex flex-col gap-6">
          {posts && posts.length > 0 ? (
            posts.map((data) => <UserHighlight key={data.id} data={data} />)
          ) : (
            <p className="text-md text-muted-foreground">
              No trending posts available at the moment
            </p>
          )}
        </div>
      </div>

      <div className="flex size-48 items-center justify-center rounded-sm bg-purple-400">
        <span className="text-center capitalize text-white">Your cool commercial here</span>
      </div>
    </div>
  );
}
