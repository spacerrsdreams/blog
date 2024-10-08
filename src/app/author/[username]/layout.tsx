import { getUserByUserName } from "@/server/user";

import Image from "next/image";

import { ERROR_CODES } from "@/lib/error";
import AuthorDetails from "@/components/author/AuthorDetails";
import AuthorDetailsMobile from "@/components/author/AuthorDetailsMobile";
import FeedMenu from "@/components/shared/FeedMenu";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  const author = await getUserByUserName(params.username);

  if (!author) {
    throw new Error(ERROR_CODES.AUTHOR_NOT_FOUND);
  }

  return (
    <div className="flex flex-row justify-evenly">
      <div className="block w-full max-w-[728px] flex-auto">
        <Image
          src="/images/rick-and-morty.jpg"
          alt="rick and morty"
          width={1536}
          height={864}
          className="h-[210px] w-full"
        />
        <div className="block px-4 xl:px-0">
          <div className="pt-6" />
          <div className="mb-4 block md:hidden">
            <AuthorDetailsMobile
              authorName={`${author.firstName} ${author.lastName}.`}
              profileImageSrc={author.profileImageUrl}
              authorId={author.id}
            />
          </div>
          <h1 className="hidden py-5 text-2xl font-bold md:block md:text-6xl">
            {`${author.firstName} ${author.lastName}.`}
          </h1>
          <FeedMenu baseUrl={`/author/${params.username}`} />
          <div className="pt-6">{children}</div>
        </div>
      </div>
      <div className="hidden min-h-screen w-full border-l border-border/40 pl-10 pr-6 md:block md:max-w-[250px] lg:max-w-[328px]">
        <div className="relative inline-block">
          <div className="pt-10" />
          <AuthorDetails
            authorId={author.id}
            authorName={`${author.firstName} ${author.lastName}.`}
            profileImageSrc={author.imageUrl}
          />
        </div>
        <div className="mt-10 flex size-56 items-center justify-center rounded-sm bg-purple-400">
          <span className="text-center capitalize text-white">Your cool commercial here</span>
        </div>
      </div>
    </div>
  );
}
