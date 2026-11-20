import { useState, type SubmitEvent } from "react";
import { Link } from "react-router";
import { AuthBanner } from "@/components/auth/AuthBanner";
import { AuthHeading } from "@/components/auth/AuthHeading";
import { AuthSuccess } from "@/components/auth/AuthSuccess";
import { OrDivider } from "@/components/auth/OrDivider";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Field } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { Spinner } from "@/components/ui/Spinner";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useField } from "@/hooks/useField";
import { useIsMounted } from "@/hooks/useIsMounted";
import { DEMO_EMAIL, DEMO_PASSWORD, mockLogin } from "@/lib/mockAuth";
import { validateEmail, validateLoginPassword } from "@/lib/validation";
import { useAuthStore } from "@/stores/authStore";
import { useToastStore } from "@/stores/toastStore";
import { cn } from "@/lib/utils";

export function LoginPage() {
  useDocumentTitle("Log in · DevFlow");

  const login = useAuthStore((s) => s.login);
  const showToast = useToastStore((s) => s.show);
  const isMounted = useIsMounted();

  const email = useField(validateEmail);
  // showValid off: a green border on a password field tells the user nothing useful.
  const password = useField(validateLoginPassword, { showValid: false });
  const [remember, setRemember] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setFailed(false);

    const fields = [email, password];
    const results = fields.map((f) => f.validate());
    const firstInvalid = fields.find((_, i) => !results[i]);
    if (firstInvalid) return firstInvalid.focus();

    setSubmitting(true);
    const user = await mockLogin(email.value.trim(), password.value);
    if (!isMounted()) return;
    setSubmitting(false);

    if (!user) {
      // Deliberately one generic message: saying which half was wrong would let
      // an attacker discover which emails have accounts.
      setFailed(true);
      password.focus(); // the likelier typo, and it's where the user will retype
      return;
    }

    login(user, remember);
    setDone(true);
  }

  if (done) {
    return (
      <AuthSuccess
        title="Welcome back"
        message="Taking you to your dashboard."
      />
    );
  }

  return (
    <>
      <AuthHeading
        title="Welcome back"
        subtitle="Log in to pick up your projects and learning where you left them."
      />

      {failed && (
        <AuthBanner>
          Incorrect email or password. Check your details and try again, or
          reset your password.
        </AuthBanner>
      )}

      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onClick={() =>
          showToast("GitHub sign-in is a placeholder in this demo")
        }
      >
        <Icon name="github" fill="currentColor" stroke="none" />
        Continue with GitHub
      </Button>

      <OrDivider>or log in with email</OrDivider>

      <form onSubmit={onSubmit} noValidate>
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={email.error}
          valid={email.valid}
          {...email.inputProps}
        />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Your password"
          error={password.error}
          labelAction={
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault(); // no reset page yet; avoid jumping to the page top via "#"
                showToast("Password reset email flow comes next");
              }}
              className="text-[13px] font-medium text-primary-hover hover:underline"
            >
              Forgot password?
            </a>
          }
          {...password.inputProps}
        />

        <Checkbox
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        >
          Keep me logged in on this device
        </Checkbox>

        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          aria-busy={submitting}
          className={cn(
            "w-full",
            "aria-busy:cursor-progress aria-busy:opacity-85",
          )}
        >
          {submitting ? (
            <>
              <Spinner />
              Logging in…
            </>
          ) : (
            "Log in"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm">
        New to DevFlow?{" "}
        <Link
          to="/register"
          className="font-medium text-primary-hover hover:underline"
        >
          Create an account
        </Link>
      </p>

      {/* Portfolio-only: lets a reviewer get in without registering. Remove with the mock. */}
      <div className="mt-5 rounded-md border border-dashed border-input px-3 py-2.5 text-center font-mono text-xs leading-relaxed text-muted-foreground">
        Demo login: {DEMO_EMAIL} / {DEMO_PASSWORD}
      </div>
    </>
  );
}
