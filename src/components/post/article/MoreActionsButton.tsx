"use client";

import { Ellipsis, Trash } from "lucide-react";
import { useState, type MouseEvent } from "react";

import { useDeleteArticle } from "@/services/post/article";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  postId: string;
  userId: string;
  authorId: string;
  onPostDelete: (postId: string) => void;
};

export default function MoreActionsButton({ postId, authorId, userId, onPostDelete }: Props) {
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);
  const { mutateAsync: deleteArticleAsync } = useDeleteArticle();

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
        onPostDelete(postId);
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
      <DropdownMenuContent>
        <DropdownMenuItem
          className="gap-4"
          onClick={(e) => {
            setOpen(false);
            handleDelete(e);
          }}
        >
          <Trash color="red" size="20" />
          <span className="text-foreground">Delete</span>
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
