// src/pages/DashboardPage.tsx
import { useAuthStore } from "@/stores/authStore";

export function DashboardPage() {
  const name = useAuthStore((s) => s.user?.name);

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
        Welcome{name ? `, ${name}` : ""}
      </h1>
      <p className="mt-1 text-sm">Your stats, board and learning progress will live here.</p>
    </>
  );
}