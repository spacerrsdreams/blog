import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { DM_Sans as FontSans } from "next/font/google";

import "./globals.css";

import { PopupProvider } from "@/context/PopupProvider";

import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Header from "@/components/shared/header/Header";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
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
            <PopupProvider>
              <Header />
              <main className="m-auto block max-w-[1336px]">{children}</main>
              <Toaster />
            </PopupProvider>
          </body>
        </ReactQueryProvider>
      </ClerkProvider>
    </html>
  );
}
