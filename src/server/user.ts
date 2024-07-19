import type { CreateUser } from "@/types";

import { clerkClient } from "@clerk/nextjs/server";

import prismaClient from "@/lib/prisma";

export const getUserByUserName = async (username: string) => {
  const authors = await clerkClient.users.getUserList({
    username: [username],
  });

  return authors.data[0];
};

export const getUserByUserId = async (userId: string) => {
  const authors = await clerkClient.users.getUserList({
    userId: [userId],
  });

  return authors.data[0];
};

export const createUser = async (data: CreateUser) => {
  return prismaClient.user.create({
    data: {
      id: data.data.id,
      birthday: data.data.birthday,
      createdAt: data.data.created_at,
      emailAddresses: {
        create: data.data.email_addresses.map((email) => ({
          id: email.id,
          emailAddress: email.email_address,
          verificationStatus: email.verification.status,
          verificationStrategy: email.verification.strategy,
        })),
      },
      externalId: data.data.external_id,
      firstName: data.data.first_name,
      gender: data.data.gender,
      imageUrl: data.data.image_url,
      lastName: data.data.last_name,
      lastSignInAt: data.data.last_sign_in_at,
      passwordEnabled: data.data.password_enabled,
      primaryEmailAddressId: data.data.primary_email_address_id,
      primaryPhoneNumberId: data.data.primary_phone_number_id,
      primaryWeb3WalletId: data.data.primary_web3_wallet_id,
      privateMetadata: data.data.private_metadata,
      profileImageUrl: data.data.profile_image_url,
      publicMetadata: data.data.public_metadata,
      twoFactorEnabled: data.data.two_factor_enabled,
      unsafeMetadata: data.data.unsafe_metadata,
      updatedAt: data.data.updated_at,
      username: data.data.username,
    },
  });
};
