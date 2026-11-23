import type { IconName } from "@/components/ui/Icon";

export type AppNavItem = { label: string; to: string; icon: IconName };
export type AppNavGroup = { title?: string; items: AppNavItem[] };

// Mirrors the groups in the Dashboard design. Kept as data so the desktop sidebar
// and the mobile drawer render one list and can't drift apart.
export const appNav: AppNavGroup[] = [
  { items: [{ label: "Dashboard", to: "/dashboard", icon: "grid" }] },
  {
    title: "Workspace",
    items: [
      { label: "Projects", to: "/projects", icon: "folder" },
      { label: "Tasks", to: "/tasks", icon: "check" },
    ],
  },
  {
    title: "Learning",
    items: [{ label: "Learning progress", to: "/learning", icon: "book" }],
  },
  {
    title: "Knowledge",
    items: [{ label: "Notes", to: "/notes", icon: "note" }],
  },
  {
    title: "Insights",
    items: [{ label: "Analytics", to: "/analytics", icon: "chart" }],
  },
  {
    title: "Account",
    items: [
      { label: "Profile", to: "/profile", icon: "user" },
      { label: "Settings", to: "/settings", icon: "settings" },
    ],
  },
];

// The phone's bottom tab bar only fits four destinations plus "More", so it shows
// the most-used ones. Everything else is reachable through "More" (the drawer).
export const tabBarItems: AppNavItem[] = [
  { label: "Home", to: "/dashboard", icon: "grid" },
  { label: "Projects", to: "/projects", icon: "folder" },
  { label: "Tasks", to: "/tasks", icon: "check" },
  { label: "Learn", to: "/learning", icon: "book" },
];
