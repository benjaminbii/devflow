import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { steps } from "@/data/steps";

export function HowItWorks() {
  return (
    <section id="how" className="pb-18 md:pb-28">
      <Container>
        <SectionHeading title="From empty workspace to clear picture in four steps" />

        <ol className="relative grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Connector line, desktop only */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[19px] hidden h-px bg-linear-to-r from-primary to-border to-80% lg:block"
          />

          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <span className="relative mb-5 grid size-10 place-items-center rounded-full border border-primary bg-background font-mono text-sm font-medium text-primary-hover">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-1.5 text-[17px] font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
