import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { ROUTES } from "@/utils/routes";
import CreateArticle from "@/components/post/article/CreateArticle";

export default async function page() {
  const { userId } = auth();
  if (!userId) {
    redirect(ROUTES.root);
  }
  const user = await clerkClient().users.getUser(userId);
  if (!userId || user.privateMetadata.role !== "admin") {
    redirect(ROUTES.root);
  }
  return <CreateArticle />;
}
