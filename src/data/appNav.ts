import type { IconName } from "@/components/ui/Icon";

export type AppNavItem = { label: string; to: string; icon: IconName };
export type AppNavGroup = { title?: string; items: AppNavItem[] };

// Data, not JSX, so the desktop sidebar and the mobile drawer render the same
// list and can't get out of sync. Groups mirror the preview on the landing page.
export const appNav: AppNavGroup[] = [
    { items: [{ label: "Dashboard", to: "/dashboard", icon: "grid" }] },
    {
        title: "Workspace",
        items: [
            { label: "Projects", to: "/projects", icon: "folder" },
            { label: "Tasks", to: "/tasks", icon: "check" },
        ],
    },
    { title: "Learning", items: [{ label: "Learning", to: "/learning", icon: "book" }] },
    { title: "Knowledge", items: [{ label: "Notes", to: "/notes", icon: "note" }] },
    { title: "Insights", items: [{ label: "Analytics", to: "/analytics", icon: "chart" }] },
];

// Pinned to the bottom of the sidebar, away from the main workflow.
export const appNavFooter: AppNavGroup[] = [
    {
        items: [
            { label: "Profile", to: "/profile", icon: "user" },
            { label: "Settings", to: "/settings", icon: "settings" },
        ],
    },
];