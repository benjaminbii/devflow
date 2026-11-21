// src/hooks/useField.ts
import { useCallback, useRef, useState, type ChangeEvent } from "react";
import type { Validator } from "@/lib/validation";

type Options = {
    /** Show the green "valid" state. Off for login passwords: nothing to praise there. */
    showValid?: boolean;
};

/**
 * State for one form field: value, error, and validity, plus the validation timing.
 *
 *  - On blur: validate if the user typed something or an error is already showing.
 *    Blurring an untouched field stays quiet, so tabbing past a field doesn't scold.
 *  - On change: re-validate only while an error is showing, so it clears the moment
 *    the user fixes it, without nagging them while they are still typing a first answer.
 *  - On submit: call validate() on every field (see the pages).
 */
export function useField(validator: Validator, { showValid = true }: Options = {}) {
    const [value, setValue] = useState("");
    const [error, setError] = useState<string | undefined>();
    const [valid, setValid] = useState(false);
    // Needed so a failed submit can move focus to the first invalid field.
    const ref = useRef<HTMLInputElement>(null);

    const run = useCallback(
        (next: string) => {
            const message = validator(next);
            setError(message);
            setValid(showValid && !message);
            return !message;
        },
        [validator, showValid],
    );

    return {
        value,
        error,
        valid,
        /** Returns true when valid. Call it on every field (no short-circuit) so all errors show at once. */
        validate: () => run(value),
        focus: () => ref.current?.focus(),
        /** Spread onto <Field />. */
        inputProps: {
            ref,
            value,
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
                setValue(e.target.value);
                if (error) run(e.target.value);
            },
            onBlur: () => {
                if (value || error) run(value);
            },
        },
    };
}