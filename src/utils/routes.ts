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
  parentId?: string;
};
type GetBookmarksByUsername = GetManyComments;

const appendIfExists = (arg?: string, asQuery: boolean = false) => {
  return asQuery ? `?id=${arg}` : arg ? "/" + arg : "";
};

export const ROUTES = {
  root: "/",
  createArticle: "/create-article",
  bookmarks: "/profile/bookmarks",
  editArticle: (postId?: string) => `/edit-article/${appendIfExists(postId)}`,
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
      like: (postId?: string, asQuery: boolean = false) =>
        `/api/post/like${appendIfExists(postId, asQuery)}`,
      comment: (postId?: string) => `/api/post/comment${appendIfExists(postId)}`,
      commentLike: (commentId: string) => `/api/post/comment/like/${commentId}`,
      view: (postId?: string) => `/api/post/view${appendIfExists(postId)}`,
      getManyComments: ({ from, to, id }: GetManyComments) => {
        const queryParams = new URLSearchParams({
          from: from.toString(),
          to: to.toString(),
          id,
        });
        return `/api/post/comment?${queryParams.toString()}`;
      },
      getCommentReplies: ({ from, to, id }: GetManyComments) => {
        const queryParams = new URLSearchParams({
          from: from.toString(),
          to: to.toString(),
          id,
        });
        return `/api/post/comment/reply?${queryParams.toString()}`;
      },
      bookmark: (postId?: string) => `/api/post/bookmark${appendIfExists(postId)}`,
      getBookmarksByUsername: ({ from, to, id }: GetBookmarksByUsername) => {
        const queryParams = new URLSearchParams({
          from: from.toString(),
          to: to.toString(),
          id,
        });
        return `/api/post/bookmark?${queryParams.toString()}`;
      },
    },

    user: {
      byId: (userId: string) => `/api/user/${userId}`,
      followers: (userId?: string) => `/api/user/followers${appendIfExists(userId)}`,
    },
    email: {
      sendEmail: "/api/email/send-email",
    },
    image: {
      upload: "/api/image/upload",
    },
  },
};
