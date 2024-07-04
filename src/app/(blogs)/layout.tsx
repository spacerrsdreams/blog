import { TABS } from "@/data/links";
import Highlights from "@/components/shared/highlights/Highlights";
import TabMenu from "@/components/shared/Tab";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="block w-full max-w-[728px] flex-auto">
        <div className="block px-4 xl:px-0">
          <div className="pt-6" />
          <TabMenu tabList={TABS} />
          <div className="pt-6">{children}</div>
        </div>
      </div>
      <div className="hidden min-h-screen w-full border-l border-border/40 pl-10 pr-6 md:block md:max-w-[250px] lg:max-w-[328px]">
        <div className="relative inline-block size-full">
          <div className="pt-10" />
          <Highlights />
        </div>
      </div>
    </>
  );
}
