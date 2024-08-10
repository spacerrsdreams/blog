import type { MetadataRoute } from "next";

import prismaClient from "@/lib/prisma";

const BASE_URL = process.env.BASE_URL;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prismaClient.posts.findMany({
    select: {
      slug: true,
      modifiedAt: true,
    },
  });

  const sitemaps = posts.map((post) => {
    return {
      url: `${BASE_URL}/article/${post.slug}`,
      lastModified: post.modifiedAt,
    };
  });

  return sitemaps;
}
