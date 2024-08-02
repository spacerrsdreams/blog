"use client";

import { flightRouterStateSchema } from "next/dist/server/app-render/types";
import Image from "next/image";

import { Button } from "@/components/ui/button";

type Props = {
  alt: string;
  src: string;
  isEditing?: boolean;
  handleRemoveImage?: () => void;
};

export default function ArticleCover({
  alt,
  src,
  isEditing = flightRouterStateSchema,
  handleRemoveImage,
}: Props) {
  return (
    <div className="relative mt-10 flex w-full flex-col items-center justify-center gap-2">
      {isEditing && (
        <Button
          onClick={() => {
            handleRemoveImage && handleRemoveImage();
          }}
        >
          Remove Image
        </Button>
      )}
      <Image src={src} alt={alt} className="h-[600px] w-full bg-cover" width={800} height={800} />
      <p className="text-xs text-muted-foreground">
        სურათი შეიქმნა <span className="font-bold text-black">Adult Swim</span> -ის მიერ.
      </p>
    </div>
  );
}
