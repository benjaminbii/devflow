
import { cn } from "@/lib/utils";

export type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "link";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover active:brightness-95",

  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80",

  outline:
    "border-input bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground",

  ghost:
    "text-foreground hover:bg-secondary hover:text-secondary-foreground",

  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90",

  link:
    "h-auto rounded-none border-0 p-0 text-primary underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  xs: "h-7 px-2 text-xs",
  sm: "h-8 px-3 text-sm",
  md: "h-9 px-3.5 text-sm",
  lg: "h-11 px-5 text-base",
  xl: "h-12 px-6 text-base",

};

type StyleOptions = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: StyleOptions = {}) {
  return cn(base, variants[variant], sizes[size], className);
}
