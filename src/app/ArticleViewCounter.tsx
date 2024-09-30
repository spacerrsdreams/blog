"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { useIncrementViewCount } from "@/services/post/view";

export default function ArticleViewCounter() {
  const pathname = usePathname();
  const previousPathname = useRef<string | null>(null);
  const { mutateAsync: incrementViewCountAsync } = useIncrementViewCount();
  const slug = (pathname.startsWith("/article") && pathname.replace("/article/", "")) as string;

  useEffect(() => {
    const handleRouteChange = async () => {
      if (previousPathname.current && pathname.startsWith("/article")) {
        incrementViewCountAsync({
          id: slug,
        });
      }
    };

    if (previousPathname.current !== pathname) {
      handleRouteChange();
    }
    previousPathname.current = pathname;
  }, [pathname]);
  return null;
}
