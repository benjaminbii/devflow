export function Spinner() {
  // Decorative: the button's text ("Logging in…") carries the meaning.
  // Under reduced motion it renders as a static ring, which still signals "busy".
  return (
    <span
      aria-hidden="true"
      className="size-4 animate-spin rounded-full border-2 border-white/35 border-t-white motion-reduce:animate-none"
    />
  );
}
