import type { CommentT } from "@/types";

import prisma from "@/app/lib/prisma";

import Comment from "./Comment";

type propsType = {
  data: {
    name: string | null;
    image: string;
    authId: string;
    postId: string;
  };
};
export default async function CommentSection({ data }: propsType) {
  const comments: CommentT[] = await prisma.comment.findMany({
    where: {
      postId: data.postId,
    },
  });
  console.log(comments[0].content);
  return (
    <div className="mt-8 flex flex-col gap-6 overflow-y-auto">
      {comments.map((comment) => (
        <>
          <Comment key={comment.id} data={{ ...data, comment }} />
          <div className="w-full border-[0.5px] border-gray-300"></div>
        </>
      ))}
    </div>
  );
}
