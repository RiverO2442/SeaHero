import { useCallback, useRef, useState } from "react";

interface UseClipboardResult {
  copy: (text: string, key?: string) => Promise<void>;
  copied: boolean;
  copiedKey: string | null;
}

export function useClipboard(resetMs = 2000): UseClipboardResult {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(async (text: string, key = "__default__") => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      el.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    setCopiedKey(key);
    timerRef.current = setTimeout(() => setCopiedKey(null), resetMs);
  }, [resetMs]);

  return { copy, copied: copiedKey !== null, copiedKey };
}
