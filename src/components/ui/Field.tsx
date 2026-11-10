import { useId, useState, type ComponentProps } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type FieldProps = Omit<ComponentProps<"input">, "id"> & {
  label: string;
  error?: string;
  hint?: string;
};

export function Field({ label, error, hint, className, type, ...props }: FieldProps) {
  const id = useId();
  const descId = `${id}-desc`;
  const isPassword = type === "password";
  const [show, setShow] = useState(false);

  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={isPassword && show ? "text" : type}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? descId : undefined}
          className={cn(
            "h-11 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground",
            isPassword && "pr-11",
            error && "border-destructive",
            className,
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            aria-pressed={show}
            className="absolute inset-y-0 right-0 grid w-11 cursor-pointer place-items-center rounded-md text-muted-foreground hover:text-foreground"
          >
            <Icon name={show ? "eye-off" : "eye"} />
          </button>
        )}
      </div>

      {error ? (
        <p id={descId} role="alert" className="text-[13px] text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={descId} className="text-[13px] text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}