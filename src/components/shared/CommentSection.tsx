import type { CommentT } from "@/types";

import prisma from "@/app/lib/prisma";

import Comment from "./Comment";

type propsType = {
  data: {
    postId: string;
  };
};
export default async function CommentSection({ data }: propsType) {
  const comments: CommentT[] = await prisma.comment.findMany({
    where: {
      postId: data.postId,
    },
  });
  return (
    <div className="mt-8 flex flex-col gap-6 overflow-y-auto">
      {comments.map((comment) => (
        <>
          <Comment key={comment.id} data={{ comment }} />
          <div className="w-full border-[0.5px] border-gray-300"></div>
        </>
      ))}
    </div>
  );
}
