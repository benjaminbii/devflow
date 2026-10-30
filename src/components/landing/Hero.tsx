import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { DashboardPreview } from "@/components/landing/DashboardPreview/index";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 text-center md:pt-22">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0"
      />

      <Container className="relative">
        <span className="inline-flex items-center gap-2 rounded-full border border-input bg-card px-3 py-[5px] font-mono text-xs text-body">
          <span className="size-1.75 rounded-full bg-success shadow-[0_0_0_3px] shadow-success/25" />
          Built for developers who ship
        </span>

        <h1 className="mx-auto mb-5 mt-6 max-w-215 text-[clamp(40px,7vw,68px)] font-[650] leading-[1.06] tracking-[-0.035em] text-foreground">
          One workspace for everything you build and learn
        </h1>

        <p className="mx-auto max-w-[580px] text-lg">
          Manage projects, tasks, notes and learning progress in one fast
          workspace, and see how you are actually improving.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#" className={buttonStyles({ size: "lg" })}>
            Get started free
            <Icon name="arrow" />
          </a>
          <a
            href="#showcase"
            className={buttonStyles({ variant: "outline", size: "lg" })}
          >
            <Icon name="play" />
            View demo
          </a>
        </div>

        <p className="mt-4 font-mono text-xs text-muted-foreground">
          No credit card. Takes 30 seconds.
        </p>

        <DashboardPreview />
      </Container>
    </section>
  );
}
