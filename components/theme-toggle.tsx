"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const isDark = !mounted || resolvedTheme !== "light";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      className="icon-button theme-toggle"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span className="theme-toggle-icons" aria-hidden="true">
        <Sun
          size={15}
          strokeWidth={1.7}
          className={isDark ? "theme-icon-inactive" : "theme-icon-active"}
        />
        <Moon
          size={15}
          strokeWidth={1.7}
          className={isDark ? "theme-icon-active" : "theme-icon-inactive"}
        />
      </span>
    </button>
  );
}
