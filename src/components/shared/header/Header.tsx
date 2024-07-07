import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { ROUTES } from "@/utils/routes";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";
import { MainNavigation } from "@/components/shared/header/MainvNavigation";
import { MobileNavigation } from "@/components/shared/header/MobileNavigation";
import { Icons } from "@/components/shared/Icons";
import { buttonVariants } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="top-0 z-50 block w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNavigation />
        <MobileNavigation />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none" />
          <nav className="flex items-center">
            <Link href={ROUTES.createArticle}>
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "flex items-center gap-2",
                )}
              >
                <Icons.squarePen className="size-6 text-muted-foreground" />
                <span className="text-muted-foreground">Write</span>
              </div>
            </Link>
            <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0",
                )}
              >
                <Icons.twitter className="h-3 w-3 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <div className="ml-2 flex items-center">
              <SignedOut>
                <SignInButton>
                  <span className="cursor-pointer self-center rounded-xl bg-purple-500 px-3 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-purple-600">
                    Get Started
                  </span>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
