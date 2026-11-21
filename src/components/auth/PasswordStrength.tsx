import { cn } from "@/lib/utils";
import { PASSWORD_RULES, passwordStrength } from "@/lib/validation";
import { Icon } from "../ui/Icon";

// Full class names (not built from strings) so Tailwind's scanner can see them.
const Tone_BG = {
  destructive: "bg-destructive",
  warning: "bg-warning",
  info: "bg-info",
  success: "bg-success",
} as const;

/** `id` is exported to the Field's aria-describedby so the rules are read with the input. */

export function PasswordStrength({ value, id }: { value: string; id: string }) {
  const { level, label, tone } = passwordStrength(value);
  return (
    <div className="mt-1 grid gap-2">
      {/* Decorative: the text label below carries the same information. */}
      <div className="grid grid-cols-4 gap-1" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <i
            key={i}
            className={cn(
              "h-1 rounded-[2px] transition-colors duration-200 motion-reduce:transition-none",
              i < level ? Tone_BG[tone] : "bg-input",
            )}
          />
        ))}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Password strength</span>
        {/* aria-live so strength changes are announced as the user types. */}
        <b aria-live="polite" className="font-medium text-foreground">
          {label}
        </b>
      </div>
      <ul id={id} className="grid gap-1 text-[13px] text-muted-foreground">
        {PASSWORD_RULES.map((rule) => {
          const passed = rule.test(value);
          return (
            <li
              key={rule.id}
              className={cn("flex items-center gap-2", passed && "text-body")}
            >
              <Icon
                name={passed ? "ok" : "circle"}
                className={cn(
                  "size-3.5",
                  passed ? "text-success" : "opacity-50",
                )}
              />
              {rule.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
