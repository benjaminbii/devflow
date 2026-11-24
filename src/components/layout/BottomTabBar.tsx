// Shared by the four links and the "More" button so they look identical.

import { tabBarItems } from "@/data/appNav";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router";
import { Icon } from "../ui/Icon";

// min-h-12 (48px) meets the common minimum touch-target size
const tabClass =
  "grid min-h-12 cursor-pointer justify-items-center gap-0.5 rounded-md py-1.5 text-[11px] font-medium text-muted-foreground";

/**
 * Thumb-reach navigation for phones: the drawer is behind a top-corner button,
 * which is hard to hit one-handed, so the main destinations live at the bottom.
 */

export function BottomTabBar({
  onOpenMenu,
}: {
  onOpenMenu: (trigger: HTMLElement) => void;
}) {
  return (
    <nav
      aria-label="Quick navigation"
      // env(safe-area-inset-bottom) keeps the bar clear of the iPhone home indicator
      // (needs viewport-fit=cover, already set in index.html).
      className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-border bg-card px-1.5 pt-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))] min-[761px]:hidden"
    >
      {tabBarItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            cn(tabClass, isActive && "text-primary-hover")
          }
        >
          <Icon name={item.icon} />
          {item.label}
        </NavLink>
      ))}

      {/* A button, not a link: it opens the drawer rather than navigating. */}
      <button
        type="button"
        onClick={(e) => onOpenMenu(e.currentTarget)}
        aria-haspopup="dialog"
        className={tabClass}
      >
        <Icon name="menu" />
        more
      </button>
    </nav>
  );
}
