import { Icon } from "@/components/ui/Icon";
import { stats } from "./data";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { LearningProgress } from "./components/LearningProgress";
import { StatCard } from "./components/StatCard";
import { TaskBoard } from "./components/TaskBoard";

export function DashboardPreview() {
  return (
    <div aria-hidden="true" className="relative mt-16">
      {/* Glow effect */}
      <div className="absolute inset-x-[10%] top-0 h-3/5 bg-primary opacity-[0.18] blur-[90px]" />

      {/* Dashboard window */}
      <div className="fade-bottom relative overflow-hidden rounded-t-xl border border-b-0 border-input bg-card text-left shadow-[0_24px_64px_-16px_rgba(0,0,0,0.6)]">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
          <i className="size-2.5 rounded-full bg-input" />
          <i className="size-2.5 rounded-full bg-input" />
          <i className="size-2.5 rounded-full bg-input" />

          <span className="mx-auto rounded-full bg-secondary px-10 py-[3px] font-mono text-[11px] text-muted-foreground">
            app.devflow.dev/dashboard
          </span>
        </div>

        {/* Dashboard layout */}
        <div className="grid min-h-[520px] md:grid-cols-[190px_1fr]">
          {/* Sidebar */}
          <DashboardSidebar />

          {/* Main content */}
          <div className="grid min-w-0 content-start gap-4 p-[22px]">
            {/* Welcome header */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold tracking-[-0.01em] text-foreground">
                  Good morning, Amara
                </h3>

                <p className="text-[13px] text-muted-foreground">
                  3 tasks due this week. You are on a 12-day streak.
                </p>
              </div>

              {/* Search preview */}
              <div className="hidden items-center gap-2 rounded-md border border-input bg-secondary px-2.5 py-1.5 text-xs text-muted-foreground md:flex">
                <Icon name="search" />
                Search
                <kbd className="rounded-[4px] border border-input px-1.5 font-mono text-[11px]">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {stats.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </div>

            {/* Dashboard sections */}
            <div className="grid gap-3 md:grid-cols-[1.5fr_1fr]">
              <TaskBoard />
              <LearningProgress />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
