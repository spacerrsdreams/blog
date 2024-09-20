import Image from "next/image";
import Link from "next/link";

import { formatCommentDate } from "@/utils/formatCommentDate";
import { Icons } from "@/components/shared/Icons"; // Assuming you have icons like clapDark, followIcon, etc.

type NotificationType = "FOLLOW" | "COMMENT" | "LIKE" | "COMMENT_LIKE" | "POST";

interface Props {
  id: string | undefined;
  userName: string | undefined;
  userImage: string | undefined;
  actionType: NotificationType | undefined;
  createdAt: Date | undefined;
  slug: string | undefined;
  read: boolean | undefined;
}
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export function NotificationText({
  userName,
  userImage,
  actionType,
  createdAt,
  slug,
  read,
}: Props) {
  if (!userName || !actionType || !createdAt) return null;

  const timeAgo = formatCommentDate(new Date(createdAt));

  let actionText = "";
  let ActionIcon = null;
  let redirectAddress = "";
  switch (actionType) {
    case "FOLLOW":
      actionText = "started following you";
      ActionIcon = Icons.notificationFollow;
      redirectAddress = `${BASE_URL}/author/${userName}`;
      break;
    case "COMMENT":
      actionText = "commented on your post";
      ActionIcon = Icons.notificationMessage;
      redirectAddress = `${BASE_URL}/article/${slug}`;

      break;
    case "LIKE":
      actionText = "liked your post";
      ActionIcon = Icons.notificationClapDark;
      redirectAddress = `${BASE_URL}/article/${slug}`;
      break;
    case "COMMENT_LIKE":
      actionText = "liked your comment";
      ActionIcon = Icons.notificationClapDark;
      redirectAddress = `${BASE_URL}/article/${slug}`;
      break;

    case "POST":
      actionText = "created a new post";
      ActionIcon = Icons.notificationPost;
      redirectAddress = `${process.env.NEXT_PUBLIC_BASE_URL}/article/${slug}`;
      break;
    default:
      actionText = "Unknown action";
  }

  return (
    <div className="flex w-full items-center gap-2">
      <div className="relative">
        <Image
          alt={`${userName}'s profile picture`}
          src={userImage || "/default-profile.png"}
          width={40}
          height={40}
          className="rounded-full"
        />

        {ActionIcon && (
          <div className="absolute bottom-0 right-0 translate-x-3 translate-y-1 rounded-full bg-white bg-opacity-0 p-1">
            <ActionIcon className="h-5 w-5 text-blue-500" />
          </div>
        )}
      </div>
      <Link href={redirectAddress} className="flex w-full flex-col">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-md flex gap-1">
              <span className="text-md font-bold">{userName}</span>
              {actionText}
            </span>
            <span className="text-xs text-gray-500">{timeAgo}</span>
          </div>

          {!read && <div className="mr-4 h-3 w-3 rounded-full bg-[#0866ff]"></div>}
        </div>
      </Link>
    </div>
  );
}
