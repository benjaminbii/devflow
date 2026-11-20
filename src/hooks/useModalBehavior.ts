import { useEffect, type RefObject } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';


type Options = {
    open: boolean;
    /** Must be referentially stable (useCallback or a store action), or the effect re-runs every render. */
    onClose: () => void;
    panelRef: RefObject<HTMLElement | null>;
    /** Element that receives focus when the drawer opens (usually the close button). */
    initialFocusRef: RefObject<HTMLElement | null>;
    /** Element that regains focus on close (the button that opened the drawer). */
    returnFocusRef: RefObject<HTMLElement | null>;
    /** Close automatically once the viewport reaches this width, where the drawer is hidden by CSS. */
    closeAtMinWidth: number;
};

/**
 * Everything an accessible modal drawer needs besides markup: scroll lock, focus
 * move-in and restore, a Tab trap, Escape to close, and auto-close on resize.
 * Shared by both mobile drawers so the behavior can't drift between them.
 */

export function useModalBehavior({
    open,
    onClose,
    panelRef,
    initialFocusRef,
    returnFocusRef,
    closeAtMinWidth,
}: Options) {
    useEffect(() => {
        if (!open) return;

        // Check whether the viewport is already at the desktop breakpoint.
        const wide = window.matchMedia(`(min-width: ${closeAtMinWidth}px)`);
        if (wide.matches) {
            onClose();
            return;
        }

        // Stop the page behind the drawer from scrolling; restore whatever was there before.
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";


        initialFocusRef.current?.focus();
        // Captured now: the ref could point elsewhere by the time cleanup runs.
        const trigger = returnFocusRef.current;

        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                onClose();
                return;
            }
            if (e.key !== "Tab") return;

            // Trap Tab inside the drawer. If the user tabs past the last focusable
            // element, move them to the first, and vice versa.
            const focusables = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
            if (!focusables || focusables.length === 0) return;

            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }

        // Rotating a tablet or resizing a window can make the drawer's CSS hide it
        // while state still says "open", which would leave scroll locked. Close it.

        function onBreakpointChange(e: MediaQueryListEvent) {
            if (e.matches) onClose();
        }

        document.addEventListener("keydown", onKeyDown);
        wide.addEventListener("change", onBreakpointChange);


        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", onKeyDown);
            wide.removeEventListener("change", onBreakpointChange);
            trigger?.focus();
        };




    }, [open, onClose, panelRef, initialFocusRef, returnFocusRef, closeAtMinWidth]);




}



