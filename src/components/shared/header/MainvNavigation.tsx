import Link from "next/link";

import { siteConfig } from "@/config/siteConfig";
import { Icons } from "@/components/shared/Icons";

export function MainNavigation() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
      </Link>
    </div>
  );
}
