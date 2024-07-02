export type Contributor = {
  authorSlug: string;
  authorName: string;
  avatarSrc: string;
  avatarFallback: string;
};

export type Post = Contributor & {
  slug: string;
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
