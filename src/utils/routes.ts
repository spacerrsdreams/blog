export const ROUTES = {
  root: "/",
  createArticle: "/create-article",
  postSlug: "/article/[slug]",
  api: {
    post: {
      createLike: "/api/post/create-like",
      getLike: "/api/post/get-like",
      removeLike: "/api/post/remove-like",
      createComment: "/api/post/create-comment",
      removeComment: "/api/post/remove-comment",
      createBookmark: "/api/post/create-bookmark",
      removeBookmark: "/api/post/remove-bookmark",
    },
  },
};
