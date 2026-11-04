import { ProgressBar } from "@/components/ui/ProgressBar";
import TaskRow from "@/components/landing/showcase/TaskRow";
import ProjectRow from "@/components/landing/showcase/ProjectRow";

export type ShowcaseTab = {
  id: string;
  label: string;
  title: string;
  description: string;
  bullets: string[];
  preview: React.ReactNode;
};




function TopicRow({
  name,
  done,
  total,
  tone,
}: {
  name: string;
  done: number;
  total: number;
  tone?: "primary" | "cyan" | "success";
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 text-sm text-foreground">
      <span>{name}</span>
      <span className="font-mono text-xs text-muted-foreground">
        {done} of {total} topics
      </span>
      <ProgressBar
        value={Math.round((done / total) * 100)}
        tone={tone}
        label={`${name} progress`}
        className="col-span-2"
      />
    </div>
  );
}

export const showcaseTabs: ShowcaseTab[] = [
  {
    id: "projects",
    label: "Projects",
    title: "Know where every project stands",
    description: "Each project shows status, stack and progress, and updates as you complete tasks.",
    bullets: ["Progress rolls up from tasks", "Grid or list view", "Filter by status or technology"],
    preview: (
      <>
        <ProjectRow name="Portfolio API" status="progress" value={68} />
        <ProjectRow name="Habit tracker app" status="done" value={100} tone="success" />
        <ProjectRow name="CLI toolkit" status="review" value={84} tone="cyan" />
      </>
    ),
  },
  {
    id: "tasks",
    label: "Tasks",
    title: "Move work across the board",
    description: "Drag tasks from backlog to done and keep priority, project and deadline visible.",
    bullets: ["Kanban board and list views", "Priority, project and due date on every task", "Drag between columns"],
    preview: (
      <>
        <TaskRow name="Add rate limiting" status="todo" />
        <TaskRow name="JWT refresh flow" status="progress" />
        <TaskRow name="Review auth PR" status="review" />
        <TaskRow name="Postgres schema" status="done" />
      </>
    ),
  },
  {
    id: "learning",
    label: "Learning",
    title: "Make study time visible",
    description: "Track topics, levels and streaks for each technology you are learning.",
    bullets: ["Topic checklists per technology", "Daily study streaks", "Progress counts toward your analytics"],
    preview: (
      <>
        <TopicRow name="React" done={18} total={25} />
        <TopicRow name="TypeScript" done={9} total={20} tone="cyan" />
        <TopicRow name="Node.js" done={12} total={20} tone="success" />
      </>
    ),
  },
];