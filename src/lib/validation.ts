/** Returns an error message, or undefined when the value is valid. */

export type Validator = (value: string) => string | undefined;

// Requires a 2+ letter TLD so "a@b.c" is rejected. Deliberately not a full RFC
// check: the server is the real authority on whether an address works.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Validators are module-level constants on purpose: useField() puts them in a
// dependency list, so a stable identity avoids re-creating its callbacks each render.

export const validateName: Validator = (v) =>
    v.trim() ? undefined : "Enter your name.";

export const validateEmail: Validator = (v) => {
    const email = v.trim();
    if (!email) return "Enter your email address.";
    if (!EMAIL.test(email)) return "Enter a valid email, like you@example.com.";
    return undefined;
};

/** Login only checks presence. Policy rules belong to registration, not sign-in. */
export const validateLoginPassword: Validator = (v) =>
    v ? undefined : "Enter your password.";
// One list drives both the validator and the checklist UI, so the rules shown to
// the user can never drift from the rules actually enforced.

export const PASSWORD_RULES = [
    { id: "len", label: "At least 8 characters", test: (v: string) => v.length >= 8 },
    { id: "num", label: "Contains a number", test: (v: string) => /\d/.test(v) },
    {
        id: "case",
        label: "Upper and lower case letters",
        test: (v: string) => /[a-z]/.test(v) && /[A-Z]/.test(v),
    },
] as const;

export const validateNewPassword: Validator = (v) => {
    if (!v) return "Create a password.";
    if (PASSWORD_RULES.some((r) => !r.test(v))) {
        return "Your password does not meet all requirements yet.";
    }
    return undefined;
};

const STRENGTH = [
    { label: "Too short", tone: "destructive" },
    { label: "Weak", tone: "destructive" },
    { label: "Fair", tone: "warning" },
    { label: "Good", tone: "info" },
    { label: "Strong", tone: "success" },
] as const;

/**
 * Each satisfied rule adds a level, and a 12+ character password earns one more.
 * An empty field is level 0; any typed input is at least level 1 so the meter
 * visibly reacts to the first keystroke.
 */
export function passwordStrength(value: string) {
    const passed = PASSWORD_RULES.filter((r) => r.test(value)).length + (value.length >= 12 ? 1 : 0);
    const level = value ? Math.max(1, passed) : 0;
    return { level, ...STRENGTH[level] };
}

