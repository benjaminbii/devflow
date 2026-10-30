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
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-1.5 overflow-hidden rounded-0.75 bg-border", className)}
    >
      <div
        className={cn(
          "h-full origin-left animate-fill rounded-0.75 motion-reduce:animate-none",
          fills[tone],
        )}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
