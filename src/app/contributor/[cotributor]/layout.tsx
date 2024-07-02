import { TABS } from "@/data/links";
import { POSTS } from "@/data/posts";
import Highlights from "@/components/shared/highlights/Highlights";
import TabMenu from "@/components/shared/Tab";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { cotributor: string };
}) {
  const contributor = POSTS.find(
    (post) => post.authorName.toLowerCase().replace(" ", "-") === params.cotributor,
  );

  console.log(contributor);

  return (
    <>
      <div className="block w-full max-w-[728px] flex-auto">
        <div className="block px-4 sm:px-0">
          <div className="pt-6" />
          <TabMenu tabList={TABS} />
          <div className="pt-6">{children}</div>
        </div>
      </div>
      <div className="hidden min-h-screen w-full max-w-[328px] border-l border-border/40 pl-10 pr-6 md:block">
        <div className="relative inline-block size-full">
          <div className="pt-10" />
          <Highlights />
        </div>
      </div>
    </>
  );
}
