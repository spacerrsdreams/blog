"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import { type UnprivilegedEditor } from "react-quill";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import "react-quill/dist/quill.snow.css";

import { TAGS } from "@/constants/tags";

import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";

import Article from "@/components/shared/article/Article";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().max(40).min(2, {
    message: "title must be at least 2 characters.",
  }),
  subTitle: z.string().max(120).min(2, {
    message: "subTitle must be at least 2 characters.",
  }),
  tag: z.enum(TAGS, {
    errorMap: () => ({ message: "Tag must be one of: AI, Finances, Crypto, Startups." }),
  }),
  postContent: z.any(),
});

export default function Editor() {
  const [value, setValue] = useState("");
  const { user } = useUser();
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "How I Hunt Down My Nemesis",
      subTitle:
        "So I'm out here, jumping through dimensions, chasing down this pain-in-the-ass nemesis of mine. Portal gun's acting up, Morty's whining—typical Tuesday. But hey, who doesn't love a good multiverse showdown?",
      tag: "AI",
      postContent: undefined,
    },
  });

  function handleChange(content: string, _: never, __: never, editor: UnprivilegedEditor) {
    setValue(content);
    console.log(editor.getContents());
    form.setValue("postContent", editor.getContents());
  }

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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="h-full">
      <div className="flex w-full py-2">
        <div className="flex h-full flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-full space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="სათაური" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="ქვესათაური" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="აირჩიე თეგი" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TAGS.map((tag) => (
                          <SelectItem key={tag} value={tag}>
                            {tag}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <ReactQuill
                className="h-[350px] w-[680px]"
                modules={modules}
                theme="snow"
                value={value}
                onChange={handleChange}
              />
            </form>
          </Form>
        </div>
        <div className="ml-4 h-[calc(100vh_-_80px)] max-w-[680px] flex-1 flex-col overflow-y-auto">
          <Article
            authorFullName={user?.fullName || ""}
            authorImageUrl={user?.imageUrl || ""}
            postTag={form.watch("tag")}
            postContent={value}
            subTitle={form.watch("subTitle")}
            title={form.watch("title")}
          />
        </div>
      </div>
    </div>
  );
}
