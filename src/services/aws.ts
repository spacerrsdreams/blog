import { useMutation } from "@tanstack/react-query";

import request from "@/utils/request";
import { ROUTES } from "@/utils/routes";

type UploadPayload = {
  filename: string;
  contentType: string;
  file: File;
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async ({ file, contentType, filename }: UploadPayload) => {
      const res = await request({
        url: ROUTES.api.image.upload,
        method: "POST",
        data: { contentType, filename },
      });

      const { url, fields } = res;
      const formData = new FormData();

      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      formData.append("file", file);

      await request({
        url,
        method: "POST",
        data: formData,
      });

      const imageUrl = `${url}${fields.key}`;

      return imageUrl;
    },
  });
};
