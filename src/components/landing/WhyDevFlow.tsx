import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reasons } from "./data/why";

export function WhyDevFlow() {
  return (
    <section className="pb-18 md:pb-28">
      <Container className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <SectionHeading title="Why developers use DevFlow" className="mb-0" />

        <ul>
          {reasons.map((r) => (
            <li
              key={r.title}
              className="grid grid-cols-[24px_1fr] gap-3.5 border-t border-border py-5.5 last:border-b"
            >
              <Icon name="ok" className="mt-[3px] text-primary-hover" />
              <div>
                <h3 className="mb-1 text-[17px] font-semibold text-foreground">{r.title}</h3>
                <p className="text-[15px]">{r.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}