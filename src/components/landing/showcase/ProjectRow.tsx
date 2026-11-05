import { ProgressBar, type Tone } from "@/components/ui/ProgressBar";
import { StatusPill, type Status } from "@/components/ui/StatusPill";

export default function ProjectRow({
  name,
  status,
  value,
  tone,
}: {
  name: string;
  status: Status;
  value: number;
  tone?: Tone;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 text-sm text-foreground">
      <span>{name}</span>
      <StatusPill status={status} />
      <ProgressBar value={value} tone={tone} label={`${name} progress`} className="col-span-2" />
    </div>
  );
}