
import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";
export type ThemePreference = Theme | "system";

const STORAGE_KEY = "devflow-theme";

function getInitialPreference(): ThemePreference {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === "light" || saved === "dark" || saved === "system") {
      return saved;
    }
  } catch {
    // Storage may be unavailable.
  }

  return "system";
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(preference: ThemePreference): Theme {
  return preference === "system" ? getSystemTheme() : preference;
}

export function useTheme() {
  const [preference, setPreference] =
    useState<ThemePreference>(getInitialPreference);

  const [theme, setTheme] = useState<Theme>(() =>
    resolveTheme(getInitialPreference()),
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    const applyTheme = () => {
      const resolvedTheme: Theme =
        preference === "system"
          ? mediaQuery.matches
            ? "dark"
            : "light"
          : preference;

      setTheme(resolvedTheme);

      document.documentElement.classList.toggle(
        "dark",
        resolvedTheme === "dark",
      );
    };

    applyTheme();

    try {
      localStorage.setItem(STORAGE_KEY, preference);
    } catch {
      // Ignore storage errors.
    }

    if (preference === "system") {
      mediaQuery.addEventListener("change", applyTheme);

      return () => {
        mediaQuery.removeEventListener("change", applyTheme);
      };
    }
  }, [preference]);

  const setThemePreference = useCallback(
    (nextPreference: ThemePreference) => {
      setPreference(nextPreference);
    },
    [],
  );

  const toggleTheme = useCallback(() => {
    setPreference((currentPreference) => {
      const currentTheme = resolveTheme(currentPreference);

      return currentTheme === "dark" ? "light" : "dark";
    });
  }, []);

  return {
    theme,
    preference,
    setThemePreference,
    toggleTheme,
  };
}
