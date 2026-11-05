import { Container } from "@/components/ui/Container";
import { ProgressBar, type Tone } from "@/components/ui/ProgressBar";

interface StatsStripProps {
  value: string;
  label: string;
  progress: number;
  tone?: Tone;
}

const stats: StatsStripProps[] = [
  { value: "12+", label: "Projects managed", progress: 60, tone: "primary" },
  { value: "48+", label: "Tasks completed", progress: 80, tone: "cyan" },
  { value: "6", label: "Technologies tracked", progress: 45, tone: "primary" },
  { value: "87%", label: "Average progress", progress: 87, tone: "success" },
];
export function StatsStrip() {
  return (
    <section className="pb-18 md:pb-28">
      <Container>
        {/* gap-px over a border-colored background draws the dividers at every breakpoint */}
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="grid content-start gap-1 bg-card px-6 py-7"
            >
              <dd className="font-mono text-[40px] font-medium leading-none tracking-[-0.03em] text-foreground">
                {s.value}
              </dd>
              <dt className="text-sm">{s.label}</dt>
              <ProgressBar
                value={s.progress}
                tone={s.tone}
                label={s.label}
                className="mt-3.5"
              />
            </div>
          ))}
        </dl>
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          Demo data from the sample workspace.
        </p>
      </Container>
    </section>
  );
}
