import { useMutation } from "@tanstack/react-query";

import { ROUTES } from "@/utils/routes";

type UploadPayload = {
  filename: string;
  contentType: string;
  file: File;
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async ({ file, contentType, filename }: UploadPayload) => {
      const res = await fetch(ROUTES.api.image.upload, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contentType, filename }),
      });

      if (res.ok) {
        const { url, fields } = await res.json();

        const formData = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value as string);
        });

        formData.append("file", file);

        const uploadResponse = await fetch(url, {
          method: "POST",
          body: formData,
        });

        const imageUrl = `${url}${fields.key}`;

        if (!uploadResponse.ok) {
          throw new Error("Upload failed.");
        }

        console.log(imageUrl);
        // Step 4: Check if the response has content before parsing as JSON
        return imageUrl;
      } else {
        throw new Error("Failed to get pre-signed URL.");
      }
    },
  });
};
