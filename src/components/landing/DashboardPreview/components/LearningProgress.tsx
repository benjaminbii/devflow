import { ProgressBar } from "@/components/ui/ProgressBar";
import { learning } from "../data";
import { cardClass } from "../styles";
import type { LearningItem } from "../types";

type LearningProgressProps = {
  items?: LearningItem[];
};

export function LearningProgress({ items = learning }: LearningProgressProps) {
  return (
    <div className={cardClass}>
      <h4 className="mb-3 text-sm font-semibold text-foreground">Learning</h4>

      {items.map((item) => (
        <div
          key={item.name}
          className="mb-3 grid gap-1.5 text-[13px] last:mb-0"
        >
          <div className="flex justify-between text-foreground">
            {item.name}

            <span className="font-mono text-xs text-muted-foreground">
              {item.value}%
            </span>
          </div>

          <ProgressBar
            value={item.value}
            tone={item.tone}
            label={`${item.name} progress`}
          />
        </div>
      ))}
    </div>
  );
}
