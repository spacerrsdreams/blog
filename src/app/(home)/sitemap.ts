import type { MetadataRoute } from "next";

import { database } from "@/lib/prisma";

const BASE_URL = process.env.BASE_URL;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await database.posts.findMany({
    select: {
      slug: true,
      modifiedAt: true,
      author: true,
    },
  });

  const articleSitemaps = posts.map((post) => {
    return {
      url: `${BASE_URL}/article/${post.slug}`,
      lastModified: post.modifiedAt,
    };
  });
  const authorSitemaps = posts.map((post) => {
    return {
      url: `${BASE_URL}/author/${post.author.username}`,
      lastModified: post.author.updatedAt,
    };
  });

  return [...articleSitemaps, ...authorSitemaps];
}
