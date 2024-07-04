"use client";

import type { Tab } from "@/types";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";

type TabProps = {
  title: string;
  active: boolean;
  onClick: () => void;
};

type Props = {
  tabList: Tab[];
};

export default function TabMenu({ tabList }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tabList[0].title);

  const handleClick = (tab: Tab) => {
    setActiveTab(tab.title);

    tab.slug === "" ? router.push("/") : router.push(`/?tag=${tab.slug}`);
  };

  return (
    <div className="sticky top-0 z-20 mb-4 border-b border-border/40 bg-white">
      <ul className="-mb-px flex overflow-x-auto text-center text-sm font-medium">
        {tabList.map((tab) => (
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
