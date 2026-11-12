import { Outlet } from "react-router";
import { Logo } from "@/components/ui/Logo";

export function AuthLayout() {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0"
      >
        <header className="relative px-5 py-5">
          <Logo />
        </header>
        <main className="relative grid flex-1 place-items-center px-5 pb-16">
          <div className="w-full max-w-100 rounded-xl border border-input bg-card p-6 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.5)] sm:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
