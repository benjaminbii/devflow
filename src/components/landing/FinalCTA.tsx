import { Container } from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/buttonStyles";

export function FinalCTA() {
  return (
    <section>
      <Container>
        <div className="rounded-xl border border-input bg-card px-6 py-18 text-center shadow-[0_0_0_1px_var(--primary-soft),0_0_80px_-20px_var(--primary)]">
          <h2 className="mb-3 text-[clamp(30px,5vw,48px)] font-[650] leading-[1.1] tracking-[-0.03em] text-foreground">
            Start tracking what you build
          </h2>
          <p className="mx-auto max-w-[480px]">
            Create a workspace and add your first project in under a minute.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#" className={buttonStyles({ size: "lg" })}>
              Get started free
            </a>
            <a
              href="#showcase"
              className={buttonStyles({ variant: "outline", size: "lg" })}
            >
              View demo
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
