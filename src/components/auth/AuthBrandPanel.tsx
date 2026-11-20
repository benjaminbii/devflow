import { useLocation } from "react-router";
import { ProgressBar, type Tone } from "../ui/ProgressBar";
import { authCopy, authPoints } from "@/data/authCopy";
import { Icon } from "../ui/Icon";

const progress: { name: string; value: number; tone: Tone }[] = [
  { name: "Portfolio API", value: 68, tone: "primary" },
  { name: "React", value: 72, tone: "cyan" },
  { name: "TypeScript", value: 45, tone: "success" },
];

/**
 * Marketing side of the split screen. It is aria-hidden: everything here repeats
 * what the landing page says, so screen-reader users get the form without the noise.
 * Hidden below 900px, where the form needs the full width.
 */

export function AuthBrandPanel() {
  const { pathname } = useLocation();
  const copy = pathname.startsWith("/login")
    ? authCopy.login
    : authCopy.register;

  return (
    <aside
      aria-hidden="true"
      className="relative hidden flex-col justify-center overflow-hidden border-1 border-border bg-card p-12 min-[900px]:flex"
    >
      <div className="bg-grid-center pointer-events-none absolute inset-0" />
      <div className="relative mx-auto w-full max-w-[440px]">
        <h2 className="mb-2.5 text-[30px] font-[650px] leading-[1.15] tracking-[-0.03em] text-foreground">
          {copy.heading}
        </h2>
        <p>{copy.text}</p>
        <div className="mt-8 grid gap-3.5 rounded-[14px] border border-input bg-background p-[18px] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between text-[13px] font-semibold text-foreground">
            <span>This week</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-normal text-warning">
              <Icon name="flame" className="size-[13px]" />
              12-day streak
            </span>
          </div>
          {progress.map((p) => (
            <div key={p.name} className="grid gap-1.5 text-[13px]">
              <div className="flex justify-between text-foreground">
                {p.name}
                <span className="font-mono text-xs text-muted-foreground">
                  {p.value}%{" "}
                </span>
              </div>
              <ProgressBar value={p.value} tone={p.tone} label={p.name} />
            </div>
          ))}
        </div>
        <ul className="mt-7 grid gap-2.5 text-sm">
          {authPoints.map((point) => (
            <li key={point} className="flex gap-2.5">
              <Icon name="tick" className="mt-[3px] text-success" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
