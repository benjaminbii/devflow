import { useCallback, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { MobileSidebar } from "@/components/landing/MobileSidebar";
import { navLinks } from "./data/nav";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { theme, toggleTheme } = useTheme();
  const closeSidebar = useCallback(() => setOpen(false), []);

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-md">
        <Container className="flex h-16 items-center gap-6">
          <Logo/>

          {/* Desktop links */}
          <nav aria-label="Primary" className="ml-4 hidden gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            {/* Theme toggle lives in the sidebar on mobile */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              className={cn(
                buttonStyles({ variant: "ghost", className: "size-9 px-0" }),
                "hidden md:inline-flex",
              )}
            >
              <Icon name={theme === "dark" ? "moon" : "sun"} />
            </button>

            <a
              href="#"
              className={cn(buttonStyles({ variant: "ghost" }), "hidden md:inline-flex")}
            >
              Log in
            </a>
            <a href="#" className={buttonStyles({ variant: "primary" })}>
              Get started
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={cn(
                buttonStyles({ variant: "outline", className: "size-9 px-0" }),
                "md:hidden",
              )}
            >
              <Icon name="menu" />
            </button>
          </div>
        </Container>
      </header>

      {/* Sibling of <header>, not a child: the header's backdrop-blur would trap `position: fixed`. */}
      <MobileSidebar
        open={open}
        onClose={closeSidebar}
        theme={theme}
        onToggleTheme={toggleTheme}
        returnFocusRef={menuButtonRef}
      />
    </>
  );
}