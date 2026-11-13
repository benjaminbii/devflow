// src/pages/NotFoundPage.tsx
import { Link } from "react-router";
import { buttonStyles } from "@/components/ui/buttonStyles";

export function NotFoundPage() {
  return (
    <main className="grid min-h-dvh place-items-center px-5 text-center">
      <div>
        <p className="font-mono text-sm text-muted-foreground">404</p>
        <h1 className="mt-1 text-2xl font-semibold text-foreground">Page not found</h1>
        <p className="mt-1">That page doesn't exist or has moved.</p>
        <Link to="/" className={buttonStyles({ className: "mt-6" })}>
          Back to home
        </Link>
      </div>
    </main>
  );
}