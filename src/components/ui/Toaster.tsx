import { cn } from "@/lib/utils";
import { useToastStore } from "@/stores/toastStore";

/**
 * Mounted once at the app root. The live region must exist BEFORE its text
 * changes, otherwise screen readers don't announce the update, so it is always
 * rendered and only hidden visually.
 */

export function Toaster() {
  const { message, visible } = useToastStore();

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-[10px] border border-input bg-secondary px-4 py-2.5 text-sm text-foreground shadow-[0_24px_64px_-16px_rgba(0,0,0,0.6)] transition duration-200 motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
      )}
    >
      {message}
    </div>
  );
}
