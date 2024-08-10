"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Ellipsis } from "lucide-react";
import { useState } from "react";

import { ROUTES } from "@/utils/routes";
import { useDeleteArticle } from "@/services/post/article";
import { useCreateFollower } from "@/services/user/followers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  postId: string;
  authorId: string;
  onPostDelete?: (postId: string) => void;
};

export default function MoreActionsButton({ postId, authorId, onPostDelete }: Props) {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createFollowerAsync } = useCreateFollower();
  const { mutateAsync: deleteArticleAsync } = useDeleteArticle();
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;

  const handleCreateFollower = async () => {
    if (!authorId) return;

    if (userId === authorId) {
      toast({
        title: "You cannot follow yourself",
        variant: "destructive",
      });
    }

    createFollowerAsync({ followingUserId: authorId })
      .then(() => {
        toast({ title: "You are now following this author" });
      })
      .catch(() => {
        toast({ title: "Failed to follow author", variant: "destructive" });
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
          <div>
            <DropdownMenuItem
              className="z-50 px-4"
              onClick={(e) => {
                e.preventDefault();
                handleCreateFollower();
                setOpen(false);
              }}
            >
              <span className="text-muted-foreground">Follow author</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </div>
        )}

        <DropdownMenuItem
          className="px-4"
          onClick={(e) => {
            console.log(e);
            setOpen(false);
          }}
        >
          <span className="text-muted-foreground">Undo claps</span>
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
