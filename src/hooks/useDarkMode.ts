import { useState, useEffect } from "react";

export function useDarkMode(): [boolean, (val: boolean) => void] {
  const [dark, setDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("settings_darkMode");
      if (stored !== null) return stored === "true";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const hasOverride = localStorage.getItem("settings_darkMode") !== null;
      if (!hasOverride) setDark(e.matches);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try { localStorage.setItem("settings_darkMode", String(dark)); } catch {}
  }, [dark]);

  return [dark, setDark];
}
