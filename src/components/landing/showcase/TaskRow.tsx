import { StatusPill, type Status } from "@/components/ui/StatusPill";


export default function TaskRow({ name, status }: { name: string; status: Status }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm text-foreground">
      <span>{name}</span>
      <StatusPill status={status} />
    </div>
  );
}