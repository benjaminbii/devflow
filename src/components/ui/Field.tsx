import { useId, useState, type ComponentProps, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type FieldProps = Omit<ComponentProps<"input">, "id"> & {
  label: string;
  error?: string;
  /** Green border: the value passed validation. */
  valid?: boolean;
  /** Right-aligned slot on the label row, e.g. "Forgot password?". */
  labelAction?: ReactNode;
  /** Extra element ids (e.g. a rules list) to include in aria-describedby. */
  describedBy?: string;
  /** Rendered under the error message, e.g. the password strength meter. */
  children?: ReactNode;
};

export function Field({
  label,
  error,
  valid,
  labelAction,
  describedBy,
  children,
  type,
  ...props
}: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const isPassword = type === "password";
  const [reveal, setReveal] = useState(false);

  const describedByIds = [error ? errorId : undefined, describedBy]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="mb-[18px] grid gap-1.5">
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        {labelAction}
      </div>

      {/*
        The WRAPPER draws the border and focus ring (via focus-within), because the
        input shares the box with the show/hide button. `outline-hidden` on the input
        removes the default outline but keeps one in forced-colors mode, so keyboard
        focus stays visible there too.
      */}
      <div
        className={cn(
          "flex h-11 items-center rounded-md border border-input bg-secondary transition-[border-color,box-shadow]",
          "focus-within:border-primary-hover focus-within:ring-3 focus-within:ring-primary-soft",
          valid && "border-success",
          // Listed last so twMerge lets the error colors beat the focus colors above.
          error &&
            "border-destructive focus-within:border-destructive focus-within:ring-destructive/25",
        )}
      >
        <input
          id={id}
          type={isPassword && reveal ? "text" : type}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedByIds || undefined}
          className="h-full min-w-0 flex-1 bg-transparent px-3.5 text-[15px] text-foreground outline-hidden placeholder:text-muted-foreground"
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setReveal((r) => !r)}
            aria-label={reveal ? "Hide password" : "Show password"}
            aria-pressed={reveal}
            className="grid h-full w-[42px] cursor-pointer place-items-center rounded-r-md text-muted-foreground hover:text-foreground"
          >
            <Icon name={reveal ? "eye-off" : "eye"} />
          </button>
        )}
      </div>

      {/* Mounted only when there is an error, so role="alert" announces it each time it appears. */}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="flex items-center gap-1.5 text-[13px] text-destructive"
        >
          <Icon name="alert" className="size-[15px]" />
          {error}
        </p>
      )}

      {children}
    </div>
  );
}
