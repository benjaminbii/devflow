export type FieldErrors<K extends string> = Partial<Record<K, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function checkEmail(email: string): string | undefined {
  if (!email) return "Enter your email address.";
  if (!EMAIL.test(email)) return "Enter a valid email address.";
}

export function validateLogin(v: { email: string; password: string }) {
  const errors: FieldErrors<"email" | "password"> = {};
  const email = checkEmail(v.email);
  if (email) errors.email = email;
  if (!v.password) errors.password = "Enter your password.";
  return errors;
}

export function validateRegister(v: {
  name: string;
  email: string;
  password: string;
  confirm: string;
}) {
  // Keys are inserted in form order so the first error is the first field to focus.
  const errors: FieldErrors<"name" | "email" | "password" | "confirm"> = {};
  if (!v.name) errors.name = "Enter your name.";
  const email = checkEmail(v.email);
  if (email) errors.email = email;
  if (v.password.length < 8) errors.password = "Use at least 8 characters.";
  if (v.confirm !== v.password) errors.confirm = "Passwords don't match.";
  return errors;
}