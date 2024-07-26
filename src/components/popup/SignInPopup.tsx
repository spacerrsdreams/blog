"use client";

import { SignInButton } from "@clerk/nextjs";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function SignInPopup({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col items-center gap-8">
        <DialogHeader className="items-center">
          <DialogTitle className="text-2xl">Please sign-in before you continue</DialogTitle>
        </DialogHeader>
        <SignInButton />
      </DialogContent>
    </Dialog>
  );
}
