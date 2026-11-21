import { useUiStore, type Theme } from "@/stores/uiStore";

// Re-exported so existing `import type { Theme } from "@/hooks/useTheme"` keeps working.
export type { Theme };

/**
 * Components select each field separately. Zustand re-renders a component only
 * when the selected value changes, so selecting the whole store would re-render
 * on unrelated updates like opening the mobile drawer.
 */
export function useTheme() {
  const theme = useUiStore((s) => s.theme);
  const toggleTheme = useUiStore((s) => s.toggleTheme);
  return { theme, toggleTheme };
}