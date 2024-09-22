import { RedirectToSignIn } from "@clerk/nextjs";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { ROUTES } from "@/utils/routes";
import CreateArticle from "@/components/post/article/CreateArticle";

export default async function page() {
  const { userId } = auth();

  if (!userId) {
    return <RedirectToSignIn />;
  }

  const user = await clerkClient().users.getUser(userId);

  if (user.privateMetadata?.role === "admin") {
    return <CreateArticle />;
  }
  redirect(ROUTES.root);
}
