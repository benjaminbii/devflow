import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  href = "#",
  ...props
}: ComponentProps<"a">) {
  return (
    <a
      href={href}
      aria-label="DevFlow home"
      className={cn(
        "flex items-center gap-2.5 font-mono text-lg font-semibold tracking-[-0.02em] text-foreground",
        className,
      )}
      {...props}
    >
      <span className="grid gap-[3px]" aria-hidden="true">
        <b className="block h-1.5 w-5 rounded-[3px] bg-primary" />
        <b className="block h-1.5 w-3 rounded-[3px] bg-cyan" />
      </span>
      devflow
    </a>
  );
}