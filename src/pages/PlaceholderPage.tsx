import { useRouteTitle } from "@/lib/routeHandle";

/**
 * Stand-in for pages not built yet. The title comes from the route's `handle`, so
 * there is one place to name a page. When a real page replaces this, it can keep
 * using the same handle for the top bar and tab title.
 */
export function PlaceholderPage() {
  const title = useRouteTitle() ?? "Page";

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">{title}</h1>
      <p className="mt-1 text-sm">Coming soon.</p>
    </>
  );
}