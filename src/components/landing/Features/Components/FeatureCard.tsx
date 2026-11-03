import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  icon: IconName;
  title: string;
  description: string;
  className?: string;
  children: ReactNode;
};

export function FeatureCard({
  icon,
  title,
  description,
  className,
  children,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-lg border border-border bg-card p-6 transition-colors hover:border-input",
        className,
      )}
    >
      <span className="grid size-9 place-items-center rounded-md bg-primary-soft text-primary-hover">
        <Icon name={icon} />
      </span>

      <div>
        <h3 className="mb-1 text-[17px] font-semibold text-foreground">
          {title}
        </h3>
        <p className="text-sm">{description}</p>
      </div>

      <div className="mt-auto grid gap-2.5 pt-1">{children}</div>
    </div>
  );
}
