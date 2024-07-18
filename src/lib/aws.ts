import { uploadImageToS3 } from "@/server/aws";

import { useMutation } from "@tanstack/react-query";

export const useUploadImage = () => {
  return useMutation({
    mutationFn: uploadImageToS3,
  });
};
