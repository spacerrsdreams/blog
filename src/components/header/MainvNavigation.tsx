"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { docsConfig } from "@/config/docsConfig";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";

export function MainNavigation() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        {docsConfig.mainNav.map((item) => {
          return (
            <Link
              key={item.href}
              href={item.href || "/"}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === item.href ? "text-foreground" : "text-foreground/60",
              )}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
