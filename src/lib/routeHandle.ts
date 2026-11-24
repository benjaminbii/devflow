import { useMatches } from "react-router";

/**
 * Data attached to a route via its `handle` field. React Router leaves `handle`
 * untyped (`unknown`), so this is the one place we define and check its shape.
 */
export type RouteHandle = { title: string };

/** Keeps route definitions to `handle: titled("Projects")` instead of repeating the object shape. */
export const titled = (title: string): RouteHandle => ({ title });

function hasTitle(handle: unknown): handle is RouteHandle {
    return (
        typeof handle === "object" &&
        handle !== null &&
        typeof (handle as { title?: unknown }).title === "string"
    );
}

/**
 * The title of the current page, read from the route config. One source of truth
 * feeds the top bar, the browser tab title, and placeholder pages, so they can't
 * disagree. Matches run parent -> child; we want the deepest one that has a title.
 */
export function useRouteTitle(): string | undefined {
    const matches = useMatches();
    for (let i = matches.length - 1; i >= 0; i--) {
        const handle = matches[i].handle;
        if (hasTitle(handle)) return handle.title;
    }
    return undefined;
}