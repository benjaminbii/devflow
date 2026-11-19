import type { ReactNode } from "react";
import { Icon } from "../ui/Icon";

/** Form-level error, for failures that don't belong to a single field (e.g. wrong credentials). */
export function AuthBanner({ children }: { children: ReactNode }) {
  return (
    <div
      role="alert"
      className="mb-[18px] flex items-start gap-2.5 rounded-md border border-destructive/35 bg-destructive/10 px-3.5 py-3 text-sm text-foreground"
    >
      <Icon name="alert" className="mt-0.5 text-destructive" />
      <span>{children}</span>
    </div>
  );
}
