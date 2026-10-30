import { StatusPill } from "@/components/ui/StatusPill";
import { cn } from "@/lib/utils";
import { board } from "../data";
import { cardClass } from "../styles";
import type { BoardColumn } from "../types";

type TaskBoardProps = {
  columns?: BoardColumn[];
};

export function TaskBoard({ columns = board }: TaskBoardProps) {
  return (
    <div className={cardClass}>
      <h4 className="mb-3 text-sm font-semibold text-foreground">
        Sprint board: Portfolio API
      </h4>

      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3">
        {columns.map((column) => (
          <div
            key={column.id}
            className={cn(
              "grid content-start gap-2",
              column.id === "done" && "hidden md:grid",
            )}
          >
            <b className="text-xs font-medium text-muted-foreground">
              {column.title}
            </b>

            {column.tasks.map((task) => (
              <div
                key={task.id ?? task.title}
                className="grid gap-2 rounded-md border border-border bg-card p-2.5 text-xs text-foreground"
              >
                {task.title}

                {task.id && (
                  <em className="font-mono text-[11px] not-italic text-muted-foreground">
                    {task.id}
                  </em>
                )}

                {task.status && <StatusPill status={task.status} />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
