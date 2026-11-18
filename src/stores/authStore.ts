import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AuthUser = {
    id: string;
    name: string;
    email: string;
};

type AuthState = {
    user: AuthUser | null;
    /** True = survive closing the browser (localStorage). False = this tab only (sessionStorage). */
    remember: boolean;
    login: (user: AuthUser, remember?: boolean) => void;
    logout: () => void;
};

type PersistedAuth = Pick<AuthState, "user" | "remember">;

/**
 * Makes the "Keep me logged in on this device" checkbox real instead of decorative.
 * Reads check both stores; writes go to one and clear the other, so switching the
 * choice on a later login never leaves a stale copy behind.
 */
const storage = createJSONStorage<PersistedAuth>(() => ({
    getItem: (key) => localStorage.getItem(key) ?? sessionStorage.getItem(key),
    setItem: (key, value) => {
        // `value` is already the serialized { state, version } envelope from persist.
        const { state } = JSON.parse(value) as { state: PersistedAuth };
        const [keep, drop] =
            state.remember === false ? [sessionStorage, localStorage] : [localStorage, sessionStorage];
        keep.setItem(key, value);
        drop.removeItem(key);
    },
    removeItem: (key) => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
    },
}));

/**
 * Session state. Zustand fits because the route guard (src/lib/authGuards.ts)
 * reads it OUTSIDE React via `useAuthStore.getState()`, which Context can't do.
 *
 * SECURITY NOTE: persisting a user profile in web storage is fine for this mock.
 * A real backend should keep the session in an httpOnly cookie, because any token
 * in web storage is readable by injected scripts (XSS).
 */
export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            remember: true,
            login: (user, remember = true) => set({ user, remember }),
            logout: () => set({ user: null }),
        }),
        {
            name: "devflow-auth",
            storage,
            partialize: (s) => ({ user: s.user, remember: s.remember }),
        },
    ),
);