"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";

import { ROUTES } from "@/utils/routes";
import { useDeleteArticle } from "@/services/post/article";
import { useFollow, useGetFollowerIfExists, useUnfollow } from "@/services/user/followers";
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
  authorId: string;
  onPostDelete?: (postId: string) => void;
};

export default function MoreActionsButton({ postId, authorId, onPostDelete }: Props) {
  const [open, setOpen] = useState(false);
  const { mutateAsync: getFollowerIfExistsAsync, isPending } = useGetFollowerIfExists();
  const { mutateAsync: followAuthorAsync } = useFollow();
  const { mutateAsync: unfollowAuthorAsync } = useUnfollow();
  const { mutateAsync: deleteArticleAsync } = useDeleteArticle();
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;
  const [following, setFollowing] = useState(false);

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

  const handleDelete = async () => {
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

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <Ellipsis />
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

        <DropdownMenuItem
          className="px-4"
          onClick={() => {
            setOpen(false);
          }}
        >
          <span className="text-muted-foreground">Undo claps</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="px-4"
          onClick={(e) => {
            e.preventDefault();
            router.push(`${ROUTES.editArticle(postId)}`);
          }}
        >
          <span className="text-muted-foreground">Edit Article</span>
        </DropdownMenuItem>

        {userId === authorId && (
          <DropdownMenuItem
            className="px-4"
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
              setOpen(false);
            }}
          >
            <span className="text-muted-foreground">Delete article</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          className="px-4"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
          }}
        >
          <span className="text-red-500">Report Story...</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
