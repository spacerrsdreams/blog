export const ROUTES = {
  root: "/",
  createArticle: "/create-article",
  api: {
    post: {
      createLike: "/api/post/create-like",
      getLike: "/api/post/get-like",
      removeLike: "/api/post/remove-like",
      createComment: "/api/post/comment",
      removeComment: "/api/post/remove-comment",
      getBookmark: "/api/post/get-bookmark",
      createBookmark: "/api/post/create-bookmark",
      removeBookmark: "/api/post/remove-bookmark",
    },
    image: {
      upload: "/api/upload",
    },
  },
};
