import type { MetadataRoute } from "next";

import { database } from "@/lib/prisma";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await database.posts.findMany({
    select: {
      id: true,
      modifiedAt: true,
      author: true,
      title: true,
    },
  });

  const articleSitemaps = posts.map((post) => {
    return {
      url: `${BASE_URL}/article/${post.id}`,
      lastModified: post.modifiedAt,
      title: post.title,
    };
  });
  const authorSitemaps = posts.map((post) => {
    return {
      url: `${BASE_URL}/author/${post.author.username}`,
      lastModified: post.author.updatedAt,
      name: post.author?.firstName + " " + post.author?.lastName,
    };
  });

  return [...articleSitemaps, ...authorSitemaps];
}
