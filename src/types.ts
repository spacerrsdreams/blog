interface EmailAddress {
  email_address: string;
  id: string;
  linked_to: string[];
  object: string;
  verification: {
    status: string;
    strategy: string;
  };
}

type PhoneNumber = {
  id: string;
  number: string;
};

interface Metadata {
  // Define properties as needed
}

export interface User {
  data: {
    birthday: string;
    created_at: number; // Timestamp in milliseconds
    email_addresses: EmailAddress[];
    external_id: string;
    first_name: string;
    gender: string;
    id: string;
    image_url: string;
    last_name: string;
    last_sign_in_at: number; // Timestamp in milliseconds
    object: string;
    password_enabled: boolean;
    phone_numbers: PhoneNumber[];
    primary_email_address_id: string;
    primary_phone_number_id: string | null;
    private_metadata: Metadata;
    profile_image_url: string;
    public_metadata: Metadata;
    two_factor_enabled: boolean;
    unsafe_metadata: Metadata;
    updated_at: number; // Timestamp in milliseconds
    username: string | null;
  };
  object: string;
  type: string;
}

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
