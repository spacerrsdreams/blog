"use client";

// Error components must be Client Components
import { useEffect, useState } from "react";

import { ERROR_MESSAGES } from "@/lib/error";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [errorMessage, setErrorMessage] = useState("An error occurred");

  useEffect(() => {
    console.error("message -", error.message);
    setErrorMessage(ERROR_MESSAGES[error.message] || "An error occurred");
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-60px)] w-full flex-col items-center justify-center gap-8">
      <h1>{errorMessage}... We wil fix it soon!</h1>
      <Button
        onClick={reset}
        className="cursor-pointer self-center rounded-xl bg-purple-500 px-5 py-3 text-xs font-semibold text-white transition-all duration-300 hover:bg-purple-600"
      >
        Refresh Page
      </Button>
    </div>
  );
}
