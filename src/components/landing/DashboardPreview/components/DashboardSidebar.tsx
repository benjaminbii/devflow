import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { sidebar } from "../data";
import type { SideGroup } from "../types";

type DashboardSidebarProps = {
  groups?: SideGroup[];
};

export function DashboardSidebar({ groups = sidebar }: DashboardSidebarProps) {
  return (
    <aside className="hidden flex-col gap-0.5 border-r border-border p-3 text-[13px] md:flex">
      {groups.map((group) => (
        <div key={group.id} className="grid gap-0.5">
          {group.title && (
            <p className="mx-2.5 mb-1 mt-3.5 text-[11px] font-medium text-muted-foreground">
              {group.title}
            </p>
          )}

          {group.items.map((item) => (
            <div
              key={item.label}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2.5 py-1.75 text-body",
                item.active && "bg-primary-soft font-medium text-foreground",
              )}
            >
              <Icon
                name={item.icon}
                className={cn(item.active && "text-primary-hover")}
              />

              {item.label}
            </div>
          ))}
        </div>
      ))}
    </aside>
  );
}
