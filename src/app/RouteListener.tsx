"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { useIncreaseView } from "@/services/post/view";

export default function RouteListener() {
  const pathname = usePathname();
  const previousPathname = useRef<string | null>(null);
  const { mutateAsync: increaseViewAsync } = useIncreaseView();
  const slug = (pathname.startsWith("/article") && pathname.replace("/article/", "")) as string;
  useEffect(() => {
    const handleRouteChange = async () => {
      if (previousPathname.current && pathname.startsWith("/article")) {
        increaseViewAsync({
          id: slug,
        }).then(() => {
          console.log("increased");
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
