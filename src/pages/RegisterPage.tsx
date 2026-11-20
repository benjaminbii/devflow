import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router";
import { AuthHeading } from "@/components/auth/AuthHeading";
import { AuthSuccess } from "@/components/auth/AuthSuccess";
import { OrDivider } from "@/components/auth/OrDivider";
import { PasswordStrength } from "@/components/auth/PasswordStrength";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Field } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { Spinner } from "@/components/ui/Spinner";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useField } from "@/hooks/useField";
import { useIsMounted } from "@/hooks/useIsMounted";
import { mockRegister } from "@/lib/mockAuth";
import {
  validateEmail,
  validateName,
  validateNewPassword,
} from "@/lib/validation";
import { useAuthStore } from "@/stores/authStore";
import { useToastStore } from "@/stores/toastStore";
import { cn } from "@/lib/utils";

export function RegisterPage() {
  useDocumentTitle("Create your account · DevFlow");

  const login = useAuthStore((s) => s.login);
  const showToast = useToastStore((s) => s.show);
  const isMounted = useIsMounted();

  const name = useField(validateName);
  const email = useField(validateEmail);
  const password = useField(validateNewPassword);
  const [accepted, setAccepted] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const termsRef = useRef<HTMLInputElement>(null);

  const [submitting, setSubmitting] = useState(false);
  // Holds the first name once registration succeeds; swaps the form for the success view.
  const [welcomeName, setWelcomeName] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return; // disabled button covers clicks; this covers Enter key repeats

    // map(), not some()/every(): every field must run so ALL errors show at once.
    const fields = [name, email, password];
    const results = fields.map((f) => f.validate());
    setTermsError(!accepted);

    // Focus the first problem in visual order so a keyboard user lands on it.
    const firstInvalid = fields.find((_, i) => !results[i]);
    if (firstInvalid) return firstInvalid.focus();
    if (!accepted) return termsRef.current?.focus();

    setSubmitting(true);
    const user = await mockRegister(name.value.trim(), email.value.trim());
    if (!isMounted()) return; // user left mid-request: don't sign them in behind their back

    login(user);
    setSubmitting(false);
    setWelcomeName(user.name.split(" ")[0]);
  }

  if (welcomeName) {
    return (
      <AuthSuccess
        title={`Welcome to DevFlow, ${welcomeName}`}
        message="Your workspace is ready. Taking you to your dashboard."
      />
    );
  }

  return (
    <>
      <AuthHeading
        title="Create your workspace"
        subtitle="Free to start. Your projects, tasks and learning in one place."
      />

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

      <OrDivider>or sign up with email</OrDivider>

      {/* noValidate: we own validation and messaging; the browser's native bubbles
          are unstyled and inconsistent across browsers. */}
      <form onSubmit={onSubmit} noValidate>
        <Field
          label="Full name"
          name="name"
          autoComplete="name"
          placeholder="Bennie Bii"
          error={name.error}
          valid={name.valid}
          {...name.inputProps}
        />
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
          autoComplete="new-password"
          placeholder="Create a password"
          error={password.error}
          valid={password.valid}
          describedBy="register-password-rules"
          {...password.inputProps}
        >
          <PasswordStrength
            value={password.value}
            id="register-password-rules"
          />
        </Field>

        <Checkbox
          ref={termsRef}
          checked={accepted}
          onChange={(e) => {
            setAccepted(e.target.checked);
            if (e.target.checked) setTermsError(false);
          }}
        >
          I agree to the{" "}
          <a href="#" className="text-primary-hover hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary-hover hover:underline">
            Privacy Policy
          </a>
          .
        </Checkbox>
        {termsError && (
          <p
            role="alert"
            className="-mt-2.5 mb-4 flex items-center gap-1.5 text-[13px] text-destructive"
          >
            <Icon name="alert" className="size-[15px]" />
            Please accept the terms to continue.
          </p>
        )}

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
              Creating account…
            </>
          ) : (
            "Create account"
          )}
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
