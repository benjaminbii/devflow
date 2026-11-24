import { useCallback, useRef, type ReactNode } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { BottomTabBar } from "@/components/layout/BottomTabBar";
import { Topbar } from "@/components/layout/Topbar";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useSidebarShortcut } from "@/hooks/useSidebarShortcut";
import { useRouteTitle } from "@/lib/routeHandle";
import { useUiStore } from "@/stores/uiStore";

type DashboardLayoutProps = {
  /** The page to show in the content area. ReactNode accepts anything renderable
   *  (elements, strings, fragments), not only a single element. */
  children: ReactNode;
};

/**
 * Shell for every logged-in page. It knows nothing about routing: it wraps whatever
 * `children` it is given. The router decides what goes in (see router.tsx), which
 * keeps the layout reusable and testable on its own.
 */
export function DashboardLayout({ children }: DashboardLayoutProps) {
  const setMobileNavOpen = useUiStore((s) => s.setMobileNavOpen);

  // Two buttons can open the drawer (the top bar's menu and the tab bar's "More"),
  // so a single fixed ref wouldn't do. Each reports itself here, and the drawer
  // returns focus to whichever one was used.
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const openMenu = useCallback(
    (trigger: HTMLElement) => {
      returnFocusRef.current = trigger;
      setMobileNavOpen(true);
    },
    [setMobileNavOpen],
  );

  useSidebarShortcut();

  // Every authenticated page gets a meaningful browser-tab title for free.
  const title = useRouteTitle();
  useDocumentTitle(title ? `${title} · DevFlow` : "DevFlow");

  return (
    <div className="flex min-h-dvh">
      {/* Without this, keyboard users would Tab through every sidebar link on every
          page. Invisible until focused, then jumps straight to the content. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to main content
      </a>

      <AppSidebar returnFocusRef={returnFocusRef} />

      {/* min-w-0: flex children default to min-width:auto, which lets wide content
          (tables, code blocks) stretch the column instead of scrolling inside it. */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onOpenMenu={openMenu} />

        {/* tabIndex=-1 lets the skip link move focus here without adding <main> to
            the Tab order; outline-none because it is only ever focused by script.
            Bottom padding on phones leaves room for the fixed tab bar (96px + the
            safe area) so the last content is never hidden behind it. */}
        <main
          id="main"
          tabIndex={-1}
          className="mx-auto w-full max-w-[1280px] flex-1 px-4 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] pt-5 outline-none min-[761px]:px-6 min-[761px]:pb-12 min-[761px]:pt-7"
        >
          {children}
        </main>
      </div>

      <BottomTabBar onOpenMenu={openMenu} />
    </div>
  );
}