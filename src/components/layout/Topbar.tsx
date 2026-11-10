import type { RefObject } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router";
import { Icon } from "@/components/ui/Icon";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { useTheme } from "@/hooks/useTheme";
import { useAuthStore } from "@/stores/authStore";
import { useUiStore } from "@/stores/uiStore";
import { cn } from "@/lib/utils";

interface TopbarProps {
  menuButtonRef: RefObject<HTMLButtonElement | null>;
}

export function Topbar({ menuButtonRef }: TopbarProps) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const setMobileNavOpen = useUiStore((s) => s.setMobileNavOpen);
  const toggleCollapsed = useUiStore((s) => s.toggleSidebarCollapsed);
  const collapsed = useUiStore((s) => s.sidebarCollapsed);

  const userInitial = user?.name?.trim().charAt(0) || "?";
  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-2 border-b border-border bg-background/80 px-5 backdrop-blur-md">
      {/* Mobile: opens the navigation drawer. */}
      <button
        ref={menuButtonRef}
        type="button"
        onClick={() => setMobileNavOpen(true)}
        aria-label="Open menu"
        className={cn(
          buttonStyles({ variant: "outline", className: "size-9 px-0" }),
          "lg:hidden",
        )}
      >
        <Icon name="menu" />
      </button>

      {/* Desktop: toggles the sidebar collapsed state. */}

      <button
        type="button"
        onClick={toggleCollapsed}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-pressed={collapsed}
        className={cn(
          buttonStyles({ variant: "ghost", className: "size-9 px-0" }),
          "hidden lg:inline-flex",
        )}
      >
        <Icon name="panel-left" />
      </button>

      <div className="ml-auto flex items-center gap-2">
        {/* Animated theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          className={buttonStyles({
            variant: "ghost",
            className: "size-9 px-0",
          })}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              className="inline-flex"
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} />
            </motion.span>
          </AnimatePresence>
        </button>

        {/* User information */}
        <span
          aria-hidden="true"
          className="grid size-8 place-items-center rounded-full bg-primary-soft font-mono text-xs font-medium uppercase text-primary-hover"
        >
          {userInitial}
        </span>
        <span className="hidden text-sm font-medium text-foreground sm:block">
          {user?.name}
        </span>

        {/* Logout */}

        <button
          type="button"
          onClick={handleLogout}
          aria-label="Log out"
          className={buttonStyles({
            variant: "ghost",
            className: "size-9 px-0",
          })}
        >
          <Icon name="log-out" />
        </button>
      </div>
    </header>
  );
}
