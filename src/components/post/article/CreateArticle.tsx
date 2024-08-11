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

import { ROUTES } from "@/utils/routes";
import { useUploadImage } from "@/services/aws";
import { useCreateArticle } from "@/services/post/article";
import { CreateArticleRequestSchema, type CreateArticleRequestPayload } from "@/services/types";
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

export default function CreateArticle() {
  const [editorValue, setEditorValue] = useState<Value>("");
  const { mutateAsync: uploadImageAsync, isPending: uploadImageIsPending } = useUploadImage();
  const { mutateAsync: createArticleAsync, isPending: createArticleIsPending } = useCreateArticle();
  const { user } = useUser();
  const { toast } = useToast();
  const navigate = useRouter();
  const [publishText, setPublishText] = useState("Publish Article");
  const [published, setPublished] = useState(false);

  const form = useForm<CreateArticleRequestPayload>({
    resolver: zodResolver(CreateArticleRequestSchema),
    defaultValues: {
      title: "How I Hunt Down My Nemesis",
      subTitle:
        "So I'm out here, jumping through dimensions, chasing down this pain-in-the-ass nemesis of mine. Portal gun's acting up, Morty's whining—typical Tuesday. But hey, who doesn't love a good multiverse showdown?",
      tag: "ai",
      coverImageSrc: undefined,
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

        setPublishText("Article has published!");
        setPublished(true);
        setTimeout(() => {
          navigate.push(ROUTES.root);
        }, 2000);
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
                  loading={createArticleIsPending}
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
              author={user as unknown as UserBasicInfoT}
              tag={form.watch("tag")}
              content={editorValue}
              subTitle={form.watch("subTitle")}
              title={form.watch("title")}
              coverImageSrc={coverImageSrc}
              createdAt={new Date()}
              likesLength={0}
              commentsLength={0}
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
