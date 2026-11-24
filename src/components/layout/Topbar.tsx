import { Icon } from "@/components/ui/Icon";
import { useTheme } from "@/hooks/useTheme";
import { useRouteTitle } from "@/lib/routeHandle";
import { useToastStore } from "@/stores/toastStore";
import { useUiStore } from "@/stores/uiStore";
import { cn } from "@/lib/utils";
import { buttonStyles } from "../ui/buttonStyles";

const iconButton = buttonStyles({ variant: "ghost", className: "size-9 px-0" });

type TopbarProps = {
  /** Receives the clicked button so the drawer can return focus to it on close. */
  onOpenMenu: (trigger: HTMLElement) => void;
};

export function Topbar({ onOpenMenu }: TopbarProps) {
  const { theme, toggleTheme } = useTheme();
  const title = useRouteTitle();
  const showToast = useToastStore((s) => s.show);
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const toggleCollapsed = useUiStore((s) => s.toggleSidebarCollapsed);
  const drawerOpen = useUiStore((s) => s.mobileNavOpen);

  return (
    <header className="sticky top-0 z-20 flex h-[60px] items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-md min-[761px]:px-6">
      {/* Phones: opens the drawer. */}
      <button
        type="button"
        onClick={(e) => onOpenMenu(e.currentTarget)}
        aria-label="Open menu"
        aria-expanded={drawerOpen}
        aria-controls="mobile-sidebar"
        className={cn(iconButton, "min-[761px]:hidden")}
      >
        <Icon name="menu" />
      </button>

      {/* Wider screens: hides or shows the sidebar. */}
      <button
        type="button"
        onClick={toggleCollapsed}
        aria-label={collapsed ? "Show sidebar" : "Hide sidebar"}
        aria-expanded={!collapsed}
        aria-controls="sidebar"
        title="Toggle sidebar (Ctrl/⌘ + B)"
        className={cn(iconButton, "hidden min-[761px]:inline-flex")}
      >
        <Icon name="panel-left" />
      </button>

      {/* Orientation aid. aria-hidden because the page's own <h1> already names the
          page for assistive tech; announcing it twice is noise. `truncate` + min-w-0
          stop a long title from squeezing the actions off a narrow screen. */}
      <span
        aria-hidden="true"
        className="min-w-0 truncate text-[15px] font-semibold text-foreground"
      >
        {title}
      </span>

      {/* Search is a button, not a fake input: it will open the ⌘K command palette,
          so it should be announced as a button. Placeholder until that exists.
          On phones it shrinks to just the icon (text and shortcut hide). */}
      <button
        type="button"
        onClick={() => showToast("Search is coming soon")}
        aria-label="Search projects, tasks, notes"
        className="ml-auto flex h-9 w-[300px] max-w-full items-center gap-2 rounded-md border border-input bg-secondary px-3 text-left text-[13px] text-muted-foreground transition-colors hover:border-primary-hover max-[760px]:w-auto max-[760px]:px-2.5"
      >
        <Icon name="search" />
        <span className="truncate max-[760px]:hidden">
          Search projects, tasks, notes
        </span>
        <kbd className="ml-auto rounded-[4px] border border-input px-1.5 font-mono text-[11px] max-[760px]:hidden">
          ⌘K
        </kbd>
      </button>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          className={iconButton}
        >
          <Icon name={theme === "dark" ? "sun" : "moon"} />
        </button>
        {/* Placeholders for now; the toast stops them feeling broken when clicked. */}
        <button
          type="button"
          onClick={() => showToast("Notifications are coming soon")}
          aria-label="Notifications"
          className={iconButton}
        >
          <Icon name="bell" />
        </button>
        <button
          type="button"
          onClick={() => showToast("Quick create is coming soon")}
          className={buttonStyles({ variant: "primary", className: "ml-1" })}
        >
          <Icon name="plus" />
          New
        </button>
      </div>
    </header>
  );
}
