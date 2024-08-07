type GetMany = {
  from: number;
  to: number;
  feed: string;
  username?: string;
};
type GetManyComments = {
  from: number;
  to: number;
  id: string;
};

const appendIfExists = (arg?: string) => (arg ? "/" + arg : "");

export const ROUTES = {
  root: "/",
  createArticle: "/create-article",
  articleSlug: "/article/[slug]",
  api: {
    post: {
      article: (id?: string) => `/api/post${appendIfExists(id)}`,
      getManyArticle: ({ from, to, feed, username }: GetMany) => {
        const queryParams = new URLSearchParams({
          from: from.toString(),
          to: to.toString(),
          feed,
        });

        if (username) {
          queryParams.append("username", username);
        }

        return `/api/post?${queryParams.toString()}`;
      },
      like: (postId?: string) => `/api/post/like${appendIfExists(postId)}`,
      comment: (postId?: string) => `/api/post/comment${appendIfExists(postId)}`,
      getManyComments: ({ from, to, id }: GetManyComments) => {
        const queryParams = new URLSearchParams({
          from: from.toString(),
          to: to.toString(),
          id,
        });
        return `/api/post/comment?${queryParams.toString()}`;
      },
      bookmark: (postId?: string) => `/api/post/bookmark${appendIfExists(postId)}`,
    },
    user: {
      byId: (userId: string) => `/api/user/${userId}`,
    },
    image: {
      upload: "/api/image/upload",
    },
  },
};
