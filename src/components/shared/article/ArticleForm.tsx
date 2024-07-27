"use client";

import { useEffect, useMemo, useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import ReactQuill, { type UnprivilegedEditor, type Value } from "react-quill";

import { useUploadImage } from "@/lib/aws";

type Props = {
  editorValue: Value;
  onEditorChange: (e: Value) => void;
  form: UseFormReturn<
    {
      title: string;
      subTitle: string;
      tag: "AI" | "Finances" | "Crypto" | "Startups";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      postContent: Record<string, any>;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
};

export default function ArticleForm({ form, editorValue, onEditorChange }: Props) {
  const quillRef = useRef<ReactQuill | null>(null);
  const { mutateAsync: uploadImageAsync } = useUploadImage();

  useEffect(() => {
    if (!quillRef.current) return;

    quillRef.current
      .getEditor()
      .getModule("toolbar")
      .addHandler("image", () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
          if (!input.files || !input.files.length || !input.files[0]) return;
          const editor = quillRef.current!.getEditor();
          const file = input.files[0];

          try {
            const contentType = file.type;
            const filename = file.name;
            const imageUrl = await uploadImageAsync({ file, contentType, filename });
            const range = editor.getSelection(true);
            editor.insertEmbed(range.index, "image", imageUrl);
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        };
      });
  }, [quillRef]);

  const handleChange = (_: string, __: never, ___: never, editor: UnprivilegedEditor) => {
    onEditorChange(editor.getContents());
    form.setValue("postContent", editor.getContents());
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["blockquote", "code-block"],
        ["link", "image"],
      ],
    }),
    [],
  );

  return (
    <ReactQuill
      ref={quillRef}
      modules={modules}
      theme="snow"
      value={editorValue}
      onChange={handleChange}
    />
  );
}
