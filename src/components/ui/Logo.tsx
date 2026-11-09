import { Link, type LinkProps } from "react-router";
import { cn } from "@/lib/utils";

type LogoProps = Omit<LinkProps, "to"> & {
  to?: string;
  /** Mark only. Used by the collapsed sidebar, where the wordmark won't fit. */
  compact?: boolean;
};

export function Logo({ className, to = "/", compact = false, ...props }: LogoProps) {
  return (
    <Link
      to={to}
      // aria-label keeps the link named even when the visible wordmark is hidden.
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
      {/* sr-only (not unmounted) so the DOM structure is identical in both states */}
      <span className={cn(compact && "sr-only")}>devflow</span>
    </Link>
  );
}