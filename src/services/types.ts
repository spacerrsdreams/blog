import { TAGS } from "@/constants/tags";
import { z } from "zod";

export const LikeRequestSchema = z
  .object({
    postId: z.string().min(1, "Post ID must be at least 1 character long."),
    userId: z.string().min(1, "User ID must be at least 1 character long."),
  })
  .strict();

export const LikeResponseSchema = z
  .object({
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
  })
  .strict();

export type LikeRequestPayload = z.infer<typeof LikeRequestSchema>;
export type LikeResponsePayload = z.infer<typeof LikeResponseSchema>;

export const CommentRequestSchema = z
  .object({
    postId: z.string().min(1, "Post ID must be at least 1 character long."),
    userId: z.string().min(1, "User ID must be at least 1 character long."),
    content: z.string().min(1, "Comment content must be at least 1 character long."),
  })
  .strict();

export const CommentResponseSchema = z
  .object({
    data: z
      .object({
        id: z.string(),
        createdAt: z.string().transform((val) => new Date(val)),
        modifiedAt: z.string().transform((val) => new Date(val)),
        userId: z.string(),
        postId: z.string(),
        content: z.string(),
      })
      .nullable(),
    message: z.string().optional(),
  })
  .strict();

export type CommentRequestPayload = z.infer<typeof CommentRequestSchema>;
export type CommentResponsePayload = z.infer<typeof CommentResponseSchema>;

export const BookmarkRequestSchema = z
  .object({
    postId: z.string().min(1, "Post ID must be at least 1 character long."),
    userId: z.string().min(1, "User ID must be at least 1 character long."),
  })
  .strict();

export const BookmarkResponseSchema = z.object({
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

export type BookmarkRequestPayload = z.infer<typeof BookmarkRequestSchema>;
export type BookmarkResponsePayload = z.infer<typeof BookmarkResponseSchema>;

export const CreateArticleRequestSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title must be at least 1 character long.")
      .max(60, "Title must be at most 60 characters long."),
    subTitle: z
      .string()
      .min(1, "SubTitle must be at least 1 character long.")
      .max(220, "SubTitle must be at most 220 characters long."),
    tag: z.enum(TAGS, {
      errorMap: () => ({ message: "Tag must be one of: AI, Finances, Crypto, Startups." }),
    }),
    postContent: z.record(z.any()),
  })
  .strict();

export type CreateArticleRequestPayload = z.infer<typeof CreateArticleRequestSchema>;
