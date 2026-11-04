import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusPill, type Status } from "@/components/ui/StatusPill";

export type ShowcaseTab = {
  id: string;
  label: string;
  title: string;
  description: string;
  bullets: string[];
  preview: React.ReactNode;
};

function ProjectRow({
  name,
  status,
  value,
  tone,
}: {
  name: string;
  status: Status;
  value: number;
  tone?: "primary" | "cyan" | "success";
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 text-sm text-foreground">
      <span>{name}</span>
      <StatusPill status={status} />
      <ProgressBar
        value={value}
        tone={tone}
        label={`${name} progress`}
        className="col-span-2"
      />
    </div>
  );
}

function TaskRow({ name, status }: { name: string; status: Status }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm text-foreground">
      <span>{name}</span>
      <StatusPill status={status} />
    </div>
  );
}

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