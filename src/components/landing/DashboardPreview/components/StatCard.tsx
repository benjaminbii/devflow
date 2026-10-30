import { cardClass } from "../styles";
import type { Stat } from "../types";

interface StatCardProps {
  stat: Stat;
}
export function StatCard({ stat }: StatCardProps) {
  return (
    <div className={cardClass}>
      <small className="text-xs text-muted-foreground">{stat.label}</small>

      <b className="mt-0.5 block font-mono text-2xl font-medium text-foreground">
        {stat.value}
      </b>

      <span className="font-mono text-[11px] text-success">{stat.delta}</span>
    </div>
  );
}
