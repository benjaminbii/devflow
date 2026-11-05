import { ProgressBar, type Tone } from "@/components/ui/ProgressBar";

export default function TopicRow({
  name,
  done,
  total,
  tone,
}: {
  name: string;
  done: number;
  total: number;
  tone?: Tone;
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
