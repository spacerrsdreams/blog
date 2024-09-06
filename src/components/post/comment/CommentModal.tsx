"use client";

import React, { useEffect, useRef } from "react";

import { useDeleteComment } from "@/services/post/comment";
import { Button } from "@/components/ui/button";

import { useCommentProvider } from "./CommentProvider";

export function CommentModal() {
  const { showModal, setShowModal, currentCommentId, setComments, setCommentsCount } =
    useCommentProvider();
  const { mutateAsync: deleteCommentAsync } = useDeleteComment();
  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
      setShowModal(false);
    }
  };
  const handleDeleteClick = () => {
    setShowModal(false);
    deleteCommentAsync({ commentId: currentCommentId }).then(() => {
      setCommentsCount((prevCount) => prevCount - 1);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== currentCommentId),
      );
    });
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModal]);

  return (
    showModal && (
      <div className="fixed top-0 h-full max-w-[384px] overflow-x-hidden bg-white opacity-95">
        <div className="flex h-full w-full items-center justify-center">
          <div ref={modalContentRef} className="flex flex-col gap-3 bg-white p-12 text-center">
            <h3 className="text-2xl font-bold">Delete</h3>
            <span>Deleted comments are gone forever. Are you sure?</span>
            <div className="flex justify-center gap-2">
              <Button onClick={() => setShowModal(false)} variant="ghost">
                Cancel
              </Button>
              <Button onClick={handleDeleteClick} variant="destructive">
                Delete Comment
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
