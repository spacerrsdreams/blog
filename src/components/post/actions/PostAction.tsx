import { Button } from "@/components/ui/button";

type Props = {
  totalCount: number;
  type: string;
  isSelected?: boolean | undefined;
  Icon: React.ReactElement;
  IconDark?: React.ReactElement;
  onClickFn?: () => void;
  disableActions?: boolean;
  className?: string;
};

export default function PostAction({
  totalCount,
  isSelected,
  onClickFn,
  type,
  Icon,
  IconDark,
  disableActions = false,
}: Props) {
  return type === "action" ? (
    <Button disabled={disableActions} variant="ghost" onClick={onClickFn}>
      {isSelected ? IconDark : Icon}
      <span>{totalCount}</span>
    </Button>
  ) : (
    <span className="flex items-center gap-1">
      {isSelected ? IconDark : Icon}
      <span>{totalCount}</span>
    </span>
  );
}
