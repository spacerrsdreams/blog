import { REASONS } from "@/constants/reasons";
import { TAGS } from "@/constants/tags";
import type { Likes, UserBasicInfoT } from "@/types";
import { z } from "zod";

export const LikeRequestSchema = z
  .object({
    userLikes: z.number(),
    postId: z.string().min(1, "Post ID must be at least 1 character long."),
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
    content: z.string().min(1, "Comment content must be at least 1 character long."),
    parentId: z.string().min(1).optional(),
  })
  .strict();

export const DeleteCommentRequestSchema = z
  .object({
    commentId: z.string().min(1, "Comment ID must be at least 1 character long"),
  })
  .strict();
export const GetCommentsRequestSchema = z.object({
  postId: z.string().min(1, "Post ID must be at least 1 character long."),
});
export const EditCommentRequestSchema = z.object({
  commentId: z.string().min(1, "Post ID must be at least 1 character long."),
  content: z.string().min(1, "Post ID must be at least 1 character long."),
});

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
export const GetCommentsResponseSchema = z
  .object({
    id: z.string(),
    createdAt: z.string().transform((val) => new Date(val)),
    modifiedAt: z.string().transform((val) => new Date(val)),
    userId: z.string(),
    postId: z.string(),
    content: z.string(),
    user: z.object({
      imageUrl: z.string(),
      username: z.string(),
    }),
  })
  .array();

export type CommentRequestPayload = z.infer<typeof CommentRequestSchema>;
export type DeleteCommentRequestPayload = z.infer<typeof DeleteCommentRequestSchema>;
export type EditCommentRequestPayload = z.infer<typeof EditCommentRequestSchema>;
export type GetCommentRequestPayload = z.infer<typeof GetCommentsRequestSchema>;
export type GetCommentsResponsePayload = z.infer<typeof GetCommentsResponseSchema>;
export type CommentResponsePayload = z.infer<typeof CommentResponseSchema>;

export const BookmarkRequestSchema = z
  .object({
    postId: z.string().min(1, "Post ID must be at least 1 character long."),
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
    coverImageSrc: z.string().optional(),
    postContent: z.record(z.any()),
  })
  .strict();

export const EditArticleRequestSchema = z
  .object({
    id: z.string(),
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
    coverImageSrc: z.string().optional(),
    postContent: z.record(z.any()),
  })
  .strict();

export const ReportStoryRequestSchema = z
  .object({
    reason: z.enum(REASONS, {
      errorMap: () => ({ message: "Required" }),
    }),
    addInfo: z.string().max(220, "must be at most 220 characters long").optional(),
  })
  .strict();

export const EditArticleFormSchema = CreateArticleRequestSchema;
export type ReportStoryRequestPayload = z.infer<typeof ReportStoryRequestSchema>;
export type ArticleEditFormType = CreateArticleRequestPayload;
export type EditArticleRequestPayload = z.infer<typeof EditArticleRequestSchema>;
export type CreateArticleRequestPayload = z.infer<typeof CreateArticleRequestSchema>;

export type ArticleT = {
  id: string;
  slug: string;
  tag: string;
  title: string;
  subTitle: string;
  coverImageSrc: string | undefined;
  createdAt: Date;
  currentFeed: string;
  _count: {
    comments: number;
  };
  author: UserBasicInfoT;
  isBookmarked: boolean;
  isLikedByUser: boolean;
  likeCount: number;
  likes: Likes[];
  viewCount: number;
};
export type Highlight = {
  id: string;
  slug: string;
  tag: string;
  title: string;
  coverImageSrc: string | undefined;
  first_name: string;
  last_name: string;
  image_url: string;
};
