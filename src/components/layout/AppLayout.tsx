
import { useRef } from "react";
import { Outlet } from "react-router";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Topbar } from "@/components/layout/Topbar";

/**
 * Shared shell for authenticated pages.
 * The sidebar and topbar stay mounted while the Outlet renders
 * the currently selected child route.
 */
export function AppLayout() {
  // Shared ref allows the mobile drawer to restore focus
  // to the menu button when it closes.
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex min-h-dvh">
      <AppSidebar menuButtonRef={menuButtonRef} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar menuButtonRef={menuButtonRef} />

        <main className="min-w-0 flex-1 p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
