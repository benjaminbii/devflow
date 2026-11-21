import { useRef, type RefObject } from "react";
import { NavLink } from "react-router";
import { AnimatePresence, motion } from "motion/react";

import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { appNav, appNavFooter, type AppNavGroup } from "@/data/appNav";
import { useModalBehavior } from "@/hooks/useModalBehavior";
import { useUiStore } from "@/stores/uiStore";
import { cn } from "@/lib/utils";

type NavListProps = {
  groups: AppNavGroup[];
  label: string;
  collapsed: boolean;
  onNavigate?: () => void;
  className?: string;
};

/** Rendered by both the desktop sidebar and the mobile drawer. */
function NavList({
  groups,
  label,
  collapsed,
  onNavigate,
  className,
}: NavListProps) {
  return (
    <nav aria-label={label} className={cn("grid gap-3 p-3", className)}>
      {groups.map((group, i) => (
        <div key={i} className="grid gap-0.5">
          {group.title && !collapsed && (
            <p className="mx-2.5 mb-1 mt-2 text-[11px] font-medium text-muted-foreground">
              {group.title}
            </p>
          )}

          {group.items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-body transition-colors hover:bg-secondary hover:text-foreground",
                  collapsed && "justify-center",
                  isActive && "bg-primary-soft font-medium text-foreground",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    name={item.icon}
                    className={cn(isActive && "text-primary-hover")}
                  />

                  <span className={cn(collapsed && "sr-only")}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      ))}
    </nav>
  );
}

type AppSidebarProps = {
  /** The topbar's menu button, so focus returns to it when the drawer closes. */
  menuButtonRef: RefObject<HTMLButtonElement | null>;
};

export function AppSidebar({ menuButtonRef }: AppSidebarProps) {
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const open = useUiStore((s) => s.mobileNavOpen);

  const setOpen = useUiStore((s) => s.setMobileNavOpen);

  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = () => setOpen(false);

  useModalBehavior({
    open,
    onClose: () => setOpen(false),
    panelRef,
    initialFocusRef: closeButtonRef,
    returnFocusRef: menuButtonRef,
    closeAtMinWidth: 1024,
  });

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "sticky top-0 hidden h-dvh shrink-0 flex-col border-r border-border bg-card transition-[width] duration-200 motion-reduce:transition-none lg:flex",
          collapsed ? "w-17" : "w-60",
        )}
      >
        <div
          className={cn(
            "flex h-16 shrink-0 items-center border-b border-border px-5",
            collapsed && "justify-center px-0",
          )}
        >
          <Logo compact={collapsed} />
        </div>

        <NavList
          groups={appNav}
          label="App"
          collapsed={collapsed}
          className="flex-1 overflow-y-auto"
        />

        <NavList
          groups={appNavFooter}
          label="Account"
          collapsed={collapsed}
          className="border-t border-border"
        />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              aria-hidden="true"
              onClick={close}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* Drawer */}
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="App menu"
              className="absolute inset-y-0 left-0 flex w-[min(280px,85vw)] flex-col border-r border-border bg-card shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
            >
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
                <Logo onClick={close} />

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  className={buttonStyles({
                    variant: "ghost",
                    className: "size-9 px-0",
                  })}
                >
                  <Icon name="x" />
                </button>
              </div>

              <NavList
                groups={appNav}
                label="App"
                collapsed={false}
                onNavigate={close}
                className="flex-1 overflow-y-auto"
              />

              <NavList
                groups={appNavFooter}
                label="Account"
                collapsed={false}
                onNavigate={close}
                className="border-t border-border pb-[max(0.75rem,env(safe-area-inset-bottom))]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
