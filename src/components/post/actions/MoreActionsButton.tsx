"use client";

import { usePopupProvider } from "@/context/PopupProvider";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";

import { copyArticleUrl } from "@/utils/copyArticleUrl";
import { ROUTES } from "@/utils/routes";
import { useDeleteArticle } from "@/services/post/article";
import { useRemoveLike } from "@/services/post/like";
import { useFollow, useGetFollowerIfExists, useUnfollow } from "@/services/user/followers";
import ReportStory from "@/components/post/actions/ReportStory";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  postId: string;
  slug?: string;
  authorId: string;
  isLikedByUser: boolean | undefined;
  className?: string;
  onPostDelete?: (postId: string) => void;
  onUnlike?: () => void;
};

export default function MoreActionsButton({
  postId,
  slug,
  isLikedByUser,
  authorId,
  className,
  onUnlike,
  onPostDelete,
}: Props) {
  const { setOpenModal, reportModalOpen } = usePopupProvider();
  const [open, setOpen] = useState(false);
  const { mutateAsync: getFollowerIfExistsAsync, isPending } = useGetFollowerIfExists();
  const { mutateAsync: followAuthorAsync } = useFollow();
  const { mutateAsync: unfollowAuthorAsync } = useUnfollow();
  const { mutateAsync: deleteArticleAsync } = useDeleteArticle();
  const { mutateAsync: removeUserLikeAsync } = useRemoveLike();
  const [following, setFollowing] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const userId = user?.id;

  useEffect(() => {
    if (!authorId || !userId) return;
    if (!open) return;
    if (authorId === userId) return;

    getFollowerIfExistsAsync(authorId)
      .then((data) => {
        data.data ? setFollowing(true) : setFollowing(false);
      })
      .catch(() => {
        toast({ title: "Failed to get follower", variant: "destructive" });
      });
  }, [open, userId]);

  const handleFollowAuthor = async () => {
    if (!authorId) return;

    if (userId === authorId) {
      toast({
        title: "You cannot follow yourself",
        variant: "destructive",
      });
    }

    followAuthorAsync({ followingUserId: authorId })
      .then(() => {
        toast({ title: "You are now following this author" });
      })
      .catch(() => {
        toast({ title: "Failed to follow author", variant: "destructive" });
      });
  };

  const handleUnffolowAuthor = async () => {
    if (!authorId) return;

    if (userId === authorId) {
      toast({
        title: "You cannot unfollow yourself",
        variant: "destructive",
      });
    }

    unfollowAuthorAsync(authorId)
      .then(() => {
        toast({ title: "You are no longer following this author" });
      })
      .catch(() => {
        toast({ title: "Failed to unfollow author", variant: "destructive" });
      });
  };

  const handleDeleteArticle = async () => {
    if (!postId) return;

    if (authorId !== userId) {
      toast({
        title: "You are not authorized to delete this post",
        variant: "destructive",
      });
    }

    deleteArticleAsync({ id: postId })
      .then(() => {
        toast({ title: "Post deleted successfully" });
        onPostDelete ? onPostDelete(postId) : router.push(ROUTES.root);
      })
      .catch(() => {
        toast({ title: "Failed to delete post", variant: "destructive" });
      });
  };

  const handleRemoveLike = async () => {
    if (!postId) return;

    removeUserLikeAsync(postId)
      .then(() => {
        toast({ title: "Like removed successfully" });
        onUnlike && onUnlike();
      })
      .catch(() => {
        toast({ title: "Failed to remove like", variant: "destructive" });
      });
  };

  return (
    <div className={className}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger>
          <Ellipsis className="h-8 w-8" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-52">
          {authorId !== userId && (
            <>
              {isPending ? (
                <div className="px-3">
                  <Skeleton className="h-8" />
                </div>
              ) : (
                <>
                  <DropdownMenuItem
                    className="px-4"
                    onClick={(e) => {
                      e.preventDefault();
                      following ? handleUnffolowAuthor() : handleFollowAuthor();
                      setOpen(false);
                    }}
                  >
                    <span className="text-muted-foreground">
                      {following ? "Unfollow author" : "Follow author"}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
            </>
          )}

          {isLikedByUser && (
            <DropdownMenuItem
              className="px-4"
              onClick={(e) => {
                e.preventDefault();
                handleRemoveLike();
                setOpen(false);
              }}
            >
              <span className="text-muted-foreground">Undo claps</span>
            </DropdownMenuItem>
          )}
          {slug && (
            <DropdownMenuItem
              className="px-4"
              onClick={(e) => {
                e.preventDefault();
                copyArticleUrl(slug);
                setOpen(false);
              }}
            >
              <span className="text-muted-foreground">Copy link</span>
            </DropdownMenuItem>
          )}

          {userId === authorId && (
            <DropdownMenuItem
              className="px-4"
              onClick={(e) => {
                e.preventDefault();
                router.push(`${ROUTES.editArticle(postId)}`);
                setOpen(false);
              }}
            >
              <span className="text-muted-foreground">Edit article</span>
            </DropdownMenuItem>
          )}

          {userId === authorId && (
            <DropdownMenuItem
              className="px-4"
              onClick={(e) => {
                e.preventDefault();
                handleDeleteArticle();
                setOpen(false);
              }}
            >
              <span className="text-muted-foreground">Delete article</span>
            </DropdownMenuItem>
          )}

          {userId !== authorId && (
            <DropdownMenuItem
              className="px-4"
              onClick={(e) => {
                e.preventDefault();
                if (!isSignedIn) return setOpenModal(true, "signIn");
                setOpenModal(true, "report");
                setOpen(false);
              }}
            >
              <span className="text-red-500">Report Story...</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
        {reportModalOpen && <ReportStory open={reportModalOpen} setOpen={setOpenModal} />}
      </DropdownMenu>
    </div>
  );
}
