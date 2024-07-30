export const ROUTES = {
  root: "/",
  createArticle: "/create-article",
  articleSlug: "/article/[slug]",
  api: {
    post: {
      create: "api/post/create",
      createLike: "/api/post/create-like",
      getLike: "/api/post/get-like",
      removeLike: "/api/post/remove-like",
      createComment: "/api/post/create-comment",
      removeComment: "/api/post/remove-comment",
      editComment: "/api/post/edit-comment",
      getComments: "/api/post/get-comments",
      getBookmark: "/api/post/get-bookmark",
      createBookmark: "/api/post/create-bookmark",
      removeBookmark: "/api/post/remove-bookmark",
    },
    user: {
      getUserById: "/api/user/get-user-by-id",
    },
    image: {
      upload: "/api/upload",
    },
  },
};
