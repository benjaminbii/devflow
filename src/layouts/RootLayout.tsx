import { ScrollManager } from "@/components/layout/ScrollManager";
import { Toaster } from "@/components/ui/Toaster";
import { Outlet } from "react-router";

export function RootLayout() {
  return (
    <>
      <ScrollManager />
      <Outlet />
      <Toaster/>
    </>
  );
}