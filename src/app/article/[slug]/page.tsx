// import { auth } from "@clerk/nextjs/server";
// import { type Value } from "react-quill";

// import { ERROR_CODES } from "@/lib/error";
// import prisma from "@/lib/prisma";
// import Article from "@/components/shared/article/Article";

// export const dynamicParams = true;

// export async function generateStaticParams() {
//   const posts = await prisma.posts.findMany();

//   return [
//     { category: "a", product: "1" },
//     { category: "b", product: "2" },
//     { category: "c", product: "3" },
//   ];
// }

export default function Page({ params }: { params: { category: string; product: string } }) {
  const { category, product } = params;

  return (
    <div>
      <h1>Category: {category}</h1>
      <h1>Product: {product}</h1>
    </div>
  );
}

// export default async function Page({ params }: { params: { slug: string } }) {
//   const { userId } = auth();
//   const post = await prisma.posts.findUnique({
//     where: {
//       slug: params.slug,
//     },
//     include: {
//       likes: true,
//       comments: true,
//       author: true,
//     },
//   });

//   if (!post) {
//     throw new Error(ERROR_CODES.POST_NOT_FOUND);
//   }

//   return (
//     <div className="flex w-full justify-center py-2">
//       <div className="max-w-[680px] py-2">
//         <Article
//           userId={userId as string}
//           articleId={post.id}
//           title={post.title}
//           subTitle={post.subTitle}
//           authorImageUrl={post.author.imageUrl}
//           authorFullName={`${post.author.firstName} ${post.author.lastName}`}
//           tag={post.tag}
//           content={post.content as Value}
//           coverImageSrc={post.coverImageSrc}
//           createdAt={post.createdAt}
//           likesLength={post.likes.length}
//           commentsLength={post.comments.length}
//         />
//       </div>
//     </div>
//   );
// }
