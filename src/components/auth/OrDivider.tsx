import type { ReactNode } from "react";

export function OrDivider({ children }: { children: ReactNode }) {
  // The rules are ::before/::after pseudo-elements so the divider stays one DOM
  // node of text, which is all a screen reader needs.
  return (
    <div className="my-[22px] flex items-center gap-3 text-[13px] text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
      {children}
    </div>
  );
}
