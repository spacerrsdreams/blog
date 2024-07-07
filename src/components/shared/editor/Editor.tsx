"use client";

import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import { type UnprivilegedEditor } from "react-quill";

import "react-quill/dist/quill.snow.css";

export default function Editor() {
  const [value, setValue] = useState("");
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

  function handleChange(content: string, _: never, __: never, editor: UnprivilegedEditor) {
    setValue(content);
    console.log(editor.getContents()); //json to store in db
  }

  return (
    <div className="h-[calc(100vh - 60px)] flex w-full py-2">
      <ReactQuill
        className="h-[550px] w-[680px]"
        theme="snow"
        value={value}
        onChange={handleChange}
      />
      <div className="flex-1 flex-col flex-wrap gap-10 border-l border-black">
        <h1 className="text-center">Preview</h1>
        <ReactQuill theme="bubble" className="h-[550px] w-[680px]" value={value} readOnly={true} />
      </div>
    </div>
  );
}
