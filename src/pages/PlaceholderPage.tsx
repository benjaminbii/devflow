export function PlaceholderPage({ title }: { title: string }) {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">{title}</h1>
      <p className="mt-1 text-sm">Coming soon.</p>
    </>
  );
}