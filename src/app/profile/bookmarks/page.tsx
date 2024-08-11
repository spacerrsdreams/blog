"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

import { useGetBookmarksByAuthor } from "@/services/post/bookmark";

export default function BookmarkPage() {
  const { user } = useUser();
  const { mutateAsync: fetchBookmarksByAuthor } = useGetBookmarksByAuthor();

  useEffect(() => {
    if (!user) return;

    fetchBookmarksByAuthor({ from: 0, to: 2, id: user.id }).then((data) => {
      console.log(data);
    });
  }, []);
  return <div>page</div>;
}
