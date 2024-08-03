"use client";

import { TAGS } from "@/constants/tags";
import type { Tab } from "@/types";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { cn } from "@/lib/utils";

type TabProps = {
  title: string;
  active: boolean;
  onClick: () => void;
};

const TabList: Tab[] = TAGS.map((tag) => ({
  title: capitalizeFirstLetter(tag),
  slug: tag,
}));

export default function FeedMenu({ baseUrl = "/" }: { baseUrl?: string }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(TabList[0].title);
  const searchParams = useSearchParams();
  const feed = searchParams.get("feed");

  useEffect(() => {
    const activeTab = TabList.find((tab) => tab.slug === feed)?.title || "all";
    setActiveTab(capitalizeFirstLetter(activeTab));
  }, [feed]);

  const handleClick = (tab: Tab) => {
    setActiveTab(tab.title);

    tab.slug === "all" ? router.push(baseUrl) : router.push(`${baseUrl}?feed=${tab.slug}`);
  };

  return (
    <div className="sticky top-0 z-20 mb-4 border-b border-border/40 bg-white">
      <ul className="-mb-px flex overflow-x-auto text-center text-sm font-medium">
        {TabList.map((tab) => (
          <Tab
            key={tab.title}
            title={tab.title}
            active={activeTab === tab.title}
            onClick={() => handleClick(tab)}
          />
        ))}
      </ul>
    </div>
  );
}

function Tab({ title, active, onClick }: TabProps) {
  return (
    <li className="me-2">
      <button
        onClick={onClick}
        className={cn(
          "inline-block rounded-t-lg border-b border-border/40 p-4 text-muted-foreground hover:text-black",
          {
            "border-black text-black": active,
          },
        )}
      >
        {title}
      </button>
    </li>
  );
}
