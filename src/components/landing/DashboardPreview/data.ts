import type { BoardColumn, LearningItem, SideGroup, Stat } from "./types";

export const sidebar: SideGroup[] = [
    {
        id: "dashboard",
        items: [
            { label: "Dashboard", icon: "grid", active: true },
        ],
    },
    {
        id: "workspace",
        title: "Workspace",
        items: [
            { label: "Projects", icon: "folder" },
            { label: "Tasks", icon: "check" },
        ],
    },
    {
        id: "learning",
        title: "Learning",
        items: [
            { label: "Progress", icon: "book" },
        ],
    },
    {
        id: "knowledge",
        title: "Knowledge",
        items: [
            { label: "Notes", icon: "note" },
        ],
    },
    {
        id: "insights",
        title: "Insights",
        items: [
            { label: "Analytics", icon: "chart" },
        ],
    },
];

export const stats: Stat[] = [
    {
        label: "Active projects",
        value: "6",
        delta: "+2 this month",
    },
    {
        label: "Tasks done",
        value: "48",
        delta: "+9 this week",
    },
    {
        label: "Study streak",
        value: "12d",
        delta: "Best: 21d",
    },
    {
        label: "Avg progress",
        value: "87%",
        delta: "+4%",
    },
];
export const board: BoardColumn[] = [
    {
        id: "todo",
        title: "Todo",
        tasks: [
            { title: "Add rate limiting", id: "#PRJ-14" },
            { title: "Write OpenAPI docs", id: "#PRJ-15" },
        ],
    },
    {
        id: "in-progress",
        title: "In progress",
        tasks: [
            {
                title: "JWT refresh flow",
                status: "progress",
            },
        ],
    },
    {
        id: "done",
        title: "Done",
        tasks: [
            {
                title: "Postgres schema",
                status: "done",
            },
        ],
    },
];

export const learning: LearningItem[] = [
    { name: "React", value: 72, tone: "primary" },
    { name: "TypeScript", value: 45, tone: "cyan" },
    { name: "Node.js", value: 60, tone: "success" },
];