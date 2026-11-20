import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { Icon } from "@/components/ui/Icon";
import { buttonStyles } from "../ui/buttonStyles";

const REDIRECT_MS = 2200; // keep equal to --animate-progress's duration in index.css

export function AuthSuccess({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  const navigate = useNavigate();
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
    // Auto-redirect, with the button below as an escape hatch for people who don't
    // want to wait (and for anyone who needs more time to read the message).
    // `replace` keeps this success screen out of the Back button history.
    const timer = setTimeout(
      () => navigate("/dashboard", { replace: true }),
      REDIRECT_MS,
    );
    return () => clearTimeout(timer); // cancel if the user clicks the button first
  }, [navigate]);

  return (
    <div className="text-center" aria-live="polite">
      <div className="mx-auto mb-5 grid size-14 place-items-center rounded-[14px] bg-success/15 text-success">
        <Icon name="ok" className="size-7" />
      </div>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="text-[26px] font-[650] tracking-[-0.03em] text-foreground outline-none"
      >
        {title}
      </h1>
      <p className="mb-6 mt-2">{message}</p>

      {/* Base w-full means that with reduced motion (animation off) the bar just shows full. */}
      <div className="mx-auto mb-5 h-1 max-w-[240px] overflow-hidden rounded-[2px] bg-border">
        <i className="block h-full w-full animate-progress bg-primary-hover" />
      </div>

      <Link
        to="/dashboard"
        replace
        className={buttonStyles({
          size: "lg",
          className: "mx-auto w-full max-w-[240px]",
        })}
      >
        Go to dashboard
      </Link>
    </div>
  );
}
