import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { DM_Sans as FontSans } from "next/font/google";

import "./globals.css";

import { cn } from "@/lib/utils";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Header from "@/components/shared/header/Header";
import Highlights from "@/components/shared/highlights/Highlights";
import TabMenu from "@/components/shared/Tab";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "University Ratings",
  description: "Find the best university for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        <ReactQueryProvider>
          <body className={cn("bg-background font-sans antialiased", fontSans.variable)}>
            <Header />
            <div className="m-auto block max-w-[1336px]">
              <div className="flex flex-row justify-evenly">
                <main className="block w-full max-w-[728px] flex-auto">
                  <div className="block px-4 sm:px-0">
                    <div className="pt-6" />
                    <TabMenu />
                    <div className="pt-6">{children}</div>
                  </div>
                </main>
                <div className="hidden min-h-screen w-full max-w-[328px] border-l border-border/40 pl-10 pr-6 md:block">
                  <div className="relative inline-block size-full">
                    <div className="pt-10" />
                    <Highlights />
                  </div>
                </div>
              </div>
            </div>
          </body>
        </ReactQueryProvider>
      </ClerkProvider>
    </html>
  );
}
