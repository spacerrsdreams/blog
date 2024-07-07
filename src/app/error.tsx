"use client";

import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div className="flex min-h-[calc(100vh-60px)] w-full flex-col items-center justify-center gap-8">
      <h1>Something went wrong... We wil fix it soon!</h1>
      <Button
        onClick={() => window.location.reload()}
        className="cursor-pointer self-center rounded-xl bg-purple-500 px-5 py-3 text-xs font-semibold text-white transition-all duration-300 hover:bg-purple-600"
      >
        Refresh Page
      </Button>
    </div>
  );
}
