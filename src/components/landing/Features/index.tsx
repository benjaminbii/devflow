
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusPill } from "@/components/ui/StatusPill";

import { FeatureCard } from "./components/FeatureCard";
import { Tag } from "./components/Tag";
import { ProjectRow } from "./components/ProjectRow";
import { ActivityRow } from "./components/ActivityRow";

export function Features() {
  return (
    <section id="features" className="py-18 md:py-28">
      <Container>
        <SectionHeading
          title="Everything a developer juggles, in one place"
          description="Projects, tasks, study logs and notes share one data model, so progress in one place shows up everywhere."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
          {/* Projects */}
          <FeatureCard
            icon="folder"
            title="Projects"
            description="Track every build with status, stack and progress."
            className="md:col-span-3 lg:col-span-4"
          >
            <ProjectRow
              name="Portfolio API"
              status="progress"
              value={68}
            />

            <ProjectRow
              name="Habit tracker app"
              status="done"
              value={100}
              tone="success"
            />
          </FeatureCard>

          {/* Tasks and Kanban */}
          <FeatureCard
            icon="check"
            title="Tasks and Kanban"
            description="Move work from backlog to done."
            className="md:col-span-3 lg:col-span-2"
          >
            <div className="flex flex-wrap gap-2">
              <StatusPill status="todo" />
              <StatusPill status="review" />
              <StatusPill status="done" />
            </div>
          </FeatureCard>

          {/* Learning */}
          <FeatureCard
            icon="book"
            title="Learning tracking"
            description="Topics, levels and streaks per technology."
            className="md:col-span-3 lg:col-span-2"
          >
            <div className="flex flex-wrap gap-1.5">
              {["React", "TypeScript", "Tailwind", "Redux"].map((technology) => (
                <Tag key={technology}>{technology}</Tag>
              ))}
            </div>
          </FeatureCard>

          {/* Notes */}
          <FeatureCard
            icon="note"
            title="Notes"
            description="Keep snippets, decisions and docs next to the work."
            className="md:col-span-3 lg:col-span-4"
          >
            <pre className="overflow-x-auto rounded-md border border-border bg-secondary p-3 font-mono text-xs leading-[1.7] text-body">
              <code>
                <span className="text-muted-foreground">
                  {"// useDebounce: delay updates until typing stops"}
                </span>
                {"\n"}
                <span className="text-cyan">const</span> debounced ={" "}
                <span className="text-cyan">useDebounce</span>(query, 300);
              </code>
            </pre>

            <div className="flex flex-wrap gap-1.5">
              {["react", "hooks", "pinned"].map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </FeatureCard>

          {/* Analytics */}
          <FeatureCard
            icon="chart"
            title="Analytics"
            description="See what you finish and where time goes."
            className="md:col-span-3"
          >
            <svg
              viewBox="0 0 300 56"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="h-14 w-full"
            >
              <polyline
                points="0,46 40,40 80,44 120,28 160,32 200,18 240,22 300,6"
                fill="none"
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
                className="stroke-cyan"
              />
            </svg>
          </FeatureCard>

          {/* Developer dashboard */}
          <FeatureCard
            icon="grid"
            title="Developer dashboard"
            description="Recent activity and priorities in one view."
            className="md:col-span-3"
          >
            <ActivityRow
              text="Closed JWT refresh flow"
              when="2h ago"
            />

            <ActivityRow
              text="Finished Hooks topic"
              when="Yesterday"
            />
          </FeatureCard>
        </div>
      </Container>
    </section>
  );
}
