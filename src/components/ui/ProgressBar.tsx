import { cn } from "@/lib/utils";

export type Tone = "primary" | "cyan" | "success";
const fills: Record<Tone, string> = {
  primary: "bg-primary-hover",
  cyan: "bg-cyan",
  success: "bg-success",
};

interface ProgressBarProps {
  value: number;
  tone?: Tone;
  label?: string;
  className?: string;
}

export function ProgressBar({
  value,
  tone = "primary",
  label,
  className,
}: ProgressBarProps) {
    // Keep the progress value between 0 and 100.
    const safeValue = Math.min(100,Math.max(0,value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={safeValue}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-1.5 overflow-hidden rounded-[3px] bg-border", className)}
    >
      <div
        className={cn(
          "h-full origin-left animate-fill rounded-[3px] motion-reduce:animate-none",
          fills[tone],
        )}
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}
