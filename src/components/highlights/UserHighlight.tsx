import Link from "next/link";

import type { Highlight } from "@/services/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  data: Highlight;
};

export default function UserHighlight({ data }: Props) {
  return (
    <Link href={`/article/${data.slug}`}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <Avatar className="size-6">
            <AvatarImage src={data.image_url} alt="author image" />
            <AvatarFallback>{data.first_name}</AvatarFallback>
          </Avatar>
          <span className="text-xs font-bold capitalize">
            {data.first_name} {data.last_name} <span className="font-normal lowercase">in</span>{" "}
            {data.tag}
          </span>
        </div>
        <h3 className="font-bold capitalize lg:text-xl">{data.title}</h3>
      </div>
    </Link>
  );
}
