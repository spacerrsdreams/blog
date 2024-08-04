type GetMany = {
  from: number;
  to: number;
  feed: string;
  username?: string;
};

export const ROUTES = {
  root: "/",
  createArticle: "/create-article",
  articleSlug: "/article/[slug]",
  api: {
    post: {
      get: "/api/post/get",
      create: "api/post/create",
      delete: (id: string) => `/api/post/${id}`,
      getMany: ({ from, to, feed, username }: GetMany) => {
        const queryParams = new URLSearchParams({
          from: from.toString(),
          to: to.toString(),
          feed,
        });

        if (username) {
          queryParams.append("username", username);
        }

        return `/api/post/get?${queryParams.toString()}`;
      },
      like: "/api/post/like",
      comment: "/api/post/comment",
      bookmark: (postId?: string) => `/api/post/bookmark/${postId || ""}`,
    },
    user: {
      getUserById: "/api/user/get-user-by-id",
    },
    image: {
      upload: "/api/upload",
    },
  },
};
