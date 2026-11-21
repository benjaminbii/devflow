// Kept as data so marketing copy can change without touching the layout, and so
// the brand panel and the pages can't disagree about which variant is which.

export const authCopy = {
    register: {
        heading: "Start tracking what you build",
        text: "One workspace for projects, tasks and learning, so you can see how far you have come.",
    },
    login: {
        heading: "Pick up where you left off",
        text: "Your projects, tasks and learning streak are right where you left them.",
    },
} as const;

export const authPoints = [
    "Kanban boards for every project",
    "Learning roadmaps with progress per topic",
    "Notes and analytics in the same workspace",
];