"use client";

import { useEffect, useState } from "react";

import { useGetTrending } from "@/services/post/trend";
import { type Highlight } from "@/services/types";
import UserHighlight from "@/components/highlights/UserHighlight";

export default function Highlights() {
  const { mutateAsync: getTrendingAsync } = useGetTrending();
  const [trendPosts, setTrendPosts] = useState<Highlight[]>([]);

  useEffect(() => {
    getTrendingAsync().then((data) => {
      setTrendPosts(data);
    });
  }, []);
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-8">
        <h4 className="text-sm font-semibold">Trending Now</h4>
        <div className="flex flex-col gap-6">
          {trendPosts.map((data) => {
            return <UserHighlight key={data.id} data={data} />;
          })}
        </div>
      </div>
      <div className="flex size-48 items-center justify-center rounded-sm bg-purple-400">
        <span className="text-center capitalize text-white">Your cool commercial here</span>
      </div>
    </div>
  );
}
