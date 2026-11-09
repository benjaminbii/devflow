import { redirect } from "react-router";
import { useAuthStore } from "@/stores/authStore";

/**
 * Route loaders run BEFORE the route renders, so a logged-out visitor is
 * redirected without ever seeing a flash of protected UI. The guard reads the
 * store with getState() because loaders run outside React and can't use hooks.
 */

export function requireAuth() {
    if(!useAuthStore.getState().user) throw redirect("/login");
    return null; // loaders must return something; null means "nothing to load"
}

/** The reverse guard: a logged-in user has no reason to see /login or /register. */

export function redirectIfAuthed() {
  if (useAuthStore.getState().user) throw redirect("/dashboard");
  return null;
}