import { Link, type LinkProps } from "react-router";
import { cn } from "@/lib/utils";

type LogoProps = Omit<LinkProps, "to"> & {
  to?: string;
  /** Mark only, decided in JS (e.g. a collapsed state). */
  compact?: boolean;
  /** Extra classes for the wordmark. Lets CSS hide it at a breakpoint
   *  (e.g. "max-[1100px]:sr-only") without needing a JS resize listener. */
  textClassName?: string;
};

export function Logo({
  className,
  to = "/",
  compact = false,
  textClassName,
  ...props
}: LogoProps) {
  return (
    <Link
      to={to}
      // The visible wordmark may be hidden, so the link needs its own accessible name.
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
      {/* sr-only rather than unmounted, so the DOM is identical in every state. */}
      <span className={cn(compact && "sr-only", textClassName)}>devflow</span>
    </Link>
  );
}
