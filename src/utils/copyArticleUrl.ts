import { toast } from "@/components/ui/use-toast";

export const copyArticleUrl = (slug: string) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const textToCopy = `${BASE_URL}/article/${slug}`;
    navigator.clipboard.writeText(textToCopy);
    return toast({
      variant: "default",
      title: "Copied to clipboard!",
    });
  } catch {
    return toast({
      variant: "destructive",
      title: "Failed to copy!",
    });
  }
};
