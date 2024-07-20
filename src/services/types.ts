import { z } from "zod";

export const LikeRequestSchema = z
  .object({
    postId: z.string().min(1, "Post ID must be at least 1 character long."),
    userId: z.string().min(1, "User ID must be at least 1 character long."),
  })
  .strict();

export type LikeRequestPayload = z.infer<typeof LikeRequestSchema>;
