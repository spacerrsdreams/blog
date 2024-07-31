"use client";

import { SignInButton } from "@clerk/nextjs";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function SignInPopup({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="z-50 flex h-full flex-col items-center justify-center gap-8">
        <DialogHeader className="items-center">
          <DialogTitle className="text-2xl">Create an account to write a response.</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          Build on this story’s ideas with your own – responses keep the conversation moving.
        </DialogDescription>
        <SignInButton>
          <span className="cursor-pointer self-center rounded-xl bg-purple-500 px-3 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-purple-600">
            Get Started
          </span>
        </SignInButton>
        <DialogFooter className="text-center">
          <p className="text-sm text-muted-foreground">
            Click “Sign up” to agree to Bloggers{" "}
            <Link className="underline" href="/">
              Terms of Service
            </Link>{" "}
            and acknowledge that Bloggers’s{" "}
            <Link className="underline" href="/">
              Privacy Policy
            </Link>{" "}
            applies to you.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
