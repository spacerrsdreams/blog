"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { ImagePlus } from "lucide-react";
import { useState } from "react";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import "react-quill/dist/quill.snow.css";

import { TAGS } from "@/constants/tags";
import type { UserBasicInfoT } from "@/types";

import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import type { Value } from "react-quill";

import { useUploadImage } from "@/services/aws";
import { useEditArticle } from "@/services/post/article";
import {
  EditArticleFormSchema,
  type ArticleEditFormType,
  type EditArticleRequestPayload,
} from "@/services/types";
import Post from "@/components/post/Post";
import QuillEditor from "@/components/shared/QuillEditor";
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

type Props = {
  author: UserBasicInfoT;
  articleId: string;
  title: string;
  subTitle: string;
  tag: "all" | "finances" | "ai" | "crypto" | "startups";
  content: Value;
  coverImageSrc: string | undefined;
  createdAt: Date;
  likesLength: number;
  commentsLength: number;
  disableActions?: boolean;
  viewCount: number;
  handleRemoveImage?: () => void;
};

export default function EditArticle(post: Props) {
  const [editorValue, setEditorValue] = useState<Value>(post.content);
  const { mutateAsync: uploadImageAsync, isPending: uploadImageIsPending } = useUploadImage();
  const { mutateAsync: editArticleAsync, isPending: editArticleIsPending } = useEditArticle();

  const { user } = useUser();
  const { toast } = useToast();
  const navigate = useRouter();
  const [publishText, setPublishText] = useState("Edit Article");
  const [published, setPublished] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const form = useForm<EditArticleRequestPayload>({
    resolver: zodResolver(EditArticleFormSchema),
    defaultValues: {
      title: post.title,
      subTitle: post.subTitle,
      tag: post.tag,
      coverImageSrc: post.coverImageSrc,
      postContent: undefined,
    },
  });

  const onSubmit = (values: ArticleEditFormType) => {
    const editArticlePayload = {
      id: post.articleId,
      ...values,
    };
    editArticleAsync(editArticlePayload)
      .then(() => {
        toast({
          title: "Success",
          description: "Article edited successfully.",
        });

        setPublishText("Article has edited!");
        setPublished(true);
        setTimeout(() => {
          navigate.push(`${BASE_URL}/article/${post.articleId}`);
        }, 2000);
      })
      .catch((e) => {
        console.error(e);
        toast({
          title: "Error",
          variant: "destructive",
          description: "Failed to edit post",
        });
      });
  };

  const handleImageRemove = () => {
    form.setValue("coverImageSrc", undefined);
  };

  const coverImageSrc = form.watch("coverImageSrc");

  return (
    <div className="w-full">
      <div className="flex w-full justify-center">
        <div className="max-w-[680px] space-y-24 py-2">
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
                          {TAGS.filter((f) => f !== "all").map((tag) => (
                            <SelectItem key={tag} value={tag}>
                              {tag}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <QuillEditor
                          onEditorChange={(e: Value) => {
                            field.onChange(e);
                            setEditorValue(e);
                          }}
                          editorValue={editorValue}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={published}
                  type="submit"
                  size="lg"
                  className="fixed bottom-8 left-1/2 z-50 min-w-[161px] -translate-x-1/2 transform rounded-xl bg-purple-500 font-semibold text-white transition-all duration-300 hover:bg-purple-600"
                  loading={editArticleIsPending}
                >
                  {publishText}
                </Button>
              </form>
            </Form>
          </div>
          {!coverImageSrc && (
            <div className="relative flex h-56 w-full items-center justify-center bg-gray-100">
              <div className="flex size-full items-center justify-center gap-4">
                <ImagePlus />
                <span className="text-xl font-semibold">
                  {uploadImageIsPending ? "Uploading..." : "Upload cover image"}
                </span>
              </div>

              <Input
                className="absolute size-full opacity-0"
                type="file"
                accept="image/*"
                onChange={async (event) => {
                  const files = event.target.files;

                  if (!files || !files.length || !files[0]) return;
                  const file = files[0];

                  try {
                    const contentType = file.type;
                    const filename = file.name;
                    const imageUrl = await uploadImageAsync({
                      file,
                      contentType,
                      filename,
                    });

                    form.setValue("coverImageSrc", imageUrl);
                  } catch (error) {
                    console.error("Error uploading image:", error);
                  }
                }}
              />
            </div>
          )}

          {user && (
            <Post
              userTotalLikes={0}
              author={user as unknown as UserBasicInfoT}
              tag={form.watch("tag")}
              content={editorValue}
              subTitle={form.watch("subTitle")}
              title={form.watch("title")}
              viewCount={post.viewCount}
              coverImageSrc={coverImageSrc}
              createdAt={new Date()}
              totalLikes={0}
              totalComments={0}
              articleId=""
              disableActions={true}
              handleRemoveImage={handleImageRemove}
            />
          )}
        </div>
      </div>
    </div>
  );
}
