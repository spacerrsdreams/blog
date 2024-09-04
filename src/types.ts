import type { Prisma } from "@prisma/client";
import type { JsonValue } from "@prisma/client/runtime/library";

import type { ArticleT } from "@/services/types";

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

interface Metadata {}

export interface ClerkUser {
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
    username: string;
  };
  object: string;
  type: string;
}

export type User = {
  birthday: string | null;
  createdAt: Date; // Timestamp in milliseconds
  emailAddresses: EmailAddress[];
  externalId: string | null;
  firstName: string | null;
  gender: string | null;
  id: string;
  imageUrl: string;
  lastName: string | null;
  lastSignInAt: Date | null; // Timestamp in milliseconds
  object: string;
  passwordEnabled: boolean;
  phoneNumbers: PhoneNumber[];
  primaryEmailAddressId: string | null;
  primaryPhoneNumberId: string | null;
  privateMetadata: Metadata;
  profileImageUrl: string;
  publicMetadata: Metadata;
  twoFactorEnabled: boolean;
  unsafeMetadata: Metadata;
  updatedAt: Date; // Timestamp in milliseconds
  username: string;
};

export type UserPayload = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  username: string;
  birthday: string | null;
  externalId: string | null;
  gender: string | null;
  imageUrl: string;
  lastSignInAt: Date | null;
  passwordEnabled: boolean;
  primaryEmailAddressId: string | null;
  primaryPhoneNumberId: string | null;
  profileImageUrl: string;
  twoFactorEnabled: boolean;
  updatedAt: Date;
  createdAt: Date;
  privateMetadata: JsonValue;
  publicMetadata: JsonValue;
  unsafeMetadata: Prisma.JsonValue;
} | null;

export type UserBasicInfoT = Omit<
  User,
  | "emailAddresses"
  | "object"
  | "phoneNumbers"
  | "privateMetadata"
  | "publicMetadata"
  | "unsafeMetadata"
>;

export type CommentWithUserProps = {
  id: string;
  content: string;
  createdAt: Date;
  modifiedAt: Date;
  userId: string;
  postId: string;
  user: {
    imageUrl: string;
    username: string;
  };
  isLikedByUser: boolean;
  totalLikes: number;
};

export type Likes = {
  id: string;
  createdAt: Date;
  modifiedAt: Date;
  userId: string;
  postId: string;
  likeCount: number;
};

export type BookmarkedPost = {
  id: string;
  createdAt: Date;
  modifiedAt: Date;
  userId: string;
  postId: string;
  isLikedByUser: boolean;
  post: ArticleT;
  author: UserBasicInfoT;
};
