import prisma from "@/lib/prisma";

import Comment from "./Comment";

type propsType = {
  data: {
    postId: string;
  };
};
export default async function CommentSection({ data }: propsType) {
  const comments = await prisma.comments.findMany({
    where: {
      postId: data.postId,
    },
  });
  return (
    <div className="mt-8 flex flex-col gap-6 overflow-y-auto">
      {comments.map((comment) => (
        <div key={comment.id}>
          <Comment data={{ comment }} />
          <div className="mt-4 w-full border-[0.5px] border-gray-300"></div>
        </div>
      ))}
    </div>
  );
}
