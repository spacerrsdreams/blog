import { z } from "zod";

export const LikeRequestSchema = z
  .object({
    postId: z.string().min(1, "Post ID must be at least 1 character long."),
    userId: z.string().min(1, "User ID must be at least 1 character long."),
  })
  .strict();

export const LikeResponseSchema = z.object({
  data: z
    .object({
      id: z.string(),
      createdAt: z.string().transform((val) => new Date(val)),
      modifiedAt: z.string().transform((val) => new Date(val)),
      userId: z.string(),
      postId: z.string(),
    })
    .nullable(),
  message: z.string().optional(),
});

export type LikeRequestPayload = z.infer<typeof LikeRequestSchema>;
export type LikeResponsePayload = z.infer<typeof LikeResponseSchema>;
