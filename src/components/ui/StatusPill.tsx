import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export type Status = "todo" | "progress" | "review" | "done";

const config: Record<Status, { label: string; icon: IconName; tone: string }> =
  {
    todo: {
      label: "Todo",
      icon: "circle",
      tone: "border-muted-foreground/30 bg-muted-foreground/15 text-muted-foreground",
    },
    progress: {
      label: "In progress",
      icon: "half",
      tone: "border-info/30 bg-info/15 text-info",
    },
    review: {
      label: "Review",
      icon: "eye",
      tone: "border-warning/30 bg-warning/15 text-warning",
    },
    done: {
      label: "Completed",
      icon: "ok",
      tone: "border-success/30 bg-success/15 text-success",
    },
  };

export function StatusPill({
  status,
  className,
}: {
  status: Status;
  className?: string;
}) {
  const { label, icon, tone } = config[status];
  return (
    <span
      className={cn(
        "inline-flex w-max items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium",
        tone,
        className,
      )}
    >
      <Icon name={icon} className="size-2.75" />
      {label}
    </span>
  );
}
