import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { footerColumns } from "./data/footer";

export function Footer() {
  return (
    <footer className="mt-18 border-t border-border pb-8 pt-14 text-sm md:mt-28">
      <Container>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div className="col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-3 max-w-[260px]">
              The workspace for what you build and what you learn.
            </p>
          </div>

          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                {col.title}
              </h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="block py-1 transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-[13px] text-muted-foreground">
          <span>© {new Date().getFullYear()} DevFlow. Portfolio project.</span>
          <span className="font-mono">v0.1 design preview</span>
        </div>
      </Container>
    </footer>
  );
}
