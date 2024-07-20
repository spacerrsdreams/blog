import type { User } from "@/types";

import { clerkClient } from "@clerk/nextjs/server";

import prismaClient from "@/lib/prisma";

export const getUserByUserName = async (username: string) => {
  const authors = await clerkClient.users.getUserList({
    username: [username],
  });

  return authors.data[0];
};

export const getUserByUserId = async (userId: string) => {
  const user = await prismaClient.users.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};

export const createUser = async (data: User) => {
  const user = await getUserByUserId(data.data.id);

  if (user) {
    throw new Error("User already exists");
  }

  return prismaClient.users.create({
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
      phoneNumbers: {
        create: data.data.phone_numbers.map((phone) => ({
          id: phone.id,
          number: phone.number,
          userId: data.data.id,
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

export const updateUser = async (data: User) => {
  return prismaClient.users.update({
    where: {
      id: data.data.id,
    },
    data: {
      birthday: data.data.birthday,
      createdAt: data.data.created_at,
      emailAddresses: {
        upsert: data.data.email_addresses.map((email) => ({
          where: {
            id: email.id,
          },
          update: {
            emailAddress: email.email_address,
            verificationStatus: email.verification.status,
            verificationStrategy: email.verification.strategy,
          },
          create: {
            id: email.id,
            emailAddress: email.email_address,
            verificationStatus: email.verification.status,
            verificationStrategy: email.verification.strategy,
          },
        })),
      },
      phoneNumbers: {
        upsert: data.data.phone_numbers.map((phone) => ({
          where: {
            id: phone.id,
          },
          update: {
            number: phone.number,
          },
          create: {
            id: phone.id,
            number: phone.number,
            userId: data.data.id,
          },
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
