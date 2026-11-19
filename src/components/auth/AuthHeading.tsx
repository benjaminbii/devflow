import { useEffect, useRef } from "react";

/**
 * Moves focus to the heading on mount. When the route swaps between Log in and
 * Register, a screen-reader user hears the new page title instead of staying
 * focused on a link that has just disappeared. tabIndex=-1 makes the heading
 * focusable by script without adding it to the Tab order.
 */
export function AuthHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // preventScroll: don't jump the page on mobile where the form is tall.
    ref.current?.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <h1
        ref={ref}
        tabIndex={-1}
        className="text-[26px] font-[650] leading-[1.2] tracking-[-0.03em] text-foreground outline-none min-[900px]:text-[30px]"
      >
        {title}
      </h1>
      <p className="mb-7 mt-2">{subtitle}</p>
    </>
  );
}
