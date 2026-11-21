import type { ComponentProps, ReactNode } from "react";

type CheckboxProps = Omit<ComponentProps<"input">, "type" | "children"> & {
  children: ReactNode;
};

/**
 * Native checkbox on purpose: keyboard, focus and screen-reader behavior come
 * free. `accent-primary` themes it without rebuilding it from divs.
 * Wrapping label = the whole sentence is clickable.
 */
export function Checkbox({ children, ...props }: CheckboxProps) {
  return (
    <label className="mb-[18px] flex items-start gap-2.5 text-sm">
      <input
        type="checkbox"
        className="mt-0.5 size-[18px] shrink-0 accent-primary"
        {...props}
      />
      <span>{children}</span>
    </label>
  );
}
