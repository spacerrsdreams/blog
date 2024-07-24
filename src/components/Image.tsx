"use client";

import Image from "next/image";
import { useState, type ChangeEvent } from "react";

import { useUploadImage } from "@/lib/aws";
import { useToast } from "@/components/ui/use-toast";

export default function Cool() {
  const { toast } = useToast();
  const { mutateAsync } = useUploadImage();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    mutateAsync({
      file,
      filename: file.name,
      contentType: file.type,
    })
      .then((imageUrl) => {
        console.log(imageUrl);
        setImageUrl(imageUrl);
        toast({
          title: "Image uploaded successfully",
          duration: 5000,
        });
      })
      .catch((e) => {
        console.error(e);
        toast({
          title: "Failed to upload image",
          description: e.message,
          duration: 5000,
        });
      });
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Uploaded Image"
          width={500} // Adjust width as necessary
          height={500} // Adjust height as necessary
        />
      )}
    </div>
  );
}
