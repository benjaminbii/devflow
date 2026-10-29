
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  href = "/",
  ...props
}: ComponentProps<"a">) {
  return (
    <a
      href={href}
      aria-label="DevFlow home"
      className={cn(
        "inline-flex shrink-0 items-center gap-2.5",
        "font-mono text-lg font-semibold tracking-tight",
        "text-foreground no-underline",
        className,
      )}
      {...props}
    >
      <span
        className="flex shrink-0 flex-col gap-0.75"
        aria-hidden="true"
      >
        <span className="h-1.5 w-5 rounded-sm bg-primary" />
        <span className="h-1.5 w-3 rounded-sm bg-cyan" />
      </span>

      <span className="leading-none">devflow</span>
    </a>
  );
}
