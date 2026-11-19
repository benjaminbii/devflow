import type { ReactNode } from "react";
import { Icon } from "../ui/Icon";

/** Form-level error, for failures that don't belong to a single field (e.g. wrong credentials). */
export function AuthBanner({ children }: { children: ReactNode }) {
  return (
    <div>
      <Icon name="alert" className="mt-0.5 text-destructive" />
      <span>{children}</span>
    </div>
  );
}
