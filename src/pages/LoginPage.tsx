import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { validateLogin, type FieldErrors } from "@/lib/validation";

export function LoginPage() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FieldErrors<"email" | "password">>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const found = validateLogin({
      email: String(data.get("email") ?? "").trim(),
      password: String(data.get("password") ?? ""),
    });
    setErrors(found);

    const first = Object.keys(found)[0];
    if (first) {
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    // TODO: replace with real authentication
    navigate("/dashboard");
  }

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">Welcome back</h1>
      <p className="mt-1 text-sm">Log in to your DevFlow workspace.</p>

      <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-4">
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email}
        />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          error={errors.password}
        />
        <Button type="submit" size="lg" className="mt-2 w-full">
          Log in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm">
        New to DevFlow?{" "}
        <Link to="/register" className="font-medium text-primary-hover hover:underline">
          Create an account
        </Link>
      </p>
    </>
  );
}