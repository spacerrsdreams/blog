import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { DM_Sans as FontSans } from "next/font/google";

import "./globals.css";

import { cn } from "@/lib/utils";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Header from "@/components/header/Header";
import Tab from "@/components/shared/Tab";

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
          <body
            className={cn(
              "flex size-full min-h-screen flex-col bg-background font-sans antialiased",
              fontSans.variable,
            )}
          >
            <Header />
            <div className="flex flex-col items-center justify-center">
              <div className="flex w-full max-w-screen-md flex-col">
                <Tab />
                {children}
              </div>
            </div>
          </body>
        </ReactQueryProvider>
      </ClerkProvider>
    </html>
  );
}
