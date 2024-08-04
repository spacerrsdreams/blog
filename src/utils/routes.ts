export const ROUTES = {
  root: "/",
  createArticle: "/create-article",
  articleSlug: "/article/[slug]",
  api: {
    post: {
      get: "/api/post/get",
      delete: (id: string) => `/api/post/${id}`,
      create: "api/post/create",
      like: "/api/post/like",
      comment: "/api/post/comment",
      bookmark: "/api/post/bookmark",
    },
    user: {
      getUserById: "/api/user/get-user-by-id",
    },
    image: {
      upload: "/api/upload",
    },
  },
};
