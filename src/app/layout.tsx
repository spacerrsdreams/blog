import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { DM_Sans as FontSans } from "next/font/google";

import "./globals.css";

import { cn } from "@/lib/utils";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Header from "@/components/shared/header/Header";

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
              <main className="flex flex-row justify-evenly">{children}</main>
            </div>
          </body>
        </ReactQueryProvider>
      </ClerkProvider>
    </html>
  );
}
