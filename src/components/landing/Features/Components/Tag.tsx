
import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
};

export function Tag({ children }: TagProps) {
  return (
    <span className="rounded-sm border border-border bg-secondary px-2 py-0.5 font-mono text-[11px] text-body">
      {children}
    </span>
  );
}
