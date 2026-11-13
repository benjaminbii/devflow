import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { validateRegister, type FieldErrors } from "@/lib/validation";

export function RegisterPage() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<
    FieldErrors<"name" | "email" | "password" | "confirm">
  >({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const found = validateRegister({
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      password: String(data.get("password") ?? ""),
      confirm: String(data.get("confirm") ?? ""),
    });
    setErrors(found);

    const first = Object.keys(found)[0];
    if (first) {
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    // TODO: replace with real registration
    navigate("/dashboard");
  }

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
        Create your workspace
      </h1>
      <p className="mt-1 text-sm">Free to start. Takes about 30 seconds.</p>

      <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-4">
        <Field
          label="Name"
          name="name"
          autoComplete="name"
          error={errors.name}
        />
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
          autoComplete="new-password"
          hint="At least 8 characters."
          error={errors.password}
        />
        <Field
          label="Confirm password"
          name="confirm"
          type="password"
          autoComplete="new-password"
          error={errors.confirm}
        />
        <Button type="submit" size="lg" className="mt-2 w-full">
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-primary-hover hover:underline"
        >
          Log in
        </Link>
      </p>
    </>
  );
}
