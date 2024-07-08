"use client";

import { Icons } from "@/components/shared/Icons";

export default function LoadingScreen() {
  return (
    <div className="absolute inset-0 z-[100] flex h-[--container-height] w-full items-center justify-center gap-2 text-sm text-black backdrop-blur-sm">
      <Icons.spinner className="size-5 animate-spin" />
      <span>Loading...</span>
    </div>
  );
}
