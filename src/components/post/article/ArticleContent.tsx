"use client";

import dynamic from "next/dynamic";
import type { Value } from "react-quill";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function ArticleContent({ postContent }: { postContent: Value }) {
  return (
    <ReactQuill
      theme="bubble"
      className="max-w-[680px] text-lg text-muted-foreground"
      value={postContent}
      readOnly={true}
    />
  );
}
