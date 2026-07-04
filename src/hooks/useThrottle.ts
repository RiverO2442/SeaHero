import { useState, useEffect, useRef } from "react";

export function useThrottle<T>(value: T, interval: number): T {
  const [throttled, setThrottled] = useState<T>(value);
  const lastUpdated = useRef<number>(Date.now() - interval);

  useEffect(() => {
    const now = Date.now();
    const remaining = interval - (now - lastUpdated.current);
    if (remaining <= 0) {
      lastUpdated.current = now;
      setThrottled(value);
    } else {
      const timer = setTimeout(() => {
        lastUpdated.current = Date.now();
        setThrottled(value);
      }, remaining);
      return () => clearTimeout(timer);
    }
  }, [value, interval]);

  return throttled;
}
