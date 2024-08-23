import Link from "next/link";

import { siteConfig } from "@/config/siteConfig";

export function MainNavigation() {
  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="font-bold sm:inline-block">{siteConfig.name}</span>
      </Link>
    </div>
  );
}
