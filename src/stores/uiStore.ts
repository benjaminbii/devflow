import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';

interface UiState {
    theme: Theme;
    /** Wide screens: sidebar hidden entirely (Ctrl/⌘+B or the top-bar button), as in
   *  the design. Not persisted: persisted layout preferences are out of scope. */
    sidebarCollapsed: boolean;
    /** Mobile sidebar drawer. Transient, so it is NOT persisted (see partialize). */
    mobileNavOpen: boolean;
    /** Toggle the theme between light and dark. */
    toggleTheme: () => void;
    /** Toggle the desktop sidebar between collapsed and expanded. */
    toggleSidebarCollapsed: () => void;
    setMobileNavOpen: (open: boolean) => void;
};

/**
 * UI and preference state lives in Zustand, not Redux: it is small, has no async
 * logic, and several unrelated components (navbar, sidebar, topbar) read it.
 *
 * Middleware order matters: `devtools` wraps `persist`, so devtools sees the
 * state after it has been rehydrated from storage.
 */

export const useUiStore = create<UiState>()(
    devtools(
        persist(
            (set) => (
                {
                    theme: "dark",// dark-first identity; see the design brief
                    sidebarCollapsed: false,
                    mobileNavOpen: false,
                    // The third argument names the action in Redux DevTools (devtools middleware).
                    toggleTheme: () => set((s) => ({ theme: s.theme === "light" ? "dark" : "light" }), false, "ui/toggleTheme"),
                    toggleSidebarCollapsed: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed }), false, "ui/toggleSidebarCollapsed"),
                    setMobileNavOpen: (open: boolean) => set({ mobileNavOpen: open }, false, "ui/setMobileNavOpen"),
                }
            ),
            {
                // Must match the key read by the inline script in index.html.
                name: "devflow-ui",
                // Persist only real preferences. An open drawer saved to storage would
                // reopen on the next visit, which would be a bug.
                partialize: (s) => ({ theme: s.theme, sidebarCollapsed: s.sidebarCollapsed }),
            },
        ),
        { name: "ui" },
    ),
);

/** The `dark` class on <html> is what Tailwind's dark variant keys off. */
function applyTheme(theme: Theme) {
    document.documentElement.classList.toggle("dark", theme === "dark");
}

// localStorage is synchronous, so `persist` has already rehydrated by this line.
// Syncing once here keeps the DOM correct even if the inline script was skipped.
applyTheme(useUiStore.getState().theme);

// Keeping the DOM side effect in a store subscription (not in a React effect)
// means the theme is applied on every route, including ones with no theme toggle.
useUiStore.subscribe((state, prev) => {
    if (state.theme !== prev.theme) applyTheme(state.theme);
});
