"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import "react-quill/dist/quill.snow.css";

import { TAGS } from "@/constants/tags";

import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import type { Value } from "react-quill";

import { useCreateArticle } from "@/services/post/article";
import { CreateArticleRequestSchema, type CreateArticleRequestPayload } from "@/services/types";
import Article from "@/components/shared/article/Article";
import ArticleEditor from "@/components/shared/article/ArticleEditor";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function CreateArticle() {
  const [editorValue, setEditorValue] = useState<Value>("");
  const { mutateAsync: createArticleAsync } = useCreateArticle();
  const { user } = useUser();
  const { toast } = useToast();

  const form = useForm<CreateArticleRequestPayload>({
    resolver: zodResolver(CreateArticleRequestSchema),
    defaultValues: {
      title: "How I Hunt Down My Nemesis",
      subTitle:
        "So I'm out here, jumping through dimensions, chasing down this pain-in-the-ass nemesis of mine. Portal gun's acting up, Morty's whining—typical Tuesday. But hey, who doesn't love a good multiverse showdown?",
      tag: "AI",
      postContent: undefined,
    },
  });

  const onSubmit = (values: CreateArticleRequestPayload) => {
    createArticleAsync(values)
      .then(() => {
        toast({
          title: "Success",
          description: "Article published successfully.",
        });
      })
      .catch((e) => {
        console.error(e);
        toast({
          title: "Error",
          variant: "destructive",
          description: "Failed to publish post",
        });
      });
  };

  return (
    <div className="h-screen">
      <div className="flex h-full w-full py-2">
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
              <ArticleEditor
                form={form}
                onEditorChange={(e: Value) => {
                  setEditorValue(e);
                }}
                editorValue={editorValue}
              />
              <Button
                type="submit"
                className="transfrom absolute bottom-12 left-1/2 z-10 -translate-x-1/2"
              >
                Publish Article
              </Button>
            </form>
          </Form>
        </div>
        <div className="ml-4 h-[calc(100vh_-_80px)] max-w-[680px] flex-1 flex-col overflow-y-auto">
          <Article
            authorFullName={user?.fullName || ""}
            authorImageUrl={user?.imageUrl || ""}
            postTag={form.watch("tag")}
            postContent={editorValue}
            subTitle={form.watch("subTitle")}
            title={form.watch("title")}
          />
        </div>
      </div>
    </div>
  );
}
