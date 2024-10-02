import { useMutation } from "@tanstack/react-query";

import request from "@/utils/request";
import { ROUTES } from "@/utils/routes";
import type {
  ArticleT,
  CreateArticleRequestPayload,
  EditArticleRequestPayload,
} from "@/services/types";

export const useCreateArticle = () => {
  return useMutation({
    mutationFn: async (payload: CreateArticleRequestPayload) => {
      return request({
        url: ROUTES.api.post.article(),
        method: "POST",
        data: payload,
      });
    },
  });
};

export const useGetArticles = () => {
  return useMutation({
    mutationKey: ["articles/get"],
    mutationFn: async (payload: {
      from: number;
      to: number;
      feed: string;
      username?: string;
    }): Promise<{ data: ArticleT[]; totalPosts: string }> => {
      return request({
        url: ROUTES.api.post.getManyArticle(payload),
        method: "GET",
      });
    },
  });
};

export const useDeleteArticle = () => {
  return useMutation({
    mutationFn: async (payload: { id: string }) => {
      return request({
        url: ROUTES.api.post.article(payload.id),
        method: "DELETE",
      });
    },
  });
};

export const useEditArticle = () => {
  ("trigger");
  return useMutation({
    mutationFn: async (payload: EditArticleRequestPayload) => {
      return request({
        url: ROUTES.api.post.article(),
        method: "PUT",
        data: payload,
      });
    },
  });
};
