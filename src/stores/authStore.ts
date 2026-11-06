import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
    id: string;
    email: string;
    name: string;
}

interface AuthState {
    user: AuthUser | null;
    login: (user: AuthUser) => void;
    logout: () => void;
}

/**
 * Session state. Zustand fits because the route guard (src/lib/authGuards.ts) needs
 * to read it OUTSIDE React via `useAuthStore.getState()`, which a Context can't do.
 *
 * SECURITY NOTE: persisting a user profile in localStorage is fine for this mock.
 * A real backend should keep the session in an httpOnly cookie, because any token
 * in localStorage is readable by injected scripts (XSS).
 */

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => (
            {
                user : null,
                login:(user) => set({ user }),
                logout:() => set({ user: null }),
            }
        ),
        {
            name: "devflow-auth"
        },
    ),
);