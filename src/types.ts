export type Post = {
  slug: string;
  authorName: string;
  avatarSrc: string;
  avatarFallback: string;
  tag: string;
  title: string;
  subTitle: string;
  date: string;
  totalLikes: number;
  totalComments: number;
  isSaved: boolean;
  coverImageSrc: string;
};

export type Tab = {
  title: string;
  slug: string;
};
