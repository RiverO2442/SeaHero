import { useEffect, useCallback } from "react";

type ShortcutMap = Record<string, () => void>;

export function useKeyboardShortcuts(shortcuts: ShortcutMap) {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      const key = [
        e.ctrlKey && "ctrl",
        e.altKey && "alt",
        e.shiftKey && "shift",
        e.key.toLowerCase(),
      ]
        .filter(Boolean)
        .join("+");

      const action = shortcuts[key];
      if (action) {
        e.preventDefault();
        action();
      }
    },
    [shortcuts],
  );

  useEffect(() => {
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handler]);
}
