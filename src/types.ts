export type Contributor = {
  authorSlug: string;
  authorName: string;
  avatarSrc: string;
  avatarFallback: string;
};

export type Post = {
  id: string;
  slug: string;
  tag: string;
  title: string;
  subTitle: string;
  isSaved: boolean;
  coverImageSrc: string;
  createdAt: Date;
  modifiedAt: Date;
  authorId: string;
  _count: {
    likes: number;
    comments: number;
  };
};
export type Like = {
  id: string;
  createdAt: Date;
  modifiedAt: Date;
  userId: string;
  postId: string;
};
export type Bookmark = {
  id: string;
  createdAt: Date;
  modifiedAt: Date;
  userId: string;
  postId: string;
};
export type CommentT = {
  id: string;
  content: string;
  createdAt: Date;
  modifiedAt: Date;
  userId: string;
  postId: string;
};

export type Tab = {
  title: string;
  slug: string;
};
