import type { Tone } from "@/components/ui/ProgressBar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusPill } from "@/components/ui/StatusPill";

type ProjectRowProps = {
  name: string;
  status: "progress" | "done";
  value: number;
  tone?: Tone;
};

export function ProjectRow({ name, status, value, tone }: ProjectRowProps) {
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
