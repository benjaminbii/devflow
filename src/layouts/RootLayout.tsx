import { ScrollManager } from "@/components/layout/ScrollManager";
import { Outlet } from "react-router";

export function RootLayout() {
  return (
    <>
      <ScrollManager />
      <Outlet />
    </>
  );
}