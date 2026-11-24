import { useEffect } from "react";
import { useUiStore } from "@/stores/uiStore";

/** Ctrl/⌘ + B toggles the sidebar, matching the shortcut shown in the design. */
export function useSidebarShortcut() {
  const toggle = useUiStore((s) => s.toggleSidebarCollapsed);

  useEffect(() => {
    // The toggle button only exists on wide screens (phones use the drawer), so the
    // shortcut must not silently change state on a screen where it has no effect.
    const wide = window.matchMedia("(min-width: 761px)");

    function onKeyDown(e: KeyboardEvent) {
      if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== "b") return;
      if (!wide.matches) return;

      // Ctrl/⌘+B is "bold" in text editors. Leave it alone while the user is typing,
      // otherwise the future Notes editor couldn't use bold.
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']"))
        return;

      e.preventDefault(); // stop the browser's own Ctrl+B (bookmarks sidebar in some browsers)
      toggle();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [toggle]);
}
