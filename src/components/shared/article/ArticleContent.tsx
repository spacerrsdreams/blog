"use client";

import ReactQuill, { type Value } from "react-quill";

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
