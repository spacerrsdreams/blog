import { TABS } from "@/data/links";
import { POSTS } from "@/data/posts";
import ContributorDetails from "@/components/contributor/ContributorDetails";
import ContributorDetailsMobile from "@/components/contributor/ContributorDetailsMobile";
import TabMenu from "@/components/shared/Tab";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { cotributor: string };
}) {
  const contributor = POSTS.find((post) => post.authorSlug === params.cotributor);

  if (!contributor) {
    return <div>Something went wrong</div>;
  }

  return (
    <>
      <div className="block w-full max-w-[728px] flex-auto">
        <div className="block px-4 xl:px-0">
          <div className="pt-6" />
          <div className="block md:hidden">
            <ContributorDetailsMobile />
          </div>
          <TabMenu tabList={TABS} />
          <div className="pt-6">{children}</div>
        </div>
      </div>
      <div className="hidden min-h-screen w-full border-l border-border/40 pl-10 pr-6 md:block md:max-w-[250px] lg:max-w-[328px]">
        <div className="relative inline-block size-full">
          <div className="pt-10" />
          <ContributorDetails authorSlug={contributor?.authorSlug} />
        </div>
      </div>
    </>
  );
}
