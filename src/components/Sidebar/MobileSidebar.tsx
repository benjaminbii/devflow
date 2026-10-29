import { useEffect, useRef, type RefObject } from "react";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { navLinks } from "@/components/Navbar/nav";
import type { Theme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

type MobileSidebarProps = {
  open: boolean;
  /** Must be referentially stable (wrap in useCallback). */
  onClose: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  /** Focus returns here when the sidebar closes. */
  returnFocusRef: RefObject<HTMLElement | null>;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileSidebar({
  open,
  onClose,
  theme,
  onToggleTheme,
  returnFocusRef,
}: MobileSidebarProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const trigger = returnFocusRef.current;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      // Keep Tab / Shift+Tab inside the sidebar while it is open.
      const items = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!items || items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    // If the viewport grows to desktop width, the sidebar is no longer needed.
    const desktop = window.matchMedia("(min-width: 768px)");
    function onBreakpointChange(e: MediaQueryListEvent) {
      if (e.matches) onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpointChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpointChange);
      trigger?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  return (
    <div
      className={cn("fixed inset-0 z-50 md:hidden", !open && "pointer-events-none")}
      inert={!open}
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 motion-reduce:transition-none",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className={cn(
          "absolute inset-y-0 right-0 flex w-[min(320px,85vw)] flex-col border-l border-border bg-card shadow-2xl transition-transform duration-200 ease-out motion-reduce:transition-none",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
          <Logo onClick={onClose} />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className={buttonStyles({ variant: "ghost", className: "size-9 px-0" })}
          >
            <Icon name="x" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-3">
          <ul className="grid gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center rounded-md px-3 py-3 text-[15px] font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid shrink-0 gap-3 border-t border-border p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <a
            href="#"
            onClick={onClose}
            className={buttonStyles({ variant: "outline", size: "lg", className: "w-full" })}
          >
            Log in
          </a>
          <a
            href="#"
            onClick={onClose}
            className={buttonStyles({ variant: "primary", size: "lg", className: "w-full" })}
          >
            Get started
          </a>
          <button
            type="button"
            onClick={onToggleTheme}
            className={buttonStyles({
              variant: "ghost",
              className: "w-full justify-between px-3",
            })}
          >
            <span>Appearance</span>
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <Icon name={theme === "dark" ? "moon" : "sun"} />
              {theme === "dark" ? "Dark" : "Light"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}