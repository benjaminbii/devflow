import { Link, Outlet } from "react-router";
import { AuthBrandPanel } from "@/components/auth/AuthBrandPanel";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { useTheme } from "@/hooks/useTheme";
import { buttonStyles } from "../ui/buttonStyles";

/**
 * Split-screen shell shared by Log in and Register. Because it is a layout route,
 * it stays mounted while the page inside <Outlet /> swaps, so the brand panel and
 * top bar don't flash when moving between the two forms.
 *
 * 900px (not Tailwind's md/lg) is the design's own breakpoint: it is where two
 * columns still leave the form enough width.
 */
export function AuthLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="grid min-h-dvh min-[900px]:grid-cols-2">
      {/* `minmax(0,1fr)` columns equivalent: min-w-0 stops long content from
          stretching one column and squashing the other. */}
      <div className="flex min-w-0 flex-col px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] min-[900px]:px-8">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-1">
            <Link to="/" className={buttonStyles({ variant: "ghost" })}>
              Back to home
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              className={buttonStyles({
                variant: "ghost",
                className: "size-9 px-0",
              })}
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} />
            </button>
          </div>
        </div>

        {/* items-start on phones so the form isn't pushed down by vertical centering
            when the on-screen keyboard shrinks the viewport. */}
        <main className="grid flex-1 items-start justify-items-center py-8 min-[900px]:items-center">
          <div className="w-full max-w-[400px]">
            <Outlet />
          </div>
        </main>

        <p className="text-center text-xs text-muted-foreground">
          Protected by industry-standard encryption. DevFlow is a portfolio
          demo.
        </p>
      </div>

      <AuthBrandPanel />
    </div>
  );
}
