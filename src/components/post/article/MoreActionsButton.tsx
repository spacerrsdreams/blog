"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Ellipsis } from "lucide-react";
import { useState, type MouseEvent } from "react";

import { ROUTES } from "@/utils/routes";
import { useDeleteArticle } from "@/services/post/article";
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
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { mutateAsync: deleteArticleAsync } = useDeleteArticle();
  const { user } = useUser();
  const userId = user?.id;

  const handleDelete = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

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
        <DropdownMenuItem
          className="px-4"
          onClick={(e) => {
            console.log(e);
            setOpen(false);
          }}
        >
          <span className="text-muted-foreground">Follow author</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
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
              console.log(e);
              setOpen(false);
            }}
          >
            <span className="text-muted-foreground">Delete article</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          className="px-4"
          onClick={(e) => {
            setOpen(false);
            handleDelete(e);
          }}
        >
          <span className="text-red-500">Report Story...</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
