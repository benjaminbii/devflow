import { useRef, useState, type KeyboardEvent } from "react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { showcaseTabs } from "./showcaseTabs";
import { cn } from "@/lib/utils";

export function Showcase() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tab = showcaseTabs[active];

  function select(index: number) {
    setActive(index);
    tabRefs.current[index]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const last = showcaseTabs.length - 1;
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        select(active === last ? 0 : active + 1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        select(active === 0 ? last : active - 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        select(active === 0 ? last : active - 1);
        break;
      case "ArrowDown":
        e.preventDefault();
        select(active === last ? 0 : active + 1);
        break;
      case "Home":
        e.preventDefault();
        select(0);
        break;
      case "End":
        e.preventDefault();
        select(last);
        break;
    }
  }

  return (
    <section id="showcase" className="pb-18 md:pb-28">
      <Container>
        <SectionHeading
          title="See how the pieces fit together"
          className="mb-8 md:mb-8"
        />

        <div
          role="tablist"
          aria-label="Product areas"
          onKeyDown={onKeyDown}
          className="mb-8 inline-flex gap-1 rounded-lg border border-border bg-card p-1"
        >
          {showcaseTabs.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={`panel-${t.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "cursor-pointer rounded-md px-4 py-[7px] text-sm font-medium transition-colors",
                i === active
                  ? "bg-secondary text-foreground"
                  : "text-body hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-12">
          <div>
            <h3 className="mb-3 text-[26px] font-semibold tracking-[-0.02em] text-foreground">
              {tab.title}
            </h3>
            <p>{tab.description}</p>
            <ul className="mt-5 grid gap-2.5 text-[15px]">
              {tab.bullets.map((b) => (
                <li key={b} className="flex gap-2.5">
                  <Icon name="ok" className="mt-[3px] text-success" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div
            key={tab.id}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            tabIndex={0}
            className="grid animate-fade-in gap-2.5 rounded-lg border border-border bg-card p-4 motion-reduce:animate-none"
          >
            {tab.preview}
          </div>
        </div>
      </Container>
    </section>
  );
}
