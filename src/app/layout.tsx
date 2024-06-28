import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import "./globals.css";

import { cn } from "@/lib/utils";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Header from "@/components/header/Header";

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
      <ReactQueryProvider>
        <body
          className={cn(
            "flex size-full min-h-screen flex-col bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <Header />
          {children}
        </body>
      </ReactQueryProvider>
    </html>
  );
}
