import { Button } from "@/components/ui/button";

type Props = {
  totalCount: number;
  type: string;
  isSelected?: boolean | undefined;
  Icon: React.ReactElement;
  IconDark?: React.ReactElement;
  onClickFn?: () => void;
  disableActions?: boolean;
  displayClassName?: string;
};

export default function PostAction({
  totalCount,
  isSelected,
  onClickFn,
  type,
  Icon,
  IconDark,
  displayClassName,
  disableActions = false,
}: Props) {
  return type === "action" ? (
    <Button disabled={disableActions} size="action" variant="action" onClick={onClickFn}>
      {isSelected ? IconDark : Icon}
      <span>{totalCount}</span>
    </Button>
  ) : (
    <span className={displayClassName}>
      {isSelected ? IconDark : Icon}
      <span>{totalCount}</span>
    </span>
  );
}
