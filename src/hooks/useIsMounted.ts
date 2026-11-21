import { useCallback, useEffect, useRef } from "react";

/**
 * Lets an async handler check, after an `await`, whether the page is still on
 * screen. Without it, a login that finishes after the user navigated away would
 * still sign them in.
 */
export function useIsMounted() {
    const mounted = useRef(false);
    useEffect(() => {
        // Set to true here (not only initialised to it) because StrictMode runs
        // effect -> cleanup -> effect in development, and cleanup flips it to false.
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);
    return useCallback(() => mounted.current, []);
}