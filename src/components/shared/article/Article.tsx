import Image from "next/image";
import ReactQuill from "react-quill";

import { formatDate } from "@/utils/formatDate";
import { formatNumberWithK } from "@/utils/formatNumberWithK";
import { Icons } from "@/components/shared/Icons";

type Props = {
  title: string;
  subTitle: string;
  authorImageUrl: string;
  authorFullName: string;
  postTag: string;
  postContent: string;
};

export default function Article({
  title,
  subTitle,
  authorImageUrl,
  authorFullName,
  postTag,
  postContent,
}: Props) {
  return (
    <div className="mx-6 flex flex-col justify-center gap-8 self-center">
      <div className="flex w-full max-w-[680px] flex-col gap-3">
        <h1 className="text-5xl font-bold">{title}</h1>
        <h3 className="text-xl text-muted-foreground">{subTitle}</h3>
      </div>
      <div className="flex flex-col">
        <div className="mx-3 flex gap-4">
          <Image
            src={authorImageUrl}
            alt={authorFullName || ""}
            width={48}
            height={48}
            className="size-12 rounded-full"
          />
          <div className="">
            <h4 className="text-lg capitalize">{authorFullName}</h4>
            <div className="text-sm text-muted-foreground">
              Published in <span className="text-sm font-semibold text-black">{postTag}</span> ·{" "}
              {formatDate(new Date())}
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-4 border-b border-t border-border/60 py-4">
          <span className="ml-8 flex items-center">
            <Icons.clap />
            <span>{formatNumberWithK(3700)}</span>
          </span>
          <span className="flex items-center">
            <Icons.message />
            <span>{formatNumberWithK(845)}</span>
          </span>
        </div>
      </div>
      <div className="mb-10">
        <ReactQuill
          theme="bubble"
          className="w-[680px] text-lg text-muted-foreground"
          value={postContent}
          readOnly={true}
        />
      </div>
    </div>
  );
}
