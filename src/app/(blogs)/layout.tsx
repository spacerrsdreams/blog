import Highlights from "@/components/shared/highlights/Highlights";
import TabMenu from "@/components/shared/Tab";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="block w-full max-w-[728px] flex-auto">
        <div className="block px-4 sm:px-0">
          <div className="pt-6" />
          <TabMenu />
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
