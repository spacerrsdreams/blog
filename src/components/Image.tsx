"use client";

import { type ChangeEvent } from "react";

import { useUploadImage } from "@/lib/aws";

export default function Image() {
  const { mutateAsync } = useUploadImage();

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const buffer = await file.arrayBuffer();
    const params = {
      fileName: file.name,
      type: file.type,
      width: "800",
      height: "800",
      buffer: Buffer.from(buffer),
    };

    try {
      await mutateAsync(params);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image.");
    }
  };

  return <input type="file" accept="image/*" onChange={handleImageChange} />;
}
