import { Ellipsis, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MoreButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="gap-4">
          <Trash color="red" size="20" />
          <span className="text-foreground">Delete</span>
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
