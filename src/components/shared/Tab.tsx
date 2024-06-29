"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";

type TabProps = {
  title: string;
  active: boolean;
  onClick: () => void;
};

type Tab = {
  title: string;
  slug: string;
};

const TABS: Tab[] = [
  {
    title: "Dashboard",
    slug: "",
  },
  { title: "Settings", slug: "settings" },
  {
    title: "Profile",
    slug: "profile",
  },
];

export default function TabMenu() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleClick = (tab: Tab) => {
    setActiveTab(tab.title);

    tab.slug === "" ? router.push("/") : router.push(`/?tag=${tab.slug}`);
  };

  return (
    <div className="sticky top-0 mb-4 border-b">
      <ul className="-mb-px flex flex-wrap overflow-x-auto text-center text-sm font-medium">
        {TABS.map((tab) => (
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
          "inline-block rounded-t-lg border-b p-4 text-muted-foreground hover:text-black",
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
