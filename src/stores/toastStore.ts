import { create } from "zustand";

interface ToastState {
    message: string;
    visible: boolean;
    show: (message: string) => void;
};

// Module-level so a second toast cancels the first one's pending hide;
// otherwise the old timer would dismiss the new message early.

let hideTimer: ReturnType<typeof setTimeout> | undefined;

/**
 * Toasts are global and transient, which suits Zustand: any component (or even
 * non-React code) can call `useToastStore.getState().show(...)` without prop drilling.
 * `message` and `visible` are separate so the text stays put while the toast fades out.
 */

export const useToastStore = create<ToastState>((set) => ({
    message: "",
    visible: false,
    show: (message) => {
        clearTimeout(hideTimer);
        set({ message, visible: true });
        hideTimer = setTimeout(() => set({ visible: false }), 2400);
    },
}));