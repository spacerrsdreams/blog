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
  likes: {
    id: string;
    createdAt: Date;
    modifiedAt: Date;
    userId: string;
    postId: string;
  }[];
  comments: {
    id: string;
    content: string;
    userId: string;
    postId: string;
    createdAt: Date;
    modifiedAt: Date;
  }[];
};

export type Tab = {
  title: string;
  slug: string;
};
